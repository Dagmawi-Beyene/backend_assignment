import {Request, Response} from "express";
import { StationType } from '../entities/StationType';

export const getStationTypes = async (req: Request, res: Response) => {
	try {
		const stationTypes = await StationType.find();
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Successfully get the data of Station Types",
			"result": stationTypes
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

export const getStationType = async (req: Request, res: Response) => {
	try {
		const stationType = await StationType.findOne(req.params.id);
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Successfully get the data of Perticular Station Type",
			"result": stationType
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

export const createStationType = async (req: Request, res: Response) => {
	//validate the request
	if(!req.body.name){
		res.status(400).send({
			"success": false,
			"statusCode": 400,
			"message": "Content can not be empty!"
		});
		return;
	}
	//create a station type
	try {
		const stationType = await StationType.create({
			name: req.body.name,
			maxPower: req.body.maxPower,
		}).save();
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Successfully created a new Station Type",
			"result": stationType
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

export const updateStationType = async (req: Request, res: Response) => {
	//validate the request
	if(!req.body.name){
		res.status(400).send({
			"success": false,
			"statusCode": 400,
			"message": "Content can not be empty!"
		});
		return;
	}
	//update a station type
	try {
		const stationType = await StationType.update(req.params.id, {
			name: req.body.name,
		});
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Successfully updated the Station Type",
			"result": stationType
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

export const deleteStationType = async (req: Request, res: Response) => {
	//delete a station type
	try {
		const stationType = await StationType.delete(req.params.id);
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Successfully deleted the Station Type",
			"result": stationType
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

// Path: routes/StationType.routes.ts


