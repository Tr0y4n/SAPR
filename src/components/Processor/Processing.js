import { range, isEqual, sortBy, Function } from 'lodash';
import JordanGauss from './JordanGauss';


const Processing = (props)  => {
    const rodsData = props.dataRods;
    const loadsData = props.dataLoads;
    let left = undefined;

    if (!!loadsData){
    for (let i = 0; i < loadsData.length; i++) {
        if (loadsData[i].n === 1 && loadsData[i].Z === 1) {
            left = true;
        }
    }}
    // const checkl = loadsData.forEach((item) => {(item.n === 1 && item.Z === 1) ? left = true : null})
    const right = undefined;
    if (!!loadsData){
    for (let i = 0; i < loadsData.length; i++) {
        if (loadsData[i].n !== 1 && loadsData[i].Z === 1) {
            left = true;
        }
    }}
    //const checkr = loadsData.forEach((item) => {(item.n !== 1 && item.Z === 1) ? left = true : null})
    console.log("left: ", left);
    console.log("right: ", right);
    const rods = rodsData.map((val) => [val.E, val.A, val.L]);
    console.log(`rods: ${rods}`);

    const nodesLoads = [];
    for(let i = 0; i < rodsData.length + 1; i++ ){
        const loadsSum = loadsData
        .filter((val) => val.n === i + 1)
        .map((val) => val.F)
        .reduce((prev, curr) => prev + curr, 0);
        nodesLoads.push(loadsSum);
    }
    console.log(`nodesLoads: ${nodesLoads}`);

    const rodsLoads = rodsData.map((val) => val.q);
    console.log(`rodsLoads: ${rodsLoads}`);

    const matrixA = [];
    for (let i = 0; i < rods.length + 1; i++){
        const append = [];
        for(let j = 0; j < rods.length + 1; j++){
            append.push(0);
        }
        matrixA.push(append);
    }

    const minors = [];

    rods.forEach((rod) => {
        let tempMinor = [];
        for(let i = 0; i < 2; i++){
            tempMinor.push([0,0]);
        }
        tempMinor = tempMinor.map((val, ind) => val.map(() => rod[0] * rod[1] / rod[2]))
        tempMinor[0][1] *= -1;
        tempMinor[1][0] *= -1;
        minors.push(tempMinor);
    });
    console.log('minors:');
    minors.forEach((val) => console.log(val));

    minors.forEach((val, ind) => {
        for (let i of range(ind, ind + 2)) {
            for (let k of range(ind, ind + 2)) {
                if (i === k) {
                    if (i === 0 || i === matrixA.length - 1) {
                        matrixA[i][k] = val[i - ind][k - ind];
                    } else {
                        matrixA[i][k] += val[i - ind][k - ind];
                    }
                } else {
                    matrixA[i][k] = val[i - ind][k - ind];
                }
            }
        }
    });
    console.log(`matrixA(without support): ${matrixA}`);

    if (left) {
        for(let i = 0; i < matrixA.length; i++){
            for(let k = 0; k < matrixA.length; k++){
                if((i !== k) && (i === 0 || k === 0)){
                    matrixA[i][k] = 0;
                }
            }
        }
    }
    if (right) {
        for(let i = 0; i < matrixA.length; i++){
            for(let k = 0; k < matrixA.length; k++){
                if((i !== k) && (i === matrixA.length - 1 || k === matrixA.length - 1)){
                    matrixA[i][k] = 0;
                }
            }
        }
    }
    console.log(`matrixA: `);
    matrixA.forEach((val) => console.log(val));

    const vectorB = [];

    for(let i of range(0, matrixA.length)){
        if((left && i === 0) || (right && i === matrixA.length - 1)){
            vectorB.push(0);
        }
        else if(i !== 0 && i !== matrixA.length - 1){
            vectorB.push(nodesLoads[i] + rodsLoads[i] * (rods[i][2] / 2) + rodsLoads[i - 1] * (rods[i - 1][2] / 2));
        }
        else if (i === 0){
            vectorB.push(nodesLoads[i] + rodsLoads[i] * (rods[i][2] / 2));
        }
        else if (i === matrixA.length - 1){
            vectorB.push(nodesLoads[i] + rodsLoads[i - 1] * (rods[i - 1][2] / 2));
        }

    }
    console.log(`b: ${vectorB}`);

    const deltas = JordanGauss(matrixA, vectorB).map((val) => Number(val.toFixed(4)));

    console.log(`deltas: ${deltas}`);

    const U = [];
    rods.forEach((val, ind) => {
        const Ux = (x) => ((1- x / val[2]) * deltas[ind] + x/val[2] * deltas[ind + 1] + (rodsLoads[ind] * Math.pow(val[2], 2) * x / (2 * val[0] * val[1] * val[2])) *(1 - x * val[2]));
        U.push(Ux);
    }
    );
    console.log(U);
    console.log(`U1(0) = ${U[0](0)}`);
    console.log(`U1(L1) = ${U[0](rods[0][2])}`);
    console.log(`U2(L2) = ${U[1](rods[1][2])}`);
    
    const N = [];
    rods.forEach((val, ind) =>{
        const Nx = (x) => (val[0]*val[1] / val[2]) * (deltas[ind + 1] - deltas[ind]) + ((rodsLoads[ind] * val[2]) / 2) * (1 - 2 * (x / val[2]));
        N.push(Nx);
    });
    console.log(N);
    console.log(`N1(0) = ${N[0](0)}`);
    console.log(`N2(0) = ${N[1](0)}`);

    const solve = {
        U: U,
        N: N,
    };
    
    return solve;

};
export default Processing