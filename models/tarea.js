const { v4: uuidv4 } = require('uuid');
class Tarea {
    id = '';
    descripcion = '';
    completadoEn = null;


    // @param {string} id
    constructor(desc) {
        this.id = uuidv4();
        this.descripcion = desc;
    }
}

module.exports = Tarea;