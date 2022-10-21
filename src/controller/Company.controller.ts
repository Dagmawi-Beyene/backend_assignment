import {Request, Response} from "express";
import { getTreeRepository, In } from "typeorm";
import { Company } from '../entities/Company';
import { Station } from '../entities/Station';

export const getCompanies = async (req: Request, res: Response) => {
	     try {
        const companies = await Company.find();
        res.status(200).send({
            "success": true,
            "statusCode": 200,
            "message": "Successfully get the data of Companies",
            "result": companies
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

export const getCompany = async (req: Request, res: Response) => {
	    try {
        const company = await Company.findOne(req.params.id);
        res.status(200).send({
            "success": true,
            "statusCode": 200,
            "message": "Successfully get the data of Particular Company",
            "result": company
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

export const createCompany = async (req: Request, res: Response) => {
	//validate the request
	if(!req.body.name){
		res.status(400).send({
			"success": false,
			"statusCode": 400,
			"message": "Content can not be empty!"
		});
		return;
	}
	if(!req.body.parentCompanyId){
		res.status(400).send({
			"success": false,
			"statusCode": 400,
			"message": "You must provide a parent company id"
		});
		return;
	}
	
	//create a company
	try {
		// add comapny to parent company
		const parentCompany = await Company.findOne(req.body.parentCompanyId);
		console.log(parentCompany)
		const company = await Company.create({
			parentCompany: parentCompany,
			name: req.body.name,
		}).save();


		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Company registered successfully",
			"result": company
		});
	} catch (err) {
		res.status(200).send({
			"success": false,
			"statusCode": 200,
			"message": "Something went wrong!!! Try again.",
		});
	}
}

export const updateCompany = async (req: Request, res: Response) => {
	console.log(req);
	//validate the request
	if(!req.body.name){
		res.status(400).send({
			"success": false,
			"statusCode": 400,
			"message": "Content can not be empty!"
		});
		return;
	}
	//update a company
	const parentCompany = await Company.findOne(req.body.parentCompanyId);
		const company = await Company.create({
			parentCompany: parentCompany,
			name: req.body.name,
		}).save();
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Company registered successfully",
			"result": company
		});
	try {
	
	} catch (err) {
		res.status(200).send({
			"success": false,
			"statusCode": 200,
			"message": "Something went wrong!!! Try again.",
		});
	}
}

export const deleteCompany = async (req: Request, res: Response) => {
	//delete a company
	try {
		const company = await Company.delete(req.params.id);
		res.status(200).send({
			"success": true,
			"statusCode": 200,
			"message": "Company deleted successfully",
			"result": company
		});
	} catch (err) {
		res.status(200).send({
			"success": false,
			"statusCode": 200,
			"message": "Something went wrong!!! Try again.",
		});
	}
}

// We also want to have an endpoint that takes a company id and responds with data (stationId,
// 	stationName, maxPower) about all stations that belong to the given company and its child companies

export const getCompanyStations = async (req: Request, res: Response) => {
	//delete a company
	try {
		const company = await Company.findOne(req.params.id);
		
		if(company){
			const childCompanies = await getTreeRepository(Company).findDescendants(company);
			console.log(childCompanies);
			const childCompaniesIds = childCompanies.map((childCompany) => childCompany.id);
			const stations = await Station.find({
				relations: ["company"],
				where: {
					company: In([req.params.id, ...childCompaniesIds])
				}
			});
			res.status(200).send({
				"success": true,
				"statusCode": 200,
				"message": "Company stations fetched successfully",
				"result": stations
			});
			
		}
	
	} catch (err) {
		res.status(200).send({
			"success": false,
			"statusCode": 200,
			"message": "Something went wrong!!! Try again.",
		});
	}
}






