import React from "react";
import {get_data_dz_zones_now} from "../redux/action";
import {connect} from 'react-redux'


class UpdateZone extends React.Component{

    constructor(props){
        super(props);
    }


    render() {

        return <div className={"col-xs-12"}>update zone here {this.props.selected.city} </div>
    }

}


const mapStateToProps = (state) =>{
    return {
        selected : state.dz_now.selected
    }
}
const mapDispatchToProps = {
    get_data_dz_zones_now
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateZone)