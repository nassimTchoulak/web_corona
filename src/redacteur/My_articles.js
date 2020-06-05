import React from "react";
import Displayed_article from "./Displayed_article";


class My_articles extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            my_articles :[]
        }

    }

    componentDidMount() {

    }

    render() {
        return <div className={"col-xs-12"}>
            <div className={"col-xs-8 col-xs-offset-1"} style={{border:"solid 1px red"}}>
                {
                    this.state.my_articles.map((i,itr)=>{
                        return <div key={itr} className={"col-xs-12"}> <Displayed_article {...i} /> </div>
                    })
                }
            </div>
            <div className={"col-xs-3"}>  hello world for all articles coming </div>

        </div>
    }
}

export default My_articles