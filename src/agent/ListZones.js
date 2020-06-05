import React from "react";
import { get_data_dz_zones_now ,set_active_dz_zone } from "../redux/action";
import { connect } from 'react-redux'
import IP from "../redux/Ip_provider";
import {NavLink} from "react-router-dom";
import coords_map from "../redux/wilayas.json";
import { parser_diff ,parser_diff_comment} from '../http_requests/dataCalcule'


class ListZones extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                data :props.dz_now.zones_cities ,


        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((this.props.dz_now.loaded_cities)&&(!prevProps.dz_now.loaded_cities)){


           this.setState({data:this.props.dz_now.zones_cities})

        }
    }


    onSort(event, sortKey){


        let data = [...this.state.data];

        if((data.length>0)&&(!isNaN(data[0][sortKey]))){
            data = data.sort((a,b)=> (a[sortKey]-b[sortKey]) );

        }
        else {

           data =  data.sort((a, b) => a[sortKey].toString().localeCompare(b[sortKey].toString()));

        }

        if(JSON.stringify(data)===JSON.stringify(this.state.data)){
            data = data.reverse() ;
        }
        this.setState({data}) ;
    }



    render() {


        return <div className={"col-xs-12"} >


            <table className=" col-xs-12 zero_pad big_table" style={{paddingTop: "10px",fontSize:"120%",}}>


                <tbody  style={   {maxHeight: "60vh",overflowY: "scroll"}}>

                <tr >

                    <td style={{width:"15%"}} className={"sortable"} onClick={e => this.onSort(e, 'city')}>Wilaya</td>
                    <td style={{width:"20%"}} className={"sortable"} onClick={e => this.onSort(e, 'updatedAtCountry')}>Mis à jour</td>
                    <td style={{width:"10%"}} className={"sortable"} onClick={e => this.onSort(e, 'totalDead')}>décès</td>

                    <td style={{width:"10%"}} className={"sortable"} onClick={e => this.onSort(e, 'totalSustects')}> Suspects </td>
                    <td style={{width:"10%"}} className={"sortable"} onClick={e => this.onSort(e, 'totalActive')}> Actifs </td>
                    <td style={{width:"10%"}} className={"sortable"} onClick={e => this.onSort(e, 'totalRecovered')}> Géris </td>
                    <td style={{width:"10%"}} className={"sortable"} onClick={e => this.onSort(e, 'totalConfirmed')}> Confirmés </td>
                    <td style={{width:"15%"}} className={"sortable"} > Update </td>
                </tr>


                {
                    this.state.data.map((i,itr)=>{

                        return <tr key={itr} className={"zone_row"}  onMouseEnter={()=>{
                            this.props.set_active_dz_zone({...i , ...coords_map.map[i.city] })
                        }} onMouseLeave={()=>{
                            this.props.set_active_dz_zone({})
                        }}>
                            <td style={{width:"15%"}} > {i.city.toUpperCase()}</td>
                            <td style={{width:"20%"}} >il y'a {parser_diff_comment(i.updatedAtCountry)}</td>
                            <td style={{width:"10%"}} >{i.totalDead}</td>
                            <td style={{width:"10%"}} > {i.totalSustects}</td>
                            <td style={{width:"10%"}} > {i.totalActive}</td>
                            <td style={{width:"10%"}} >{i.totalRecovered}</td>
                            <td style={{width:"10%"}} >{i.totalConfirmed}</td>
                            <td style={{width:"15%"}} >  <NavLink to={'/sante/update_zone'} type={"button"} className={"my_button_deep_blue"} value={"update"}>update</NavLink> </td>


                        </tr>

                    })
                }
                </tbody>
            </table>



                    </div>
    }

}



const mapStatetoProps = (state) =>{
    return {
        dz_now: {
            loaded: state.dz_now.loaded , // . loaded data
            zones : state.dz_now.zones ,
            zones_cities : state.dz_now.zones_cities ,
            loaded_cities : state.dz_now.loaded_cities ,
        }
    }
}

const mapDispatchToProps = {
      set_active_dz_zone
}

export default connect(mapStatetoProps,mapDispatchToProps)(ListZones)