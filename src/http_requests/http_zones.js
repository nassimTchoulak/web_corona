import IP, {API_TOKEN} from "../redux/Ip_provider";


export function insert_zone_risque_with_delete(token ,zoneId , diametre ,cause , degre){
    new Promise((resolve, reject) => {
        let deleted = false ;
        let inserted= false ;
        let myHeaders_delete = new Headers();
        myHeaders_delete.append("Authorization", "Bearer "+token);

        let requestOptions_delete = {
            method: 'DELETE',
            headers: myHeaders_delete,
            redirect: 'manual'
        };
        fetch(IP+"/api/v0/zoneRisque/"+zoneId, requestOptions_delete)
            .then((response)=>{
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(result => {

                deleted = true ;
                if(inserted&&deleted){
                    resolve({status:true})
                }

            })
            .catch(error => {
                reject({cause:error})
            });



        let myHeaders_insert = new Headers();
        myHeaders_insert.append("Content-Type", "application/json");
        myHeaders_insert.append("Authorization", "Bearer "+token);
        myHeaders_insert.append("Content-Type", "application/json");

        let raw = JSON.stringify({"diametre":diametre,"cause":cause,"degre":degre,"zoneZoneId":zoneId});

        let requestOptions_insert = {
            method: 'POST',
            headers: myHeaders_insert,
            body: raw,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/zoneRisque/", requestOptions_insert)
            .then(response => response.json())
            .then(result => {
                inserted = true ;
                if(inserted&&deleted){
                    resolve({status:true})
                }
            })
            .catch(error => {
                reject({cause:error})
            });

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