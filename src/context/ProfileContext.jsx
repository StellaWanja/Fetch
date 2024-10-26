import { createContext, useReducer } from "react";

export const ProfileContext = createContext();

const profileReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_ALBUMS":
      return {
        ...state,
        albums: action.payload,
      };
    case "SET_PHOTOS":
      return {
        ...state,
        photos: action.payload,
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  users: [],
  albums: [],
  photos: null,
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
