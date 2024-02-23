// import { crudService } from '../../_services';
// import { MaterialUiGroupCheckBox } from 'material-ui-group-checkbox'
// import { DataGrid } from '@mui/x-data-grid';
// import * as React from 'react';
// import Box from '@mui/material/Box';

// class BookingDetails extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             items: [],
//         }
//     }

//     componentDidMount() {
//         this.fetchData()
//     }

//     fetchData = () => {
//         const { formField } = this.props
//         crudService._getAllWithParam(formField.url, {})
//             .then(
//                 result => {
//                     if (result.status === 200) {
//                         this.setState({
//                             items: result.data,
//                         })
//                     }
//                 }
//             );
//     }

//     handleChange = (value) => {
//         const event = {
//             target: {
//                 name: value.target.name,
//                 value: value.target.value,
//             }
//         }
//         this.props.handleInputChange(event)
//     }

//     render() {
//         const columns = [
//             { field: 'id', headerName: 'ID', width: 90 },
//             {
//                 field: 'firstName',
//                 headerName: 'First name',
//                 width: 150,
//                 editable: true,
//             },
//             {
//                 field: 'lastName',
//                 headerName: 'Last name',
//                 width: 150,
//                 editable: true,
//             },
//             {
//                 field: 'age',
//                 headerName: 'Age',
//                 type: 'number',
//                 width: 110,
//                 editable: true,
//             },
//             {
//                 field: 'fullName',
//                 headerName: 'Full name',
//                 description: 'This column has a value getter and is not sortable.',
//                 sortable: false,
//                 width: 160,
//                 valueGetter: (params) =>
//                     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//             },
//         ];

//         const rows = [
//             { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//             { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//             { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//             { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//             { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//             { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//             { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//             { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//             { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//         ];
//         const { formField } = this.props
//         const { items } = this.state
//         const options = {
//             name: formField.name,
//             label: formField.label,
//             error: formField.error,
//             value: formField.value,
//             getOptionLabel: formField.getOptionLabel,
//             getOptionValue: formField.getOptionValue,
//             getChildOptionLabel: formField.getSubOptionLabel,
//             getChildOptionValue: formField.getSubOptionValue,
//         }
//         return (
//             <div style={{ marginTop: 10, marginBottom: 10 }}>
//                 <Box sx={{ height: 400, width: '100%' }}>
//                     <DataGrid
//                         rows={rows}
//                         columns={columns}
//                         initialState={{
//                             pagination: {
//                                 paginationModel: {
//                                     pageSize: 5,
//                                 },
//                             },
//                         }}
//                         pageSizeOptions={[5]}
//                         checkboxSelection
//                         disableRowSelectionOnClick
//                         items={items} options={options} handleInputChange={this.handleChange}
//                     />
//                 </Box>
//             </div>
//         )
//     }
// }


// export default BookingDetails;

