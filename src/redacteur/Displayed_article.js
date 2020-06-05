import React from "react";
import './displayed_article.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import {color_from_string, parser_diff_comment} from "../http_requests/dataCalcule";
import IP from "../redux/Ip_provider";

class Displayed_article extends React.Component{

    constructor(props) {
        super(props);

            this.articleId = props.articleId ;
            this.dateArticle = props.dateArticle ;
            this.titre = props.titre ;
            this.sous_titre = props.sous_titre ;
            this.popularite = props.popularite ;
            this.imageUrl = props.imageUrl ;
            this.redacteur = props.redacteur ;
            //this.tags = props.tags ;
        this.tags = ["corona_virus","prevention","corona_virus","prevention"]

            this.state = {
                detail : false ,
                redacteur_detail:false,
                comments : [],
                videoUrl:"",
                contenu:""
            }

    }
    get_redacteur(){

        if(this.redacteur.nom!==null){
            return this.redacteur.nom
        }

        if(this.redacteur.username!==null){
            return this.redacteur.username
        }

        return this.redacteur.email

    }

    get_all_detail = ()=>{


        let requestptions = {
            method: 'GET',
            redirect: 'manual'
        };
        fetch(IP+"/api/v0/article/"+this.articleId, requestptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)

                let contenu = result.contenu ;
                let vid = result.videoUrl ;
                this.popularite = result.popularite

                this.setState({contenu,videoUrl:vid,detail:true})

            })
            .catch(error => console.log('error', error));

    }

    render(){
        return  <React.Fragment> <div className={"col-xs-12 article_card"} onClick={this.get_all_detail}>

                    <h2 style={{color:"#002148"}} align={"left"}>{this.titre}</h2>

                    <div className="col-xs-3">
                        <p style={{paddingTop:"10px",fontSize:"110%"}}>{this.sous_titre}</p>

                        <div className={"col-xs-12"} style={{paddingTop:"20px",color:"#002148",fontSize:"120%"}}>
                            Publié il y a {parser_diff_comment(this.dateArticle)}
                        </div>

                    </div>

            <div className="col-xs-5">
                <img width={"100%"} src={this.imageUrl} />
            </div>

            <div className={"col-xs-4 zero_pad"} style={{display:"inline"}}>
                <div className={"col-xs-12 zero_pad"} style={{fontSize:"180%"}} >

                    <div className={"col-xs-4 zero_pad"} style={{fontSize:"60%"}} >Rédigé par:</div>

                    <div className={"col-xs-6 "}>
                        <div className={"col-xs-12 link_redacteur"} onMouseEnter={()=>{this.setState({redacteur_detail:true})}} onMouseLeave={()=>{this.setState({redacteur_detail:false})}} > {this.get_redacteur()} </div>

                       <div className={"col-xs-12 zero_pad "} style={{position:"relative"}} >
                            <div  style={{position:"absolute",top:"0px",right:"0px",width:"20vw"}}>
                                <div className={"col-xs-12 zero_pad"} style={{backgroundColor:"transparent",fontSize:"40%"}}>
                                    {this.state.redacteur_detail&& <div style={{border:"solid 1px black",borderRadius:"5px 5px "}} className={"col-xs-12 profile_zone"}>

                                                        <div className={"col-xs-12 profile_element"}>
                                                            <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Email  :</span> <span className={"profile_decale"}> {this.redacteur.email}</span>
                                                        </div>

                                                        <div className={"col-xs-12 profile_element"}>
                                                            <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Nom  : </span><span className={"profile_decale"}>{this.redacteur.nom}</span>
                                                        </div>

                                                        <div className={"col-xs-12 profile_element"}>
                                                            <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Prenom  : </span><span className={"profile_decale"}>{this.redacteur.prenom}</span>
                                                        </div>

                                                        <div className={"col-xs-12 profile_element"}>
                                                            <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Description  : </span><span className={"profile_decale"}>{this.redacteur.description}</span>
                                                        </div>
                                                    </div>}
                                </div>
                            </div>
                        </div>


                    </div>


                    <div className={"col-xs-2"}  align={"right"} style={{display:"inline-block",textAlign:"right",marginTop:"05px",borderRadius:"50%",backgroundColor:color_from_string(this.redacteur.email),width:"30px",height:"30px"}}></div>
                </div>

                {this.tags.map((i,itr)=>{
                    return <div key={itr} className={"tag_box"}>#{i}</div>
                })}

                <div className={"col-xs-12"}  style={{paddingTop:"20px",fontSize:"160%",color:"#002148"}}>
                    nombre de vue : {this.popularite}
                </div>
            </div>



        </div>

            {this.state.detail&&<div id={"background_ar"} className={"col-xs-12 article_detail_back"} onClick={(e)=>{
                if(e.target.id==="background_ar")
                this.setState({detail:false})
            }} >

                <div className={"article_detail_body"} >  hello world  </div>



            </div>}


        </React.Fragment>
    }

}

export default Displayed_article