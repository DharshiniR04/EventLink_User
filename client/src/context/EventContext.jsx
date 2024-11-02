import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const SelectedEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [eventSelect, setEvent] = useState(null);

  return (
    <EventContext.Provider value={{eventSelect,setEvent}}>
      {children}
    </EventContext.Provider>
  );
};