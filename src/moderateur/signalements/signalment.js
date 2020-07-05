import React from "react";
import {parser_diff_comment} from "../../http_requests/dataCalcule";
import IP from "../../redux/Ip_provider";
import {Comment_manager} from "../Comment_manager";
import Confirmation from "../../reusable/Confirmation";


class Signalement extends React.Component{
    constructor(props) {
        super(props);

        this.signalementId=props.signalementId
            this.titre=props.titre
        this.info = props.info
        this.imageUrl = props.imageUrl
        this.videoUrl = props.videoUrl
            this.status = props.status
        this.createdAt = props.createdAt

        this.state = {
            validate:false ,
            delete :false
        }


    }

    delete_signal = ()=>{
        var requestOptions = {
            method: 'DELETE',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/signalement/"+this.signalementId, requestOptions)
            .then(response => response.json())
            .then(result => {
                window.location.reload()
            })
            .catch(error => console.log('error', error));
    }

    validate_signal = ()=>{
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"status":"POSITIF"});

        let requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/signalement/updateStatus/"+ this.signalementId, requestOptions)
            .then(response => response.json())
            .then(result => {

                window.location.reload()

            })
            .catch(error => console.log('error', error));
    }

    render() {
        return  <div className={"col-xs-10 col-xs-offset-1 article_card"} style={{cursor:"default"}} >



            <h2 style={{color:"#002148",padding:"0"}} align={"left"}> <div> Titre du signal : </div>


                <a id={"redirect_li2"} style={{display:"none"}} href={"/moderateur/video/valide"} >k</a>
            </h2>

            <div className="col-xs-3">


                <div className={"col-xs-12"}>  <h3 style={{color:"#00152f",padding:"0",marginTop:"5px"}} > {decodeURI(this.titre).replace(/\+/g, " ")}</h3> </div>

                <h3 style={{color:"#002148"}} align={"left"}>Info : </h3>

                <p style={{paddingTop:"10px",fontSize:"110%"}}>{decodeURI(this.info).replace(/\+/g, " ")}</p>

                <div className={"col-xs-12"} style={{paddingTop:"20px",color:"#002148",fontSize:"120%"}}>
                    Publié il y a {parser_diff_comment(this.createdAt )}
                </div>

            </div>

            <div className="col-xs-5">

                {(this.videoUrl!==null)&&<video width="100%" controls>
                    <source placeholder={"video"} src={IP+"/"+this.videoUrl} type="video/mp4" />
                </video>}
                {
                    (this.imageUrl!==null)&&<img src={IP+"/"+this.imageUrl} width={"100%"} height={"auto"}  alt={"img"}/>
                }
            </div>

            <div className={"col-xs-4 zero_pad"} >


                {!this.state.detail&&  <div className={"col-xs-10 col-xs-offset-1 zero_pad"} style={{fontSize:"120%"}} >

                    <input type={"button"} value={"Supprimer"} className={"my_button_reject"} onClick={()=>{
                        this.setState({delete:true})
                    }}/>


                    {(this.status==="signaled")&&<input style={{marginTop:"50px"}} type={"button"} value={"Valider"} className={"my_button_green"} onClick={()=>{
                        this.setState({validate:true})
                    }}/>}





                    <Confirmation message={" etes vous sur de vouloir valider ce signal "} hide={()=>{
                        this.setState({validate:false})
                    }} visible={this.state.validate}  execute={()=>{ this.validate_signal()}} />


                    <Confirmation message={" etes vous sur de vouloir supprimer ce signal "} hide={()=>{
                        this.setState({delete:false})
                    }} visible={this.state.delete}  execute={()=>{ this.delete_signal()}} />



                </div>}






            </div>



        </div>
    }

}

export default Signalement