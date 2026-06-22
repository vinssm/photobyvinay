# Project Portfolio Service

## Setup

```bash
# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn main:app --reload --port 8000
```

The service runs at http://localhost:8000

Interactive API docs: http://localhost:8000/docs
