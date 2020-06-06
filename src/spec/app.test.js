import Confirmation from "../reusable/Confirmation";
import ReactDom from 'react-dom'
import {shallow } from 'enzyme'
import React from "react";
import Displayed_article from "../redacteur/Displayed_article";
import Submitted_articles_mod from "../moderateur/Submitted_articles_mod";
import {Provider} from "react-redux";
import store from "../redux/store";
import {fireEvent} from "@testing-library/dom";
import {applyMiddleware, createStore} from "redux";
import {defaultReducer} from "../redux/reducer";
import thunk from "redux-thunk";



const article_mock =
    {
        "articleId": 1,
        "lien": null,
        "dateArticle": "2020-06-06T08:52:56.773Z",
        "source": null,
        "titre": "eslint-plugin-jest",
        "sous_titre": "This plugin also exports a configuration named style, which adds some stylistic rules, such as prefer-to-be-null, which enforces usage of toBeNull over toBe(null).\nTo enable this configuration use the extends property in your .eslintrc config file:",
        "contenu": "## Shareable configurations\n\n### Recommended\n\nThis plugin exports a recommended configuration that enforces good testing practices.\n\nTo enable this configuration use the `extends` property in your `.eslintrc` config file:\n\n    {\"extends\": [\"plugin:jest/recommended\"]}\n\n### Style\n\nThis plugin also exports a configuration named `style`, which adds some stylistic rules, such as `prefer-to-be-null`, which enforces usage of `toBeNull` over `toBe(null)`.\n\nTo enable this configuration use the `extends` property in your `.eslintrc` config file:\n\n    {\"extends\": [\"plugin:jest/style\"]}\n\nSee [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.\n\n### All\n\nIf you want to enable all rules instead of only some you can do so by adding the `all` configuration to your `.eslintrc` config file:\n\n    {\"extends\": [\"plugin:jest/all\"]}\n\nWhile the `recommended` and `style` configurations only change in major versions the `all` configuration may change in any release and is thus unsuited for installations requiring long-term consistency.\n",
        "popularite": 3,
        "imageUrl": "https://coronawatch-api-v0.herokuapp.com/article-images/f1cf12db9cb3ac3ad65dd624b57ccd4bt12354.jpg",
        "videoUrl": "",
        "status": "SUBMITTED",
        "refusCause": null,
        "createdAt": "2020-06-06T08:52:56.774Z",
        "updatedAt": "2020-06-06T08:57:00.134Z",
        "redacteurRedacteurId": 1,
        "redacteur": {
            "redacteurId": 1,
            "email": "test3@gmail.com",
            "username": null,
            "nom": null,
            "prenom": null,
            "profileImageUrl": null,
            "description": null
        },
        "tags": []
    }


        const article_env = (props = article_mock)=>{
                const componenet = shallow( <Displayed_article {...props} /> )
            return componenet
        }

        const article_all =  (props = {articles : { accepted :  [article_mock,article_mock], allow_update : true , page : 1 }})=>{ //2 articles
            const componenet = shallow(<Provider store={store}>  <Submitted_articles_mod {...props} /> </Provider>)
            return componenet
        }

describe('render_tests',()=>
{
    let article ;
    let article_ls ;
    beforeEach(()=>{
        article = article_env()
    })



    it("confirmation body ",()=>{
        const di = shallow(<Confirmation visible={true} />)
        const bodies = di.find('.confirmation_body')
        expect(bodies.length).toBe(1)
    })

    it(" article body",()=>{
        const nb = article.find('.article_card').length
        expect(nb).toBe(1)
    })

    it(" article body 2 ",()=>{
        const nb = article.find('img').length
        expect(nb).toBe(1)
    })

    it(" article body 3 no detail default ",()=>{
        const nb = article.find('#background_ar').length
        expect(nb).toBe(0)
    })


    it(" fire detail display",()=>{
        const nb = article.find('.article_card')
        const vy = article.find("#background_ar")
        expect(vy.length).toBe(0)
    })





})



describe(' tests for articles holders',()=>
{
    let article ;
    let article_ls ;
    beforeEach(()=>{
        article_ls = article_all()
    })


    it("confirmation body ",()=>{
        const di = article_all()
        console.debug(di)
        const bodies = di.find('.side_article_validation')
        expect(bodies.length).toBe(0)
    })

    it("full state",()=>{
        let st1 = createStore(defaultReducer,{articles : {
                accepted : [article_mock],
                allow_update : true ,
                page : 1 ,

            }},applyMiddleware(thunk) ) ;
        const componenet = shallow(<Provider store={st1}>  <Submitted_articles_mod /> </Provider>)
        const bodies = componenet.find('.article_card')
        expect(bodies.length).toBe(0)
    })



})