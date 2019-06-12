import { CHANGE_TEST_VALUE } from "../actions/actionTypes.js";

const initialState = {
    testValue: "initialState"
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TEST_VALUE:
            return  {
                testValue: action.value
            }
        default:
            return state;
    };
}
  
export default rootReducer;