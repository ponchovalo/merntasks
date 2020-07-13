const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crea una nueva tarea
exports.crearTarea = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {

        // extraer el proyecto
        const { proyecto } = req.body;

        const existeproyecto = await Proyecto.findById(proyecto);
        if(!existeproyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeproyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'});
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});
    } catch (error) {
        console.log(error)
    }
} 

// Obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    
    try {
        // extraer el proyecto
        const { proyecto } = req.body;

        const existeproyecto = await Proyecto.findById(proyecto);
        if(!existeproyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeproyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'});
        }

        // obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    try {
        // extraer el proyecto
        const { proyecto, nombre, estado } = req.body;

        // si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(401).json({ msg: 'No existe esa tarea'});
        }

        const existeproyecto = await Proyecto.findById(proyecto);
        
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeproyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'});
        }
        
        // Crear un objeto con la nueva informacion
        const nuevaTarea = {};
        if(nombre) nuevaTarea.nombre = nombre;
        if(estado) nuevaTarea.estado = estado;

        // guardar cambios
        tarea = await Tarea.findOneAndUpdate( { _id: req.params.id }, nuevaTarea, {new: true} );
        res.json({tarea});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// eliminar tarea
exports.eliminarTarea = async (req, res) => {
    try {
        // extraer el proyecto
        const { proyecto } = req.body;

        // si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(401).json({ msg: 'No existe esa tarea'});
        }

        const existeproyecto = await Proyecto.findById(proyecto);
        
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeproyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({ msg: 'No autorizado'});
        }
        
        await Tarea.findOneAndRemove({_id: req.params.id})
        res.json({ msg: 'Tarea eliminada' })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}