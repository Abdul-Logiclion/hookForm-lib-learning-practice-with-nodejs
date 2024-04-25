import { set, useForm } from "react-hook-form"
import React from "react"
import './App.css'

export default function App() {
  const {
    register,
    handleSubmit,
    watch,setError,
    formState: { errors,isSubmitting },
  } = useForm()

  const delay=(d)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
resolve()
      },d*1000)
    })
  }


  const onSubmit =   async (data) => {
    await delay(4);
     console.log(data)
    let r= await fetch("http://localhost:3000/",
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
       body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
  
  );

    let res= await r.text()

    console.log(res,data)


     if(data.username==='rahi')
     {
      setError('myform',{message:"your credentials are invalid"})
     }

     if(data.username==='abdul')
     {
      setError('blocked',{message:"this user is blocked"})
     }
  }
  return (
   <>
    {isSubmitting && <div>Loading...</div>}

    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="username" defaultValue="test01" {...register("username",{required:true} ) } type="text"  />
      {errors.username  && <div className="red">{errors.username.message}</div>}


      <input placeholder="password" {...register("password", { required: {value:true,message:"this field is required."},minLength:{value:3,message:"min length is 3 "},maxLength:{value:8,message:"max length is 8"} })} type="password" />
      {errors.password  && <div className="red">{errors.password.message}</div>}



      <input type="submit"  disabled={isSubmitting}/>
      {
        errors.myform && <div className="red">{errors.myform.message}</div>   
      }
          {
        errors.blocked && <div className="red">{errors.blocked.message}</div>   
      }
    
    </form>
    </>
  )
}