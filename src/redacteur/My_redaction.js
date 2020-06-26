import React from "react";
import IP from "../redux/Ip_provider";
import Displayed_article from "./Displayed_article";


class My_redaction extends React.Component {
    constructor(props) {
        super(props);
        this.re =  JSON.parse(localStorage.getItem("re_all"))
        this.state = {
            my_articles : []
        }
    }

    componentDidMount() {
        let requestOptions = {
            method: 'GET',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/article/redacteur/"+localStorage.getItem("re_id"), requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                let tmp = []
                result.forEach((i)=>{
                    tmp.push({...i,redacteur:this.re})
                })

                this.setState({my_articles:tmp})
               })
            .catch(error => console.log('error', error));
    }

    render() {
        return <div className={"col-xs-12"}>
            <div className={"col-xs-12"}>
                <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                    Mes articles écrits et soumis
                </h1>

            </div>
            <div className={"col-xs-12 "} style={{border:"solid 0px red"}}>
                {
                    this.state.my_articles.map((i,itr)=>{
                        // eslint-disable-next-line react/jsx-pascal-case
                        return <div key={itr} className={"col-xs-12 zero_pad"}>

                            <div className={"col-xs-8 "}>
                                <Displayed_article {...i}  />
                            </div>
                            <div className={"col-xs-4"} style={{textAlign:"left", paddingTop:"60px"}}>

                                <div className={"col-xs-12"} >

                                    <h2 className={""}>Status: </h2>
                                    { (()=>{
                                        console.log(i.status)

                                        if(i.status==="ACCEPTED"){
                                            return <h2 style={{color:"#006442"}}>Accepté</h2>
                                        }
                                        if(i.status==="REJECTED"){
                                            return <h2 style={{color:"#C3272B"}}>Rejeté</h2>
                                        }
                                        return <h2 style={{color:"#002148"}}>En attente de validation</h2>
                                    })() }
                                </div>

                                {(i.status==="REJECTED")&&<div className={"col-xs-12"}>
                                    <h3 className={"col-xs-12"}>La cause du refus : </h3>
                                    <div style={{fontSize:"120%"}} className={"col-xs-12"}>{i.refusCause}</div>
                                </div>}


                            </div>

                        </div>
                    })
                }
            </div>

        </div>
    }

}

export default My_redaction