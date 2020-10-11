import React from 'react'
import './ConstTable.css'
import Table from 'react-bootstrap/Table'

export default class ConstTable extends React.Component {
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
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>2</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td><input type="text" /></td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}