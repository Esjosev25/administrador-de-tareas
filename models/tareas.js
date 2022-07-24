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
        if (listado.length == 0 && completadas) {
            console.log('Aún no has completado ninguna tarea'.grey);
        } else if (listado.length == this.listarTareas.length && completadas || !completadas && listado.length == 0) {
            console.log('Ya completaste todas tus tareas :D'.grey);
        }
        listado.forEach((tarea, i) => {
            this.imprimirTarea(tarea, i, true);
        });
    }
    imprimirTarea(tarea, i, showTime = false) {
        const index = `${(i + 1) + '.'}`.green;
        const { descripcion, completadoEn } = tarea;
        const status = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
        let line = `${index} ${descripcion}`;
        if (completadoEn && showTime) {
            line += ` ${'→'.brightYellow} ${completadoEn.green}`
        } else {
            line += ` :: ${status}`
        }
        console.log(line);
    }

    borrarTarea(id = '') {
        if (this._listado[id])
            delete this._listado[id];
    }

    toggleCompletadas(ids = []) {


        this.listarTareas.forEach(tarea => {
            const { id } = tarea;
            if (ids.includes(id)) {
                if (!tarea.completadoEn)
                    tarea.completadoEn = new Date().toISOString();
            } else {

                this._listado[id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;