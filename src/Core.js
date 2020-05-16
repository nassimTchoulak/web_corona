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

const Head_sante = ({ routes }) =>{

        if(localStorage.getItem("token")===null){
            return <Login />
                }

    return <div className={"col-xs-12 zero_pad"}>
        <div className={"col-12 zero_pad menu_holder"} >

            <div className={"col-xs-1"} >  <div onClick={()=>{
                window.location.pathname='/'
            }} className={"menu_item"}> <img src={IP+"/api/v0/assets/logo.png"} width={"40px"} height={"40px"} /> </div> </div>
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
        <div className={"col-12 zero_pad menu_holder"} >

            <div className={"col-xs-1"} >  <div to={"/"} onClick={()=>{
                window.location.pathname='/'
            }} className={"menu_item"}> <img src={IP+"/api/v0/assets/logo.png"} width={"40px"} height={"40px"} /> </div> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/redaction"} className={"menu_item"}> TOUT LES ARTICLES </NavLink> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/redaction"} className={"menu_item"}> MES ARTICLES</NavLink> </div>
            <div className={"col-xs-2 col-xs-offset-3"} >  <NavLink to={"/redaction"} className={"menu_item"}> REDIGER </NavLink> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/sante/redaction"} className={"menu_item"}> Profil </NavLink> </div>
        </div>

        <div className={"col-xs-12 zero_pad"} style={{"backgroundColor":"white"}}>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
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