const mongoose = require("mongoose");
const { Photo, PhotoComment } = require("../models");

const MONGO_URI =
  "mongodb+srv://anunaidumeka_db_user:Gpy7KSwvgjCcotnp@cluster0.mbkdql3.mongodb.net/?appName=Cluster0";

const photos = [
  {
    title: "Portrait I",
    imageUrl: "/images/image1.jpg",
    description: "A captivating portrait session.",
  },
  {
    title: "Portrait II",
    imageUrl: "/images/image2.jpg",
    description: "Natural light headshot.",
  },
  {
    title: "Landscape I",
    imageUrl: "/images/image3.jpg",
    description: "Golden hour landscape.",
  },
  {
    title: "Landscape II",
    imageUrl: "/images/image4.jpg",
    description: "Wide open horizon.",
  },
  {
    title: "Event I",
    imageUrl: "/images/image5.jpg",
    description: "Capturing the moment.",
  },
  {
    title: "Event II",
    imageUrl: "/images/image6.jpg",
    description: "Candid event photography.",
  },
  {
    title: "Street I",
    imageUrl: "/images/image7.jpg",
    description: "Urban street photography.",
  },
  {
    title: "Street II",
    imageUrl: "/images/image8.jpg",
    description: "City life in focus.",
  },
  {
    title: "Nature I",
    imageUrl: "/images/image9.jpg",
    description: "Nature at its finest.",
  },
  {
    title: "Nature II",
    imageUrl: "/images/image10.jpg",
    description: "Wildlife in motion.",
  },
  {
    title: "Abstract I",
    imageUrl: "/images/image11.jpg",
    description: "Abstract forms and light.",
  },
  {
    title: "Abstract II",
    imageUrl: "/images/image12.jpg",
    description: "Texture and colour study.",
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB.");

  // Clear existing photos and comments
  await PhotoComment.deleteMany({});
  await Photo.deleteMany({});
  console.log("Cleared existing photos and comments.");

  await Photo.insertMany(photos);
  console.log(`Seeded ${photos.length} photos.`);

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
