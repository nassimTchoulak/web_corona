import React from 'react'
import './confirmation.css'

const Confirmation = (props)=>{



    return <React.Fragment>
        { (props.visible===true)&&
    <div className={" confirmation_back"}>

        <div className={"confirmation_body"}>
            {props.message}


            <div className={"col-xs-12"} style={{paddingTop:"10vh"}}>
                <div className={"col-xs-offset-1 col-xs-4"}>

                    <input type={"button"} className={"my_button_light_blue"} value={"Confirmer"} onClick={()=>{
                        if(props.execute===undefined){
                            alert("undifined execute")
                        }
                        else{
                            props.execute()
                            props.hide()

                        }
                    }}/>
                </div>

                <div className={"col-xs-offset-2 col-xs-4"}>

                    <input type={"button"} className={"my_button_light_blue"} onClick={()=>{

                        if(props.hide===undefined){
                            alert("undifined execute")
                        }
                        else{
                            props.hide()
                        }

                    }} value={"Annuler"}/>
                </div>
            </div>

        </div>

    </div>}
        </React.Fragment>


}


export default Confirmation