import { PrismaClient } from "@prisma/client"
import { exec } from 'child_process';

const prisma = new PrismaClient()

const getCharacters = (req, res) => {
    prisma.character.findMany() 
    .then((characters) => {
        res.json(characters)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getCharacter = (req, res) => {
    let id = Number(req.params.id) 

    prisma.character.findUnique({
        where : {
            id: id
        }
    })
    .then((character) => {
        res.json(character)
    })
    .catch((error) => {
        res.json(error)
    })
}

const createCharacter = (req, res) => {
    let character = req.body

    prisma.character.create({
        data: {
            name: character.name,
            type: character.type
        }
    })
    .then((character) => {
        res.json(character)
    })
    .catch((error) => { 
        res.json(error)
    }) 
}

const updateCharacter = (req, res) => {
    let id = Number(req.params.id)
    let character = req.body

    prisma.character.update({
        where : {
            id: id
        },
        data: {
            name: character.name,
            type: character.type
        }
    })
    .then((character) => {
        res.json(character)
    })
    .catch((error) => {
        res.json(error)
    })
}

const deleteCharacter = (req, res) => {
    let id = Number(req.params.id)

    prisma.character.delete({
        where : {
            id: id
        }
    })
    .then((character) => {
        res.json(character)
    })
    .catch((error) => {
        res.json(error)
    })
}

const deleteAllCharacters = (req, res) => {
    prisma.character.deleteMany()
    .then((characters) => {
        res.json(characters)
    })
    .catch((error) => {
        res.json(error)
    })
}

const importCharacters = (req, res) => {
    exec('npm run seed', (error, stderr) => {
        if (error) {
            res.json({ error });
            return;
        }
        if (stderr) {
            res.json({ error: stderr });
            return;
        }
        res.send('Seed script completed');
    });
}

export { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter, deleteAllCharacters, importCharacters }