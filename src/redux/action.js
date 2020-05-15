import IP from "./Ip_provider";

export const GET_DZ_NOW = 'GET_DZ_NOW' ;

export const GET_DZ_CITIES = 'GET_DZ_CITIES'

export const SET_ACTIVE_DZ_ZONE = 'SET_DZ_ACTIVE_ZONE' ;

export const GET_DZ_RISK = 'GET_DZ_RISK'

export const SET_VISIBLE_RISK = 'SET_VISIBLE_RISK'

export const SET_UPDATE_ZONE = 'SET_UPDATE_ZONE'


export function set_displayed_update_zone(obj){
    return {type:SET_UPDATE_ZONE , payload:obj}
}


export function set_active_dz_zone(obj) {

 return {type : SET_ACTIVE_DZ_ZONE , payload : obj}

}

export function set_visible_zones_risk(bool){


    return {type : SET_VISIBLE_RISK , payload : bool}
}



export function synchronize_data(token) {
    return dispatch => Promise.all([
        dispatch(get_data_dz_zones_now(token)),
        dispatch(get_data_dz_cities_now(token)),
        dispatch(get_zones_risques_all(token))
    ]);
}


export function get_data_dz_zones_now(token){
    return (dispatch) =>{

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(IP+"/api/v0/zone/country?cc=DZ&sort=-confirmed", requestOptions)
            .then(result =>{
                result.json().then((data)=>{



                    let tmp = data.rows ;
                    let final = [] ;
                    tmp.forEach((i)=>{
                        if(i.dataZones.length>0){
                        final.push(
                            {...i, ...i.dataZones[0] ,dataZones:[] }
                        )}
                    })
                    console.log(final) ;

                    dispatch( {type:GET_DZ_NOW , payload :{ data : final }})


                })})

            .catch(error => console.log('error', error));
    }
}



export function get_data_dz_cities_now(token){
    return (dispatch) =>{

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(IP+"/api/v0/zone/groupByCity?sort=-confirmed&cc=DZ", requestOptions)
            .then(result =>{
                result.json().then((data)=>{

                    console.log(data.items ) ;

                    dispatch( {type:GET_DZ_CITIES , payload :{ data : data.items  }})


                })})

            .catch(error => console.log('error', error));
    }
}

export function get_zones_risques_all(token){
    return (dispatch)=>{

        let myHeadersT = new Headers();
        myHeadersT.append("Authorization", "Bearer "+token);

        let RTrequestOptions = {
            method: 'GET',
            headers: myHeadersT,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/zoneRisque", RTrequestOptions)
            .then(response => response.json())
            .then(result => {
                let tmp = result.items.rows ;
                let final = [] ;
                tmp.forEach((i)=>{
                    final.push(
                        {...i, ...i.zone ,...i.zone.dataZones[0] , zone:"" }
                    )
                })

                console.log(final)

                dispatch( {type:GET_DZ_RISK , payload :{ data : final }})


            })
            .catch(error => console.log('error', error));

    }
}