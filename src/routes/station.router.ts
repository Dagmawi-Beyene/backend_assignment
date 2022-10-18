import { Router } from 'express';
import { getStations, getStation, createStation, updateStation, deleteStation } from '../controller/Station.controller';

const router = Router();

router.get('/', getStations);
router.get('/:id', getStation);
router.post('/', createStation);
router.put('/:id', updateStation);
router.delete('/:id', deleteStation);

export { router as stationRouter };