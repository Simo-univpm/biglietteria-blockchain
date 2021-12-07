

function generateRandomPassword(length){
    
    const digits = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++ ) {
        password += digits[Math.floor(Math.random() * 10)];
    }

    return password.toString()
}

module.exports.generateRandomPassword = generateRandomPassword;