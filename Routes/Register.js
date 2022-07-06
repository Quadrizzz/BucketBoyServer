const register = (req, res, client, bcrypt)=>{
    const {Name, Password, Email} = req.body;
    const HashedPassword =  bcrypt.hashSync(Password);
}

module.exports = {
    register : register
}


