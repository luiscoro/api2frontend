import React from "react";
import DocumentoService from ".././services/DocumentoData";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const SECTOR_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);

const OBSERVACION_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);

class AddGuia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sector: "",
      observaciones: "",
      touched: {
        sector: false,
        observaciones: false,
      },
      errors: {
        required: {
          sector: false,
          observaciones: false,
        },
        valid: {
          sector: true,
          observaciones: true,
          idg: true,
        },
      },
    };
    this.saveDocumento = this.saveDocumento.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    const errors = {
      required: { ...this.state.errors.required, [name]: false },
    };
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, ...errors },
    });
  }

  handleBlur(event) {
    const field = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
    this.validate(event);
  }

  validate(event) {
    const target = event.target;
    const { value, name } = target;

    if (value.length === 0) {
      const errors = {
        required: { ...this.state.errors.required, [name]: true },
      };

      this.setState({
        errors: { ...this.state.errors, ...errors },
      });
      return;
    }

    if (name === "sector") {
      this.validateSector(value);
    }

    if (name === "observaciones") {
      this.validateObservaciones(value);
    }
  }

  validateSector(sector) {
    const sectorIsValid = SECTOR_REGEX.test(this.state.sector);
    const errors = {
      valid: { ...this.state.errors.valid, sector: sectorIsValid },
    };

    this.setState({
      errors: { ...this.state.errors, ...errors },
    });
  }

  validateObservaciones(observaciones) {
    const observacionesIsValid = OBSERVACION_REGEX.test(
      this.state.observaciones
    );
    const errors = {
      valid: {
        ...this.state.errors.valid,
        observaciones: observacionesIsValid,
      },
    };

    this.setState({
      errors: { ...this.state.errors, ...errors },
    });
  }

  hasError(field) {
    return (
      (this.state.errors.required[field] || !this.state.errors.valid[field]) &&
      this.state.touched[field]
    );
  }

  isFormInvalid() {
    const { sector, observaciones, errors } = this.state;
    const { required, valid } = errors;
    const isSomeFieldRequired = Object.keys(required).some(
      (error) => required[error]
    );
    const isSomeFieldInvalid = Object.keys(valid).some(
      (error) => !valid[error]
    );

    return isSomeFieldInvalid || isSomeFieldRequired;
  }

  displayError(field) {
    const { required, valid } = this.state.errors;
    const errorMessage = `El campo ${field} `;

    if (required[field]) {
      return `${errorMessage} es obligatorio`;
    }

    if (!valid[field]) {
      return `${errorMessage} no es válido`;
    }
  }

  saveDocumento = (e) => {
    e.preventDefault();
    let documento = {
      sector: this.state.sector,
      observaciones: this.state.observaciones,
      idg: this.state.idg,
    };
    DocumentoService.addDocumento(documento)
      .then((res) => {
        this.props.history.push("/documentoEmbarque");
        this.props.history.push("/modulos/Documento");
        confirmAlert({
          title: "Éxito",
          message: "El documento de embarque ha sido registrado",
          buttons: [
            {
              label: "Aceptar",
              onClick: () => confirmAlert({ title: "OK" }),
            },
          ],
        });
      })
      .catch((error) => {
        confirmAlert({
          title: "Error",
          message: "El número de guía de remisión no ha sido encontrado",
          buttons: [
            {
              label: "Aceptar",
              onClick: () => confirmAlert({ title: "OK" }),
            },
          ],
        });
      });
  };
  render() {
    const { sector, observaciones, idg, errors } = this.state;
    return (
      <div>
        <h1 className="text-center"> Registrar nuevo documento de embarque</h1>
        <p></p>
        <form onSubmit={this.handleSubmit}>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Sector:</h5>
            <input
              type="text"
              className="form-control"
              defaultValue={sector}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="sector"
            />
            <p
              className={
                this.hasError("descripcion")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("sector")}
            </p>
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Observaciones:</h5>
            <textarea
              type="text"
              className="form-control"
              defaultValue={observaciones}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="observaciones"
            />

            <p
              className={
                this.hasError("placa")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("observaciones")}
            </p>
          </div>
          <div className="form-group" class="col-sm-4">
            <h5>Número de guía de remisión:</h5>
            <input
              type="number"
              min="1"
              className="form-control"
              defaultValue={idg}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="idg"
            />
            <p
              className={
                this.hasError("idg")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("idg")}
            </p>
          </div>
          <p></p>
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.isFormInvalid()}
            onClick={this.saveDocumento}
          >
            Guardar
          </button>
        </form>
      </div>
    );
  }
}

export default AddGuia;
