const Email =(subject,content,sendingTime,sender,reciever)=>{
    return{
         subject:subject,
         content:content,
         sendingTime:sendingTime,
         sender:sender,
         reciever:reciever
    }
}

module.exports(Email);