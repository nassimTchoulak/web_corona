
import { GET_DZ_NOW } from "./action"





const init_state = {

    dz_now:{
        loaded:false ,
        zones:[]
    },

}

export function defaultReducer(state=init_state,action) {


    switch (action.type) {
        case GET_DZ_NOW:

            if(action.payload.data.length>0)

            state = {...state,
                dz_now : {
                    loaded: true ,
                    zones : action.payload.data
                }

            }


            break ;

        default:

            break;
    }
    return state ;

}