import {NavLink } from "react-router-dom";
import React from "react";
import '../video_head.css'


const Centre_head = ()=>{



    return <div className={"col-xs-12 zero_pad video_head_back"}>

        <div className={"col-xs-3 col-xs-offset-2"} >  <NavLink  to={"/moderateur/centres/disponibles"}  activeClassName={"video_case_active"} className={"video_case"}  >  Affichages des centres </NavLink> </div>
        <div className={"col-xs-3 col-xs-offset-1"} >  <NavLink to={"/moderateur/centres/new"} activeClassName={"video_case_active "} className={"video_case"}  > Ajouter un nouveau centre </NavLink> </div>


    </div>
}


export default Centre_head