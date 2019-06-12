import { CHANGE_TEST_VALUE } from "./actionTypes.js";

/*
 * action creators
 */

export function changeTestValue(text) {
    return { type: CHANGE_TEST_VALUE, value: text }
}