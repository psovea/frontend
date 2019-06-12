import { 
    CHANGE_TEST_VALUE, 
    CHANGE_CHECK1,
} from "../actions/actionTypes.js";

const initialState = {
    testValue: "initialState",
    check1Value: true
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TEST_VALUE:
            return {
                testValue: action.value
            }
        case CHANGE_CHECK1:
            return Object.assign({}, state, {
                check1Value: action.value
            })
        default:
            return state;
    };
}
  
export default rootReducer;