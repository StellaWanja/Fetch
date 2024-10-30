import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext();

// reducer function
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
    case "UPDATE_PHOTO_TITLE":
      return {
        ...state,
        photos: state.photos.map((photo) => {
          if (photo.id === action.payload.id) {
            return { ...photo, title: action.payload.title };
          }
          return photo;
        }),
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  users: [],
  albums: [],
  photos: [],
};

// context provider
export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

