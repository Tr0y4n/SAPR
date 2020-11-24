import React from 'react'
import { range } from 'lodash'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts'
import './Epurs.css'

export default function EpurU(props) {
    const rodsLength = props.dataRods.map((val) => val.L);
    const solution = props.solution;
    const points = [];
    if (solution) {
        let sumLen = 0;
        rodsLength.forEach((val, ind) => {
            for (let i of range(0, val + 0.01, 0.01)) {
                i = Number(i.toFixed(2))
                const point = {
                    name: `${Number( (i + sumLen).toFixed(2))}`,
                    uv: solution.U[ind](i),
                    pv: 1000, 
                    amt: 1000,
                };
                 points.push(point);
            }
            sumLen += val;
        });
    }

    return (
        <div>
       <h2 className='marg'>Эпюра U(x): </h2>
       <div className="eps">
       <AreaChart
        width={765}
        height={400}
        data={points}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Label value="Эпюра N(x)" offset={0} position="insideBottom" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#7504d8" />
      </AreaChart>
    </div>
    </div>
    );
};
