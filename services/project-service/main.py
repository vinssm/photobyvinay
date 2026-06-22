from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import time
from data.projects import PROJECTS

app = FastAPI(title="Project Portfolio Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_USER = "vinssm"

# ─── Health check ──────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"service": "project-service", "status": "ok", "uptime": time.process_time()}


# ─── All projects ──────────────────────────────────────────────────────────────
@app.get("/projects")
def get_projects(category: str = None, status: str = None):
    results = PROJECTS
    if category:
        results = [p for p in results if p["category"].lower() == category.lower()]
    if status:
        results = [p for p in results if p["status"].lower() == status.lower()]
    return results


# ─── Single project ────────────────────────────────────────────────────────────
@app.get("/projects/{project_id}")
def get_project(project_id: int):
    project = next((p for p in PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


# ─── GitHub repos (live from API) ─────────────────────────────────────────────
@app.get("/github/repos")
async def get_repos():
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.get(
                f"https://api.github.com/users/{GITHUB_USER}/repos",
                params={"sort": "updated", "per_page": 12},
                headers={"Accept": "application/vnd.github+json"},
            )
            resp.raise_for_status()
            repos = resp.json()
            # Filter forks, return essential fields
            return [
                {
                    "id": r["id"],
                    "name": r["name"],
                    "description": r["description"],
                    "language": r["language"],
                    "stars": r["stargazers_count"],
                    "forks": r["forks_count"],
                    "html_url": r["html_url"],
                    "updated_at": r["updated_at"],
                    "topics": r.get("topics", []),
                }
                for r in repos
                if not r["fork"]
            ]
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"GitHub API error: {str(e)}")


# ─── GitHub activity / contribution summary ────────────────────────────────────
@app.get("/github/activity")
async def get_activity():
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            # User profile stats
            user_resp = await client.get(
                f"https://api.github.com/users/{GITHUB_USER}",
                headers={"Accept": "application/vnd.github+json"},
            )
            user_resp.raise_for_status()
            user = user_resp.json()

            # Recent public events
            events_resp = await client.get(
                f"https://api.github.com/users/{GITHUB_USER}/events/public",
                params={"per_page": 10},
                headers={"Accept": "application/vnd.github+json"},
            )
            events_resp.raise_for_status()
            events = events_resp.json()

            recent = [
                {
                    "type": e["type"],
                    "repo": e["repo"]["name"],
                    "created_at": e["created_at"],
                }
                for e in events[:10]
            ]

            return {
                "username": user["login"],
                "name": user.get("name"),
                "public_repos": user["public_repos"],
                "followers": user["followers"],
                "following": user["following"],
                "avatar_url": user["avatar_url"],
                "profile_url": user["html_url"],
                "recent_activity": recent,
            }
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"GitHub API error: {str(e)}")
