import {env} from "../config/env"
import jwt from "jsonwebtoken"

export function generateToken(user) {
    return jwt.sign(
    {
        sub: user.id,
        role: user.role
    },
    env.JWT_SECRET,
    {
        expiresIn: "15m"
    }
)



    
}



