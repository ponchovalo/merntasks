import React, {useEffect, useContext} from 'react';
import AuthContext from '../../context/autenticacion/authContext'

const Barra = () => {
    // extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado  } = authContext;

    useEffect(() => {
        usuarioAutenticado()
    }, [])
    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            
            <nav className="nav-principal">
                <a href="#!">Cerrar Sesion</a>
            </nav>
        </header>
     );
}
 
export default Barra;