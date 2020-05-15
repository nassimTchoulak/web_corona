import React from 'react'

import './map.css'
import ReactMapGL , {Marker, NavigationControl ,  }from 'react-map-gl'
import {connect} from 'react-redux'

import {set_active_dz_zone} from "../redux/action";
import {API_TOKEN} from "../redux/Ip_provider";
import coords_map from '../redux/wilayas.json'




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
                zoom: 5
            } ,

            marker: {
                latitude: 22.783055,
                longitude: 5.516666
            },
        };

        this.map = null ;

    }



    calculate_raduis(nb_cas=1){


        return Math.floor((Math.pow(this.state.viewport.zoom,2)*Math.pow(nb_cas,0.5))/5)

        //     return Math.floor((Math.pow(this.state.viewport.zoom,2.5)*nb_cas)/10)
    }

    calculate_px_raduis = (diametre,zoom)=>{
        if(isNaN(diametre))
            diametre = 50

        return (diametre* Math.pow(2,zoom)) / 33.74
    }


    render() {

        return (
            <div className={"col-xs-12 zero_pad"} >

                <div ref={this.mapRef} id={"map_unique"}   > </div>

                <ReactMapGL {...this.state.viewport}
                            onViewportChange={nextViewport => this.setState({viewport:nextViewport})}
                            mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={API_TOKEN} >



                    {
                        (!this.props.dz_now.display_risk)&&(this.state.viewport.zoom>5)&&
                        this.props.dz_now.zones.map((i,itr)=>{
                            return  <Marker key={itr}
                                            {...i} >   <div className={"zone"} onMouseEnter={()=>{ this.props.set_active_dz_zone(i) }}

                                                            style={{height:this.calculate_raduis(i.totalConfirmed),

                                                                width:this.calculate_raduis(i.totalConfirmed)}}> </div>
                            </Marker>
                        })
                    }

                    {

                        (!this.props.dz_now.display_risk)&&(this.state.viewport.zoom<=5)&&
                        this.props.dz_now.zones_cities.map((i,itr)=>{
                            return  <Marker key={itr}
                                            {...coords_map.map[i.city]} >   <div className={"zone"} onMouseEnter={()=>{ this.props.set_active_dz_zone({...i , ...coords_map.map[i.city] }) }}
                                                            style={{height:this.calculate_raduis(i.totalConfirmed),width:this.calculate_raduis(i.totalConfirmed)}}> </div>
                            </Marker>
                        })


                    }

                    {
                        (this.props.dz_now.display_risk)&&
                            this.props.dz_now.zones_risk.map((i,itr)=>{
                                return  <Marker key={itr}
                                                {...coords_map.map[i.city]} >   <div className={"zone"} onMouseEnter={()=>{ this.props.set_active_dz_zone({...i , ...coords_map.map[i.city] }) }}

                                                                                     style={{
                                                                                         height:this.calculate_px_raduis(i.diametre,this.state.viewport.zoom),
                                                                                         width:this.calculate_px_raduis(i.diametre,this.state.viewport.zoom)
                                                                                     }}> </div>
                                </Marker>

                            })
                    }


                    {
                        (!this.props.dz_now.display_risk)&&(this.props.dz_now.selected.city!==undefined)&& <Marker   {...this.props.dz_now.selected} >   <div className={"zone_selected "}
                                                                  style={{height:this.calculate_raduis(this.props.dz_now.selected.totalConfirmed),width:this.calculate_raduis(this.props.dz_now.selected.totalConfirmed)}} > </div>

                            <div className={"selected_zone_info"}>
                                <div style={{fontWeight:"bold"}} className={"col-xs-12"}>{this.props.dz_now.selected.city.toUpperCase()}</div>
                                <div className={"col-xs-12"}>{this.props.dz_now.selected.totalConfirmed} Cas</div>
                                <div className={"col-xs-12"}>{this.props.dz_now.selected.totalDead} Décès</div>
                                <div className={"col-xs-12"}>{this.props.dz_now.selected.totalActive} Actifs</div>


                            </div>

                        </Marker>
                    }



                    {
                        (this.props.dz_now.display_risk)&&(this.props.dz_now.selected.city!==undefined)&& <Marker   {...this.props.dz_now.selected} >   <div className={"zone_selected_risque "}

                                                                                            style={{
                                                                                                height:this.calculate_px_raduis(this.props.dz_now.selected.diametre,this.state.viewport.zoom),
                                                                                                  width:this.calculate_px_raduis(this.props.dz_now.selected.diametre,this.state.viewport.zoom)
                                                                                                                                                             }}> > </div>

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
                loaded_cities:state.dz_now.loaded_cities ,
                zones : state.dz_now.zones,
                zones_cities : state.dz_now.zones_cities ,
                selected : state.dz_now.selected ,

                zones_risk : state.dz_now.zones_risk ,

                display_risk : state.dz_now.display_risk ,
            }

    }
}

const mapDispatchToProps = {
      set_active_dz_zone
}


export  default connect(mapStateToProps_,mapDispatchToProps)(Map)