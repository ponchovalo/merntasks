import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'

const ListadoProyectos = () => {

    // eextraer proyectos del state principal
    const proyectosContext = useContext(proyectoContext);

    const {proyectos, obtenerProyectos} = proyectosContext;
        
    useEffect(() => {
        obtenerProyectos()
    }, [])

    if(proyectos.length === 0) return <p>No hay proyecto comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            {proyectos.map(proyecto => (
                <Proyecto
                    key={proyecto._id} 
                    proyecto={proyecto}
                />
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;