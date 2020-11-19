import React, {useState, useRef} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import Konva from './Konva/Konva'
import RodsTable from './RodsTable/RodsTable'
import LoadsTable from './LoadsTable/LoadsTable';
import Processing from './Processor/Processing'
import Button from 'react-bootstrap/Button'


function App() {

  const [dataRods, setDataRods] = useState([]);
  const changeDataRods = (data) => {setDataRods(data)}
 
  const [dataLoads, setDataLoads] = useState([]);
  const changeDataLoads = (data) => {setDataLoads(data)}

  let errorSource = '';
  let areRodsOk = true; 
  for (let j = 1; j <= dataRods.length; j++) {
    let isOK = dataRods.find((val) => val.i === j);
    if (!isOK) {
     areRodsOk = false;
     errorSource = 'стержней';
     break;
    }
  };

  let areLoadsOk = true;  
  const indexL = dataLoads.length - 1;
  const indexR = dataRods.length - 1;
  if (indexL >= 0) {
  if (dataLoads[indexL].n < dataRods[0].i || dataLoads[indexL].n > (dataRods[indexR].i + 1)) {
    areLoadsOk = false;
    errorSource = 'узлов';
  }
};

let areSupportsOk = true;
for (let j = 0; j < dataLoads.length; j++) {
  if (dataLoads[j].Z === 1 && dataLoads[j].n !== 1) {
     if (dataLoads[j].n !== (dataRods.length + 1)) {
    areSupportsOk = false;
    errorSource = "опор";
   }
  }
 }




  const [isFileOK, setIsFileOk] = useState(true);
  const [file, setFile] = useState(''); // storing the uploaded file    
    // storing the recived file from backend
    const [info, getFile] = useState({content: "", name: ""});    
    const [progress, setProgess] = useState('0'); // progess bar
    const el = useRef(); // accesing input element

    const handleChange = (e) => {
        setProgess('0')
        const file = e.target.files[0]; // accesing file
       
        setFile(file); // storing file
        
    }

    const uploadFile = () => {
      setIsFileOk(true);
      if (file.name.slice(-4) === '.kpr') {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            getFile({ 
                     content: JSON.parse(res.data.state),
                     name: res.data.name
                   })
            const prepared = JSON.parse(res.data.state);
            setDataRods(prepared.RodsTable);
            setDataLoads(prepared.LoadsTable);
        }).catch(err => console.log(err))
      } else {
        setIsFileOk(false);
      }}

      console.log("KAIF ", info.content);

      const handlePro = () => {
        Processing(dataRods, dataLoads);
        console.log("dataRods: ", dataRods);
        console.log("dataLoads: ", dataLoads);
      }

  return (
    <div>
      <Router>                       
      <Header dr={dataRods} dl={dataLoads} />
        <Switch>

          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route path='/preprocessor'>
          <div className="Preprocessor">
          <div className="tables margin">
                <RodsTable data={dataRods} setData={changeDataRods}/>
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
            <div className="middle">
            <h1>Processor</h1>
            <Button onClick={handlePro} variant="primary">
            Рассчитать
        </Button>
        </div>
          </Route>

          <Route path='/postprocessor'>
            <h1>Postprocessor</h1>
          </Route>

          <Route path='/uploading'>
          <div className="margin">
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} /> 
                  <div className="progessBar" style={{ width: progress }}>
                   {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">                   
                Upload
                </button>
            </div>
        </div>
        {!isFileOK?(<Alert variant='danger'>
                  <Alert.Heading>Ошибка!</Alert.Heading>
                  <p>Неправильный формат файла</p>
                </Alert>
                ):(<div></div>)}
          </Route>
          


        </Switch>
      </Router>
    </div>
  )
  }

export default App;