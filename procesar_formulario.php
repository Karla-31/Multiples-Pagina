<?php
// Ruta al archivo JSON
$archivo_json = 'data.json';

// Procesar datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $datos = array(
        'nombre' => $_POST['nombre'],
        'edad' => $_POST['edad']
    );

    // Leer datos actuales del archivo JSON (si existe)
    $datos_actuales = file_exists($archivo_json) ? json_decode(file_get_contents($archivo_json), true) : array();

    // Agregar nuevos datos al array
    $datos_actuales[] = $datos;

    // Codificar el array como JSON y guardar en el archivo
    if (file_put_contents($archivo_json, json_encode($datos_actuales, JSON_PRETTY_PRINT))) {
        echo "Datos guardados correctamente";
    } else {
        echo "Error al guardar los datos";
    }
}

// Borrar datos (ejemplo)
function borrarDatos() {
    // Borrar el archivo JSON (o editar según sea necesario)
    if (file_exists($archivo_json)) {
        unlink($archivo_json);
        echo "Datos eliminados correctamente";
    } else {
        echo "No se encontraron datos para eliminar";
    }
}
?>
