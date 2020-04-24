import React from 'react'
import mapboxgl from 'mapbox-gl'
import {} from 'mapbox-gl'
import './map.css'
import ReactMapGL , {Marker, NavigationControl}from 'react-map-gl'
import {connect} from 'react-redux'
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {get_data_dz_zones_now, set_active_dz_zone} from "../redux/action";




class Map extends React.Component {
    mapRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: "45vw",
                height: "60vh",
                latitude: 34.430472,
                longitude: 3.334102,
                zoom: 5.5
            } ,

            marker: {
                latitude: 22.783055,
                longitude: 5.516666
            },
        };

        this.map = null ;

    }


    componentDidMount() {



    }

    calculate_raduis(nb_cas){

        return Math.floor((Math.pow(this.state.viewport.zoom,2)*nb_cas)/10)

        //     return Math.floor((Math.pow(this.state.viewport.zoom,2.5)*nb_cas)/10)
    }


    render() {

        return (
            <div className={"col-xs-12 zero_pad"} >

                <div ref={this.mapRef} id={"map_unique"}   > </div>

                <ReactMapGL {...this.state.viewport}
                            onViewportChange={nextViewport => this.setState({viewport:nextViewport})}
                            mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={'pk.eyJ1IjoibmFzZ3VubmVyIiwiYSI6ImNrOWRnMDRmOTAydmwzaXFsazh6eXJlNmgifQ.bYSxJQrZVfBGfn9z55JWGA'} >



                    {
                        this.props.dz_now.zones.map((i,itr)=>{
                            return  <Marker key={itr}
                                            {...i} >   <div className={"zone"} onMouseEnter={()=>{ this.props.set_active_dz_zone(i) }}


                                                            style={{height:this.calculate_raduis(i.totalConfirmed),width:this.calculate_raduis(i.totalConfirmed)}}> </div>

                            </Marker>
                        })
                    }

                    <Marker {...this.state.marker}> <div style={{color:"red"}}>H</div> </Marker>

                    {
                        (this.props.dz_now.selected.city!==undefined)&& <Marker   {...this.props.dz_now.selected} >   <div className={"zone_selected "}
                                                                  style={{height:this.calculate_raduis(this.props.dz_now.selected.totalConfirmed),width:this.calculate_raduis(this.props.dz_now.selected.totalConfirmed)}} > </div>

                            <div className={"selected_zone_info"}>
                                <div style={{fontWeight:"bold"}} className={"col-xs-12"}>{this.props.dz_now.selected.city.toUpperCase()}</div>
                                <div className={"col-xs-12"}>{this.props.dz_now.selected.totalConfirmed} Cas</div>
                                <div className={"col-xs-12"}>{this.props.dz_now.selected.totalDead} Décès</div>
                                <div className={"col-xs-12"}>{this.props.dz_now.selected.totalActive} Actifs</div>


                            </div>

                        </Marker>
                    }

                </ReactMapGL>

            </div>
        );
    }
}

const mapStateToProps_ = (state) =>{

        return {
            dz_now: {
                loaded: state.dz_now.loaded , // . loaded data
                zones : state.dz_now.zones,
                selected : state.dz_now.selected
            }

    }
}

const mapDispatchToProps = {
      set_active_dz_zone
}


export  default connect(mapStateToProps_,mapDispatchToProps)(Map)