import React from 'react'
import './LoadsTable.css'
import Table from 'react-bootstrap/Table'

export default class LoadsTable extends React.Component {
    render() {
        return(
            <Table striped bordered hover variant="dark" className="tableStyle">
                <thead>
                    <tr>
                        <th>Номер стержня</th>
                        <th>Длина L</th>
                        <th>Площадь A</th>
                        <th>Модуль упругости Е</th>
                        <th>Допускаемое напряжение S</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}