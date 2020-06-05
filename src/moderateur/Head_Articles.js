
import React from "react";
import IP from "../redux/Ip_provider";
import {NavLink} from "react-router-dom";

const Head_Article = ()=>{
    return  <div className={"col-xs-12 zero_pad"}>


        <div className={"col-12 zero_pad menu_holder"} >
            <div className={"col-xs-4"} onClick={()=>{
                window.location.reload()
            }} >  <NavLink to={"/moderateur/articles/accepted"} className={"menu_item"}> les articles validées</NavLink> </div>
            <div className={"col-xs-4"} >  <NavLink to={"/moderateur/articles/submitted"} className={"menu_item"}> les articles en attente</NavLink> </div>
            <div className={"col-xs-4"} >  <NavLink to={"/moderateur/articles/rejected"} className={"menu_item"}> les articles supprimés</NavLink> </div>

        </div>
    </div>
}


export default Head_Article