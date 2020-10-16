import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import ConstTable from './ConstTable/ConstTable'
import LoadsTable from './LoadsTable/LoadsTable'

interface RodsData {
  i: number; 
  L: number;  
  A: number; 
  E: number; 
  S: number; 
  q: number; 
}

function App() {
  const [dataRods, setDataRods] = useState<Array<RodsData>>([])
  const changeDataRods = (data: Array<RodsData>) => {setDataRods(data)}
  const [dataLoads, setDataLoads] = useState<Array<Object>>([])
  const changeDataLoads = (data: Array<Object>) => {setDataLoads(data)}

  return (
    <div>
      <Router>
      <Header />
        <Switch>

          <Route exact path='/'>
          <HomePage />
          </Route>

          <Route path='/pre'>
            <div className="constTable margin">
            <ConstTable data={dataRods}  setData={changeDataRods} />
            <LoadsTable data={dataLoads} setData={changeDataLoads}/>
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
