import { 
    CHANGE_CHECK1,
    CHANGE_CHECK2,
    CHANGE_CHECK3,
} from "./actionTypes.js";

/*
 * action creators
 */

export function changeCheck1Value(checkValue) {
    return { type: CHANGE_CHECK1, value: checkValue }
}

export function changeCheck2Value(checkValue) {
    return { type: CHANGE_CHECK2, value: checkValue }
}

export function changeCheck3Value(checkValue) {
    return { type: CHANGE_CHECK3, value: checkValue }
}