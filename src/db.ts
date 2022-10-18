import { createConnection } from "typeorm";
import express from "express";
import { Company } from "./entities/Company";
import { Station } from "./entities/Station";
import { StationType } from "./entities/StationType";

const app = express();
export const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'root',
			database: 'dbVirta',
			entities: [Company, Station, StationType],
			synchronize: true,
		});
		console.log('Connected to Postgres');		
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};