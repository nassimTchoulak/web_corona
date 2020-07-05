
import React from "react";
import {NavLink} from "react-router-dom";
import '../video_head.css'

const Signalement_head = ()=>{
    return   <div className={"col-xs-12 zero_pad video_head_back"} >

        <div className={"col-xs-3 col-xs-offset-2"} >  <NavLink  to={"/moderateur/signal/valide"}  activeClassName={"video_case_active"} className={"video_case"}  >  les signalements validés </NavLink> </div>

        <div className={"col-xs-3 col-xs-offset-1"} >  <NavLink to={"/moderateur/signal/attente"} activeClassName={"video_case_active "} className={"video_case"}  > les signalements en attente</NavLink> </div>


    </div>
}


export default Signalement_head