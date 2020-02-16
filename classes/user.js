const User=(firstName,lastName, emailAddress, password,phoneNumber)=>{
    return{
      firstName:firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password:password,
      phoneNumber:phoneNumber,
      inbox:[],
      sent:[]
    }
}

module.exports(User);