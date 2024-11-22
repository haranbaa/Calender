import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AgendaView = ({ addEventToCalendar }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleAddEvent = () => {
    if (!title || !start || !end) {
      alert('Please fill in all fields.');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title,
      start: new Date(start),
      end: new Date(end),
    };

    addEventToCalendar(newEvent);
    setTitle('');
    setStart('');
    setEnd('');
    alert('Event added!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Agenda View</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button
          onClick={handleAddEvent}
          style={{
            padding: '10px 20px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Event
        </button>
        <Link
          to="/calendar"
          style={{
            padding: '10px 20px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Back to Calendar
        </Link>
      </div>
    </div>
  );
};

export default AgendaView;
