import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EventDetails from './components/EventDetails';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function App() {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const myView = useMemo(
    () => ({
      calendar: { type: 'month' },
    }),
    [],
  );

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const addDemoEvents = () => {
    const demoEvents = [
      { id: 1, start: new Date(2024, 10, 20, 9, 0), end: new Date(2024, 10, 20, 10, 0), title: 'Product Team Meeting', color: '#ff4500' },
      { id: 2, start: new Date(2024, 10, 21, 12, 0), end: new Date(2024, 10, 21, 13, 0), title: 'Stakeholder Meeting', color: '#008000' },
      { id: 3, start: new Date(2024, 10, 22, 15, 0), end: new Date(2024, 10, 22, 16, 0), title: 'Lunch @ Butcher\'s', color: '#1e90ff' },
      { id: 4, start: new Date(2024, 10, 20), end: new Date(2024, 10, 22), title: 'Multi-day Conference', color: '#ff69b4', allDay: true },
    ];
    setEvents(demoEvents);
  };

  useEffect(() => {
    // Load initial events (can be from API)
    addDemoEvents();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={
          <>
            <Calendar
              localizer={localizer}
              events={myEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleEventClick}
            />

            {isPopupOpen && selectedEvent && (
              <div className="popup">
                <h3>{selectedEvent.title}</h3>
                <p>
                  <strong>Start:</strong> {selectedEvent.start.toString()}
                </p>
                <p>
                  <strong>End:</strong> {selectedEvent.end.toString()}
                </p>
                <button onClick={closePopup}>Close</button>
              </div>
            )}

            {isToastOpen && (
              <div className="toast">
                {toastMessage}
                <button onClick={handleToastClose}>Close</button>
              </div>
            )}
          </>
        } />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;