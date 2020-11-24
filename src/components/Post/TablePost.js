import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import './Post.css'
import PostTable2 from './PostTable2'
import Button from 'react-bootstrap/Button'

export default function TableField(props) {
    const solution = props.solution;
    const rodsIndex = props.dataRods.map((val) => val.i);
    const [rod, setRod] = useState(1);
    const [delt, setDelt] = useState('');
    const [isDeltOkay, setDeltOkay] = useState(true);
    const [data, setData] = useState(null);

    const execute = () => {
        const Nx = solution?.N[rod - 1];
        const Ux = solution?.U[rod - 1];
        const Sx = solution?.S[rod - 1];
        let isGood = true;
        const len = props.dataRods[rod - 1].L;
        if (delt === undefined || delt === '' || Number(delt) === 0 || isNaN(Number(delt)) || len < Number(delt)) {
            setDeltOkay(false);
            isGood = false;
        }
        if (Nx && Ux && Sx && isGood && isDeltOkay) {
            const dataTemp = [];

            for (
                let i = 0;
                i <= len;
                i += Number(delt)
            ) {
                i = Number(i.toFixed(10));
                const Si = Sx(i);
                const isRed = props.dataRods[rod - 1].S < Si || (-props.dataRods[rod - 1].S) > Si;
                dataTemp.push({ x: i, Nx: Nx(i), Ux: Ux(i), Sx: Si, red: isRed });
            }
            setData(dataTemp);
        }
    };
    const onDeltChange = (e) => {
        const numb = Number(e.target.value);
        setDelt(e.target.value);
        const len = props.dataRods[rod - 1].L;

        if (isNaN(numb) || numb <= 0 || numb > len) {
            setDeltOkay(false);
        } else setDeltOkay(true);
    };

    const handleChange = (event) => {
        setDelt('');
        setDeltOkay(true);
        setData(null);
        setRod(Number(event.target.value));
    };

    const handleDownload = async () => {
        if (data) {
            const download = require('downloadjs');
            download(JSON.stringify({rod, data}), 'calculations.res');
        }
    };

    return (
        <div className="tableField">
            <div className="tableTop">
                <FormControl>
                    <InputLabel id="demo-simple-select-label">
                        Номер стержня
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rod}
                        onChange={handleChange}
                    >
                        {rodsIndex.map((val) => (
                            <MenuItem value={val}>{val}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="coop">
                <div className="ds">
                <input type="text" class="form-control" placeholder="Шаг" aria-label="Шаг" value={delt} onChange={onDeltChange}></input>
                </div>
                <Button onClick={execute} variant="dark" size="md">
                    Вывести таблицу
                </Button>
                </div>
                <Button onClick={handleDownload} variant="dark" size="md">
                    Скачать данные
                </Button>
            </div>
            <div className="table">
                {data ? <PostTable2 data={data} /> : null}
            </div>
        </div>
    );
};
