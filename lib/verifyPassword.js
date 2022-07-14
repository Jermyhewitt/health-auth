export default function verifyPassword(password,passwordLength)
{
    if(password.length < passwordLength)
    {
        return {verified: "error", message:'Password must be at least 8 characters'};

    }
    else if(!/\d/.test(password))
    {
        return {verified: false, message:'Password must contain a number'};
    }
    else if(!/[a-z]/.test(password))
    {
        return {verified: false, message:'Password must contain a common letters'};
    }
    else if(!/[A-Z]/.test(password))
    {
        return {verified: false, message:'Password must contain a capital letters'};
    }
    else if(!/\W/.test(password))
    {
        return {verified: false, message:'Password must contain a symbol'};
    }
    else{
        return {verified: true, message:'Strong password'};
    }
}