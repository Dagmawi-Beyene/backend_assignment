import { Router } from 'express';
import { getCompanies, getCompany, createCompany, updateCompany, deleteCompany, getCompanyStations } from '../controller/Company.controller';

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);
router.get('/:id/stations', getCompanyStations);

export { router as companyRouter };