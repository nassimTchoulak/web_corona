import React, {useEffect, useState} from "react";
import IP from "../redux/Ip_provider";


const TagsPopulaires =()=>{


    const [tags,setTags] = useState([])

    useEffect(()=>{

        var requestOptions = {
            method: 'GET',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/tag", requestOptions)
            .then(response => response.json())
            .then(result => {

                setTags(result.rows)

            })
            .catch(error => console.log('error', error));
    },[])


    return <div className={"col-xs-12"}>
        <h3 className={"col-xs-12"} style={{color:"#002148"}}> Les tags populaires </h3>
        {
            tags.map((i,itr)=>{
                return <div key={itr} className={"tag_box col-xs-12"} style={{padding:"10px",}}>#{i.description} : {i.useRating}</div>
            })
        }
    </div>

}

export default TagsPopulaires