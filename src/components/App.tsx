import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import Konva from './Konva/Konva'
import RodsTable from './RodsTable/RodsTable'
import LoadsTable from './LoadsTable/LoadsTable'

interface RodsData {
  i: number; 
  L: number;  
  A: number; 
  E: number; 
  S: number; 
  q: number; 
}

interface Data {
	data: Array<RodsData>;
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
            <div className="Preprocessor">
              <div className="tables margin">
                <RodsTable data={dataRods}  setData={changeDataRods}/>
                <LoadsTable data={dataLoads} setData={changeDataLoads}/>
              </div>
              <Konva data={dataRods} />
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
