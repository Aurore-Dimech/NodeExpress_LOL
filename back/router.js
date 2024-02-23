import express from 'express';
import characters from './routes/CharacterRoutes.js'

const router = express.Router();

router.use('/characters', characters) 

export default router