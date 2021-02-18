import React from 'react'
import TipoService from '.././services/TipoData';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DETALLE_REGEX = new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/);

class AddTipo extends React.Component {
    
   constructor(props){
        super(props);
        this.state ={
            detalle: '',
            touched: {
            detalle: false
             },
            errors: {
            required: {
            detalle: false,

            },
            valid: {
            detalle: true,

        }
      }
        }
       this.saveTipo = this.saveTipo.bind(this);
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
      required: { ...this.state.errors.required, [name]: false }
    };
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, ...errors }
    });
  }

  handleBlur(event) {
    const field = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
    this.validate(event);
  }

    validate(event) {
    const target = event.target;
    const { value, name } = target;

    if (value.length === 0) {
      const errors = {
        required: { ...this.state.errors.required, [name]: true }
      };

      this.setState({
        errors: { ...this.state.errors, ...errors }
      });
      return;
    }

    if (name === 'detalle') {
      this.validateDetalle(value);
        }


  }

  validateDetalle(detalle) {
    const detalleIsValid = DETALLE_REGEX.test(this.state.detalle);
    const errors = {
      valid: { ...this.state.errors.valid, nombre: detalleIsValid }
    };

    this.setState({
      errors: { ...this.state.errors, ...errors }
    });
    }
    
   

  hasError(field) {
    return (this.state.errors.required[field] || !this.state.errors.valid[field]) && this.state.touched[field];
  }

  isFormInvalid() {
    const { detalle, errors } = this.state;
    const { required, valid } = errors;
    const isSomeFieldRequired = Object.keys(required).some(error => required[error]);
    const isSomeFieldInvalid = Object.keys(valid).some(error => !valid[error]);

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

    saveTipo = (e) => {
        e.preventDefault();
        let tipo = {detalle: this.state.detalle};
        TipoService.addTipo(tipo)
            .then(res => {
                this.props.history.push('/tipoNotaCredito');
               
                this.props.history.push('/modulos/TipoNota');
                confirmAlert({
                    title: 'Éxito',
                    message: 'El tipo de nota de crédito ha sido registrado',
                    buttons: [
                            {
                            label: 'Aceptar',
                            onClick: () => confirmAlert({title:'OK'})
                            }
                    ],
      
                });
            }).catch(error => {
             confirmAlert({
                    title: 'Error',
                    message: 'Ya existe un tipo de nota de crédito con el detalle ingresado',
                     buttons: [
                            {
                            label: 'Aceptar',
                            onClick: () => confirmAlert({title:'OK'})
                            }
                    ],
                });
            });

    }


    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        const { detalle, errors } = this.state;
        return(
            <div>
                <h1 className="text-center"> Registrar nuevo tipo de nota de crédito</h1>
                <p></p>
                <form onSubmit={this.handleSubmit} >

                    <div className="form-group" class="col-sm-4" >
                        <h5>Detalle:</h5>
                        
                        <input type="text" className="form-control"
                            value={detalle}
                            onChange={this.handleChange}
                           onBlur={this.handleBlur}
                            name="detalle" />
                         <p className={this.hasError('nombre') ? 'error-message__visible' : 'error-message'}>
              {this.displayError('detalle')}
            </p>
                    </div>
                   
               

                    <br></br>
                
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-success" type="submit" disabled={this.isFormInvalid()} onClick={this.saveTipo}>Guardar</button>
            </form>
    </div>
        );
    }
}

export default AddTipo
