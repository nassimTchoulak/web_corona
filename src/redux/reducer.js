
import {
    GET_DZ_NOW,
    SET_ACTIVE_DZ_ZONE,
    GET_DZ_CITIES,
    GET_DZ_RISK,
    SET_VISIBLE_RISK,
    SET_UPDATE_ZONE,
    GET_ARTICLES_ACCEPTED_BY_PAGE, DISALLOW_ARTICLE_PAGE, GET_WORLD_DATA, SET_WORLD_SELECTED
} from "./action"





const init_state = {

    dz_now:{
        loaded:false ,
        zones:[] ,

        loaded_cities:false,
        zones_cities : [],

        zones_risk : [] ,

        display_risk:false,


        selected : {} ,


        selected_for_update:{}//used in update window
    },


    world_data :{
      loaded :false ,
      zones :[] ,
      selected:{}
    },


    articles : {
        accepted : [],
        allow_update : true ,
        page : 1 ,

    }

}

export function defaultReducer(state=init_state,action) {


    switch (action.type) {
        case GET_DZ_NOW:

            if(action.payload.data.length>0)

            state = {...state,
                dz_now : {
                    ...state.dz_now,
                    loaded: true ,
                    zones : action.payload.data ,

                }

            }


            break ;
        case SET_ACTIVE_DZ_ZONE:
            state = {...state,

                dz_now: {
                    ...state.dz_now ,
                    selected: action.payload
                }
            }

            break ;

        case GET_DZ_CITIES :
            state = {
                ...state ,
                dz_now: {
                    ...state.dz_now,
                    loaded_cities: true,
                    zones_cities: action.payload.data
                }
            }
            break

        case GET_DZ_RISK:
            state = {
                ...state ,
                dz_now : {
                    ...state.dz_now ,
                    zones_risk: action.payload.data
                }
            }
            break



        case SET_VISIBLE_RISK :
            state = {
                ...state ,
                dz_now : {
                    ...state.dz_now ,
                    display_risk: action.payload
                }
            }
            break

        case SET_UPDATE_ZONE:
            state = {
                ...state ,
                dz_now : {
                    ...state.dz_now ,
                    selected_for_update: action.payload
                }
            }
            break;
        case GET_ARTICLES_ACCEPTED_BY_PAGE:

            let ls = action.payload.new_added ;
            let current_page = action.payload.current_page ;

            if(current_page===1){

                state = {
                    ...state ,
                    articles: {
                        ...state.articles ,
                        allow_update: true ,
                        accepted: [...ls] ,
                        page : current_page+1

                    }
                }
                break
            }

            if(ls.length>0){
                state = {
                    ...state ,
                    articles: {
                        ...state.articles ,
                        allow_update: true ,
                        accepted: [...state.articles.accepted,...ls] ,
                        page : current_page+1

                    }
                }
            }
            else{
                state = {
                    ...state ,
                    articles: {
                        ...state.articles ,
                        allow_update: false

                    }
                }
            }

            break

        case DISALLOW_ARTICLE_PAGE:
            state = {
                ...state , articles: {...state.articles , allow_update: false}
            }

            break
        case GET_WORLD_DATA:
            state = {
                ...state ,
                world_data: {
                    loaded: true ,
                    selected: {} ,
                    zones : action.payload
                }
            }
            break

        case SET_WORLD_SELECTED:
            state = {
                ...state ,
                world_data: {
                    ...state.world_data,
                    selected: action.payload ,

                }
            }
            break


        default:

            break;
    }
    return state ;

}