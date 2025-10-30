import React, { useState } from 'react';

const Section = ({ sectionId, section, onUrlAdded, onUrlDeleted }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3001/api/sections/${sectionId}/urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add URL');
      }

      // Reset form and notify parent
      setFormData({ title: '', description: '', link: '' });
      setShowForm(false);
      onUrlAdded();
    } catch (error) {
      console.error('Error adding URL:', error);
      alert('Failed to add URL. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (urlIndex) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/sections/${sectionId}/urls/${urlIndex}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete URL');
      }

      onUrlDeleted();
    } catch (error) {
      console.error('Error deleting URL:', error);
      alert('Failed to delete URL. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', link: '' });
    setShowForm(false);
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>
          <span className="icon">{section.icon}</span>
          {section.name}
        </h2>
        <p>{section.description}</p>
      </div>

      <div className="url-list">
        {section.urls && section.urls.length > 0 ? (
          section.urls.map((url, index) => (
            <div key={index} className="url-item">
              <div className="url-content">
                <h3>{url.title}</h3>
                <p>{url.description}</p>
                <a href={url.link} target="_blank" rel="noopener noreferrer">
                  {url.link}
                </a>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="no-urls">No URLs added yet</div>
        )}
      </div>

      {!showForm ? (
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add URL
        </button>
      ) : (
        <div className="add-url-section">
          <h3>Add New URL</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor={`title-${sectionId}`}>Title *</label>
              <input
                type="text"
                id={`title-${sectionId}`}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter video/resource title"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`description-${sectionId}`}>Description *</label>
              <textarea
                id={`description-${sectionId}`}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Enter description of what this training covers"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`link-${sectionId}`}>Link *</label>
              <input
                type="url"
                id={`link-${sectionId}`}
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/video"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add URL'}
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Section;
