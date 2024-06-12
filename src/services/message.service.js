
// *** CAPA INTERMEDIA DE SERVICIO DEL MVC  ***

// Separa La Capa Controllers y La Capa Model

//MANEJA PERSISTENCIA DE ARCHIVOS EN MongoDB 
import messagesModel from '../models/messages.model.js'


// 1) Servicios para: 
const createMessage = async (message) => {

    console.log("pase por el Servicio - createMessage")
    return await messagesModel.create(message)
}



// 2) Servicios para:
const getMessages = async () => {

    console.log("pase por el Servicio - getMessages")
    return await messagesModel.find().lean() 

}



// Exportando todos Los Servicios por Defecto
export default {

    createMessage,
    getMessages
    

};