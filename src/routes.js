import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Chofer = React.lazy(() => import("./views/modulos/Chofer"));
const AddChofer = React.lazy(() => import("./views/modulos/AddChofer"));
const EditChofer = React.lazy(() => import("./views/modulos/EditChofer"));
const TipoNota = React.lazy(() => import("./views/modulos/TipoNota"));
const AddTipo = React.lazy(() => import("./views/modulos/AddTipo"));
const EditTipo = React.lazy(() => import("./views/modulos/EditTipo"));
const Nota = React.lazy(() => import("./views/modulos/Nota"));
const AddNota = React.lazy(() => import("./views/modulos/AddNota"));
const EditNota = React.lazy(() => import("./views/modulos/EditNota"));
const Guia = React.lazy(() => import("./views/modulos/Guia"));
const AddGuia = React.lazy(() => import("./views/modulos/AddGuia"));
const EditGuia = React.lazy(() => import("./views/modulos/EditGuia"));
const Documento = React.lazy(() => import("./views/modulos/Documento"));
const AddDocumento = React.lazy(() => import("./views/modulos/AddDocumento"));
const EditDocumento = React.lazy(() => import("./views/modulos/EditDocumento"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/modulos/chofer", name: "Chofer", component: Chofer },
  { path: "/add-chofer", name: "AddChofer", component: AddChofer },
  { path: "/edit-chofer", name: "EditChofer", component: EditChofer },
  { path: "/modulos/TipoNota", name: "TipoNota", component: TipoNota },
  { path: "/add-tipo", name: "AddTipo", component: AddTipo },
  { path: "/edit-tipo", name: "EditTipo", component: EditTipo },
  { path: "/modulos/Nota", name: "Nota", component: Nota },
  { path: "/add-nota", name: "AddNota", component: AddNota },
  { path: "/edit-nota", name: "EditNota", component: EditNota },
  { path: "/modulos/Guia", name: "Guia", component: Guia },
  { path: "/add-guia", name: "AddGuia", component: AddGuia },
  { path: "/edit-guia", name: "EditGuia", component: EditGuia },
  { path: "/modulos/Documento", name: "Documento", component: Documento },
  { path: "/add-documento", name: "AddDocumento", component: AddDocumento },
  { path: "/edit-documento", name: "EditDocumento", component: EditDocumento },
];

export default routes;
