import { Router } from 'express';
import { parseScript } from '../controller/ScriptParser.controller';

const router = Router();

router.post('/', parseScript);

export { router as parserRouter };