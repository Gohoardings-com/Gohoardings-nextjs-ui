import React, { useState,createContext, useReducer } from 'react';

export const AccountContext = createContext();

const initialState = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCR':
      return state + 1;
    case 'DECR':
      return state > 0 ? state - 1 : state;
    default:
      return state;
  }
};

export const AccountProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addRemove = (action) => dispatch(action);

  return (
    <AccountContext.Provider value={{ state, addRemove,show, handleClose, handleShow }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider