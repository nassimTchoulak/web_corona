import React from "react";
import { get_data_dz_zones_now } from "../redux/action";
import { connect } from 'react-redux'
import IP from "../redux/Ip_provider";


class ListZones extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                data :props.dz_now.zones
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

    render() {


        return <div className={"col-xs-12"}>


            <table className=" col-xs-12 zero_pad big_table" style={{paddingTop: "10px",fontSize:"120%"}}>
                <tr >

                    <td className={"sortable"} onClick={e => this.onSort(e, 'city')}>Wilaya</td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'totalDead')}>décès</td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'totalSustects')}> Suspects </td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'totalActive')}> Actifs </td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'totalRecovered')}> Géris </td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'totalConfirmed')}> Confirmés </td>
                </tr>

                {
                    this.state.data.map((i,itr)=>{

                        return <tr key={itr} className={"zone_row"}>
                            <td> {i.city.toUpperCase()}</td>
                            <td>{i.totalDead}</td>
                            <td>{i.totalSustects}</td>
                            <td>{i.totalActive}</td>
                            <td>{i.totalRecovered}</td>
                            <td>{i.totalConfirmed}</td>


                        </tr>

                    })
                }

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
    get_data_dz_zones_now
}

export default connect(mapStatetoProps,mapDispatchToProps)(ListZones)