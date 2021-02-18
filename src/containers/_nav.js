import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Módulos"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Choferes de Embarque",
    to: "/modulos/Chofer",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tipos de Nota de Crédito",
    to: "/modulos/TipoNota",
    icon: "cil-file",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notas de Crédito",
    to: "/modulos/Nota",
    icon: "cil-file",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Guías de Remisión",
    to: "/modulos/Guia",
    icon: "cil-file",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Documentos de Embarque",
    to: "/modulos/Documento",
    icon: "cil-file",
  },
];

export default _nav;
