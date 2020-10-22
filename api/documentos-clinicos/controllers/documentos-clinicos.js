'use strict';
const axios = require('axios');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx){
        
        // console.log(await strapi.services);
        // const { data } = await axios.get('http://192.168.0.95:4500/api/users');
        // let random = (Math.random()* (data.length-1)).toFixed(0)
        
        // const idFederadorPonele = data.filter(b=> b.id == random)[0]['phone']//data[random].phone
        const url = ctx.request.url
        const dni = url.substr(url.lastIndexOf('/')+1)
        const doc = await strapi.services['documentos-clinicos'].find({DNI:dni})
        const doc2 = await strapi.services['documentos-clinicos'].find()
        // console.log('====================================');
        // console.log(dni,doc,doc2);
        // // console.log(url.substr(url.lastIndexOf('/')+1),ctx.query,"----------------------------------------------",ctx);
        // console.log('====================================');
        return doc.map(b=> {
            b.url = "hola"
            b.created_by = {...b.created_by}
            b.updated_by = {...b.updated_by}
            return {...b}
        })

    }

};
