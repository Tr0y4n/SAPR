import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import ConstTable from './ConstTable/ConstTable'

function App() {
  return (
    <div>
      <Router>
      <Header />
        <Switch>

          <Route exact path='/'>
          <HomePage />
          </Route>

          <Route path='/pre'>
            <div className="constTable">
            <ConstTable />
            <ConstTable />
            </div>
          </Route>

          <Route path='/pro'>
          <h1>Processor</h1>
          </Route>

          <Route path='/post'>
          <h1>Postprocessor</h1>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
