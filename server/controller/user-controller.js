import User from '../model/User.js';


export const getUsers= async(request,response)=>{
try{
 const Users= await User.find({});
 return response.status(200).json(Users);
}
catch(error){
return response.status(500).json(error.message);
}

};

export const addUser= async(request,response)=>{
  
    try{
     let exist= await User.findOne({sub: request.body.sub});
     let Ai_exist= await User.findOne({sub: '1234567890'});
     if(!Ai_exist)
     {
        const obj={
            "sub": "1234567890",
            "email": "GOAI@gmail.com",
            "email_verified": true,
            "nbf": 1609459200,
            "name": "GO AI",
            "picture": "11234",
            "given_name": "GO AI",
            "family_name": "GO AI",
            "locale": "en",
          }
          const newUser=new User(obj);
          await newUser.save();
          
     }
     if(exist)
    {
        response.status(200).json({'msg': "user Already exist"});
        return;
     }

     const newUser=new User(request.body);
     await newUser.save();
   return  response.status(200).json(newUser);

    }
    catch(error){
     return response.status(500).json(error.message);
    }
}