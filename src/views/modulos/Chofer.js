import React, { useEffect, useState, useMemo } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import axios from 'axios';  
import {
  Container,
  Button,
  Card,
  CardBody,
} from 'reactstrap';
import TableContainer from './TableContainer';
import { SelectColumnFilter } from './filters';

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('http://localhost:9191/api/choferDespacho');
      const body = await response.json();
      console.log(body);
      setData(body);
    };
    doFetch();
  }, []);

  const addChofer=() =>{

    window.location.href = "http://localhost:3000/#/add-chofer";
  }
  
  const  editChofer=(id,nombre,placa)=> {
    window.localStorage.setItem("choferId", id);
    window.localStorage.setItem("choferNombre", nombre);
     window.localStorage.setItem("choferPlaca", placa);
    window.location.href = "http://localhost:3000/#/edit-chofer";
    }
  const deleteChofer = (id) => {  

    debugger;  
    confirmAlert({
      title: 'Advertencia',
      message: '¿Está seguro que desea eliminar el chofer?',
      buttons: [
        {
          label: 'Si',
          onClick: () => axios.delete('http://localhost:9191/api/choferDespacho/' + id) .then((result) => { window.location.reload(false);})
        },
        {
          label: 'No',
          onClick: () => confirmAlert({title:'OK'})
        }
      ],
      
    });
      

  };  

  const renderRowSubComponent = (row) => {
    const {
      nombre,
      placa,
      id
    } = row.original;
    return (
      <Card style={{ width: '14rem', margin: '0 auto' }}>
        <CardBody>
         
          <Button
            color='warning' onClick={() => { editChofer(id,nombre,placa) }}
          >
            {'Editar'}
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            color='danger'onClick={() => { deleteChofer(id) }}
          >
            {'Eliminar'}
        </Button>
        </CardBody>
        
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      
      {
        Header: 'Id',
        accessor: 'id',
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Placa',
        accessor: 'placa',
      },
     {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <Button
            color='secondary'
          >
            {'Cerrar'}
        </Button> : <Button
            color='primary'
          >
            {'Acciones'}
        </Button>}
          </span>
        ),
      },
    ],
    []
  );
  return (
    <Container >
      <h1 className="text-center"> Registro de choferes de embarque</h1>
      <br></br>
       <Button
            color='success' onClick={() => { addChofer()}}
          >
            {'Nuevo'}
      </Button>
      <p></p>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
        
      />
    </Container>
  );
};

export default App;