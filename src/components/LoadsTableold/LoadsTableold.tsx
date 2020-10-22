import React, { useState } from 'react';
import MaterialTable from 'material-table';
import './LoadsTable.css';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons: any = {
	Add: forwardRef((props, ref: any) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref: any) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref: any) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref: any) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref: any) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref: any) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref: any) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref: any) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref: any) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref: any) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref: any) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref: any) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref: any) => <ViewColumn {...props} ref={ref} />),
};

interface Data {
	data: Array<Object>;
	setData: (data: Array<Object>) => void;
}

const LoadsTable = (props: Data) => {
	const [columns, setColumns] = useState<Array<Object>>([
		{
			title: 'Номер узла',
			field: 'i',
			type: 'numeric',
			filtering: false,
			align: 'center',
			validate: (rowData: any) => { 
				if (rowData.i <= 0) {
					return("Введенное число должно быть больше нуля")}
				else if (isNaN(rowData.i)) {
					return("Поле не должно быть пустым")
				} else {
					return true
				}
			}
		},
		{ 
      		title: 'Опора', 
      		field: 'Z', 
      		type: 'numeric', 
			filtering: false,
			align: 'center',
			validate: (rowData: any) => (rowData.Z === 0 || rowData.Z === 1) ? true : "Значение должно быть 0 или 1"
    	},
		{
			title: 'Сосредоточенная нагрузка',
			field: 'F',
			type: 'numeric',
			filtering: false,
			align: 'center',
		},
	]);
	
	return (
		<div className="tableNagr">
			<MaterialTable
				title="Таблица напряжений"
				columns={columns}
				data={props.data}
				options={{
					search: false,
					sorting: false,
					draggable: false,
					paging: false,
					headerStyle: {
						backgroundColor: '#21262e',
						color: '#FFF',
					},
					rowStyle: {
						backgroundColor: '#9196a1',
						color: '#FFF',
					},
				}}
				icons={tableIcons}
				editable={{
					onRowAdd: (newData: any) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								props.setData([...props.data, newData]);

								resolve();
							}, 1000);
						}),
					onRowUpdate: (newData: any, oldData: any) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataUpdate = [...props.data];
								const index = oldData.tableData.id;
								dataUpdate[index] = newData;
								props.setData([...dataUpdate]);

								resolve();
							}, 1000);
						}),
					onRowDelete: (oldData: any) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataDelete = [...props.data];
								const index = oldData.tableData.id;
								dataDelete.splice(index, 1);
								props.setData([...dataDelete]);

								resolve();
							}, 1000);
						}),
				}}
			></MaterialTable>
		</div>
	);
};
export default LoadsTable;