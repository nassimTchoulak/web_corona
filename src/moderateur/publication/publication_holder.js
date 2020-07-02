import React from 'react'
import Robots_head from "./Robots_head";

class Publication_holder extends React.Component{
    constructor(props) {
        super(props);


    }
        render(){
            return <div className={"col-xs-12 zero_pad"}>
                <div className={"col-xs-12 zero_pad"}>

                    <Robots_head />

                    <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                        Les Publications Des robots
                    </h1>

                    <div className={"col-xs-12"} style={{}}> Trouvez touts le publications de youtube , facebook et les sites populaires  </div>

                </div>
            </div>
        }


}

export default Publication_holder