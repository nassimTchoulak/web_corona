import React, {useEffect} from "react";
import {connect} from 'react-redux'
import Displayed_article from "./Displayed_article";
import {get_article_accepted_by_page , disallow_article_update} from "../redux/action";



const Accepted_articles = (props)=>{



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


        return <div className={"col-xs-12"}>
            <div className={"col-xs-8 col-xs-offset-1"} style={{border:"solid 0px red"}}>
                {
                    props.articles.accepted.map((i,itr)=>{
                        return <div key={itr} className={"col-xs-12"}> <Displayed_article {...i} delete_comment={true} /> </div>
                    })
                }
            </div>
            <h1 className={"col-xs-3"} style={{color:"#002148"}}>  les tags populaires </h1>

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


export default connect(mapStateToProps_,mapDispatchToProps)(Accepted_articles)
