import React, {useState} from "react";
import './displayed_article.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import {color_from_string, parser_diff_comment} from "../http_requests/dataCalcule";
import IP from "../redux/Ip_provider";
import ReactMarkdown from "react-markdown";
import Confirmation from "../reusable/Confirmation";

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


            if( props.tags!==undefined ){
                let tmp =[]
                props.tags.forEach((i)=>{
                    tmp.push(i.description)
                })
                this.tags = tmp
            }
            else{
                this.tags = ["prevention","corona_virus","prevention"]
            }

            if(props.delete_comment===undefined){
                this.delete_comment = true
            }
            else{
                this.delete_comment = false
            }

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

        return this.redacteur.email.substring(0,6)

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



        fetch(IP+"/api/v0/CommentArticle/article/"+this.articleId, requestptions)
            .then(response => response.json())
            .then(result => { this.setState({comments:result.items.rows})
                console.log(result.items.rows)

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
                <img width={"100%"} height={"200px"} src={this.imageUrl} />
            </div>

            <div className={"col-xs-4 zero_pad"} style={{display:"inline"}}>
                <div className={"col-xs-12 zero_pad"} style={{fontSize:"180%"}} >

                    <div className={"col-xs-4 zero_pad"} style={{fontSize:"60%"}} >Rédigé par:</div>

                    <div className={"col-xs-6 "}>
                        <div className={"col-xs-12 link_redacteur"} onMouseEnter={()=>{this.setState({redacteur_detail:true})}} onMouseLeave={()=>{this.setState({redacteur_detail:false})}} > {this.get_redacteur()} </div>

                       <div className={"col-xs-12 zero_pad "} style={{position:"relative"}} >
                            <div  style={{position:"absolute",top:"0px",right:"0px",width:"20vw"}}>
                                <div className={"col-xs-12 zero_pad"} style={{backgroundColor:"transparent",fontSize:"40%"}}>
                                    {this.state.redacteur_detail&& <div style={{border:"solid 1px black",borderRadius:"5px 5px ",zIndex:"50"}} className={"col-xs-12 profile_zone"}>

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

                <div className={"article_detail_body"} >


                                    <div className={"col-xs-12 zero_pad"}>


                                        <div className={"col-xs-9"} align={"left"}>

                                            <h2 className={"title_zone_new col-xs-offset-2 col-xs-8"}>  <span style={{color:"#ff4275"}} className={"glyphicon glyphicon-chevron-right"}></span>  <span style={{fontWeight:"bold"}}> {this.titre }</span> </h2>


                                            <div className={"col-xs-12 zero_pad"} style={{paddingTop:"20px"}}>
                                                <div className={"col-xs-5"}>
                                                    <h4 className={"label_new"}> Image de Couverture </h4>

                                                    {
                                                        <img width={"auto"} height={"250px"} src={this.imageUrl} />
                                                    }

                                                    {
                                                        (this.state.videoUrl==="")&&<div className={"col-xs-12"}>Pas de video inclus </div>
                                                    }

                                                    {
                                                        (this.state.videoUrl!=="")&&<div className={"col-xs-12"}>
                                                            <h4 className={"label_new"}> Video de l'article </h4>

                                                            <video width="100%" controls>
                                                                <source placeholder={"video"} src={this.state.videoUrl} type="video/mp4" />
                                                            </video>


                                                        </div>
                                                    }

                                                </div>

                                                <div  className={"col-xs-7"}>

                                                    <h4 className={"label_new"} > Contenu de l'Article </h4>

                                                    <div className={"col-xs-12"} style={{border:"solid 1px #002148",overflow:"scroll" , height:"60vh"}}> <ReactMarkdown source={this.state.contenu} /> </div>
                                                </div>

                                            </div>
                                        </div>




                                        <div className={"col-xs-3 "}>



                                            <div className={"col-xs-12"} style={{paddingTop:"20px",textAlign:"left"}}>
                                                <div className={"col-xs-12"}> Nombre de Vues : {this.popularite}</div>

                                                <h3 className={"label_new"} style={{paddingTop:"40px"}}>Les commentaires</h3>

                                                <div className={"col-xs-12 zero_pad"}>
                                                    {
                                                        this.state.comments.map((i,itr)=>{
                                                            return <div className={"col-xs-12 zero_pad"} align={"left"} style={{marginTop:"20px",backgroundColor:"#f2f2f3",padding:"5px"}} key={itr}>

                                                                <Comment_comp {...i} delete_comment={this.delete_comment} update_all={()=>{this.get_all_detail()}} />

                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>



            </div>}


        </React.Fragment>
    }

}

export const Comment_comp = (props)=> {

    const [del, set_delete] = useState(false)

    return <React.Fragment>

        <div className={"col-xs-12 mail_time zero_pad"} align={"left"}>
            <div className={"comment_mail col-xs-8 zero_pad"}>
                <span className={"glyphicon glyphicon-chevron-right zero_pad_v2"}></span>
                <div
                    className={"zero_pad_v2"}>{" " + decodeURI(props.utilisateur.username || "").replace("+", " ")}</div>
            </div>
            <div className={"comment_time col-sx-3 zero_pad"}>+{parser_diff_comment(props.createdAt)}</div>

            {props.delete_comment &&
            <div className={"col-xs-1"}><span className={"glyphicon glyphicon-remove"} onClick={() => {
                set_delete(true)
            }} style={{color: "#a82323", cursor: "pointer"}}> </span></div>}

        </div>


        <div className={"col-xs-12 comment_txt zero_pad"}>{decodeURI(props.contenu).replace(/\+/g, " ")}</div>

        <div style={{fontSize: "80%"}}>
            <Confirmation message={"etes-vous sur de vouloir supprimer ce commentaire ?"}
                          hide={() => {
                              set_delete(false)
                          }} execute={() => {
                let requestOptions = {
                    method: 'DELETE',
                    redirect: 'manual'
                };

                fetch(IP + "/api/v0/CommentArticle/"+props.commentArticleId, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        props.update_all();
                        console.log(result)
                    })
                    .catch(error => console.log('error', error));

            }} visible={del}/></div>

    </React.Fragment>
}

export default Displayed_article