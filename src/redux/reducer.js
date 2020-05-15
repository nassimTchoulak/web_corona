
import {GET_DZ_NOW, SET_ACTIVE_DZ_ZONE, GET_DZ_CITIES, GET_DZ_RISK, SET_VISIBLE_RISK} from "./action"





const init_state = {

    dz_now:{
        loaded:false ,
        zones:[] ,

        loaded_cities:false,
        zones_cities : [],

        zones_risk : [] ,

        display_risk:false,


        selected : {}
    },

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

        default:

            break;
    }
    return state ;

}