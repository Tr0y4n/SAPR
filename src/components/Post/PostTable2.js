import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function PostTable2(props) {

    return(
        <table class="table" className="mrg">
<thead class="thead-dark">
    <tr>
      <th scope="col">X</th>
      <th scope="col">N(x)</th>
      <th scope="col">S(x)</th>
      <th scope="col">U(x)</th>
    </tr>
  </thead>
  <tbody>
  {props.data.map((val) => (
    <tr>
      <th scope="row">{val.x}</th>
      <td>{val.Nx}</td>
      <td>{val.Ux}</td>
      <td>
      <Typography variant='subtitle2' color={val.red ? 'error' : 'initial'}>{val.Sx}</Typography>  
      </td>
    </tr>))}
  </tbody>
</table>
    )
}