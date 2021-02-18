import axios from 'axios'

const TIPO_REST_API_URL = 'http://localhost:9191/api/tipoNotaCredito';

class TipoData {

    getAll(){
        return axios.get(TIPO_REST_API_URL);
    }

    getgettipoNotaCreditoById(tipoId) {
        return axios.get(TIPO_REST_API_URL + '/' + tipoId);
    }
    
    deleteTipo(tipoId) {
        return axios.delete(TIPO_REST_API_URL + '/' + tipoId);
    }

    addTipo(tipo) {
        return axios.post(""+TIPO_REST_API_URL, tipo);
    }

    editTipo(tipo) {
        return axios.put(""+TIPO_REST_API_URL, tipo);
    }
}

export default new TipoData();