import logo from './logo.svg';
import './App.css';
import { Switch,Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList'
import AddEmployee from './components/AddEmployee'
import TaskList from './components/TaskList'
import Home from './components/home';

function App() {
  return (
    <div className="App">

      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/employee' component={EmployeeList} />
        <Route exact path='/addemployee' component={AddEmployee} />
        <Route exact path='/tasklist' component={TaskList} />

      </Switch>



          {/* <AddEmployee/>
          <EmployeeList />
          <TaskList/> */}
    </div>
  );
}

export default App;
