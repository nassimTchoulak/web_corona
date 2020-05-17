import React from "react";
import IP from "../redux/Ip_provider";
import './preview.css'
import {parser_diff_comment} from '../http_requests/dataCalcule'

import ReactMarkdown  from 'react-markdown'

class ArticleView extends React.Component{

    constructor(props) {
        super(props);
        this._id = props.location.pathname.split('/').pop()

        this.state = {
            data : {} ,
            loaded:false
        }
        //this.state.data

    }

    componentDidMount() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("re_token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/article/"+this._id, requestOptions)
            .then(response => response.json())
            .then(result =>{ console.log(result)

                this.setState({data:{...result,...result.redacteur},loaded:true})

            })
            .catch(error => console.log('error', error));
    }


    render(){
        return <div className={"col-xs-12"}>

            {this.state.loaded&&<div className={"col-xs-12 zero_pad"}>
            <h1 className={"title_zone_new"} style={{paddingTop:"40px",paddingBottom:"30px"}}> Preview d'un Article : </h1>

            <div className={"col-xs-8"} align={"left"}>

                <h2 className={"title_zone_new col-xs-offset-2 col-xs-8"}>  <span style={{color:"#ff4275"}} className={"glyphicon glyphicon-chevron-right"}></span>  Titre de l'Article : <span style={{fontWeight:"bold"}}> {this.state.data.titre }</span> </h2>

                <h3 className={"title_zone_new col-xs-offset-2 col-xs-8"}>  <span style={{color:"#ff4275"}} className={"glyphicon glyphicon-chevron-right"}></span>  Sous-Titre : <span style={{fontWeight:"bold"}}> {this.state.data.sous_titre }</span> </h3>


                <h3 className={"title_zone_new col-xs-offset-2 col-xs-8"}>Les Tags : {
                    this.state.data.tags.map((i,itr)=>{
                        return <span style={{color:"#5890ff",padding:"15px"}} key={itr}>#{i.description}</span>
                    })
                } </h3>

                <div className={"col-xs-11 col-xs-offset-1 zero_pad"} style={{paddingTop:"20px"}}>
                    <div className={"col-xs-6"}>
                        <h4 className={"label_new"}> Image de Couverture </h4>

                        {
                            <img width={"100%"} src={this.state.data.imageUrl} />
                        }

                        {
                            (this.state.data.videoUrl==="")&&<div className={"col-xs-12"}>Pas de video inclus </div>
                        }

                        {
                            (this.state.data.videoUrl!=="")&&<div className={"col-xs-12"}>
                                <h4 className={"label_new"} style={{padding:"20px"}}> Video de l'article </h4>

                                <video width="100%" controls>
                                    <source placeholder={"video"} src={this.state.data.videoUrl} type="video/mp4" />
                                </video>


                            </div>
                        }

                    </div>

                    <div  className={"col-xs-6"}>

                        <h4 className={"label_new"} > Contenu de l'Article </h4>

                        <div className={"col-xs-12"} style={{border:"solid 1px #002148"}}> <ReactMarkdown source={this.state.data.contenu} /> </div>
                    </div>

                </div>
            </div>




            <div className={"col-xs-4 "}>
                <div className={"col-xs-12 profile_zone"}>

                <h2 className={"label_new col-xs-12"} align={"left"}> Rédigé par : </h2>
                <div className={"col-xs-12"} align={"right"}>

                    <div  align={"right"} style={{textAlign:"right",borderRadius:"50%",backgroundColor:"#480030",width:"100px",height:"100px"}}></div>

                </div>
                <div className={"col-xs-12 profile_element"}>
                    <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Email  :</span> <span className={"profile_decale"}> {this.state.data.email}</span>
                </div>

                <div className={"col-xs-12 profile_element"}>
                    <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Nom  : </span><span className={"profile_decale"}>{this.state.data.nom}</span>
                </div>

                <div className={"col-xs-12 profile_element"}>
                    <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Prenom  : </span><span className={"profile_decale"}>{this.state.data.prenom}</span>
                </div>

                <div className={"col-xs-12 profile_element"}>
                    <span style={{color:"#002148"}} className={"glyphicon glyphicon-chevron-right"}></span> <span>Description  : </span><span className={"profile_decale"}>{this.state.data.description}</span>
                </div>
                </div>


                <div className={"col-xs-10 col-xs-offset-2 label_new"} style={{paddingTop:"20px",textAlign:"left"}}>
                    Publié il y a : {parser_diff_comment(this.state.data.dateArticle)}
                </div>

                <div className={"col-xs-10 col-xs-offset-2 label_new"} style={{paddingTop:"20px",textAlign:"left"}}>
                    Nombre de Vues : {this.state.data.popularite}
                </div>

            </div>

        </div>}

        </div>

    }



}

export default ArticleView