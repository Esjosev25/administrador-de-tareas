const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listarTareas() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });
        return listado;
    };
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareas(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        console.log();
        this.listarTareas.forEach((tarea, i) => {
            this.imprimirTarea(tarea, i);
        });

    }

    listarCompletadas(completadas = true) {
        //devolver las completadas if true ? las pendientes
        const listado = this.listarTareas.filter(tarea => {
            if (completadas) {
                return tarea.completadoEn != null;
            } else {
                return tarea.completadoEn == null;

            }
        });
        console.log();
        listado.forEach((tarea, i) => {
            this.imprimirTarea(tarea, i);
        });
    }
    imprimirTarea(tarea, i) {
        const index = `${(i + 1) + '.'}`.green;
        const { descripcion, completadoEn } = tarea;
        const status = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
        let line = `${index} ${descripcion} :: ${status}`;
        if (completadoEn) {
            line += ` ${'→'.brightYellow} ${completadoEn}`
        }
        console.log(line);
    }

    borrarTarea(id = '') {
        if (this._listado[id])
            delete this._listado[id];
    }
}

module.exports = Tareas;