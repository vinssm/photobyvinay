const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { createProxyMiddleware } = require("http-proxy-middleware");

// New Apollo Server v4 imports
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

// Initialize the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create an async function to start Apollo and apply the middleware
const startApolloServer = async () => {
  // 1. Start the Apollo server
  await server.start();

  // 2. Body parsing middleware MUST be defined before expressMiddleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // 3. Apply Apollo middleware to the /graphql path
  app.use(
    "/graphql",
    expressMiddleware(server, {
      // The context function passes request info to your auth middleware
      context: async ({ req }) => authMiddleware({ req }),
    }),
  );

  // 4. Serve up static assets
  app.use(
    "/images",
    express.static(path.join(__dirname, "../client/src/assets/img")),
  );

  // If in production, serve Vite build output as static assets
  if (process.env.NODE_ENV === "production") {
    // Proxy /api/bio/* → Bio Service
    if (process.env.BIO_SERVICE_URL) {
      app.use(
        "/api/bio",
        createProxyMiddleware({
          target: process.env.BIO_SERVICE_URL,
          changeOrigin: true,
          pathRewrite: { "^/api/bio": "" },
        }),
      );
    }

    // Proxy /api/projects/* → Project Service
    if (process.env.PROJECTS_SERVICE_URL) {
      app.use(
        "/api/projects",
        createProxyMiddleware({
          target: process.env.PROJECTS_SERVICE_URL,
          changeOrigin: true,
          pathRewrite: { "^/api/projects": "" },
        }),
      );
    }

    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Catch-all route for Single Page Applications (SPA)
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // 5. Connect database and spin up the Express server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the function to boot everything up
startApolloServer();
