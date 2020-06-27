import React from "react";

import '../redacteur/displayed_article.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import {color_from_string, parser_diff_comment} from "../http_requests/dataCalcule";
import IP from "../redux/Ip_provider";
import ReactMarkdown from "react-markdown";
import Confirmation from "../reusable/Confirmation";
import Video_Head from "./videos_head";
import {Comment_comp} from "../redacteur/Displayed_article";
import {Comment_manager} from "./Comment_manager";







class VideoArticle extends React.Component{

    constructor(props) {
        super(props);
        this.videoId = props.videoId ;
        this.dateVideo =props.dateVideo
        this.titre = props.titre
        this.description= props.description
        this.videoUrl = props.videoUrl

        this.show_detail = props.show_detail === true;

        this.state = {
            delete:false ,
            validate:false ,
            comments:[] ,
            detail:false ,
            extra:{
            }
        }

    }

    sync_comments = () =>{
        let requestOptions = {
            method: 'GET',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/CommentVideo/video/"+this.videoId, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.items.rows)
                if(result.items.rows.length>0){
                    this.setState({comments:result.items.rows})
                }
            })
            .catch(error => console.log('error', error));
    }

    validate_video = ()=>{
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"valide":true});

        let requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/video/moderateur/"+this.videoId, requestOptions)
            .then(response => response.json())
            .then(result => {
                document.querySelector("#redirect_li2").click()

            })
            .catch(error => console.log('error', error));
    }

    delete_video = () =>{
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = "";

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/video/"+this.videoId, requestOptions)
            .then(response => response.json())
            .then(result => {
                window.location.reload()
            })
            .catch(error => console.log('error', error));
    }


    render() { return   <div className={"col-xs-10 col-xs-offset-1 article_card"} style={{cursor:"default"}} >



        <h2 style={{color:"#002148",padding:"0"}} align={"left"}> <div> Titre de la video : </div>


            <a id={"redirect_li2"} style={{display:"none"}} href={"/moderateur/video/valide"} >k</a>
        </h2>

            <div className="col-xs-3">


                <div className={"col-xs-12"}>  <h3 style={{color:"#00152f",padding:"0",marginTop:"5px"}} > {this.titre.toLowerCase()}</h3> </div>

                <h3 style={{color:"#002148"}} align={"left"}>Description : </h3>

                <p style={{paddingTop:"10px",fontSize:"110%"}}>{this.description}</p>

                <div className={"col-xs-12"} style={{paddingTop:"20px",color:"#002148",fontSize:"120%"}}>
                    Publié il y a {parser_diff_comment(this.dateVideo)}
                </div>

            </div>

            <div className="col-xs-5">
                <video width="100%" controls>
                    <source placeholder={"video"} src={IP+"/"+this.videoUrl} type="video/mp4" />
                </video>
            </div>

            <div className={"col-xs-4 zero_pad"} >
                {
                    this.state.detail&&<div className={"col-xs-12 zero_pad"} style={{fontSize:"150%"}}>
                        <div className={"col-xs-12"}> <span className={"glyphicon glyphicon-chevron-left"} style={{cursor:"pointer",color:"#8e8f93"}} onClick={()=>{this.setState({detail:false})}}> </span> Les commentaires : </div>
                        {
                            this.state.comments.map((i,itr)=>{
                                return <div className={"col-xs-12 zero_pad"} key={itr}>
                                    <Comment_manager date={i.createdAt} username={i.utilisateur.username} {...i} delete={()=>{

                                        let requestOptions78 = {
                                            method: 'DELETE',
                                            redirect: 'manual'
                                        };

                                        fetch(IP+"/api/v0/CommentVideo/"+i.commentVideoId, requestOptions78)
                                            .then(response => response.json())
                                            .then(result =>  this.sync_comments())
                                            .catch(error => console.log('error', error));


                                    }} />
                                </div>
                            })
                        }
                    </div>
                }

                {!this.state.detail&&  <div className={"col-xs-10 col-xs-offset-1 zero_pad"} style={{fontSize:"120%"}} >

                    <input type={"button"} value={"Supprimer"} className={"my_button_reject"} onClick={()=>{
                        this.setState({delete:true})
                    }}/>


                    {!this.show_detail&&<input style={{marginTop:"50px"}} type={"button"} value={"Valider"} className={"my_button_green"} onClick={()=>{
                        this.setState({validate:true})
                    }}/>}

                    {
                        this.show_detail&&<input style={{marginTop:"50px"}} type={"button"} value={"les commentaires"} className={"my_button_light_blue"} onClick={()=>{
                            this.sync_comments()
                            this.setState({detail:true})
                        }}/>
                    }



                    <Confirmation message={" etes vous sur de vouloir valider cette video "} hide={()=>{
                        this.setState({validate:false})
                    }} visible={this.state.validate}  execute={()=>{ this.validate_video()}} />


                    <Confirmation message={" etes vous sur de vouloir supprimer cette video "} hide={()=>{
                        this.setState({delete:false})
                    }} visible={this.state.delete}  execute={()=>{ this.delete_video()}} />



                </div>}






            </div>



        </div>
    }

}


export default VideoArticle