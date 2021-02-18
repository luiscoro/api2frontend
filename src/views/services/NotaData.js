import axios from 'axios'

const NOTA_REST_API_URL = 'http://localhost:9191/api/notaCredito';

class NotaData {

    getAll(){
        return axios.get(NOTA_REST_API_URL);
    }

    getnotaCreditoById(notaId) {
        return axios.get(NOTA_REST_API_URL + '/' + notaId);
    }
    
    deleteNota(notaId) {
        return axios.delete(NOTA_REST_API_URL + '/' + notaId);
    }

    addNota(nota) {
        return axios.post(""+NOTA_REST_API_URL, nota);
    }

    editNota(nota) {
        return axios.put(""+NOTA_REST_API_URL, nota);
    }
}

export default new NotaData();