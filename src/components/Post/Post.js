import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import './Post.css'
import TablePost from './TablePost'
import EpurN from './Epurs/EpurN'
import EpurU from './Epurs/EpurU'
import Graphics from './Graphics/Graphics'

export default function Post(props) {
    
    const [windowVar, setWindow] = useState('');
    const dataRods = props.dataRods;
    const dataLoads = props.dataLoads;
    const solution = props.solution;
    let Xvalue = '';
    const len = dataRods.reduce((prev, curr) => prev + curr.L, 0);
    let x = "";
    let isXOkay = true;
    let Nx = [];
    let Sx = [];
    let Ux = [];

    const handleTable = () => {
        setWindow('Table');
    }
    const handleGraphs = () => {
        setWindow('Graphs');
    }
    const handleEpur = () => {
        setWindow('Epur');
    }

    const handleGet = () => {
        Xvalue = prompt("Введите Х: ");
        const numb = Number(Xvalue);
        x = numb;

        if (isNaN(numb) || numb < 0 || numb > len) {
            isXOkay = false;
        } else isXOkay = true;
        execute();
    };
    const execute = () => {
        let isGood = true;
        if (x === undefined || x === '' || isNaN(Number(x))) {
            isXOkay = false;
            isGood = false;
        }
        if (isXOkay && isGood && solution) {
            let summ = dataRods[0].L;
            let rodNum = 0;
            for (let i = 1; summ < Number(x); i++) {
                summ += dataRods[i].L;
                rodNum++;
            }
            const num = Number(
                (
                    Number(x) -
                    dataRods
                        .slice(0, rodNum)
                        .reduce((prev, curr) => prev + curr.L, 0)
                ).toFixed(3)
            );

            if (Number(x) !== len && Number(x) === summ) {
                const N1 = solution.N[rodNum];
                const N2 = solution.N[rodNum + 1];
                const U1 = solution.U[rodNum];
                const S1 = solution.S[rodNum];
                const S2 = solution.S[rodNum + 1];
                Nx = [N1(num).toString(), N2(0).toString()];
                Ux = [U1(num).toString()];
                Sx = [S1(num).toString(), S2(0).toString()];
            } else {
                const N1 = solution.N[rodNum];
                const U1 = solution.U[rodNum];
                const S1 = solution.S[rodNum];
                Nx = [N1(num).toString()];
                Ux = [U1(num).toString()];
                Sx = [S1(num).toString()];
            }
        }
        //console.log("N(x) = ", Nx.map((val) => val + '; '));
        //console.log("U(x) = ", Ux.map((val) => val + '; '));
        //console.log("S(x) = ", Sx.map((val) => val + '; '));
        if (isXOkay) {
        alert("N(x) = " + Nx.map((val) => val + '; '));
        alert("U(x) = " + Ux.map((val) => val + '; '));
        alert("S(x) = " + Sx.map((val) => val + '; '));
        } else {
            alert("Неправильно введен Х!");
        }
    };

    return (
        <div className="postt">
        <div className="btn">
        <Button onClick={handleTable} variant="dark">Таблица</Button>
        <Button onClick={handleGraphs} variant="dark">Графики</Button>
        <Button onClick={handleEpur} variant="dark">Эпюры</Button>
        <Button onClick={handleGet} variant="dark">Получить компоненты</Button>
        </div>
        <div>
        {
            windowVar === 'Table' ? (
            <TablePost dataRods={dataRods} dataLoads={dataLoads} solution={solution}/>
        ) : windowVar === 'Graphs' ? (
            <Graphics dataRods={dataRods} solution={solution} />
        ) : windowVar === 'Epur' ? (
            <div className="Epurs">
            <EpurN dataRods={dataRods} solution={solution} />
            <EpurU dataRods={dataRods} solution={solution} />
            </div>
        ): null
    }
    </div>
    </div>
    )
}