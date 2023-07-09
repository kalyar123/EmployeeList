import React, { useEffect } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Header from './Header';

// Action Types
const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

// Action Creators
const fetchEmployeesRequest = () => ({
  type: FETCH_EMPLOYEES_REQUEST,
});

const fetchEmployeesSuccess = employees => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

const fetchEmployeesFailure = error => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error,
});

const fetchEmployees = () => {
  return dispatch => {
    dispatch(fetchEmployeesRequest());
    axios
      .get('https://641b1f8e1f5d999a445bf904.mockapi.io/Employee')
      .then(response => {
        const employees = response.data;
        dispatch(fetchEmployeesSuccess(employees));
      })
      .catch(error => {
        dispatch(fetchEmployeesFailure(error.message));
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
    case FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        isLoading: false,
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// EmployeeList Component
const EmployeeList = () => {
  const employees = useSelector(state => state.employees);
  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <Header/>
      <br></br>
      <h1>Employee List</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (

        <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>

                    <th>Created At</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Department</th>
                    <th>Id</th>
                   
                  </tr>
                </thead>
                <tbody>

                  {employees.map((employee)=>
                   <tr key={employee.id}>
                  
                   <td>{employee.createdAt}</td>
                   <td>{employee.name}</td>
                   <td>{employee.salary}</td>
                   <td>{employee.department}</td>
                   <td>{employee.id}</td>

                 </tr>

                  )}
                
                </tbody>
              </table>
            </div>

            <div>
    </div>
          </div>
        </div>
      </div>


      )}
    </div>
  );
};

const store = createStore(employeeReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <EmployeeList />
    </Provider>
  );
}
