import React from 'react'
import {Stage, Layer, Rect, Arrow, Line} from 'react-konva'
import "./Konva.css"

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

interface Coord {
  x: number;
  y: number;
}

interface Data {
  dataRods: Array<RodsData>;
  dataLoads: Array<LoadsData>;
}

export default function Konva(props: Data) {

  const coord: Array<Coord> = [];
  let startPoint: number = 50;

  const windowWidth = props.dataRods.map((val) => val.L * 100).reduce((prev, curr) => prev + curr, 0);
  const windowHeight = (props.dataRods.map((val) => val.A * 60).sort((a, b) => a - b).pop() || 0);

  return (
    <div className="Canvas">
      <Stage width={windowWidth + 100} height={windowHeight + 20}>
        <Layer>
        {props.dataLoads ? props.dataLoads.map((val) => {
           const lines: Array<any> = [];
           if (val.Z === 1 && val.n === 1) {
            for (let i: number = (windowHeight / 2) - (props.dataRods[0].A * 60 / 2); i - 41 < props.dataRods[0].A * 60 + 1; i += props.dataRods[0].A * 60 / 5){
              const line = <Line points={[startPoint, i, startPoint - 40, i + 20]} strokeWidth={6} fill="black" stroke="black" /> 
              lines.push(line);
            }
          }
          return lines;
          }) : null}  

          {props.dataRods ? props.dataRods.map((info, ind) => {
          const arrows: Array<any> = [];
          const rect = <Rect x={startPoint} y={(windowHeight / 2) - (info.A * 60 / 2)} width={info.L * 100} height={info.A * 60} stroke="black" />;
          coord.push({x: startPoint, y: windowHeight / 2});
          if (ind === props.dataRods.length - 1) {
            coord.push({x: startPoint + info.L * 100, y: windowHeight / 2});}
          startPoint += info.L * 100;

          if (info.q > 0) {
            ///////
            for (let i: number = startPoint; i < startPoint + 1 + info.L * 90; i += 50){
            const arrow = <Arrow points={[i - info.L * 100, windowHeight / 2, i - info.L * 100 + 20, windowHeight / 2, i - info.L * 100 + 40, windowHeight / 2]} strokeWidth={5} stroke="blue" fill="blue" />
            arrows.push(arrow);
            }
          } else if (info.q < 0) {
            ///////
            for (let i: number = startPoint + info.L * 100; i > startPoint; i -= 50) {
              const arrow = <Arrow points={[i - info.L * 100, windowHeight / 2, i - info.L * 100 - 20, windowHeight / 2, i - info.L * 100 - 40, windowHeight / 2]} strokeWidth={5} stroke="blue" fill="blue" />
              arrows.push(arrow);
          }}
          return [rect, ...arrows];
        }): null}
        
        {props.dataLoads ? props.dataLoads.map((val) => {
           if (val.F > 0) {
            return (
                <Arrow points={[coord[val.n-1].x, coord[val.n-1].y, coord[val.n-1].x + 40, coord[val.n-1].y]} strokeWidth={9} opacity={0.7} fill="red" stroke="red" />
            )} else if (val.F < 0) {
            return (
                <Arrow points={[coord[val.n-1].x, coord[val.n-1].y, coord[val.n-1].x - 40, coord[val.n-1].y,]} strokeWidth={9} opacity={0.7} fill="red" stroke="red" />
            )} else {return null};
            }) : null}

          {props.dataLoads ? props.dataLoads.map((val) => {
           const lines: Array<any> = [];
           const lastC = coord.length - 1;
           const lastR = props.dataRods.length - 1;
           if (val.Z === 1 && val.n !== 1) {
            for (let i: number = (windowHeight / 2) - (props.dataRods[lastR].A * 60 / 2); i - 10 < (windowHeight / 2) + (props.dataRods[lastR].A * 60 / 2); i += props.dataRods[lastR].A * 60 / 5){
              const line = <Line points={[coord[lastC].x, i, coord[lastC].x + 40, i - 20]} strokeWidth={6} fill="black" stroke="black" /> 
              lines.push(line);
            }
          }
          return lines;
          }) : null}  
        </Layer>
      </Stage>
    </div> 
    )
}