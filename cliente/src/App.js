import React from 'react';
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/autenticacion/authState'
import tokenAuth from './config/token'
import RutaPrivada from './components/rutas/RutaPrivada'

// Revisar si hay token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token)
}
// Grabar este coentario como commit
function App() {
  console.log(process.env.REACT_APP_BAKEND_URL)
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path="/proyectos" component={Proyectos}/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
    
  );
}

export default App;
