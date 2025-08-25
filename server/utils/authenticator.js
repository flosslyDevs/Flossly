
import jwt from 'jsonwebtoken'
import { secretKey } from '../utils/jwt'

export const isValidSession = (event) => {
    const token =  getCookie(event, 'accessToken')
    try {
     const decoded = jwt.verify(token, secretKey)
     if (decoded.email) return true  
    }
    catch(err) {
        return false
    }
      
}

export const isValidAdminSession = (event) => {
    const token =  getCookie(event, 'accessToken')
    try {
        const decoded = jwt.verify(token, secretKey)
        if (decoded.email && decoded.isAdmin) return true  
       }
       catch(err) {
           return false
       }
}
