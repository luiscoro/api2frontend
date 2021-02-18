import axios from 'axios'

const CHOFER_REST_API_URL = 'http://localhost:9191/api/choferDespacho';

class ChoferData {

    getAll(){
        return axios.get(CHOFER_REST_API_URL);
    }

    getchoferDespachoById(choferId) {
        return axios.get(CHOFER_REST_API_URL + '/' + choferId);
    }
    
    deleteChofer(choferId) {
        return axios.delete(CHOFER_REST_API_URL + '/' + choferId);
    }

    addChofer(chofer) {
        return axios.post(""+CHOFER_REST_API_URL, chofer);
    }

    editChofer(chofer) {
        return axios.put(""+CHOFER_REST_API_URL, chofer);
    }
}

export default new ChoferData();