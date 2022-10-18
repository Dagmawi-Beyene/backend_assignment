
import { Router } from 'express';

import { getStationTypes, getStationType, createStationType, updateStationType, deleteStationType } from '../controller/StationType.controller';

const router = Router();

router.get('/', getStationTypes);
router.get('/:id', getStationType);
router.post('/', createStationType);
router.put('//:id', updateStationType);
router.delete('/:id', deleteStationType);

export { router as stationTypeRouter };