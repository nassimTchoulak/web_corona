import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './core.css'
import IP from './redux/Ip_provider'
import {BrowserRouter as Router,Route , NavLink} from "react-router-dom";
import Login from "./agent/Login";
import Synthse from "./agent/Synthse";
import UpdateZone from "./agent/UpdateZone";
import NewZone from "./agent/NewZone";

const Head = ({ routes }) =>{


        if(localStorage.getItem("token")===null){
            return <Login />
                }


    return <div className={"col-xs-12 zero_pad"}>


        <div className={"col-12 zero_pad menu_holder"} >

            <div className={"col-xs-1"} >  <div to={"/"} className={"menu_item"}> <img src={IP+"/api/v0/assets/logo.png"} width={"40px"} height={"40px"} /> </div> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/"} className={"menu_item"}> Synthèse </NavLink> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/"} className={"menu_item"}> Statistiques</NavLink> </div>
            <div className={"col-xs-2 col-xs-offset-3"} >  <NavLink to={"/"} className={"menu_item"}> Mes Consignes </NavLink> </div>
            <div className={"col-xs-2"} >  <NavLink to={"/"} className={"menu_item"}> Profil </NavLink> </div>

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

const Test = () =>{
    return  <div>hello world</div>
}

const routes = [
    {
        path:"/",
        component:Head,
        exact:false,
        routes :[
            {
                path:"/",
                exact:true,
                component:Synthse
            },
            {
                path:"/update_zone",
                exact:true,
                component:UpdateZone
            },
            {
                path:"/new_zone",
                exact:true,
                component:NewZone
            },
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