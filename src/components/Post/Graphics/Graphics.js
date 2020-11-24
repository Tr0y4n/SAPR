import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import '../Post.css'
import './Graphics.css'
import { range } from 'lodash'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function Graphics(props) {
    const rodsIndex = props.dataRods.map((val) => val.i);
    const [rod, setRod] = useState(1);
    
    const handleChange = (event) => {
        setRod(Number(event.target.value));
    };

    const solution = props.solution;
    const len = props.dataRods[rod - 1].L;
    const Nx = solution?.N[rod - 1];
    const dataN = [];

    if (Nx) {
        for (let i of range(0, len + 0.1, 0.1)) {
            const point = {
                name: `${Number(i.toFixed(1))}`,
                uv: Nx(i),
                pv: 1000, 
                amt: 1000,
            };
            dataN.push(point);
        }
    }

    const Ux = solution?.U[rod - 1];
    const dataU = [];
    if (Ux) {
        for (let i of range(0, len + 0.01, 0.01)) {
            const point = {
                name: `${Number(i.toFixed(1))}`,
                uv: Ux(i),
                pv: 1000, 
                amt: 1000,
            };
            dataU.push(point);
        }
    }

    const Sx = solution?.S[rod - 1];
    const dataS = [];
    if (Sx) {
        for (let i of range(0, len + 0.1, 0.1)) {
            const point = {
                name: `${Number(i.toFixed(1))}`,
                uv: Sx(i),
                pv: 1000, 
                amt: 1000,
            };
            dataS.push(point);
        }
    }

    return (
        <div className='rodPlots'>
            <FormControl>
                <div className="row">
                <h4 className="mrgr">Выберите стержень: </h4>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={rod}
                    onChange={handleChange}>
                    {rodsIndex.map((val) => (
                        <MenuItem value={val}>{val}</MenuItem>
                    ))}
                </Select>
                </div>
            </FormControl>
            {props.solution?.N[rod - 1] &&
            props.solution?.N[rod - 1] ? (
                <div className='fieldG'>
                    <div>
       <h2 className='marg'>График N(x): </h2>
       <div className="eps">
       <AreaChart
        width={500}
        height={400}
        data={dataN}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#7504d8" />
      </AreaChart>
    </div>
    </div>
    <div>
    <h2 className='marg'>График U(x): </h2> 
    <AreaChart
        width={500}
        height={400}
        data={dataU}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#7504d8" />
      </AreaChart>
      </div>

      <div>
    <h2 className='marg'>График S(x): </h2> 
    <AreaChart
        width={500}
        height={400}
        data={dataS}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#7504d8" />
      </AreaChart>
      </div>



                </div>
            ) : null}
        </div>
    );
};