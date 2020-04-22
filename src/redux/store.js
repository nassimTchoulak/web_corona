import { defaultReducer } from "./reducer";
import {createStore, applyMiddleware } from 'redux'
import  thunk  from 'redux-thunk'



export default createStore(defaultReducer,undefined,applyMiddleware(thunk) ) ;