import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { todoService } from '../services/api';

// Create context
const TodoContext = createContext();

// Initial state
const initialState = {
  todos: [],
  loading: false,
  error: null,
  currentTodo: null
};

// Actions
const TODO_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_CURRENT_TODO: 'SET_CURRENT_TODO',
  SET_ERROR: 'SET_ERROR'
};

// Reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case TODO_ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload, loading: false };
    
    case TODO_ACTIONS.ADD_TODO:
      return { ...state, todos: [action.payload, ...state.todos], loading: false };
    
    case TODO_ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo._id === action.payload._id ? action.payload : todo
        ),
        currentTodo: null,
        loading: false
      };
    
    case TODO_ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
        loading: false
      };
    
    case TODO_ACTIONS.SET_CURRENT_TODO:
      return { ...state, currentTodo: action.payload };
    
    case TODO_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
};

// Provider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Get all todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
// src/context/TodoContext.js (updating the fetchTodos function)
// Fetch all todos
const fetchTodos = async (params = {}) => {
    dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
    try {
      const todos = await todoService.getAll(params);
      dispatch({ type: TODO_ACTIONS.SET_TODOS, payload: todos });
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message });
    }
  };
  // Add todo
  const addTodo = async (todo) => {
    dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
    try {
      const newTodo = await todoService.create(todo);
      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: newTodo });
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Update todo
  const updateTodo = async (id, todoData) => {
    dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
    try {
      const updatedTodo = await todoService.update(id, todoData);
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: updatedTodo });
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true });
    try {
      await todoService.delete(id);
      dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: id });
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Set current todo for editing
  const setCurrentTodo = (todo) => {
    dispatch({ type: TODO_ACTIONS.SET_CURRENT_TODO, payload: todo });
  };

  return (
    <TodoContext.Provider
      value={{
        ...state,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        setCurrentTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the todo context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};