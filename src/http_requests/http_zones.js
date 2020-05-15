import IP, {API_TOKEN} from "../redux/Ip_provider";


export function delete_zone_risque(token,targetZoneId,ZonesRisqueList){

    return new Promise((resolve,rejects)=>{
    let risque_id = -1 ;
    ZonesRisqueList.forEach((i)=>{
        if(i.zoneId===targetZoneId){
            risque_id = i.zoneRisqueId ;
        }
    })
    if(risque_id>0){
        let myHeadersDEL = new Headers();
        myHeadersDEL.append("Authorization", "Bearer "+token);

        let requestOptionsDEL = {
            method: 'DELETE',
            headers: myHeadersDEL,
            redirect: 'manual'
        };
        fetch(IP+"/api/v0/zoneRisque/"+risque_id, requestOptionsDEL)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => rejects({error}));
    }
    })

}

export function delete_zone_risque_from_risque_id(token,risque_id){
    return new Promise((resolve,rejects)=>{
            let myHeadersDEL2 = new Headers();
            myHeadersDEL2.append("Authorization", "Bearer "+token);

            let requestOptionsDEL2 = {
                method: 'DELETE',
                headers: myHeadersDEL2,
                redirect: 'manual'
            };
            fetch(IP+"/api/v0/zoneRisque/"+risque_id, requestOptionsDEL2)
                .then(response => response.json())
                .then(result => resolve(result))
                .catch(error => rejects({error}));

    })

}

export function insert_zone_data(token,_id,raw4){

 return new Promise((resolve,reject)=>{
    let myHeaders22 = new Headers();
    myHeaders22.append("Authorization", "Bearer "+token);
    myHeaders22.append("Content-Type", "application/json");
    let requestOptions11 = {
        method: 'POST',
        headers: myHeaders22,
        body: raw4,
        redirect: 'follow'
    };
    fetch(IP+"/api/v0/dataZone", requestOptions11)
        .then(response3 => response3.json())
        .then(result2 =>{resolve(result2) ;
        })
        .catch(error2 => reject({error:error2}));
 })
}

export function insert_zone_risque_only(token ,zoneId , diametre ,cause , degre){
   return  new Promise((resolve, reject) => {


        let myHeaders_insert = new Headers();
        myHeaders_insert.append("Content-Type", "application/json");
        myHeaders_insert.append("Authorization", "Bearer "+token);

        const w_new = JSON.stringify({diametre:diametre,cause:cause,degre:degre,zoneZoneId:zoneId});
      // let w_new = '{"diametre":11,"cause":"jhbj","degre":1,"zoneZoneId":1}'


        let requestOptions_insert = {
            method: 'POST',
            headers: myHeaders_insert,
            body: w_new,
            redirect: 'follow'
        };

        fetch(IP+"/api/v0/zoneRisque/", requestOptions_insert).then((result)=>{return result.json()
        }).then((data)=>{
            console.log(data)
            resolve({data})
        }).catch((errr)=>{
            console.log(errr)
            reject({error:errr})})



    }
)}

export function get_place_query(coordx,coordy){
    return new Promise((resolve,reject)=>{
        let myHeaders = new Headers();

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'manual'
        };

        fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+coordx+","+coordy+".json?types=region&access_token="+API_TOKEN, requestOptions)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}


