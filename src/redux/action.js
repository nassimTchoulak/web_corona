import IP from "./Ip_provider";

export const GET_DZ_NOW = 'GET_DZ_NOW' ;


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
                        final.push(
                            {...i, ...i.dataZones[0] ,dataZones:[] }
                        )
                    })
                    console.log(final) ;

                    dispatch( {type:GET_DZ_NOW , payload :{ data : final }})


                })})

            .catch(error => console.log('error', error));
    }
}