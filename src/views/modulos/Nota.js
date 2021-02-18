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
      const response = await fetch("http://localhost:9191/api/notaCredito");
      const body = await response.json();
      console.log(body);
      setData(body);
    };
    doFetch();
  }, []);

  const addNota = () => {
    window.location.href = "http://localhost:3000/#/add-nota";
  };

  const editNota = (
    id,
    fecha,
    responsable,
    valor,
    observaciones,
    tipo,
    idf
  ) => {
    window.localStorage.setItem("notaId", id);
    window.localStorage.setItem("notaFecha", fecha);
    window.localStorage.setItem("notaResponsable", responsable);
    window.localStorage.setItem("notaValor", valor);
    window.localStorage.setItem("notaObservaciones", observaciones);
    window.localStorage.setItem("notaTipo", tipo);
    window.localStorage.setItem("notaF", idf);
    window.location.href = "http://localhost:3000/#/edit-nota";
  };
  const deleteNota = (id) => {
    debugger;
    confirmAlert({
      title: "Advertencia",
      message: "¿Está seguro que desea eliminar la nota de crédito?",
      buttons: [
        {
          label: "Si",
          onClick: () =>
            axios
              .delete("http://localhost:9191/api/notaCredito/" + id)
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
    const {
      fecha,
      observaciones,
      responsable,
      valor,
      tipo,
      idf,
      id,
    } = row.original;
    return (
      <Card style={{ width: "14rem", margin: "0 auto" }}>
        <CardBody>
          <Button
            color="warning"
            onClick={() => {
              editNota(id, fecha, responsable, valor, observaciones, tipo, idf);
            }}
          >
            {"Editar"}
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            color="danger"
            onClick={() => {
              deleteNota(id);
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
        Header: "Responsable",
        accessor: "responsable",
      },
      {
        Header: "Valor ($)",
        accessor: "valor",
      },
      {
        Header: "Observaciones",
        accessor: "observaciones",
      },
      {
        Header: "Tipo de nota de crédito",
        accessor: "tipo",
      },
      {
        Header: "Número de factura",
        accessor: "idf",
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
      <h1 className="text-center"> Registro de notas de crédito</h1>
      <br></br>
      <Button
        color="success"
        onClick={() => {
          addNota();
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
