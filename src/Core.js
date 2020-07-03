import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './core.css'
import IP from './redux/Ip_provider'
import {BrowserRouter as Router,Route , NavLink} from "react-router-dom";
import Login from "./agent/Login";
import Synthse from "./agent/Synthse";
import UpdateZone from "./agent/UpdateZone";
import NewZone from "./agent/NewZone";
import TestRedaction from "./agent/TestRedaction";
import Login_Redacteur from "./redacteur/Login_Redacteur";
import Redaction from "./redacteur/Redaction";
import FirstAction from "./FirstAction";
import ArticleView from "./redacteur/ArticleView";
import Accepted_articles from "./redacteur/Accepted_articles";
import Submitted_articles_mod from "./moderateur/Submitted_articles_mod";
import Login_moderateur from "./moderateur/Login_moderateur";
import Waiting_Articles from "./moderateur/Waiting_Articles";
import Rejected_Article from "./moderateur/Rejected_Articles";
import My_redaction from "./redacteur/My_redaction";
import Video_valide from "./moderateur/Video_valide";
import Video_attente from "./moderateur/Video_attente";
import Centres_Display from "./moderateur/centres/Centres";
import Centres_ADD from "./moderateur/centres/Centre_ADD";
import Publication_holder_accepted from "./moderateur/publication/publication_holder_accepted";
import Publication_holder from "./moderateur/publication/publication_holder";

const Head_sante = ({ routes }) =>{

        if(localStorage.getItem("token")===null){
            return <Login />
                }

    return <div className={"col-xs-12 zero_pad"}>
        <div className={"col-12 zero_pad menu_holder"} >

            <div className={"col-xs-1"} >  <div onClick={()=>{
                window.location.pathname='/'
            }} className={"menu_item"}> <img src={IP+"/api/v0/assets/logo.png"} className={"image_logo"}  /> </div> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/sante"} className={"menu_item"}> Synthèse </NavLink> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/sante"} className={"menu_item"}> Statistiques</NavLink> </div>
            <div className={"col-xs-2 col-xs-offset-3"} >  <NavLink to={"/"} className={"menu_item"}> Mes Consignes </NavLink> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/redaction"} className={"menu_item"}> Profil </NavLink> </div>
    </div>

        <div className={"col-xs-12 zero_pad"} style={{"backgroundColor":"white"}}>
    {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
    ))}
                </div>
    </div>
}



const HEAD_REDACTION = ({ routes }) =>{

    if(localStorage.getItem("re_token")===null){
        return <Login_Redacteur />
    }

    return <div className={"col-xs-12 zero_pad"}>
        <div className={"col-12 zero_pad menu_holder"} style={{display:"flex",flexWrap:"nowrap"}} >

            <div className={"col-xs-1"} >  <div  onClick={()=>{
                window.location.pathname='/'
            }} className={"menu_item "}> <img className={"image_logo"} src={IP+"/api/v0/assets/logo.png"}   alt={"logo"}/> </div> </div>

            <div className={"col-xs-6"} style={{display:"flex",flexWrap:"nowrap"}} >

                <div style={{width:"300px"}}>  <NavLink to={"/redaction/published"} className={"menu_item"}> TOUT LES ARTICLES </NavLink> </div>
                <div style={{width:"200px"}} >  <NavLink to={"/redaction/my_redaction"} className={"menu_item"}> MES ARTICLES</NavLink> </div>

            </div>

            <div className={"col-xs-2 col-xs-offset-1"} >  <NavLink to={"/redaction"} className={"menu_item"}> REDIGER </NavLink> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/sante/redaction"} className={"menu_item"}> Profil </NavLink> </div>
        </div>

        <div className={"col-xs-12 zero_pad"} style={{"backgroundColor":"white"}}>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </div>
    </div>
}

const HEAD_moderateur = ({routes}) =>{
    if(localStorage.getItem("mo_token")===null){
        return <Login_moderateur />
    }


    return <div className={"col-xs-12 zero_pad"}>

        <div className={"col-xs-2  menu_mod"}  style={{position:"sticky",height:"100vh",top:"0"}}>
            <div className={"col-xs-12"} >  <div to={"/"} onClick={()=>{
                window.location.pathname='/'
            }} className={"menu_item"} style={{paddingTop:"0px !important",cursor:"pointer"}} > <img className={"image_logo_redaction"} src={IP+"/api/v0/assets/logo_horizantal.png"} /> </div> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur"} className={"menu_item"}> les Maps </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur"} className={"menu_item"}> Statistiques </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/articles/accepted"} className={"menu_item"}>   Articles</NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/centres/disponibles"} className={"menu_item"}>  Centres d'acceuil </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/video/valide"} className={"menu_item"}>  Videos utlisateur </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/robots/valide"} className={"menu_item"}> Publications des robots </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur"} className={"menu_item"}> Notifications </NavLink> </div>
        </div>
        <div className={"col-xs-10 zero_pad"}>
            <div className={"col-xs-12 zero_pad"} style={{"backgroundColor":"white"}}>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </div>
        </div>

    </div>
}




const RouteWithSubRoutes= (route)=> {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => (
                // pass the sub-routes down to keep nesting

                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}



const routes = [

        {
            path:"/",
            component:FirstAction,
            exact:true,
        },
        {
        path:"/sante",
        component:Head_sante,
        exact:false,
        routes :[
            {
                path:"/sante",
                exact:true,
                component:Synthse
            },
            {
                path:"/sante/update_zone",
                exact:true,
                component:UpdateZone
            },
            {
                path:"/sante/new_zone",
                exact:true,
                component:NewZone
            },
            {
                path:"/sante/redaction",
                exact:true,
                component:TestRedaction
            },
        ]
    },
    {
        path: "/redaction",
        component:HEAD_REDACTION,
        exact: false,
        routes : [
            {
            path: "/redaction",
                exact: true ,
                component: Redaction

             } ,

            {
                path: "/redaction/preview/:id",
                exact: true ,
                component: ArticleView

            }
            ,
            {
                path:"/redaction/published",
                exact: true ,
                component: Accepted_articles
            },
            ,
            {
                path:"/redaction/my_redaction",
                exact: true ,
                component: My_redaction
            }
        ]
    } ,
    {
        path: "/moderateur",
        component:HEAD_moderateur,
        exact: false,
        routes : [
            {
                path:"/moderateur/articles/accepted",
                exact: true ,
                component: Submitted_articles_mod
            } ,
            {
                path:"/moderateur/articles/submitted",
                exact: true ,
                component: Waiting_Articles
            },
            {
                path:"/moderateur/articles/rejected",
                exact: true ,
                component: Rejected_Article
            },
            {
                path:"/moderateur/video/valide",
                exact: true ,
                component: Video_valide
            },
            {
                path:"/moderateur/video/attente",
                exact: true ,
                component: Video_attente
            } ,
            {
                path: "/moderateur/centres/disponibles" ,
                exact:true ,
                component:Centres_Display
            },
            {
                path: "/moderateur/centres/new" ,
                exact:true ,
                component:Centres_ADD
            },
            {
                path:"/moderateur/robots/valide",
                exact: true ,
                component:Publication_holder_accepted
            } ,
            {
                path:"/moderateur/robots/attente",
                exact: true ,
                component:Publication_holder
            }

        ]

    }
];


const Core = ()=>{

    return <React.Fragment>
        <Router>
            <div className={"col-xs-12 zero_pad"} >


                {routes.map((route, i) => (
                    <Router key={i}>
                     <RouteWithSubRoutes key={i} {...route} />
                    </Router>
                ))}
            </div>
        </Router>
        </React.Fragment>




}

export default Core