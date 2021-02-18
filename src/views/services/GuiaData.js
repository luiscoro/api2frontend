import axios from 'axios'

const GUIA_REST_API_URL = 'http://localhost:9191/api/guiaRemisionDespacho';

class GuiaData {

    getAll(){
        return axios.get(GUIA_REST_API_URL);
    }

    getguiaDespachoById(guiaId) {
        return axios.get(GUIA_REST_API_URL + '/' + guiaId);
    }
    
    deleteGuia(guiaId) {
        return axios.delete(GUIA_REST_API_URL + '/' + guiaId);
    }

    addGuia(guia) {
        return axios.post(""+GUIA_REST_API_URL, guia);
    }

    editGuia(guia) {
        return axios.put(""+GUIA_REST_API_URL, guia);
    }
}

export default new GuiaData();