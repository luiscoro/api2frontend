import React from "react";
import NotaService from ".././services/NotaData";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const RESPONSABLE_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);

const OBSERVACIONES_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);

const TIPO_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);
const VALOR_REGEX = new RegExp(/^\$?[\d,]+(\.\d*)?$/);

class EditNota extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      fecha: "",
      valor: "",
      responsable: "",
      observaciones: "",
      tipo: "",
      idf: "",
      touched: {
        fecha: false,
        responsable: false,
        observaciones: false,
        valor: false,
        tipo: false,
      },
      errors: {
        required: {
          fecha: false,
          responsable: false,
          observaciones: false,
          valor: false,
          tipo: false,
        },
        valid: {
          fecha: true,
          responsable: true,
          observaciones: true,
          valor: true,
          tipo: true,
        },
      },
    };
    this.saveNota = this.saveNota.bind(this);
    this.loadNota = this.loadNota.bind(this);
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

    if (name === "responsable") {
      this.validateResponsable(value);
    }
    if (name === "observaciones") {
      this.validateObservaciones(value);
    }

    if (name === "tipo") {
      this.validateTipo(value);
    }

    if (name === "valor") {
      this.validateValor(value);
    }
  }

  validateResponsable(responsable) {
    const responsableIsValid = RESPONSABLE_REGEX.test(this.state.responsable);
    const errors = {
      valid: { ...this.state.errors.valid, responsable: responsableIsValid },
    };

    this.setState({
      errors: { ...this.state.errors, ...errors },
    });
  }

  validateTipo(tipo) {
    const tipoIsValid = TIPO_REGEX.test(this.state.tipo);
    const errors = {
      valid: { ...this.state.errors.valid, tipo: tipoIsValid },
    };

    this.setState({
      errors: { ...this.state.errors, ...errors },
    });
  }

  validateObservaciones(observaciones) {
    const observacionesIsValid = OBSERVACIONES_REGEX.test(
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

  validateValor(valor) {
    const valorIsValid = VALOR_REGEX.test(this.state.valor);
    const errors = {
      valid: { ...this.state.errors.valid, valor: valorIsValid },
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
    const {
      fecha,
      responsable,
      observaciones,
      valor,
      tipo,
      idf,
      errors,
    } = this.state;
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
    this.loadNota();
  }

  loadNota() {
    let fec = window.localStorage.getItem("notaFecha");
    let resp = window.localStorage.getItem("notaResponsable");
    let ob = window.localStorage.getItem("notaObservaciones");
    let val = window.localStorage.getItem("notaValor");
    let tip = window.localStorage.getItem("notaTipo");
    let idf = window.localStorage.getItem("notaF");
    let id = window.localStorage.getItem("notaId");
    NotaService.getnotaCreditoById(window.localStorage.getItem("notaId")).then(
      (res) => {
        this.setState({
          id: id,
          fecha: fec,
          responsable: resp,
          observaciones: ob,
          valor: val,
          tipo: tip,
          idf: idf,
        });
      }
    );
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  saveNota = (e) => {
    e.preventDefault();
    let nota = {
      id: this.state.id,
      fecha: this.state.fecha,
      responsable: this.state.responsable,
      observaciones: this.state.observaciones,
      tipo: this.state.tipo,
      valor: this.state.valor,
      idf: this.state.idf,
    };
    NotaService.editNota(nota).then((res) => {
      this.props.history.push("/notaCredito");
      this.props.history.push("/modulos/Nota");
      confirmAlert({
        title: "Éxito",
        message: "Los datos de la nota de crédito han sido actualizados",
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
      responsable,
      observaciones,
      valor,
      idf,
      tipo,
      errors,
    } = this.state;
    return (
      <div>
        <h1 className="text-center"> Actualizar datos de la nota de crédito</h1>
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
              readonly="true"
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
              readonly="true"
            />
            <p
              className={
                this.hasError("fecha")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("fecha")}
            </p>
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Responsable:</h5>

            <input
              type="text"
              className="form-control"
              value={responsable}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="responsable"
            />
            <p
              className={
                this.hasError("responsable")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("responsable")}
            </p>
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Valor ($):</h5>
            <input
              type="text"
              className="form-control"
              value={valor}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="valor"
            />

            <p
              className={
                this.hasError("valor")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("valor")}
            </p>
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Observaciones:</h5>
            <textarea
              type="text"
              className="form-control"
              value={observaciones}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="observaciones"
            />

            <p
              className={
                this.hasError("observaciones")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("observaciones")}
            </p>
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Tipo de nota de crédito:</h5>
            <input
              type="text"
              className="form-control"
              value={tipo}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="tipo"
            />

            <p
              className={
                this.hasError("tipo")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("tipo")}
            </p>
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Número de factura:</h5>
            <input
              type="number"
              min="1"
              className="form-control"
              value={idf}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="idf"
              readOnly="true"
            />
          </div>
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.isFormInvalid()}
            onClick={this.saveNota}
          >
            Actualizar
          </button>
        </form>
      </div>
    );
  }
}

export default EditNota;
