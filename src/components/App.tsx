import React, {useState, useRef} from 'react'
import Alert from 'react-bootstrap/Alert'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import Konva from './Konva/Konva'
import RodsTable from './RodsTable/RodsTable'
import LoadsTable from './LoadsTable/LoadsTable'
import FileUpload from '../fileupload'

interface RodsData {
  i: number; 
  L: number;  
  A: number; 
  E: number; 
  S: number; 
  q: number; 
}

interface LoadsData {
  n: number;
  F: number;
  Z: number;
}

function App() {

  const [dataRods, setDataRods] = useState<Array<RodsData>>([])
  const changeDataRods = (data: Array<RodsData>) => {setDataRods(data)}
  const [dataLoads, setDataLoads] = useState<Array<LoadsData>>([])
  const changeDataLoads = (data: Array<LoadsData>) => {setDataLoads(data)}

  let errorSource: string = '';
  let areRodsOk: boolean = true; 
  for (let j: number = 1; j <= dataRods.length; j++) {
    let isOK = dataRods.find((val) => val.i === j);
    if (!isOK) {
     areRodsOk = false;
     errorSource = 'стержней';
     break;
    }
  };

  let areLoadsOk: boolean = true;  
  const indexL: number = dataLoads.length - 1;
  const indexR: number = dataRods.length - 1;
  if (indexL >= 0) {
  if (dataLoads[indexL].n < dataRods[0].i || dataLoads[indexL].n > (dataRods[indexR].i + 1)) {
    areLoadsOk = false;
    errorSource = 'узлов';
  }
};

let areSupportsOk: boolean = true;
for (let j: number = 0; j < dataLoads.length; j++) {
  if (!isNaN(dataLoads[j].Z) && dataLoads[j].n !== 1) {
     if (dataLoads[j].n !== (dataRods.length + 1)) {
    console.log("dataLoads[j].n = " + dataLoads[j].n);
    areSupportsOk = false;
    errorSource = "опор";
   }
  }
 }

  return (
    <div>
      <Router>
      <Header />
        <Switch>

          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route path='/preprocessor'>
          <div className="App">
      <FileUpload />
    </div >
          </Route>

          <Route path='/processor'>
            <h1>Processor</h1>
          </Route>

          <Route path='/postprocessor'>
            <h1>Postprocessor</h1>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;