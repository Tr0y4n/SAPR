import React from 'react';
import './App.css';
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
      <Header />
        <Switch>
          <Route path='/pre'>
            <h1>AAAA</h1>
          </Route>
          <Route path='/pro'></Route>
          <Route path='/post'></Route>
        </Switch>
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
