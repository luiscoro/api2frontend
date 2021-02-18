import React, { useEffect, useState, useMemo } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import axios from "axios";
import { Container, Button, Card, CardBody } from "reactstrap";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch(
        "http://localhost:9191/api/documentoEmbarque"
      );
      const body = await response.json();
      console.log(body);
      setData(body);
    };
    doFetch();
  }, []);

  const addDocumento = () => {
    window.location.href = "http://localhost:3000/#/add-documento";
  };

  const editDocumento = (id, fecha, sector, observaciones, idg) => {
    window.localStorage.setItem("documentoId", id);
    window.localStorage.setItem("documentoFecha", fecha);
    window.localStorage.setItem("documentoSector", sector);
    window.localStorage.setItem("documentoObservaciones", observaciones);
    window.localStorage.setItem("documentoIdg", idg);
    window.location.href = "http://localhost:3000/#/edit-documento";
  };
  const deleteDocumento = (id) => {
    debugger;
    confirmAlert({
      title: "Advertencia",
      message: "¿Está seguro que desea eliminar el documento de embarque?",
      buttons: [
        {
          label: "Si",
          onClick: () =>
            axios
              .delete("http://localhost:9191/api/documentoEmbarque/" + id)
              .then((result) => {
                window.location.reload(false);
              }),
        },
        {
          label: "No",
          onClick: () => confirmAlert({ title: "OK" }),
        },
      ],
    });
  };

  const renderRowSubComponent = (row) => {
    const { fecha, sector, observaciones, idg, id } = row.original;
    return (
      <Card style={{ width: "14rem", margin: "0 auto" }}>
        <CardBody>
          <Button
            color="warning"
            onClick={() => {
              editDocumento(id, fecha, sector, observaciones, idg);
            }}
          >
            {"Editar"}
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            color="danger"
            onClick={() => {
              deleteDocumento(id);
            }}
          >
            {"Eliminar"}
          </Button>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Fecha",
        accessor: "fecha",
      },
      {
        Header: "Sector",
        accessor: "sector",
      },
      {
        Header: "Observaciones",
        accessor: "observaciones",
      },
      {
        Header: "Número de guía de remisión",
        accessor: "idg",
      },
      {
        Header: () => null,
        id: "expander", // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
              <Button color="secondary">{"Cerrar"}</Button>
            ) : (
              <Button color="primary">{"Acciones"}</Button>
            )}
          </span>
        ),
      },
    ],
    []
  );
  return (
    <Container>
      <h1 className="text-center"> Registro de documentos de embarque</h1>
      <br></br>
      <Button
        color="success"
        onClick={() => {
          addDocumento();
        }}
      >
        {"Nuevo"}
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
