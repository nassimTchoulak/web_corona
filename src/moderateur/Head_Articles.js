
import React from "react";
import IP from "../redux/Ip_provider";
import {NavLink} from "react-router-dom";
import './video_head.css'
import {connect} from 'react-redux'
import {get_article_accepted_by_page} from "../redux/action";

const Head_Article = (props)=>{
    return   <div className={"col-xs-12 zero_pad video_head_back"} >

            <div className={"col-xs-4"} onClick={()=>{
               props.get_article_accepted_by_page(1)
            }} >  <NavLink to={"/moderateur/articles/accepted"} activeClassName={"video_case_active"}  className={"video_case"}> les articles validées</NavLink> </div>

            <div className={"col-xs-4"} >  <NavLink to={"/moderateur/articles/submitted"} activeClassName={"video_case_active"}  className={"video_case"}> les articles en attente</NavLink> </div>
            <div className={"col-xs-4"} >  <NavLink to={"/moderateur/articles/rejected"} activeClassName={"video_case_active"}  className={"video_case"}> les articles supprimés</NavLink> </div>


    </div>
}

const mapstate = (state) =>{
    return {
        articles : state.articles
    }
}
const mapDispatchToProps2 = {
    get_article_accepted_by_page
}


export default connect(mapstate,mapDispatchToProps2)(Head_Article)