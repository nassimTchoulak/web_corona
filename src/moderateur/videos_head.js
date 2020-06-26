import {NavLink } from "react-router-dom";
import React from "react";
import './video_head.css'


const Video_Head = ()=>{



    return <div className={"col-xs-12 zero_pad video_head_back"}>

        <div className={"col-xs-3 col-xs-offset-2"} >  <NavLink  to={"/moderateur/video/valide"}  activeClassName={"video_case_active"} className={"video_case"}  >  les video en validés</NavLink> </div>
        <div className={"col-xs-3 col-xs-offset-1"} >  <NavLink to={"/moderateur/video/attente"} activeClassName={"video_case_active "} className={"video_case"}  > les video en attente </NavLink> </div>


    </div>
}


export default Video_Head