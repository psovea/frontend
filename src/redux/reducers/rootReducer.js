import { 
    CHANGE_CHECK1,
    CHANGE_CHECK2,
    CHANGE_CHECK3,
} from "../actions/actionTypes.js";

const initialState = {
    check1Value: true,
    check2Value: true,
    check3Value: true
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CHECK1:
            return Object.assign({}, state, {
                check1Value: action.value
            })
        case CHANGE_CHECK2:
            return Object.assign({}, state, {
                check2Value: action.value
        })
        case CHANGE_CHECK3:
            return Object.assign({}, state, {
                check3Value: action.value
        })
        default:
            return state;
    };
}
  
export default rootReducer;