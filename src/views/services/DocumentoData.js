import axios from "axios";

const DOCUMENTO_REST_API_URL = "http://localhost:9191/api/documentoEmbarque";

class DocumentoData {
  getAll() {
    return axios.get(DOCUMENTO_REST_API_URL);
  }

  getdocumentoEmbarqueById(docId) {
    return axios.get(DOCUMENTO_REST_API_URL + "/" + docId);
  }

  deleteDocumento(docId) {
    return axios.delete(DOCUMENTO_REST_API_URL + "/" + docId);
  }

  addDocumento(documento) {
    return axios.post("" + DOCUMENTO_REST_API_URL, documento);
  }

  editDocumento(documento) {
    return axios.put("" + DOCUMENTO_REST_API_URL, documento);
  }
}

export default new DocumentoData();
