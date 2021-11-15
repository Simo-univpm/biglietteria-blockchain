

function getToken(req){

    let token;

    // controllo della presenza del token del login nei cookies

    if (req.headers.cookie!=undefined){
        
        const cookies = req.headers.cookie.split("; ")

        for(let i=0; i<cookies.length; i+=1){
            const cookie = cookies[i].split("=")
            if (cookie[0]=="auth-token")
                token = cookie[1]
        }
    }
    
    return token

}


module.exports = getToken;