import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import Konva from './Konva/Konva'
import RodsTable from './RodsTable/RodsTable'
import LoadsTable from './LoadsTable/LoadsTable'
import { info } from 'console'


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

  let areRodsOk: boolean = true; 
  for (let j: number = 1; j <= dataRods.length; j++) {
    let isOK = dataRods.find((val) => val.i === j);
    if (!isOK) {
     areRodsOk = false;
     break;
    }
  };

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
              {areRodsOk ?
              <Konva data={dataRods} />
              : (
                <Alert variant='danger'>
                  <Alert.Heading>Ошибка!</Alert.Heading>
                  <p>Неправильная нумерация стержней!</p>
                </Alert>)}
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
