import {v4 as uuid4} from 'uuid';
import {ADD_ITEM,GET_ITEMS,DELETE_ITEM,ITEMS_LOADING} from '../actions/types';

const initialState={
    items:[],
    loading:false
}

export const itemReducer =(state = initialState,action)=>{
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items:action.payload,
                loading:false
            }
            case DELETE_ITEM:
            return{
                ...state,items: state.items.filter(item=>item._id!==action.payload)
            }
            case ADD_ITEM:
                return{
                    ...state,items:[...state.items,action.payload]
                }
                case ITEMS_LOADING:
                    return{
                        ...state,loading:true
                    }
        default:
            return state;     
    }
}


