import express from "express";
import { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter, deleteAllCharacters, importCharacters } from "../controllers/CharacterController.js"

const router = express.Router()

router.get('/', getCharacters)
router.get('/:id', getCharacter)
router.post('/', createCharacter)
router.patch('/:id', updateCharacter)
router.delete('/:id', deleteCharacter)
router.delete('/', deleteAllCharacters)
router.post('/import', importCharacters)

export default router