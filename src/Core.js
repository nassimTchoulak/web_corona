import React, {useState} from "react";
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
import WorldMap from "./moderateur/WorldMap/WorldMap";
import ProfilRedacteur from "./redacteur/ProfilRedacteur";
import statistiquesDZ from "./moderateur/WorldMap/statistiquesDZ";
import Signalement_Accepted from "./moderateur/signalements/Signalments_Accepted";
import Signalement_Attente from "./moderateur/signalements/Signalement_Attente";

const Head_sante = ({ routes }) =>{

        if(localStorage.getItem("token")===null){
            return <Login />
                }

    return <div className={"col-xs-12 zero_pad"}>
        <div className={"col-12 zero_pad menu_holder"} >

            <div className={"col-xs-1"} >  <div onClick={()=>{
                window.location.pathname='/'
            }} className={"menu_item"}> <img src={IP+"/api/v0/assets/logo.png"} className={"image_logo"}  /> </div> </div>
            <div className={"col-xs-3"} >  <NavLink to={"/sante"} className={"menu_item"}> Synthèse </NavLink> </div>

            <div className={"col-xs-3 col-xs-offset-4"} >  <NavLink to={"/sante/world"} className={"menu_item"}> Carte International</NavLink> </div>

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
            <div className={"col-xs-2"} >  <NavLink to={"/redaction/profile"} className={"menu_item"}> Profil </NavLink> </div>
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

    const [list,set_list] = useState([])
    const [visible,set_visible] = useState(false)

    const synch_all = ()=>{
        let requestOptions = {
            method: 'GET',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/notification-moderateur/", requestOptions)
            .then(response => response.json())
            .then(result => {
                let nb_not =0
                let tmp = []

                result.rows.forEach((i)=>{
                    if((i.moderateurModerateurId===1)&&(!i.isSeen)) {
                        tmp.push(i)
                    }

                })
                console.log(tmp)

                set_list(tmp)

            })
            .catch(error => console.log('error', error));
    }


    setInterval(()=>{
        synch_all()
    },10000)


    return <div className={"col-xs-12 zero_pad"}>

        <div className={"col-xs-2  menu_mod"}  style={{position:"sticky",height:"100vh",top:"0",zIndex:"100"}}>
            <div className={"col-xs-12"} >  <div to={"/"} onClick={()=>{
                window.location.pathname='/'
            }} className={"menu_item"} style={{paddingTop:"0px !important",cursor:"pointer"}} > <img className={"image_logo_redaction"} src={IP+"/api/v0/assets/logo_horizantal.png"} /> </div> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/world"} className={"menu_item"}> Carte Mondiale </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/world/stats"} className={"menu_item"}> Données de Zones </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/articles/accepted"} className={"menu_item"}>   Articles rédacteurs</NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/centres/disponibles"} className={"menu_item"}>  Centres d'acceuil </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/video/valide"} className={"menu_item"}>  Videos utlisateur </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/robots/valide"} className={"menu_item"}> Publications des robots </NavLink> </div>
            <div className={"col-xs-12"} >  <NavLink to={"/moderateur/signal/valide"} className={"menu_item"}> Les signalements  </NavLink> </div>

            <div className={"col-xs-12 menu_item"}  onClick={()=>{

                set_visible(!visible)

            }} style={{cursor:"pointer"}}>  Notifications
              <span style={{color:"snow"}}>  <span style={{color:(list.length===0)?"#e3e3e3":"#ff4275"}} className={"glyphicon glyphicon-bell"}> </span>  </span>

                {
                    visible&&<div style={{position:"relative",zIndex:200}} >

                        <div style={{position:"absolute",top:"-200px",left:"16.66vw",width:"16.66vw",borderRadius:"5px 5px", border:"solid 1px #a0a0a0"}}>
                            <div className={"col-xs-12 zero_pad"} style={{backgroundColor:"#eeeeee",zIndex:"200"}}>
                                {
                                    list.map((i)=>{
                                        return <NavLink onClick={()=>{
                                            let myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");

                                            let raw = JSON.stringify({"isSeen":"true"});

                                            let requestOptions = {
                                                method: 'PATCH',
                                                headers: myHeaders,
                                                body: raw,
                                                redirect: 'manual'
                                            };

                                            fetch(IP+"/api/v0/notification-moderateur/"+i.notificationModerateurId, requestOptions)
                                                .then(response => response.text())
                                                .then(result => {
                                                    synch_all()

                                                })
                                                .catch(error => console.log('error', error));

                                        }} to={ (()=>{
                                            if(i.typeContenu==="video"){
                                                return "/moderateur/video/attente"
                                            }
                                            if(i.typeContenu==="article"){
                                                return "/moderateur/articles/submitted"
                                            }
                                        })() } className={"col-xs-12 notif_item"} >

                                            {(()=>{
                                            if(i.typeContenu==="video"){
                                            return "de nouveaux video utlisateur disponibles"
                                        }
                                            if(i.typeContenu==="article"){
                                            return " de nouveaux articles disponible "
                                        }
                                        })()}

                                        </NavLink>
                                    })
                                }
                                {
                                    ( list.length===0)&&<div style={{color:"#979797"}} className={"col-xs-12"}> Aucunne notification </div>
                                }

                                <div className={"col-xs-12 notif_item"} onClick={()=>{
                                    set_visible(false)
                                }} style={{fontWeight:"bold",padding:"10px"}}> Close <span className={"glyphicon glyphicon-chevron-up"}> </span> </div>
                            </div>
                        </div>
                    </div>
                }

            </div>

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
        path:"/map",
        component:WorldMap,
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
              path:"/sante/world",
              exact: true ,
              component: WorldMap
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
            {
                path:"/redaction/my_redaction",
                exact: true ,
                component: My_redaction
            },
            ,
            {
                path:"/redaction/profile",
                exact: true ,
                component: ProfilRedacteur
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
            } ,
            {
                path:"/moderateur/world",
                exact: true ,
                component:WorldMap
            } ,
            {
                path: "/moderateur/world/stats",
                exact: true ,
                component: statistiquesDZ
            },
            {
                path:"/moderateur/signal/valide",
                exact: true ,
                component : Signalement_Accepted
            },
            {
                path:"/moderateur/signal/attente",
                exact: true ,
                component : Signalement_Attente
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