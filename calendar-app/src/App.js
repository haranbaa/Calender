import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import EventDetails from './components/EventDetails';
import AgendaView from './components/AgendaView';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// Custom Toolbar Component
const CustomToolbar = (props) => {
  const { onNavigate, label } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => onNavigate('TODAY')} style={toolbarButtonStyle}>
          Today
        </button>
        <button onClick={() => onNavigate('PREV')} style={toolbarButtonStyle}>
          Back
        </button>
        <button onClick={() => onNavigate('NEXT')} style={toolbarButtonStyle}>
          Next
        </button>
      </div>
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{label}</span>
      {/* Only show Home and Agenda buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={toolbarButtonStyle}>Home</Link>
        <Link to="/agenda" style={toolbarButtonStyle}>Agenda</Link>
      </div>
    </div>
  );
};

function App() {
  const [myEvents, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const addDemoEvents = () => {
    const demoEvents = [
      { id: 1, start: new Date(2024, 10, 23, 9, 0), end: new Date(2024, 10, 23, 10, 0), title: 'Workout with the boys' },
      { id: 2, start: new Date(2024, 10, 21, 12, 0), end: new Date(2024, 10, 21, 13, 0), title: 'Dinner with Friends' },
      { id: 3, start: new Date(2024, 10, 22, 15, 0), end: new Date(2024, 10, 22, 16, 0), title: 'Restyle My Project' },
      { id: 4, start: new Date(2024, 10, 20), end: new Date(2024, 10, 22), title: 'REACT', allDay: true },
      { id: 5, start: new Date(2024, 10, 25, 10, 0), end: new Date(2024, 10, 25, 11, 0), title: 'Meeting Arcelormittal' },
      { id: 6, start: new Date(2024, 10, 25, 14, 0), end: new Date(2024, 10, 25, 15, 0), title: 'Meeting with Basile' },
    ];
    setEvents(demoEvents);
  };

  useEffect(() => {
    addDemoEvents();
  }, []);

  const addEventToCalendar = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/calendar"
            element={
              <>
                <Calendar
                  localizer={localizer}
                  events={myEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500, marginBottom: '20px' }}
                  onSelectEvent={handleEventClick}
                  components={{
                    toolbar: CustomToolbar, // Use custom toolbar
                  }}
                />

                {isPopupOpen && selectedEvent && (
                  <div className="popup" style={popupStyle}>
                    <h3>{selectedEvent.title}</h3>
                    <p>
                      <strong>Start:</strong> {selectedEvent.start.toString()}
                    </p>
                    <p>
                      <strong>End:</strong> {selectedEvent.end.toString()}
                    </p>
                    <button onClick={closePopup} style={toolbarButtonStyle}>Close</button>
                  </div>
                )}
              </>
            }
          />
          <Route path="/agenda" element={<AgendaView addEventToCalendar={addEventToCalendar} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Reusable Button Style (matches toolbar buttons)
const toolbarButtonStyle = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #ced4da',
  color: '#495057',
  padding: '5px 10px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '14px',
  cursor: 'pointer',
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

export default App;
