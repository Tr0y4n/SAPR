import React from "react";
import "./RodsTable.css";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";

export default function RodsTable(props) {
  
  return (
      <div className="TableRods">
        <MaterialTable
          columns={[
            {
              title: 'Номер стержня',
			        field: 'i',
			        type: 'numeric',
			        filtering: false,
              align: 'center',
            },
            { 
              title: 'Длина', 
              field: 'L', 
              type: 'numeric', 
              filtering: false,
              align: 'center',
              validate: (rowData) => { 
                if (rowData.L < 0) {
                  return("Введенное число не должно быть меньше нуля")}
                else if (isNaN(rowData.L)) {
                  return("Поле не должно быть пустым")
                } else {
                  return true
                }
              }
            },
            { 
            title: 'Площадь сечения',
            field: 'A',
            type: 'numeric',
            filtering: false,
            align: 'center', 
            validate: (rowData) => { 
              if (rowData.A < 0) {
                return("Введенное число не должно быть меньше нуля")}
              else if (isNaN(rowData.A)) {
                return("Поле не должно быть пустым")
              } else {
                return true
              }
            }
            },
            {
              title: 'Модуль упругости',
              field: 'E',
              type: 'numeric',
              filtering: false,
              align: 'center',
              validate: (rowData) => { 
                if (rowData.E < 0) {
                  return("Введенное число не должно быть меньше нуля")}
                else if (isNaN(rowData.E)) {
                  return("Поле не должно быть пустым")
                } else {
                  return true
                }
              }
            },
            {
              title: 'Допускаемое напряжение',
              field: 'S',
              type: 'numeric',
              filtering: false,
              align: 'center',
              validate: (rowData) => { 
                if (rowData.S < 0) {
                  return("Введенное число не должно быть меньше нуля")}
                else if (isNaN(rowData.S)) {
                  return("Поле не должно быть пустым")
                } else {
                  return true
                }
              }
            },
            {
              title: 'Распределенные нагрузки',
              field: 'q',
              type: 'numeric',
              filtering: false,
              align: 'center',
              validate: (rowData) => { 
                if (isNaN(rowData.q)) {
                  return("Поле не должно быть пустым")
                } else {
                  return true
                }
              }
            },
          ]}

          
          data={props.data}
          title="Стержни"
          icons={{
            Add: props => <AddIcon />,
            Edit: props => <EditIcon />,
            Delete: props => <DeleteIcon />,
            Clear: props => <DeleteIcon />,
            Check: props => <CheckIcon />,
            Search: props => <SearchIcon />,
            ResetSearch: props => <DeleteIcon />
          }}

          editable={{
            onRowAdd: newData => {
              return new Promise((resolve, reject) => {
                  props.setData([...props.data, newData]);
  
                  resolve();
              })},

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                  const dataUpdate = [...props.data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  props.setData([...dataUpdate]);

                  resolve();
              }),

            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                  const dataDelete = [...props.data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  props.setData([...dataDelete]);

                  resolve();
              })
          }}
        />
        </div>
  );
}