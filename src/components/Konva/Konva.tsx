import React from 'react'
import {Stage, Layer, Rect} from 'react-konva'
import "./Konva.css"

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

export default function Konva(props: Data) {
    return (
    <div className="Canvas">
    {props.data ? props.data.map((info) => (
      <Stage width={info.L} height={info.A * 5}>
        <Layer>
          <Rect x={0} y={70} width={info.L} height={info.A} stroke="black" />
        </Layer>
      </Stage>
    ))
    : null}
    </div>
    )
}