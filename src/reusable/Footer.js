import React from "react";

const Footer = () =>{
    return  <div className={"col-xs-12 zero_pad footer_style"} style={{marginTop:"100px",color:"white",textAlign:"left",padding:"30px"}}>

        <div className={"col-xs-9"}> Sous la tutelle du <h4> Ministère de la Santé, de la Population et de la Réforme Hospitalière </h4> </div>
        <div className={"col-xs-3"}> <div className={"col-xs-12"}> Algérie @2020</div>  <div className={"col-xs-12"} onClick={()=>{localStorage.clear(); window.location.reload()}} style={{cursor:"pointer"}}>Déconnexion</div></div>



    </div>
}


export default Footer