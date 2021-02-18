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
      const response = await fetch('http://localhost:9191/api/guiaRemisionDespacho');
      const body = await response.json();
      console.log(body);
      setData(body);
    };
    doFetch();
  }, []);

  const addGuia=() =>{

    window.location.href = "http://localhost:3000/#/add-guia";
  }
  
  const  editGuia=(id,fecha,descripcion,observaciones,chofer)=> {
    window.localStorage.setItem("guiaId", id);
    window.localStorage.setItem("guiaFecha", fecha);
      window.localStorage.setItem("guiaDescripcion", descripcion);
      window.localStorage.setItem("guiaObservaciones", observaciones);
     window.localStorage.setItem("guiaChofer", chofer);
    window.location.href = "http://localhost:3000/#/edit-guia";
    }
  const deleteGuia = (id) => {  

    debugger;  
    confirmAlert({
      title: 'Advertencia',
      message: '¿Está seguro que desea eliminar la guía de remisión?',
      buttons: [
        {
          label: 'Si',
          onClick: () => axios.delete('http://localhost:9191/api/guiaRemisionDespacho/' + id) .then((result) => { window.location.reload(false);})
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
      fecha,
        descripcion,
        observaciones,
      chofer,
      id
    } = row.original;
    return (
      <Card style={{ width: '14rem', margin: '0 auto' }}>
        <CardBody>
         
          <Button
            color='warning' onClick={() => { editGuia(id,fecha,descripcion,observaciones,chofer,) }}
          >
            {'Editar'}
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            color='danger'onClick={() => { deleteGuia(id) }}
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
        Header: 'Fecha',
        accessor: 'fecha',
      },
      {
        Header: 'Descripción mercadería',
        accessor: 'descripcion',
          },
      {
        Header: 'Observaciones',
        accessor: 'observaciones',
          },
       {
        Header: 'Chofer',
        accessor: 'chofer',
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
      <h1 className="text-center"> Registro de guías de remisión</h1>
      <br></br>
       <Button
            color='success' onClick={() => { addGuia()}}
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