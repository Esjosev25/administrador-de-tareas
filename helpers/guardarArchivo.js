const fs = require('fs');

const filename = `./db/data.json`;	// agregar .json al nombre del archivo
const guardarArchivo = (data) => {
    fs.writeFileSync(filename, JSON.stringify(data));
}
const leerArchivo = () => {
    if (!fs.existsSync(filename)) {
        return null;
    }

    const data = fs.readFileSync(filename, { encodig: 'utf-8' });
    return JSON.parse(data);
}
module.exports = {
    guardarArchivo,
    leerArchivo
}