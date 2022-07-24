require('colors');


const mostrarMenu = () => {

    return new Promise((resolve) => {
        console.clear();
        console.log('======================================================='.green);
        console.log('Bienvenido a la aplicación de gestión de tareas'.green);
        console.log('Seleccione una opción:'.green);
        console.log('======================================================='.green);
        console.log(`${'1.'.green} Crear  tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);


        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Ingrese una opción: ', (opcion) => {
            readLine.close();
            resolve(opcion);
        });

    });
}

const pausa = () => {
    return new Promise((resolve) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opcion) => {
            readLine.close();
            resolve();
        });
    });

}
module.exports = {
    mostrarMenu,
    pausa
}