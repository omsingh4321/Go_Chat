
export const formatDate=(date)=>{
    const hours= new Date(date).getHours();
    const minutes= new Date(date).getMinutes();
    return `${hours<10 ? '0'+hours : hours} : ${minutes<10 ? '0'+minutes : minutes}`;
}

export const downloadMedia=(e,orginalImage)=>{
    e.preventDefault();
   try{
     fetch(orginalImage).then(response=> response.blob()).then(blob=>{
        const url=window.URL.createObjectURL(blob);
        const a= document.createElement('a');
        a.style.display= "none";
        a.href=url;
        const nameSplit= orginalImage.split('/').pop();
        a.download=  ""+ nameSplit+ "";

        document.body.appendChild(a);
        a.click();
        window.revokeObjectURL(url);
     }).catch(error=>console.log("Error while downloading the image"+ error.message));
   }
   catch (error){
    console.log("Error while downloading the image"+ error.message);
   }   

}