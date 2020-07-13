import React, {useEffect, useContext} from 'react';
import AuthContext from '../../context/autenticacion/authContext'

const Barra = () => {
    // extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerraSesion  } = authContext;

    useEffect(() => {
        usuarioAutenticado()
    }, [])
    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerraSesion()}
                >Cerrar Sesion</button>
            </nav>
        </header>
     );
}
 
export default Barra;