import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import Displayed_article from "../redacteur/Displayed_article";
import {get_article_accepted_by_page , disallow_article_update} from "../redux/action";
import IP from "../redux/Ip_provider";
import {NavLink} from "react-router-dom";
import Head_Article from "./Head_Articles";
import Rejection_Cause from "../reusable/RejectionCause";
import TagsPopulaires from "../redacteur/PopularTags";



const Submitted_articles_mod = (props)=>{



    const update_required = ()=>{
        let height1 = ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ) + window.pageYOffset );
        // console.log(this.height1);
        let height2 = document.documentElement.scrollHeight ; ///height2 is static
        //  console.log(this.height2);
        if((height2<(height1+200))&&(props.articles.allow_update)){
            props.disallow_article_update()
            props.get_article_accepted_by_page(props.articles.page)
        }
    }

    useEffect(()=>{

        document.addEventListener("scroll",update_required)
        props.get_article_accepted_by_page(props.articles.page)


        return ()=>{
            document.removeEventListener('scroll', update_required);
        }

    },[])


    return <div className={"col-xs-12 zero_pad"}>

       <Head_Article />
        <div className={"col-xs-12"}>
            <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                Les articles en Publiés et validés
            </h1>

        </div>


        <div className={"col-xs-10"} style={{border:"solid 0px red"}}>
            {
                props.articles.accepted.map((i,itr)=>{
                    return <div key={itr} className={"col-xs-12 zero_pad"}>
                        <div className={"col-xs-10 zero_pad" }>
                            <Displayed_article {...i} /> </div>
                        <div className={"col-xs-2 zero_pad"}>
                            <Side_action {...i} update_all={()=>{ window.location.reload()}} />
                        </div>


                    </div>
                })
            }
            {
                (props.articles.accepted.length===0)&&<h2 style={{fontSize:"140%"}}> Aucun article disponible Ici </h2>
            }
        </div>

        <div className={"col-xs-2"} style={{backgroundColor:"#fcfcfc"}}>

            <TagsPopulaires />
        </div>

    </div>

}

const Side_action = (props)=>{

    const [to_refuse,set_to_refuse] = useState(false)

    return   <div className={"col-xs-12 zero_pad side_article_validation"} >
        <div className={"col-xs-12 zero_pad"} style={{paddingTop:"40px"}}>
            <input type={"button"} value={"Archiver"} className={"my_button_reject_article"} onClick={()=>{
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





const mapStateToProps_ = (state) =>{

    return {
        articles: state.articles

        /*articles : {
        accepted : [], allow_update : true , page : 1 ,
    }*/
    }
}

const mapDispatchToProps = {
    get_article_accepted_by_page, disallow_article_update
}


export default connect(mapStateToProps_,mapDispatchToProps)(Submitted_articles_mod)
