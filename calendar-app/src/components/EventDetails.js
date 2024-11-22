import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = ({ events }) => {
  const { id } = useParams();
  const event = events.find((event) => event.id.toString() === id);

  if (!event) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Event not found</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>{event.title}</h1>
      <p>Date: {event.date}</p>
      <p>Description: {event.description || 'No description available.'}</p>
      <button
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '5px',
          border: 'none',
        }}
        onClick={() => window.history.back()}
      >
        Back to Calendar
      </button>
    </div>
  );
};

export default EventDetails;
