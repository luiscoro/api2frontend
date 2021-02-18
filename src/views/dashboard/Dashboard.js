import React from "react";
import axios from "axios";
import { CCard, CCardFooter, CCol, CProgress, CRow } from "@coreui/react";
const API_URL = "http://localhost:9191/api/choferDespacho";
const API_URL1 = "http://localhost:9191/api/tipoNotaCredito";
const API_URL2 = "http://localhost:9191/api/notaCredito";
const API_URL3 = "http://localhost:9191/api/guiaRemisionDespacho";
const API_URL4 = "http://localhost:9191/api/documentoEmbarque";

class Dashboard extends React.Component {
  state = {
    cd: "",
    tn: "",
    nc: "",
    gr: "",
    de: "",
  };
  componentDidMount() {
    const url = `${API_URL}`;
    const url1 = `${API_URL1}`;
    const url2 = `${API_URL2}`;
    const url3 = `${API_URL3}`;
    const url4 = `${API_URL4}`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ cd: Object.keys(data).length });
      });
    axios
      .get(url1)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ tn: Object.keys(data).length });
      });
    axios
      .get(url2)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ nc: Object.keys(data).length });
      });
    axios
      .get(url3)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ gr: Object.keys(data).length });
      });
    axios
      .get(url4)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ de: Object.keys(data).length });
      });
  }

  render() {
    return (
      <>
        <CCard>
          <CCardFooter>
            <CRow className="text-center">
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Choferes de Embarque</div>
                <strong>{this.state.cd}</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="success"
                  value={this.state.cd}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Tipos de notas de crédito</div>
                <strong>{this.state.tn}</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="info"
                  value={this.state.tn}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Notas de crédito</div>
                <strong>{this.state.nc}</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="warning"
                  value={this.state.nc}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Guías de remisión</div>
                <strong>{this.state.gr}</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="danger"
                  value={this.state.gr}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Documentos de embarque</div>
                <strong>{this.state.de}</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  value={this.state.de}
                />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </>
    );
  }
}

export default Dashboard;
