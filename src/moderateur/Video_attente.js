import React from "react";
import IP from "../redux/Ip_provider";
import VideoArticle from "./VideoArticle";
import Video_Head from "./videos_head";


class Video_attente extends React.Component {

    constructor(props) {
        super(props);
        this.state  = {
            articles :[]
        }
    }

    componentDidMount() {


        fetch(IP+"/api/v0/video/valide?valide=false")
            .then(response => response.json())
            .then(result => {console.log(result.items)

                if(result.items.count>0){
                    this.setState({articles:result.items.rows})
                }

            })
            .catch(error => console.log('error', error));
    }


    render() {
        return <div className={"col-xs-12 zero_pad"}>
            <Video_Head />
            <div className={"col-xs-12"}>
                <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                    Les video utlisateurs en attente de validation
                </h1>

            </div>

            <div className={"col-xs-12"}>
                {this.state.articles.map((i,itr)=>{
                    return <div key={itr}  className={"col-xs-10 col-xs-offset-1  zero_pad"}> <VideoArticle {...i} /> </div>
                })}

                {
                    (this.state.articles.length===0)&&<h3> Aucune video disponible </h3>
                }
            </div>

        </div>
    }

}

export default Video_attente