import React, {useState} from "react";
import {parser_diff_comment} from "../http_requests/dataCalcule";
import Confirmation from "../reusable/Confirmation";
import IP from "../redux/Ip_provider";
import '../redacteur/displayed_article.css'


export const Comment_manager = (props)=> {

    const [del, set_delete] = useState(false)

    return <React.Fragment>


        <div className={"col-xs-12 mail_time zero_pad"} align={"left"}>
            <div className={"comment_mail col-xs-8 zero_pad"}>
                <span className={"glyphicon glyphicon-chevron-right zero_pad_v2"}></span>
                <div
                    className={"zero_pad_v2"}>{" " + decodeURI(props.username || "").replace("+", " ")}</div>
            </div>
            <div className={"comment_time col-sx-3 zero_pad"}>+{parser_diff_comment(props.date)}</div>


            <div className={"col-xs-1"}><span className={"glyphicon glyphicon-remove"} onClick={() => {
                set_delete(true)
            }} style={{color: "#a82323", cursor: "pointer"}}> </span></div>

        </div>




        <div className={"col-xs-12 comment_txt zero_pad"}>{decodeURI(props.contenu).replace(/\+/g, " ")}</div>

        <div style={{fontSize: "80%"}}>
            <Confirmation message={"etes-vous sur de vouloir supprimer ce commentaire ?"}
                          hide={() => {
                              set_delete(false)
                          }} execute={() => { props.delete()
            }} visible={del}/></div>

    </React.Fragment>
}