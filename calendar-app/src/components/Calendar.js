import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, addDays, addMonths } from 'date-fns';
import { Link } from 'react-router-dom';
import './Calendar.css'; // Add this if you have a CSS file for styles

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [events, setEvents] = useState([
    { id: 1, date: '2024-11-20', title: 'Meeting with Team' },
    { id: 2, date: '2024-11-22', title: 'Doctor Appointment' },
  ]);

  useEffect(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
      days.push(day);
    }
    setDates(days);
  }, [currentMonth]);

  const filteredEvents = events.filter(
    (event) => format(new Date(event.date), 'yyyy-MM') === format(currentMonth, 'yyyy-MM')
  );

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>{format(currentMonth, 'MMMM yyyy')}</h1>

      {/* Month Navigation Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
          }}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          style={{
            padding: '10px 20px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
          }}
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '80%', margin: '0 auto' }}>
        {dates.map((date, index) => (
          <div
            key={index}
            style={{
              border: '1px solid gray',
              margin: '2px',
              padding: '10px',
              textAlign: 'center',
              width: '40px',
              height: '40px',
            }}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>

      {/* Event List */}
      <ul style={{ listStyleType: 'none', marginTop: '20px' }}>
        {filteredEvents.map((event) => (
          <li key={event.id} style={{ marginBottom: '10px' }}>
            <Link
              to={`/event/${event.id}`}
              style={{
                color: '#000',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
