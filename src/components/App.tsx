import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
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

interface LoadsData {
  n: number;
  F: number;
  Z: number;
}

function App() {
  const [dataRods, setDataRods] = useState<Array<RodsData>>([{i: 1, L: 400, A: 50, E: 1, S: 1, q: 1},
    {i: 2, L: 200, A: 100, E: 1, S: 1, q: 0},
    {i: 3, L: 300, A: 150, E: 1, S: 1, q: 0}, {i: 4, L: 100, A: 50, E: 1, S: 1, q: 0},])
  const changeDataRods = (data: Array<RodsData>) => {setDataRods(data)}
  const [dataLoads, setDataLoads] = useState<Array<LoadsData>>([{n: 1, Z: 1, F: 0}])
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

 console.log(dataLoads[dataLoads.length - 1].Z);
  return (
    <div>
      <Router>
      <Header />
        <Switch>

          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route path='/preprocessor'>
            <div className="Preprocessor">
              <div className="tables margin">
                <RodsTable data={dataRods}  setData={changeDataRods}/>
                <LoadsTable data={dataLoads} setData={changeDataLoads}/>
              </div>
              {(areRodsOk && areLoadsOk && areSupportsOk)?
              <Konva dataRods={dataRods} dataLoads={dataLoads} />
              : (
                <Alert variant='danger'>
                  <Alert.Heading>Ошибка!</Alert.Heading>
                  <p>Неправильная нумерация {errorSource}!</p>
                </Alert>)}
            </div>
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