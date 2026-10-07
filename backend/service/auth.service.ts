import { prisma } from "../config/prisma";
import bcrypt from "bcrypt"

export async function isExists(email) {
    const user=await prisma.user.findUnique({
        where:{
            email
        }
    })
    return user
    

}


export async function passwordHash(password) {
    const hash=await bcrypt.hash(password,12)
    return hash
    
}

export async function createUser(data) {
    const user=await prisma.user.create({
        data
    })
    return user
    

    
}


export async function isMatch (password,hashedPassword) {
    const isMatch=await bcrypt.compare(password,hashedPassword)
    return isMatch
    
}
