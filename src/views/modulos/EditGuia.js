import React from "react";
import GuiaService from ".././services/GuiaData";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const DESCRIPCION_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);

const OBSERVACION_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);

const CHOFER_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);
class EditGuia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      fecha: "",
      descripcion: "",
      observaciones: "",
      chofer: "",
      touched: {
        descripcion: false,
        observaciones: false,
        chofer: false,
      },
      errors: {
        required: {
          descripcion: false,
          observaciones: false,
          chofer: false,
        },
        valid: {
          descripcion: true,
          observaciones: true,
          chofer: true,
        },
      },
    };
    this.saveGuia = this.saveGuia.bind(this);
    this.loadGuia = this.loadGuia.bind(this);
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

    if (name === "descripcion") {
      this.validateDescripcion(value);
    }

    if (name === "observaciones") {
      this.validateObservaciones(value);
    }
    if (name === "chofer") {
      this.validateNombre(value);
    }
  }

  validateDescripcion(descripcion) {
    const descripcionIsValid = DESCRIPCION_REGEX.test(this.state.descripcion);
    const errors = {
      valid: { ...this.state.errors.valid, descripcion: descripcionIsValid },
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

  validateNombre(nombre) {
    const nombreIsValid = CHOFER_REGEX.test(this.state.nombre);
    const errors = {
      valid: { ...this.state.errors.valid, nombre: nombreIsValid },
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
    const { descripcion, observaciones, chofer, errors } = this.state;
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

  componentDidMount() {
    this.loadGuia();
  }

  loadGuia() {
    let fec = window.localStorage.getItem("guiaFecha");
    let des = window.localStorage.getItem("guiaDescripcion");
    let obs = window.localStorage.getItem("guiaObservaciones");
    let cho = window.localStorage.getItem("guiaChofer");
    let id = window.localStorage.getItem("guiaId");
    GuiaService.getguiaDespachoById(window.localStorage.getItem("guiaId")).then(
      (res) => {
        this.setState({
          id: id,
          fecha: fec,
          descripcion: des,
          observaciones: obs,
          chofer: cho,
        });
      }
    );
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  saveGuia = (e) => {
    e.preventDefault();
    let guia = {
      id: this.state.id,
      fecha: this.state.fecha,
      descripcion: this.state.descripcion,
      observaciones: this.state.observaciones,
      chofer: this.state.chofer,
    };
    GuiaService.editGuia(guia)
      .then((res) => {
        this.props.history.push("/guiaRemisionDespacho");
        this.props.history.push("/modulos/Guia");
        confirmAlert({
          title: "Éxito",
          message: "Los datos de la guía de remisión han sido actualizados",
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
          message: "El nombre del chofer no ha sido encontrado",
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
    const {
      id,
      fecha,
      descripcion,
      observaciones,
      chofer,
      errors,
    } = this.state;
    return (
      <div>
        <h1 className="text-center">
          {" "}
          Actualizar datos de la guía de remisión
        </h1>
        <p></p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" class="col-sm-4">
            <h5>Id:</h5>
            <input
              type="text"
              className="form-control"
              defaultValue={id}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="id"
              readOnly="true"
            />
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Fecha:</h5>
            <input
              type="text"
              className="form-control"
              defaultValue={fecha}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="fecha"
              readOnly="true"
            />
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Descripción Mercadería:</h5>
            <input
              type="text"
              className="form-control"
              defaultValue={descripcion}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="descripcion"
            />
            <p
              className={
                this.hasError("descripcion")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("descripcion")}
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
            <h5>Chofer:</h5>
            <input
              type="text"
              className="form-control"
              defaultValue={chofer}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="chofer"
            />
            <p
              className={
                this.hasError("chofer")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("chofer")}
            </p>
          </div>
          <p></p>
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.isFormInvalid()}
            onClick={this.saveGuia}
          >
            Actualizar
          </button>
        </form>
      </div>
    );
  }
}

export default EditGuia;
