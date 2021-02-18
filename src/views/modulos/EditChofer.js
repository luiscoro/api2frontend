import React from "react";
import ChoferService from ".././services/ChoferData";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const PLACA_REGEX = new RegExp(/^([A-Z]{3}-\d{3,4})$/);
const NOMBRE_REGEX = new RegExp(
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
);

class EditChofer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      placa: "",
      touched: {
        nombre: false,
        placa: false,
      },
      errors: {
        required: {
          nombre: false,
          placa: false,
        },
        valid: {
          nombre: true,
          placa: true,
        },
      },
    };
    this.saveChofer = this.saveChofer.bind(this);
    this.loadChofer = this.loadChofer.bind(this);
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

    if (name === "nombre") {
      this.validateNombre(value);
    }

    if (name === "placa") {
      this.validatePlaca(value);
    }
  }

  validateNombre(nombre) {
    const nombreIsValid = NOMBRE_REGEX.test(this.state.nombre);
    const errors = {
      valid: { ...this.state.errors.valid, nombre: nombreIsValid },
    };

    this.setState({
      errors: { ...this.state.errors, ...errors },
    });
  }

  validatePlaca(placa) {
    const placaIsValid = PLACA_REGEX.test(this.state.placa);
    const errors = {
      valid: { ...this.state.errors.valid, placa: placaIsValid },
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
    const { nombre, placa, errors } = this.state;
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
    this.loadChofer();
  }

  loadChofer() {
    let nom = window.localStorage.getItem("choferNombre");
    let pla = window.localStorage.getItem("choferPlaca");
    let id = window.localStorage.getItem("choferId");
    ChoferService.getchoferDespachoById(
      window.localStorage.getItem("choferId")
    ).then((res) => {
      this.setState({
        id: id,
        nombre: nom,
        placa: pla,
      });
    });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  saveChofer = (e) => {
    e.preventDefault();
    let chofer = {
      id: this.state.id,
      nombre: this.state.nombre,
      placa: this.state.placa,
    };
    ChoferService.editChofer(chofer).then((res) => {
      this.props.history.push("/choferDespacho");
      this.props.history.push("/modulos/Chofer");
      confirmAlert({
        title: "Éxito",
        message: "Los datos del chofer han sido actualizados",
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
    const { nombre, placa, errors } = this.state;
    return (
      <div>
        <h1 className="text-center"> Actualizar datos del chofer</h1>
        <p></p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" class="col-sm-4">
            <h5>Nombre:</h5>
            <input
              type="text"
              className="form-control"
              defaultValue={nombre}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="nombre"
            />
            <p
              className={
                this.hasError("nombre")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("nombre")}
            </p>
          </div>
          <p></p>
          <div className="form-group" class="col-sm-4">
            <h5>Placa:</h5>
            <input
              type="text"
              className="form-control"
              defaultValue={placa}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name="placa"
            />

            <p
              className={
                this.hasError("placa")
                  ? "error-message__visible"
                  : "error-message"
              }
            >
              {this.displayError("placa")}
            </p>
          </div>
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-success"
            type="submit"
            disabled={this.isFormInvalid()}
            onClick={this.saveChofer}
          >
            Actualizar
          </button>
        </form>
      </div>
    );
  }
}

export default EditChofer;
