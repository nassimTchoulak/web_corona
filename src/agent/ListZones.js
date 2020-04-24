import React from "react";
import { get_data_dz_zones_now ,set_active_dz_zone } from "../redux/action";
import { connect } from 'react-redux'
import IP from "../redux/Ip_provider";
import {NavLink} from "react-router-dom";


class ListZones extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                data :props.dz_now.zones ,


        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((this.props.dz_now.loaded)&&(!prevProps.dz_now.loaded)){


           this.setState({data:this.props.dz_now.zones})
        }
    }


    onSort(event, sortKey){

        let data = [...this.state.data];
        data.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey].toString())   ) ;
        if(JSON.stringify(data)===JSON.stringify(this.state.data)){
            data = data.reverse() ;
        }
        this.setState({data}) ;
    }


    parser_diff(a){
        if(Math.floor(a/(1000*3600*24*7))!==0){
            return Math.floor(a/(1000*3600*24*7))+" Sem";
        }
        else{
            if(Math.floor(a/(1000*3600*24))!==0){
                return Math.floor(a/(1000*3600*24))+" j";
            }else{
                if(Math.floor(a/(1000*3600))!==0){
                    return Math.floor(a/(1000*3600))+" h";
                }
                else{
                    return Math.floor(a/(1000*60))+" m";
                }



            }
        }
    }
    parser_diff_comment(str){
        let date0 = new Date();
        // date0.setHours(date0.getHours() - 1);
        let old = new Date(str);
        return this.parser_diff(Math.abs(old.getTime() - date0.getTime())) ;
    }

    render() {


        return <div className={"col-xs-12"}>


            <table className=" col-xs-12 zero_pad big_table" style={{paddingTop: "10px",fontSize:"120%"}}>

                <tbody>

                <tr >

                    <td style={{width:"15%"}} className={"sortable"} onClick={e => this.onSort(e, 'city')}>Wilaya</td>
                    <td style={{width:"20%"}} className={"sortable"} onClick={e => this.onSort(e, 'updatedAt')}>Mis à jour</td>
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
                            this.props.set_active_dz_zone(i)
                        }} onMouseLeave={()=>{
                            this.props.set_active_dz_zone({})
                        }}>
                            <td style={{width:"15%"}} > {i.city.toUpperCase()}</td>
                            <td style={{width:"20%"}} >il y'a {this.parser_diff_comment(i.updatedAt)}</td>
                            <td style={{width:"10%"}} >{i.totalDead}</td>
                            <td style={{width:"10%"}} > {i.totalSustects}</td>
                            <td style={{width:"10%"}} > {i.totalActive}</td>
                            <td style={{width:"10%"}} >{i.totalRecovered}</td>
                            <td style={{width:"10%"}} >{i.totalConfirmed}</td>
                            <td style={{width:"15%"}} >  <NavLink to={'/update_zone'} type={"button"} className={"my_button_update"} value={"update"}>update</NavLink> </td>


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
            zones : state.dz_now.zones
        }
    }
}

const mapDispatchToProps = {
    get_data_dz_zones_now , set_active_dz_zone
}

export default connect(mapStatetoProps,mapDispatchToProps)(ListZones)