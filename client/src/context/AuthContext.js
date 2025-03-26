import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';

// Create context
const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

// Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL',
  USER_LOADED: 'USER_LOADED',
  AUTH_ERROR: 'AUTH_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_PROFILE_START: 'UPDATE_PROFILE_START',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAIL: 'UPDATE_PROFILE_FAIL',
  DELETE_ACCOUNT_START: 'DELETE_ACCOUNT_START',
  DELETE_ACCOUNT_SUCCESS: 'DELETE_ACCOUNT_SUCCESS',
  DELETE_ACCOUNT_FAIL: 'DELETE_ACCOUNT_FAIL'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
    case AUTH_ACTIONS.UPDATE_PROFILE_START:
    case AUTH_ACTIONS.DELETE_ACCOUNT_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    
    case AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_FAIL:
    case AUTH_ACTIONS.REGISTER_FAIL:
    case AUTH_ACTIONS.AUTH_ERROR:
    case AUTH_ACTIONS.UPDATE_PROFILE_FAIL:
    case AUTH_ACTIONS.DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case AUTH_ACTIONS.LOGOUT:
    case AUTH_ACTIONS.DELETE_ACCOUNT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on initial load or token change
  useEffect(() => {
    if (state.token) {
      loadUser();
    }
  }, [state.token]);

  // Load user
  const loadUser = async () => {
    try {
      const response = await api.get('/users/me');
      dispatch({ type: AUTH_ACTIONS.USER_LOADED, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.AUTH_ERROR, payload: error.message });
    }
  };

  // Register user
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    
    try {
      const response = await api.post('/users/register', userData);
      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAIL,
        payload: error.message
      });
    }
  };

  // Login user
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const response = await api.post('/users/login', { email, password });
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAIL,
        payload: error.message
      });
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.UPDATE_PROFILE_START });
    
    try {
      const response = await api.put('/users/profile', userData);
      dispatch({
        type: AUTH_ACTIONS.UPDATE_PROFILE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.UPDATE_PROFILE_FAIL,
        payload: error.message
      });
      throw error;
    }
  };

  // Delete user account
  const deleteAccount = async () => {
    dispatch({ type: AUTH_ACTIONS.DELETE_ACCOUNT_START });
    
    try {
      await api.delete('/users/account');
      dispatch({ type: AUTH_ACTIONS.DELETE_ACCOUNT_SUCCESS });
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.DELETE_ACCOUNT_FAIL,
        payload: error.message
      });
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        clearError,
        updateProfile,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};