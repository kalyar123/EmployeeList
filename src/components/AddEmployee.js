import React, { useState } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Header from './Header';

// Action Types
const ADD_EMPLOYEE_REQUEST = 'ADD_EMPLOYEE_REQUEST';
const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
const ADD_EMPLOYEE_FAILURE = 'ADD_EMPLOYEE_FAILURE';

// Action Creators
const addEmployeeRequest = () => ({
  type: ADD_EMPLOYEE_REQUEST,
});

const addEmployeeSuccess = employee => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload: employee,
});

const addEmployeeFailure = error => ({
  type: ADD_EMPLOYEE_FAILURE,
  payload: error,
});

const addEmployee = employee => {
  return dispatch => {
    dispatch(addEmployeeRequest());
    axios
      .post('https://641b1f8e1f5d999a445bf904.mockapi.io/Employee', employee)
      .then(response => {
        const newEmployee = response.data;
        dispatch(addEmployeeSuccess(newEmployee));
      })
      .catch(error => {
        dispatch(addEmployeeFailure(error.message));
      });
  };
};

// Reducer
const initialState = {
  employees: [],
  isLoading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        isLoading: false,
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');

  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const employee = {
      name,
      createdAt,
      salary,
      department,
      id: Date.now().toString(), // Generate a unique ID (using timestamp in this example)
    };
    dispatch(addEmployee(employee));
    setName('');
    setCreatedAt('');
    setSalary('');
    setDepartment('');
  };

  return (
    <div>
      <Header/>
      <br></br>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="createdAt" className="form-label">
            Created At
          </label>
          <input
            type="text"
            id="createdAt"
            className="form-control"
            value={createdAt}
            onChange={e => setCreatedAt(e.target.value)}
            placeholder="Created At"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            id="salary"
            className="form-control"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            placeholder="Salary"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            type="text"
            id="department"
            className="form-control"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            placeholder="Department"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

const store = createStore(employeeReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <AddEmployee />
    </Provider>
  );
}
