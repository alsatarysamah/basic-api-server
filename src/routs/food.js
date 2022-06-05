"use strict";
const express = require("express");


const { food } = require("../models/index");

const foodRouter = express.Router();//add routing functionallity from express

foodRouter.post("/food", createRecord);
foodRouter.get("/food", getAllFoods);
foodRouter.get("/food/:id", getOneFoods);
foodRouter.put("/food/:id",updateing);
foodRouter.delete("/food/:id",deleting);

async function createRecord(req,res){

    let newRecord = req.body;
    let newfood = await food.create(newRecord);
    res.status(201).json(newfood);
}

async function getAllFoods(req,res){

    const allFood = await food.findAll();
    res.status(200).json(allFood);
}


async function getOneFoods (req,res)
{

    const id = parseInt(req.params.id);
    let foodIs = await food.findOne({ where: { id: id } });
    res.status(200).json(foodIs);
}

async function updateing(req,res)
{
    const id = parseInt(req.params.id);
let newRecord =req.body;
let toBeUpdate=await food.findOne({where:{id:id}});
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
    let deleteFood = await food.destroy({ where: { id: id } });

    //if we have the name id instead of personId we can use a short cut
    //   let deletePerson = await People.destroy({ where: { id } });

    res.status(204).json(deleteFood);
}
module.exports = foodRouter;