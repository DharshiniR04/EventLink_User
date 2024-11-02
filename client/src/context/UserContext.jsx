import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const SelectedUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user,setUser}}>
      {children}
    </UserContext.Provider>
  );
};