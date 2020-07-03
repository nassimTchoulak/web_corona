import React from "react";
import TagsPopulaires from "./PopularTags";
import IP from "../redux/Ip_provider";


class ProfilRedacteur extends React.Component{

    constructor(props) {
        super(props);

        this.info = JSON.parse(localStorage.getItem("re_all"))
        console.log(this.info)

        this.state = {
            image:{
                url:"",
                process:false,
                ready:false
            }
        }

    }

    componentDidMount() {
        if(this.info.profileImage!==null){
            this.setState({
                image:{
                    url:this.info.profileImage,
                    process:false,
                    ready:true
                }
            })
        }
    }

    correct_null(x){
        if(x===null){
            return ""
        }
        if(x===undefined){
            return  ""
        }
        return  x
    }

    sychronize = ()=>{

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let username = document.querySelector("#username").value
        let nom = document.querySelector("#nom").value
        let prenom = document.querySelector("#prenom").value
        let description = document.querySelector("#resume").value

        let img = null
        if(this.state.image.url!==""){
            img = IP+"/"+ this.state.image.url
        }


        let raw8 = JSON.stringify({username , nom , prenom , description ,profileImageUrl:img});

        let r1equestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw8,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/redacteur/"+localStorage.getItem("re_id"), r1equestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.info = {
                    ...this.info ,
                    ...result.success ,
                    profileImage:result.success.profileImageUrl
                }

                localStorage.setItem("re_all",JSON.stringify(this.info))

                alert(" Profile mis à jour ")
                window.location.reload()
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return  <React.Fragment>

        <div className={"col-xs-8 col-xs-offset-1 "}>
            <div className={"col-xs-12"}>
                <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                   Mettez a jour vos informations personnel & profile
                </h1>

            </div>

            <div className={"col-xs-12"}>
                <h3 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                   profile : {this.info.email}
                </h3>

            </div>

            <div className={"col-xs-12"} style={{backgroundColor:"#eeeeee",borderRadius:"5px 5px",border:"solid 1px #a0a0a0"}}>

                <div className={"col-xs-12"} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                    <div className={"label_new col-xs-4"}> Username</div>
                    <div className={"col-xs-8"}>
                        <input type={"text"} id={"username"} maxLength={254}  placeholder={this.correct_null(this.info.username)} className={"my_text_box_v4"}/> </div>
                </div>

                <div className={"col-xs-12"} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                    <div className={"label_new col-xs-4"}> Nom</div>
                    <div className={"col-xs-8"}>
                        <input type={"text"} id={"nom"} maxLength={254}  placeholder={this.correct_null(this.info.nom)} className={"my_text_box_v4"}/> </div>
                </div>

                <div className={"col-xs-12"} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                    <div className={"label_new col-xs-4"}> Prenom </div>
                    <div className={"col-xs-8"}>
                        <input type={"text"} id={"prenom"} maxLength={254}  placeholder={this.correct_null(this.info.prenom)} className={"my_text_box_v4"}/> </div>
                </div>

                <div className={"col-xs-12"}>
                    <div className={"label_new col-xs-4"}> Photo de profile </div>
                    <div className={"col-xs-8"}>
                        <input type={"button"} value={" Ajouter photo "} onClick={()=>{
                            document.querySelector("#image").click()
                        }} className={"my_button_light_blue"}/> </div>
                </div>
                {this.state.image.ready&&<div className={"col-xs-12"}> <img width={"50%"} height={"auto"} style={{backgroundColor:"transparent",marginLeft:"25%"}} src={IP+"/"+this.state.image.url} /> </div>}





                <div className={"col-xs-12"} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                    <div className={"label_new col-xs-4"}>Résumé :</div>
                    <div className={"col-xs-8"}> <textarea id={"resume"} maxLength={254} style={{height:"100px",fontWeight:"lighter",textAlign:"left"}} rows={5} placeholder={this.correct_null(this.info.description)} className={"my_text_box_v6"}/> </div>
                </div>

                <div className={"col-xs-4 col-xs-offset-4"} style={{paddingTop:"50px",paddingBottom:"50px"}}>
                    <input type={"button"}  value={" mettre à jour"}  className={"create_button"} onClick={()=>{

                        this.sychronize()


                    }}/>
                </div>


                <input type={"file"} id={"image"} accept="image/*"  onChange={(e)=>{
                    if(e.target.files[0]){
                        let myHeadersA = new Headers();
                        myHeadersA.append("Authorization", "Bearer "+localStorage.getItem("re_token"));

                        let formdata4 = new FormData();
                        formdata4.append("imageFile", e.target.files[0], e.target.files[0].name);

                        let requestOptionsB = {
                            method: 'POST',
                            headers: myHeadersA,
                            body: formdata4,
                            redirect: 'manual'
                        };
                        this.setState({image:{url:"",process:true,ready:false}})

                        fetch(IP+"/api/v0/article/uploadImage", requestOptionsB)
                            .then(response => response.json())
                            .then(result => {console.log(result)
                                this.setState({image:{url:result.imageUrl,process:false,ready:true}})
                            })
                            .catch(error => {console.log('error', error)
                                this.setState({image:{url:error,process:false,ready:false}})

                            });



                    }
                }} style={{display:"none"}}/>





            </div>

        </div>

            <div className={"col-xs-3"}><TagsPopulaires /></div>
        </React.Fragment>
    }

}

export default ProfilRedacteur