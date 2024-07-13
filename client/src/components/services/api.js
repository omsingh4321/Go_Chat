import axios from 'axios';

const url="http://localhost:5000";

export const addUser= async (data)=>{
    try{
      await axios.post(`${url}/add`,data);
    }
    catch(error)
    {
        console.log("Error Occuring"+error);
    }
}
export const getUsers=async()=>{
  try{
    const response=await axios.get(`${url}/users`);
    return response.data;

  }
  catch(error)
  {
   console.log("Error in getUsers:- "+ error.message);
  }

}
export const setConversation=async(data)=>{
  try{
    await axios.post(`${url}/conversation/add`,data);

  }
  catch (error){
    console.log("Error in setConversation:- "+ error.message);
  }
}
export const getConversation=async(data)=>{
  try{
    let response=await axios.post(`${url}/conversation/get`,data);
   return response.data;
  }
  catch (error){
    console.log("Error in getConversation:- "+ error.message);
  }
}
export const newMessage=async(data)=>{
  try{
   await axios.post(`${url}/message/add`,data);
  }
  catch(error)
  {
    console.log("Error in newMessage"+ error.message);
  }
}
export const getMessage=async(id)=>{
  try{
    let response= await axios.get(`${url}/message/get/${id}`);
    return response.data;
  }
  catch(error)
  {
    console.log("Error in getMessage",error.message);
  }
}
export const uploadFile=async(data)=>{
  try{
    return await axios.post(`${url}/file/upload`,data);
  }
  catch(error){
    console.log("Error in uploadFile ",error.message);
  }
}
