
import React from "react";
import IP from "../redux/Ip_provider";
import {NavLink} from "react-router-dom";
import './video_head.css'

const Head_Article = ()=>{
    return   <div className={"col-xs-12 zero_pad video_head_back"} >

            <div className={"col-xs-4"} onClick={()=>{
                window.location.reload()
            }} >  <NavLink to={"/moderateur/articles/accepted"} activeClassName={"video_case_active"}  className={"video_case"}> les articles validées</NavLink> </div>

            <div className={"col-xs-4"} >  <NavLink to={"/moderateur/articles/submitted"} activeClassName={"video_case_active"}  className={"video_case"}> les articles en attente</NavLink> </div>
            <div className={"col-xs-4"} >  <NavLink to={"/moderateur/articles/rejected"} activeClassName={"video_case_active"}  className={"video_case"}> les articles supprimés</NavLink> </div>


    </div>
}


export default Head_Article