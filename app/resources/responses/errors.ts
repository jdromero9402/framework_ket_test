// @import_config_files Import config files
import { i18n_global } from "@ket_modules/config/globals";
// @end

class ErrorResponse {
    
    constructor() {}

    /**
     * Metodo que permite construir un objeto en formato JSON que contiene la estructura de mensajes
     * @returns [json] Objeto en formato JSON
     */
    buildJson() {
        var json = {
            // Add errors
        };

        return json;
    }
}

export default new ErrorResponse().buildJson;
