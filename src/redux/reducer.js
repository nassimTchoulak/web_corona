
import {GET_DZ_NOW, SET_ACTIVE_DZ_ZONE} from "./action"





const init_state = {

    dz_now:{
        loaded:false ,
        zones:[] ,
        selected : {}
    },

}

export function defaultReducer(state=init_state,action) {


    switch (action.type) {
        case GET_DZ_NOW:

            if(action.payload.data.length>0)

            state = {...state,
                dz_now : {
                    loaded: true ,
                    zones : action.payload.data ,
                    selected: {}
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

        default:

            break;
    }
    return state ;

}