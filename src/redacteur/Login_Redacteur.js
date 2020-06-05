import React, {useState} from "react"


import '../agent/login.css'
import "../default_ui.css"
import IP from "../redux/Ip_provider";


const IP2 = "http://localhost:8080"


const Login_Redacteur = ()=>{

    const[err,setErr] = useState(false);




    return <div className={"col-xs-12 zero_pad login_all "}  onClick={()=>{
        /*  localStorage.setItem("token","test")
          window.location.reload()*/

    }}>

        <div className={"col-xs-12"} style={{paddingTop:"50px"}}>

            <div className={"col-xs-offset-1 col-xs-3"} >
                <img id={'login_logo'} style={{backgroundColor:"snow",borderRadius:"50%"}} src={IP2+"/api/v0/assets/logo_vertical.png"} width={"200px"} />
            </div>

            <div className={" col-xs-7 login_start"}>
                <h1 className={"login_start"}>  Bienvenue à L'Application Algérienne dédiée aux informations liées au virus COVID-19</h1>
            </div>
        </div>

        <div className={"col-xs-offset-2 col-xs-8"}>
            <h2> Portaille dédiée REDACTEURS du Ministère de la Santé </h2>
        </div>



        <div className={"col-xs-6 col-xs-offset-3"} style={{paddingTop:"30px"}}>

            <div className={"col-xs-12"} style={{paddingTop:"40px"}}>
                <input type={"text"} className={"my_text_box_v2 col-xs-12"}  onChange={()=>{setErr(false)}} placeholder={"email"} id={"email_"} />
            </div>

            <div className={"col-xs-12"} style={{paddingTop:"40px"}}>
                <input type={"password"} className={"my_text_box_v2 col-xs-12"} onChange={()=>{setErr(false)}} placeholder={"Password"} id={"password"} />
            </div>

            <div className={"col-xs-offset-2 col-xs-8"} style={{paddingTop:"40px"}}>
                <input type={"button"} value={"CONNEXION"} className={"my_button_submit"} onClick={()=>{

                    let myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    let raw = JSON.stringify({"email":document.querySelector("#email_").value,"password":document.querySelector("#password").value});

                    let requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(IP+"/api/v0/auth/authRedacteur/local/login", requestOptions)
                        .then(result =>{
                                result.json().then((data)=>{
                                    if(data.auth){

                                        localStorage.setItem("re_token",data.token)
                                        localStorage.setItem("re_email",data.user.email)
                                        localStorage.setItem("re_id",data.user.id)
                                        localStorage.setItem("re_all",JSON.stringify(data.user))

                                        window.location.reload()
                                    }
                                    else{
                                        setErr(true)
                                    }

                                })

                            }



                        )
                        .catch(error => setErr(true));


                }}/>

            </div>
        </div>

        {err&&<h5 className={"col-xs-12"} style={{fontWeight:"lighter",paddingTop:"10px",fontSize:"150%"}}> mot de pass/email incorrect</h5>}

    </div>

}


export  default Login_Redacteur