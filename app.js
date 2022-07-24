require('colors');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasChecklist } = require('./helpers/inquirer');
const { guardarArchivo, leerArchivo } = require('./helpers/guardarArchivo');
//models

const Tareas = require('./models/tareas');

const main = async () => {
    let opcion = '';
    const tareas = new Tareas();
    const tareasGuardadas = leerArchivo();
    if (tareasGuardadas) {
        tareas.cargarTareas(tareasGuardadas);
    }
    do {
        opcion = await inquirerMenu();
        let ok;
        switch (opcion) {
            case '1':
                //crear tarea
                const desc = await leerInput('Ingrese una descripción: ');
                tareas.crearTarea(desc);
                console.log('Tarea creada correctamente'.green);

                break;
            case '2':
                //listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                //listar completadas
                tareas.listarCompletadas(true);
                break;
            case '4':
                //listar pendientes
                tareas.listarCompletadas(false);
                break;
            case '5':
                //completar tareas
                const ids = await listadoTareasChecklist(tareas.listarTareas);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                //borrar tareas

                const id = await listadoTareasBorrar(tareas.listarTareas);
                if (id !== '0') {
                    ok = await confirmar('¿Estás seguro?');
                    if (ok)
                        tareas.borrarTarea(id);
                }
                break;
            case '0':
                ok = await confirmar('¿Estás seguro?');
                if (!ok)
                    opcion = '';
                break;
        }


        guardarArchivo(tareas.listarTareas);

        await pausa();


    } while (opcion !== '0'); // 0 es la opción de salir


}

main();