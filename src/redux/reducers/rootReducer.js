import { 
    CHANGE_CHECK1,
    CHANGE_CHECK2,
    CHANGE_CHECK3,
    TOGGLE_DISTRICT,
} from "../actions/actionTypes.js";

const initialState = {
    check1Value: true,
    check2Value: true,
    check3Value: true,
    districts: [],
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
        case TOGGLE_DISTRICT:
            var districtsChanged = state.districts;
            if (state.districts.includes(action.value)) {
                districtsChanged = state.districts.filter(e => e !== action.value)
            } else {
                districtsChanged.push(action.value);
            }
            return Object.assign({}, state, {
                districts: districtsChanged
        })
        default:
            return state;
    };
}
  
export default rootReducer;