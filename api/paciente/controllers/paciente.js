'use strict';

const axios = require('axios');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');


module.exports = {

    async find(ctx){
        const pacientes = await strapi.services.paciente.find(ctx.query)

        // const { data } = await axios.get('http://192.168.0.95:4500/api/users');
        // let random = (Math.random()* (data.length-1)).toFixed(0)
        
        // const idFederadorPonele = data.filter(b=> b.id == random)[0]['phone']//data[random].phone

        return pacientes.map(b=> {
           
            b.created_by = {...b.created_by}
            b.updated_by = {...b.updated_by}
            return {...b}
        })

    },
    async create(ctx) {
        const {dni,nombre, apellidoPaterno,fechaNacimiento,genero,} = ctx.request.body
        console.log('====================================');
        console.log(ctx.request.body);
        console.log('====================================');
        const pacientes = await strapi.services.paciente.find({dni: dni})
        if (pacientes.length> 0) {
            pacientes[0]['encontrado']=true
            return pacientes
        }
        else 
        {
            // const { data } = await axios.post('http://192.168.0.95:4500/api/pacientes/match',{
            //     Given: nombre,
            //     DNI: dni,
            //     ApellidoPaterno: apellidoPaterno,
            //     birthDate: fechaNacimiento,
            //     Gender: genero == 'Masculino' ? 'male' : 'female',
            // });

            // console.log('===================data=================');
            // console.log(data);
            // console.log('==============data======================');
            // return data
            let entity;
            if (ctx.is('multipart')) {
              const { data, files } = parseMultipartData(ctx);
              entity = await strapi.services.paciente.create(data, { files });
            } else {
              entity = await strapi.services.paciente.create(ctx.request.body);
            }
            return sanitizeEntity(entity, { model: strapi.models.paciente });
        }
        console.log("------------------------------");
        console.log(ctx.is('multipart'),ctx.request.body.dni,pacientes);
        console.log("------------------------------");

      },



};

/*
    CREATE TABLE equipments_backup AS SELECT * FROM equipments
    DELETE FROM foo AS f WHERE f.bar = 'dog';
    DELETE pacientes WHERE dni IN (SELECT dni FROM duplicate_table) 
    SELECT DISTINCT * FROM pacientes into duplicate_table 

   CREATE TABLE duplicate_table AS SELECT DISTINCT * FROM pacientes
   GROUP BY dni HAVING COUNT(dni) > 1 
   DELETE FROM pacientes WHERE dni in (SELECT dni FROM duplicate_table)
   INSERT pacientes SELECT * FROM duplicate_table 
   DROP TABLE duplicate_table;


   SELECT dni, MIN(ROWID) FROM pacientes
   DELETE FROM pacientes
    WHERE rowid NOT IN (
     SELECT MIN(rowid) 
     FROM pacientes 
     GROUP BY dni
    )   

https://www.imaginanet.com/blog/primeros-pasos-con-sqlite3-comandos-basicos.html

        .headers ON
        .mode column
*/
