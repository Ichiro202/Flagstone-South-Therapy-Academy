# Flagstone South Therapy Academy - URL Management System

This repository contains both the backend API and frontend admin interface for managing training URLs for the Flagstone South Therapy Academy.

## Project Structure

```
.
├── backend/              # Node.js/Express backend API
│   ├── server.js        # Main server file with API endpoints
│   ├── sections.json    # Data storage for sections and URLs
│   ├── package.json     # Backend dependencies
│   └── .gitignore       # Backend ignored files
├── src/                 # React frontend application
│   ├── App.js           # Main React component
│   ├── Section.js       # Section component for managing URLs
│   ├── index.js         # React entry point
│   └── index.css        # Application styles
├── public/              # Public assets for React app
│   └── index.html       # HTML template
├── package.json         # Frontend dependencies
└── README.md           # This file
```

## Features

### Backend API

The backend provides a RESTful API for managing training sections and URLs:

- **GET /api/sections** - Retrieve all sections with their URLs
- **POST /api/sections/:sectionId/urls** - Add a new URL to a section
- **DELETE /api/sections/:sectionId/urls/:urlIndex** - Remove a URL from a section

### Frontend Admin Interface

The React-based admin interface provides:

- View all training sections (Students, Therapists, OneClinical, Documentation, Culture, Leadership)
- Add new URLs to any section with title, description, and link
- Delete existing URLs from sections
- Clean, responsive UI matching the existing FSTA design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   The backend will start on `http://localhost:3001`

### Frontend Setup

1. From the project root directory, install dependencies:
   ```bash
   npm install
   ```

2. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## Usage

1. **Start both servers**: Make sure both the backend (port 3001) and frontend (port 3000) are running.

2. **Access the admin interface**: Open your browser to `http://localhost:3000`

3. **Add URLs**: 
   - Click the "+ Add URL" button for any section
   - Fill in the title, description, and link
   - Click "Add URL" to save

4. **Delete URLs**:
   - Click the "Delete" button next to any URL
   - Confirm the deletion in the dialog

5. **Changes persist**: All changes are saved to `backend/sections.json` and will persist across server restarts.

## API Examples

### Get all sections
```bash
curl http://localhost:3001/api/sections
```

### Add a URL to a section
```bash
curl -X POST http://localhost:3001/api/sections/students/urls \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to Clinical Practice",
    "description": "Essential guidelines for student interns",
    "link": "https://www.example.com/video"
  }'
```

### Delete a URL from a section
```bash
curl -X DELETE http://localhost:3001/api/sections/students/urls/0
```

## Data Structure

The `sections.json` file contains data in the following format:

```json
{
  "sectionId": {
    "name": "Section Name",
    "icon": "📚",
    "description": "Section description",
    "urls": [
      {
        "title": "Video Title",
        "description": "Video description",
        "link": "https://example.com/video"
      }
    ]
  }
}
```

## Available Sections

- **students** - Training materials for student interns and observers
- **new-therapists** - Onboarding and foundational training for newly hired therapists
- **therapists** - Continuing education and advanced training for experienced therapists
- **oneclinical** - Platform-specific training for the OneClinical system
- **documentation** - Best practices for clinical documentation and record-keeping
- **culture** - Company culture, values, and team development
- **leadership** - Developing leadership skills and management excellence

## Production Build

To create a production build of the frontend:

```bash
npm run build
```

The optimized build will be created in the `build/` directory and can be served with any static file server.

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS middleware
- File-based JSON storage

### Frontend
- React 18
- React Scripts
- CSS3
- Fetch API for backend communication

## License

ISC
