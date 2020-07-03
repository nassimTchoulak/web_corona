import React from "react";

import '../../redacteur/displayed_article.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import {color_from_string, parser_diff_comment} from "../../http_requests/dataCalcule";
import IP from "../../redux/Ip_provider";
import ReactMarkdown from "react-markdown";
import Confirmation from "../../reusable/Confirmation";
import './publications.css'








class Publication_Youtube extends React.Component{

    constructor(props) {
        super(props);
        this.publicationId = props.publicationId ;
        this.datePublication =props.datePublication
        this.titre = props.titre
        this.resume= props.resume
        this.lien = props.lien

        this.imageUrl = props.imageUrl
        this.source = props.source



        this.state = {
            delete:false ,
            validate:false ,

        }

    }

    validate_video = ()=>{


        let requestOptions = {
            method: 'PATCH',
            redirect: 'follow'
        };

        fetch(IP+"/api/v0/publication/robots-data/"+this.publicationId+"/valider", requestOptions)
            .then(response => response.json())
            .then(result => {

                this.props.update_int()

            })
            .catch(error => console.log('error', error));

    }

    delete_video = () =>{
        let requestOptions = {
            method: 'DELETE',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/publication/"+this.publicationId, requestOptions)
            .then(response => response.json())
            .then(result =>{
                this.props.update_int()
            })
            .catch(error => console.log('error', error));
    }


    render() { return   <div className={"col-xs-10 col-xs-offset-1 article_card"} style={{cursor:"default"}} >



        <h2 style={{color:"#002148",padding:"0"}} align={"left"}> <div>


            {(()=>{
                if(this.props.type==="Facebook"){
                    return  " Facebook Post de:"
                }
                else{
                    if(this.props.type==="YouTube"){
                        return " Youtube video : "
                    }

                    return  "Titre de l'actualité"
                }
            })()}
        </div>


            <a id={"redirect_li2"} style={{display:"none"}} href={"/moderateur/video/valide"} >k</a>
        </h2>

        <div className="col-xs-5">


            <div className={"col-xs-12"}>  <h3 style={{color:"#00152f",padding:"0",marginTop:"5px"}} > {this.titre}</h3> </div>

            <h3 style={{color:"#002148"}} align={"left"}>Description : </h3>

            <p style={{paddingTop:"10px",fontSize:"110%"}}>{this.resume}</p>

            <div className={"col-xs-12"} style={{paddingTop:"20px",color:"#002148",fontSize:"120%"}}>
                Publié il y a {parser_diff_comment(this.datePublication)}
            </div>

        </div>

        <div className="col-xs-5">


            {(this.props.type==="YouTube")&&<iframe width={"100%"} height={"300px"} src={ "https://www.youtube.com/embed/"+ this.lien.split("=")[1]} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen> </iframe>}

            {(this.props.type==="Facebook")&&<div className={"col-xs-12"}> <h3> Lien de la publication : </h3> <div className={"facebook_link"} onClick={()=>{
                window.open(this.lien)
            }}>{this.lien.substring(0,24)} <br/> {this.lien.substring(25)} </div>   </div>}


            {(this.props.type==="News")&&<div className={"col-xs-12"}>


                <span className={"facebook_link"} style={{fontSize:"120%"}} onClick={()=>{
                    window.open(this.lien)
                }}> Lien de l'actualité : {this.source} </span>

                <img width={"100%"} height={"300px"} alt={"hello"} src={this.imageUrl} />



            </div>}


        </div>

        <div className={"col-xs-2 zero_pad"} >


            <div className={"col-xs-12 zero_pad"} style={{fontSize:"120%"}} >

                <input type={"button"} value={"Supprimer"} className={"my_button_reject"} onClick={()=>{
                    this.setState({delete:true})
                }}/>

                {

                    this.props.validation&&<input style={{marginTop: "50px"}} type={"button"} value={"Valider"} className={"my_button_green"}
                           onClick={() => {
                               this.setState({validate: true})
                           }}/>

                }





                <Confirmation message={" etes vous sur de vouloir valider cette publication "} hide={()=>{
                    this.setState({validate:false})
                }} visible={this.state.validate}  execute={()=>{ this.validate_video()}} />


                <Confirmation message={" etes vous sur de vouloir supprimer cette publication "} hide={()=>{
                    this.setState({delete:false})
                }} visible={this.state.delete}  execute={()=>{ this.delete_video()}} />



            </div>






        </div>



    </div>
    }

}


export default Publication_Youtube