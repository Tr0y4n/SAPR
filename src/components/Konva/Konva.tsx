import React, { useState } from 'react'
import {Stage, Layer, Rect, Arrow} from 'react-konva'
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

interface Data {
  dataRods: Array<RodsData>;
  dataLoads: Array<LoadsData>;
}

export default function Konva(props: Data) {

  return (
    <div className="Canvas">
    {props.dataRods ? props.dataRods.map((info) => (
      <Stage width={info.L} height={info.A + 40}>
        <Layer>
          <Rect x={0} y={0} width={info.L} height={info.A} stroke="black" />
        </Layer>
      </Stage>
      ))
    : null}
    </div> 
    )
}