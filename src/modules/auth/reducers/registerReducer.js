import * as ActionTypes from '../actions/type'

const defaultState = {
    loading: false,
    userRegister: null
}

const registerReducer = (state = defaultState, action) =>{
    switch (action.type){
        case ActionTypes.REGISTER:{
            return{
                ...state,
                loading:false,
                userRegister:action.userRegister
            }
        };
        case ActionTypes.REGISTER_PENDING:{
            return{
                ...state,
                loading:true,
            }
        };
        case ActionTypes.REGISTER_SUCCESS:{
            return{
                ...state,
                loading:false,
                userRegister:action.userRegister
            }
        };
        case ActionTypes.REGISTER_ERROR:{
            return{
                ...state,
                loading:false,
                userRegister:null,
                error:action.error       
            }
        };
        default:
            return state;
    };
};
export default registerReducer;

