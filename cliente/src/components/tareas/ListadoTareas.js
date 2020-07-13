import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const ListadoTareas = () => {
    // obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    // obtener tareas desde context tareas
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    // Si no se ha seleccionado proyecto

    if(!proyecto) return null;

    const [proyectoActual] = proyecto
   
    // eliminar proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }

    return ( 
        
        
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li>No hay Tareas</li>)
                    : tareasproyecto.map(tarea => (
                        <Tarea 
                            tarea = {tarea}
                        />
                    ))
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;