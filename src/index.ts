const express = require("express");
import { main } from './db';
import { stationRouter } from './routes/station.router';
import { stationTypeRouter } from './routes/stationType.router';
import { companyRouter } from './routes/company.router';
const app = express();

app.use(express.json());

app.use('/api/stations', stationRouter);
app.use('/api/stationtype', stationTypeRouter);
app.use('/api/companies', companyRouter);

app.listen(3000, () => {
	console.log('Now running on port 3000');
	main();
});