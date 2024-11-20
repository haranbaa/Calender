import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  return <h1>Nothing to see here: {id}</h1>;
};

export default EventDetails;
