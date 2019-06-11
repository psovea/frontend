import {
    TOGGLE_DOUGHNUT,
    TOGGLE_BARCHART,
    TOGGLE_LIST,
} from './actions'

const initialState = {
    showDoughnut: true,
    showBarChart: true,
    showList: true
}

export function stateHandler(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_DOUGHNUT:
            return Object.assign({}, state, {
                showDoughnut: action.value
            })
        case TOGGLE_BARCHART: 
            return Object.assign({}, state, {
                showBarChart: action.value
            })
        case TOGGLE_LIST:
            return Object.assign({}, state, {
                showList: action.value
            }) 
        default:
            return state
    }
}
