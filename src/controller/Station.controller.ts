import {Request, Response} from "express";
import { StationType } from "../entities/StationType";
import { Company } from "../entities/Company";
import { Station } from '../entities/Station';

export const getStations = async (req: Request, res: Response) => {
    try {
        const stations = await Station.find();
        res.status(200).send({
            "success": true,
            "statusCode": 200,
            "message": "Successfully get the data of Stations",
            "result": stations
        });
    } catch (err) {
        res.status(500).send({
            "success": false,
            "statusCode": 500,
            "message": "Something went wrong!!! Try again",
            "result": err
        });
    }
}

export const getStation = async (req: Request, res: Response) => {
	try {
		const station = await Station.findOne(req.params.id);
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Successfully get the data of Perticular Station",
			"result": station
		});
	} catch (err) {
		res.status(500).send({
			"success": false,
			"statusCode": 500,
			"message": "Something went wrong!!! Try again",
			"result": err
		});
	}
}

export const createStation = async (req: Request, res: Response) => {
	//validate the request
	if(!req.body.name){
		res.status(400).send({
			"success": false,
			"statusCode": 400,
			"message": "Content can not be empty!"
		});
		return;
	}
	
	try {
		const ownerCompany = await Company.findOne(req.body.ownerCompanyId);
		const stationType = await StationType.findOne(req.body.stationTypeId);
		const station = await Station.create({
			company: ownerCompany,
			stationType: stationType,
			name: req.body.name,
		}).save();
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Successfully created the Station",
			"result": station
		});
	} catch (err) {
		res.status(500).send({
			"success": false,
			"statusCode": 500,
			"message": "Something went wrong!!! Try again",
			"result": err
		});
	}
}

export const updateStation = async (req: Request, res: Response) => {
	//validate the request
	if(!req.body.name){
		res.status(400).send({
			"success": false,
			"statusCode": 400,
			"message": "Content can not be empty!"
		});
		return;
	}
	//update a station
	try {
		const station = await Station.update(req.params.id, {
			name: req.body.name,
		});
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Station updated successfully",
			"result": station
		});
	} catch (err) {
		res.status(500).send({
			"success": false,
			"statusCode": 500,
			"message": "Something went wrong!!! Try again",
			"result": err
		});
	}
}

export const deleteStation = async (req: Request, res: Response) => {
	//delete a station
	try {
		const station = await Station.delete(req.params.id);
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Station deleted successfully",
			"result": station
		});
	} catch (err) {
		res.status(500).send({
			"success": false,
			"statusCode": 500,
			"message": "Something went wrong!!! Try again",
			"result": err
		});
	}
}

// Path: routes/station.routes.ts

