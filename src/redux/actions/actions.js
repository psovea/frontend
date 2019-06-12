import { 
    CHANGE_TEST_VALUE, 
    CHANGE_CHECK1,
} from "./actionTypes.js";

/*
 * action creators
 */

export function changeTestValue(text) {
    return { type: CHANGE_TEST_VALUE, value: text }
}

export function changeCheck1Value(checkValue) {
    return { type: CHANGE_CHECK1, value: checkValue }
}