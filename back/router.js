import express from 'express';
import characters from './routes/CharacterRoutes.js'
import auth from './routes/AuthRoutes.js'

const router = express.Router();

router.use('/champions', characters) 
router.use('/auth', auth)

export default router