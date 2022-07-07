const register = (req, res, client, bcrypt)=>{
    const {Name, Password, Email} = req.body;
    async function HashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const HashedPassword =  await bcrypt.hash(password, salt);
        return HashedPassword
    }
    async function main(){
        const HashedPassword = await HashPassword(Password);
        const newUser = {
            Name : Name,
            Pasword: HashedPassword,
            Email: Email
        }
        try{
            await client.connect();
            await createNewUser(newUser)
        }
        catch(e){
            console.log(e);
        }
        finally{
            await client.close();
        }
    }
    
    main().catch(console.error)
    
    async function createNewUser(newUser){
        try{
            const result = await client.db("Kiosk").collection("Users").insertOne(newUser)
            res.status(200).json(result.insertedId);
        }
        catch(e){
            console.log(e)
            res.status(400).json("An Error Ocurred")
        }

    }


}

module.exports = {
    register : register
}


