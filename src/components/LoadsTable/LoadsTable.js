import React, { useState } from "react";
import "./LoadsTable.css";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { Cancel } from "@material-ui/icons";

export default function LoadsTable(props) {
  return (
      <div className="TableLoads">
        <MaterialTable
          columns={[
            {
              title: 'Номер узла',
			        field: 'n',
			        type: 'numeric',
			        filtering: false,
              align: 'center',
              validate: (rowData) => { 
                if (rowData.n <= 0) {
                  return("Введенное число должно быть больше нуля")}
                else if (isNaN(rowData.n)) {
                  return("Поле не должно быть пустым")
                } else {
                  return true
                }
              } 
            },
            { 
              title: 'Опора', 
              field: 'Z', 
              type: 'boolean', 
              filtering: false,
              align: 'center',
            },
            { 
            title: 'Сосредоточенная нагрузка',
            field: 'F',
            type: 'numeric',
            filtering: false,
            align: 'center', 
            },
          ]}

          data={props.data}
          title="Нагрузки"
          icons={{
            Add: props => <AddIcon />,
            Edit: props => <EditIcon />,
            Delete: props => <DeleteIcon />,
            Clear: props => <DeleteIcon />,
            Check: props => <CheckIcon />,
            Search: props => <SearchIcon />,
            ResetSearch: props => <DeleteIcon />,
            Cancel: props => <Cancel />
          }}

          editable={{
            onRowAdd: newData => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  props.setData([...props.data, newData]);
  
                  resolve();
                }, 1000);
              })},

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...props.data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  props.setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),

            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...props.data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  props.setData([...dataDelete]);

                  resolve();
                }, 1000);
              })
          }}
        />
        </div>
  );
}