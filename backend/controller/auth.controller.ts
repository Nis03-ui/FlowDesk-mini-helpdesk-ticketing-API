

import {
    isExists as isExistsService,
    passwordHash as hashPasswordService,
    createUser as createUserService,
    isMatch as isMatchService,

} from "../service/auth.service";
import { AppError } from "../utils/AppError"
import {generateToken} from "../utils/jwt"

export async function register(req,res) {

    const {name,email,password}=req.body

    
    const isExists=await isExistsService(email)
    if(isExists){
        throw new AppError(
            "Email already exists",
            409,
            'EMAIL_ALREADY_EXISTS'

        )

    }

    const hashPassword=await hashPasswordService(password)

    const user=await createUserService({
        name,
        email,
        passwordHash:hashPassword
    })
    return res.status(201).json({
        success:true,
        message:"User created successfully",
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        }
    })
}


export async function login(req,res) {
    const{email,password}=req.body
    const user=await isExistsService(email)
    if(!user){
        throw new AppError(
            "User not found",
            404,
            "USER_NOT_FOUND"
        )
    }

    const isMatch=await isMatchService(user.passwordHash,password)
    if(!isMatch){
        throw new AppError(
            "Invalid credentials",
            401,
            "INVALID_CREDENTIALS"
        )
    }
    const token=generateToken(user)

    

    return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        accessToken:token,
        user:{
            email:user.email
        }
    })
    
}