import React, {useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {


    // obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    // obtener la funcion del context tarea
    const tareasContext = useContext(tareaContext);
    const {agregarTarea} = tareasContext;

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    // extraer nombre de tarea
    const {nombre} = tarea;

    // Si no se ha seleccionado proyecto
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    // extraer el proyecto actual con Array destructuring
    const [proyectoActual] = proyecto

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    // funcion de agregar tarea
    const onSubmit = e => {
        e.preventDefault();
        // validar

        // pasar la validacion

        // agregar la tarea al state de tareas
        tarea.proyectoId = proyectoActual.id;
        tarea.estado = false;
        agregarTarea(tarea);

        // reiniciar el form
    }
    
    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea.."
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />
                </div>
            </form>
        </div>
     );
}
 
export default FormTarea;