

'use strict';

import  React from 'react'
import  ReactDOM from 'react-dom'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import { stateToMarkdown } from "draft-js-export-markdown";

import Confirmation from "../reusable/Confirmation";

// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './redaction.css'
import IP from '../redux/Ip_provider'

import  {Editor, EditorState, RichUtils} from "draft-js";

class Redaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            editorState: EditorState.createEmpty(),

            image:{
                url:"",
                process:false,
                ready:false
            },
            video:{
                url:"",
                process:false,
                ready:false
            } ,
            all_tags:[],
            selected_tags:[],
            error:false ,

            visible_confirmation:false

        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {this.setState({editorState})


        };

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }



    publish_article = ()=>{

        let title = document.querySelector("#titre").value ;
        let sous_titre = document.querySelector("#sous_titre").value ;

        if((!this.state.image.ready)||(title.length===0)||(sous_titre.length===0)){
            this.setState({error:true})
        }
        else{
            let  markdown = stateToMarkdown(
                this.state.editorState.getCurrentContent()
            )

            let ZmyHeadersZ = new Headers();
            ZmyHeadersZ.append("Content-Type", "application/json");
            ZmyHeadersZ.append("Authorization", "Bearer "+localStorage.getItem("re_token"));


            let vid =""
            if(this.state.video.url!==""){
                vid = IP + "/"+this.state.video.url ;
            }
            let rraw45 = JSON.stringify({item:{titre:title,sous_titre:sous_titre,contenu:markdown,status:"SUBMITTED",
                    imageUrl:IP+"/"+this.state.image.url,videoUrl:vid,redacteurRedacteurId:Number(localStorage.getItem("re_id"))},

                newTags:this.state.selected_tags});
            console.log(rraw45)

            let requestOptionsZ = {
                method: 'POST',
                headers: ZmyHeadersZ,
                body: rraw45,
                redirect: 'manual'
            };

            fetch(IP+"/api/v0/article/", requestOptionsZ)
                .then(respons => respons.json())
                .then(result45 => {

                    console.log(result45)
                    if(result45.message==="success"){
                        window.location.pathname = "/redaction/preview/"+result45.created.articleId ;
                    }
                })
                .catch(error => console.log('error', error));

        }


    }

    componentDidMount() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("re_token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/tag", requestOptions)
            .then(response => response.json())
            .then(result => {
                let tmp = []
                result.rows.forEach((i)=>{
                    tmp.push(i.description)
                })
                this.setState({all_tags:tmp})
            })
            .catch(error => console.log('error', error));
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (

            <div className={"col-xs-12 zero_pad"}>

                <h1 className={"title_zone_new"} style={{paddingTop:"40px",paddingBottom:"30px"}}> Rédigez et publiez Votre Article : </h1>


                        <div className={"col-xs-9 zero_pad"}>
                                        <div className={"col-xs-12"} >

                                            <div className={"label_new col-xs-4"}> Titre de l'article:</div>
                                            <div className={"col-xs-8"} style={{fontSize:"140%"}}> <input id={"titre"} type={"text"} maxLength={40} placeholder={"Titre"} className={"my_text_box_v4"}/> </div>

                                        </div>

                                        <div className={"col-xs-12"} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                            <div className={"label_new col-xs-4"}> Sous-titre</div>
                                            <div className={"col-xs-8"}> <textarea id={"sous_titre"} maxLength={254} style={{height:"100px",fontWeight:"lighter",textAlign:"left"}} rows={5} placeholder={" sous-titre & petite description "} className={"my_text_box_v6"}/> </div>
                                        </div>


                            <div className={"col-xs-12"} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                                <div className={"label_new col-xs-4"}> les Tags selectionnés : </div>
                                <div className={"col-xs-8"} align={"left"}> {this.state.selected_tags.map((i,itr)=>{
                                    return <span style={{fontSize:"150%",color:"#05494c",paddingLeft:"10px"}} key={itr}> {" #"+i+" "}</span>

                                })}
                                <span onClick={()=>{this.setState({selected_tags:[]})}} className={"glyphicon glyphicon-remove"}></span>
                                </div>
                            </div>

                                        <div className={"col-xs-6"} style={{padding:"10px"}}>

                                            <div className={"col-xs-12"}>


                                                {((this.state.image.process)||(this.state.video.process))&&<div className={"col-xs-12"}> Veuillez attendre le telechargement </div>}


                                            </div> <input type={"file"} id={"image"} accept="image/*"  onChange={(e)=>{
                                            if(e.target.files[0]){
                                                let myHeadersA = new Headers();
                                                myHeadersA.append("Authorization", "Bearer "+localStorage.getItem("re_token"));

                                                let formdata4 = new FormData();
                                                formdata4.append("imageFile", e.target.files[0], e.target.files[0].name);

                                                let requestOptionsB = {
                                                    method: 'POST',
                                                    headers: myHeadersA,
                                                    body: formdata4,
                                                    redirect: 'manual'
                                                };
                                                this.setState({image:{url:"",process:true,ready:false}})

                                                fetch(IP+"/api/v0/article/uploadImage", requestOptionsB)
                                                    .then(response => response.json())
                                                    .then(result => {console.log(result)
                                                        this.setState({image:{url:result.imageUrl,process:false,ready:true}})
                                                    })
                                                    .catch(error => {console.log('error', error)
                                                        this.setState({image:{url:error,process:false,ready:false}})

                                                    });



                                            }
                                        }} style={{display:"none"}}/>

                                        </div>

                                        <div className={"col-xs-6"} style={{padding:"10px"}}>


                                            <div className={"col-xs-6"}><button type={"button"} className={"my_button_deep_blue"} value={"CHOISIR UNE VIDEO (option) "} onClick={()=>{
                                                document.querySelector("#video").click()
                                            }} >CHOISIR UNE VIDEO <span className={"glyphicon glyphicon-facetime-video"}></span> (op)</button> </div>

                                            <div className={"col-xs-6"}> <button  className={"my_button_deep_blue "} value={"CHOISIR UNE IMAGE "} onClick={()=>{
                                                document.querySelector("#image").click()
                                            }}>CHOISIR UNE IMAGE <span className={"glyphicon glyphicon-picture"}></span></button> </div>



                                           <input type={"file"} id={"video"} accept="video/*" onChange={(e)=>{
                                            if(e.target.files[0]){

                                                let myHeadersB = new Headers();
                                                myHeadersB.append("Authorization", "Bearer "+localStorage.getItem("re_token"))
                                                let formdataB = new FormData();
                                                formdataB.append("videoFile", e.target.files[0], e.target.files[0].name);

                                                let requestOptionsB = {
                                                    method: 'POST',
                                                    headers: myHeadersB,
                                                    body: formdataB,
                                                    redirect: 'manual'
                                                };

                                                this.setState({video:{url:"",process:true,ready:false}})
                                                fetch(IP+"/api/v0/article/uploadVideo", requestOptionsB)
                                                    .then(response => response.json())
                                                    .then(result => {console.log(result)
                                                        setTimeout(()=>this.setState({video:{url:result.imageUrl,process:false,ready:true}}),1000)
                                                    })
                                                    .catch(error => {console.log('error', error)
                                                        this.setState({video:{url:error,process:false,ready:false}})

                                                    });



                                            }
                                        }} style={{display:"none"}}/>

                                        </div>


                <div className={"col-xs-11 col-xs-offset-1"} align={"left"}>

                            <div className="RichEditor-root" style={{padding:"20px"}}>
                                <BlockStyleControls
                                    editorState={editorState}
                                    onToggle={this.toggleBlockType}
                                />
                                <InlineStyleControls
                                    editorState={editorState}
                                    onToggle={this.toggleInlineStyle}
                                />
                                <div className={className} style={{position:"relative",minHeight:"30vh"}} onClick={this.focus}>
                                    <div className={"col-xs-4"} style={{position:"absolute",top:"0px",right:"0px"}}>
                                        <div className={"col-xs-12"} style={{backgroundColor:"#b0b5ba"}}>
                                        {this.state.video.ready&&<div className={"col-xs-12"}>
                                            <video width="100%" >
                                                <source placeholder={"video"} src={IP+"/"+this.state.video.url} type="video/mp4" />
                                            </video>
                                        </div>}
                                        {this.state.image.ready&&<div className={"col-xs-12"}> <img width={"100%"} style={{backgroundColor:"transparent"}} src={IP+"/"+this.state.image.url} /> </div>}
                                        </div>

                                    </div>


                                    <Editor
                                        blockStyleFn={getBlockStyle}
                                        customStyleMap={styleMap}
                                        editorState={editorState}
                                        handleKeyCommand={this.handleKeyCommand}
                                        onChange={this.onChange}
                                        onTab={this.onTab}
                                        placeholder="Votre article"
                                        ref="editor"
                                        spellCheck={true}
                                    />
                                </div>
                            </div>
                </div>


                        </div>

                <div className={"col-xs-3"} align={"left"} >    <h3 className={"title_zone_new"} style={{paddingBottom:"30px",paddingLeft:"20%"}} > Les Tags Populaires : </h3>


                    {
                        this.state.all_tags.map((i,itr)=>{

                            return <div key={itr} onClick={()=>{
                                if(this.state.selected_tags.indexOf(i)===-1){
                                    this.setState({selected_tags:[...this.state.selected_tags,i]})
                                }
                            }} className={"col-xs-12"} align={"center"} style={{fontSize:"150%",color:"#05494c",minHeight:"40px",cursor:"pointer"}}>
                                #{i}

                            </div>
                        })
                    }

                    <h6 style={{paddingTop:"20vh"}} align={"center"}>click pour ajouter à l'article</h6>




                </div>
                {this.state.error&&<div className={"col-xs-12"}>Error de params</div>}

                <div className={"col-xs-4 col-xs-offset-4"} style={{paddingTop:"50px",paddingBottom:"50px"}}>
                    <input type={"button"}  value={" Publier l'article"}  className={"create_button"} onClick={()=>{

                        this.setState({visible_confirmation:true})


                    }}/>
                </div>

                <Confirmation message={" Etes vous sur de vouloir publier cet article ?"} visible={this.state.visible_confirmation}
                              hide={()=>{this.setState({visible_confirmation:false})}}
                              execute={()=>{ this.publish_article()  }}/>

            </div>
        );
    }
}

























// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Quicksand", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    let currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default Redaction