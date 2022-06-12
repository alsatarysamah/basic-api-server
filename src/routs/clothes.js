
const express = require("express");
// const { json } = require("express/lib/response");

const {clothes} = require("../models/index.js");
const cloRouter = express.Router();
cloRouter.get("/clothes",getAll);
cloRouter.post("/clothes",creatRecord);
cloRouter.put("/clothes/:id",updating);
cloRouter.delete("/clothes/:id",deleting);
cloRouter.get("/clothes/:id",getOneRecored);


async function creatRecord(req,res){

    let newRecord = req.body;
    let newclo = await clothes.create(newRecord);
    res.status(201).json(newclo);
}


async function getAll(req,res){

    const all = await clothes.findAll();
    res.status(200).json(all);
}


async function getOneRecored (req,res)
{

    const id = parseInt(req.params.id);
    let clothesIs = await clothes.findOne({ where: { id: id } });
    res.status(200).json(clothesIs);
}

async function updating(req,res)
{
    const id = parseInt(req.params.id);
let newRecord =req.body;
let toBeUpdate=await clothes.findOne({where:{id:id}});
if(toBeUpdate)
{
    let x=await toBeUpdate.update(newRecord);
    res.status(201).json(x);

}
else
{
    res.status(404);  
}

}

async function deleting(req,res){

    let id = parseInt(req.params.id);
    let deleteclo = await clothes.destroy({ where: { id: id } });

    //if we have the name id instead of personId we can use a short cut
    //   let deletePerson = await People.destroy({ where: { id } });

    res.status(204).json(deleteclo);
}
module.exports = cloRouter;