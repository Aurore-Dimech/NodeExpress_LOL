import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const signUp = async (req, res) => {
    const { email, pseudo, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(email === '' || pseudo === '' || password ===''){
        res.json({error: 'All fields must be completed'})
    } else if (existingUser) {
        return res.status(400).json({ error: 'This email is already registered' })
    } else {

        prisma.user.create({
            data: {
                email,
                pseudo,
                password: hashedPassword
            }
        })
    
        .then((user) => {
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { 
                expiresIn: '2h'
            })
        
            res.json(token)
        })
        .catch((error) => {
            res.json({error: error.message})
        })
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    })

    if (!user){
        return res.json({error: 'User not found'})
    }
    
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.json({error: 'Password not valid'})
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })

    res.json(token)
}

export { signUp, logIn }