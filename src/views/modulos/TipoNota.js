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
      const response = await fetch('http://localhost:9191/api/tipoNotaCredito');
      const body = await response.json();
      console.log(body);
      setData(body);
    };
    doFetch();
  }, []);

  const addTipo=() =>{

    window.location.href = "http://localhost:3000/#/add-tipo";
  }
  
  const  editTipo=(id,detalle)=> {
    window.localStorage.setItem("tipoId", id);
    window.localStorage.setItem("tipoDetalle", detalle);
    window.location.href = "http://localhost:3000/#/edit-tipo";
    }
  const deleteTipo = (id) => {  

    debugger;  
    confirmAlert({
      title: 'Advertencia',
      message: '¿Está seguro que desea eliminar el tipo de nota de crédito?',
      buttons: [
        {
          label: 'Si',
          onClick: () => axios.delete('http://localhost:9191/api/tipoNotaCredito/' + id) .then((result) => { window.location.reload(false);})
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
      detalle,
      id
    } = row.original;
    return (
      <Card style={{ width: '14rem', margin: '0 auto' }}>
        <CardBody>
         
          <Button
            color='warning' onClick={() => { editTipo(id,detalle) }}
          >
            {'Editar'}
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            color='danger'onClick={() => { deleteTipo(id) }}
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
        Header: 'Detalle',
        accessor: 'detalle',
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
      <h1 className="text-center"> Registro de tipos de notas de crédito</h1>
      <br></br>
       <Button
            color='success' onClick={() => { addTipo()}}
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