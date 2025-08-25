import crypto from 'crypto';
export const generateOTP = () => {
    return (Math.floor(100000 + Math.random() * 900000)).toString();
}

export const generateVerificationLink = () => {
    return crypto.randomBytes(32).toString('hex');
}