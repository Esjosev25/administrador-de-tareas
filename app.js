require('colors');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar } = require('./helpers/inquirer');
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
                break;

            case '6':
                //borrar tareas

                const id = await listadoTareasBorrar(tareas.listarTareas);
                tareas.borrarTarea(id);
                break;
            default:
                break;
        }


        // guardarArchivo(tareas.listarTareas);

        await pausa();
    } while (opcion !== '0'); // 0 es la opción de salir
    console.log(`Opción seleccionada: ${opcion}`.green);

}

main();