import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Calendar from './Calendar';
import EventDetail from './EventDetail';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const localizer = momentLocalizer(moment);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/event/:id" component={EventDetail} />
      </Switch>
    </Router>
  );
};

export default App;