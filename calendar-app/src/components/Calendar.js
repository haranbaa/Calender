import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, addDays, addMonths } from 'date-fns';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [events, setEvents] = useState([
    { id: 1, date: '2024-11-20', title: 'Meeting with Team' },
    { id: 2, date: '2024-11-22', title: 'Doctor Appointment' },
  ]);

  // Generate dates for the current month
  useEffect(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
      days.push(day);
    }
    setDates(days);
  }, [currentMonth]);

  // Filter events for the current month
  const filteredEvents = events.filter(
    (event) => format(new Date(event.date), 'yyyy-MM') === format(currentMonth, 'yyyy-MM')
  );

  return (
    <div>
      <h1>{format(currentMonth, 'MMMM yyyy')}</h1>

      {/* Month navigation */}
      <div>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
          Previous
        </button>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '300px' }}>
        {dates.map((date, index) => (
          <div
            key={index}
            style={{
              border: '1px solid gray',
              margin: '2px',
              padding: '10px',
              textAlign: 'center',
              width: '40px',
            }}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>

      {/* Event List */}
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
