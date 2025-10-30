import React, { useState, useEffect } from 'react';
import Section from './Section';

function App() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSections = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sections');
      if (!response.ok) {
        throw new Error('Failed to fetch sections');
      }
      const data = await response.json();
      setSections(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching sections:', err);
      setError('Failed to load sections. Make sure the backend server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleUrlAdded = () => {
    fetchSections();
  };

  const handleUrlDeleted = () => {
    fetchSections();
  };

  if (loading) {
    return (
      <div className="app-container">
        <header>
          <h1>🎓 FSTA Admin Panel</h1>
          <p>URL Management System</p>
        </header>
        <div className="loading">Loading sections...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <header>
          <h1>🎓 FSTA Admin Panel</h1>
          <p>URL Management System</p>
        </header>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>🎓 FSTA Admin Panel</h1>
        <p>URL Management System - Add, edit, and remove training resources</p>
      </header>

      <div className="sections-container">
        {Object.entries(sections).map(([sectionId, section]) => (
          <Section
            key={sectionId}
            sectionId={sectionId}
            section={section}
            onUrlAdded={handleUrlAdded}
            onUrlDeleted={handleUrlDeleted}
          />
        ))}
      </div>

      <footer>
        <p>&copy; 2025 Flagstone South Therapy Academy | Admin Interface</p>
      </footer>
    </div>
  );
}

export default App;
