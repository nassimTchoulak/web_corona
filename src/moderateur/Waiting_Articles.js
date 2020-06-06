
import React, {useState} from "react";
import Head_Article from "./Head_Articles";
import Displayed_article from "../redacteur/Displayed_article";
import IP from "../redux/Ip_provider";
import './side_articles_options.css' ;
import Confirmation from "../reusable/Confirmation";
import Rejection_Cause from "../reusable/RejectionCause";

class Waiting_Articles extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            submitted : []
        }
    }


    componentDidMount() {
            this.update_state()
    }

    update_state = ()=>{

        let requestOptions = {
            method: 'GET',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/article/status?status=SUBMITTED", requestOptions)
            .then(response => response.json())
            .then(result => {

                console.log(result)
                this.setState({submitted:result.rows})

            })
            .catch(error => console.log('error', error));
    }

    render(){

        return <div className={"col-xs-12 zero_pad"}>

            <Head_Article />
            <div className={"col-xs-12"}>
                <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                    Les articles en attente de validation
                </h1>

            </div>


            <div className={"col-xs-12 "} style={{border:"solid 0px red"}}>
                {
                   this.state.submitted.map((i,itr)=>{
                       // eslint-disable-next-line react/jsx-pascal-case
                        return <div key={itr} className={"col-xs-12 zero_pad"}>

                           <div className={"col-xs-8 "}>
                               <Displayed_article {...i} />
                           </div>

                            <Side_action {...i} update_all={()=>{this.update_state()}} />

                        </div>
                    })
                }
                {
                    (this.state.submitted.length===0)&&<h2 style={{fontSize:"140%"}}> Aucun article disponible Ici </h2>
                }
            </div>


        </div>

    }

}

const Side_action = (props)=>{

    const [to_valid,set_to_valid] = useState(false)

    const [to_refuse,set_to_refuse] = useState(false)


    return   <div className={"col-xs-3 zero_pad side_article_validation"} >

        <div className={"col-xs-12"}>
            <input type={"button"} value={"VALIDER"} className={"my_button_validate_article"} onClick={()=>{
                    set_to_valid(true)
            }}/>
            <Confirmation message={"Vous etes sur de vouloir valider & publier cet article "} execute={()=>{
                    let eaders = new Headers();
                    eaders.append("Content-Type", "application/json");

                    let aw = JSON.stringify({"status":"ACCEPTED"});

                    let request1Options = {
                        method: 'PATCH',
                        headers: eaders,
                        body: aw,
                        redirect: 'manual'
                    };

                    fetch(IP+"/api/v0/article/moderateur/"+props.articleId, request1Options)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                            props.update_all()
                        })
                        .catch(error => console.log('error', error));

            }}
                          hide={()=>{ set_to_valid(false) }} visible={to_valid} />
        </div>

        <div className={"col-xs-12"} style={{paddingTop:"40px"}}>
            <input type={"button"} value={"REJETER"} className={"my_button_reject_article"} onClick={()=>{
                set_to_refuse(true)
            }}/>
            <Rejection_Cause hide={()=>{set_to_refuse(false)}} message={"etes vous sur de vouloir rejeter cet article"}
            visible={to_refuse} execute={(str)=>{
                let eaders = new Headers();
                eaders.append("Content-Type", "application/json");

                let aw = JSON.stringify({"status":"REJECTED","refusCause":str});

                let request1Options = {
                    method: 'PATCH',
                    headers: eaders,
                    body: aw,
                    redirect: 'manual'
                };
                fetch(IP+"/api/v0/article/moderateur/"+props.articleId, request1Options)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        props.update_all()
                    })
                    .catch(error => console.log('error', error));


            }}
            />
        </div>

    </div>
}



export default Waiting_Articles