import  React from 'react'
import  ReactDOM from 'react-dom'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import IP from '../redux/Ip_provider'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser


const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({html, text}) {
    console.log('handleEditorChange', html, text)
}
export default (props) => {
    return (
        <div className={"col-xs-12"} style={{paddingTop:"100px"}}>
        <MdEditor
            value=""
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
        />

        <div className={"col-xs-4 col-xs-offset-4"}>

            <input type={"button"} value={" SUBMIT ARTICLE "} className={"my_button_v2"} onClick={()=>{

                let myHeaders23 = new Headers();
                myHeaders23.append("Content-Type", "application/json");
                myHeaders23.append("Authorization", "Bearer "+localStorage.getItem("re_token"));
                myHeaders23.append("Content-Type", "application/json");

                let raw123 = JSON.stringify({item:{lien:"flutter",dateArticle:"2020-05-07T21:28:19.331Z",source:"flutter",titre:"flfutter",sous_titre:"flutter",
                        contenu:"fluter",popularite:2,imageUrl:"",videoUrl:"",status:"SUBMITTED",redacteurRedacteurId:1},oldTags:["1","2"],newTags:["corona","flutter"]})  ;

                let requestOptions13 = {
                    method: 'POST',
                    headers: myHeaders23,
                    body: raw123,
                    redirect: 'manual'
                };

                fetch(IP+"/api/v0/article/", requestOptions13)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));

            }} />
        </div>

        </div>
    )
}