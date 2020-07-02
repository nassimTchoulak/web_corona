import React from 'react'

class Publication_holder extends React.Component{
    constructor(props) {
        super(props);


    }
        render(){
            return <div className={"col-xs-12 zero_pad"}>
                <div className={"col-xs-12"}>
                    <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                        Les Publications Des robots
                    </h1>

                </div>
            </div>
        }


}

export default Publication_holder