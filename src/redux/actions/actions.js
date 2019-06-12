import { CHANGE_TEST_VALUE } from "./action-types.js";

/*
 * action creators
 */

export function changeTestValue(text) {
    return { type: CHANGE_TEST_VALUE, value: text }
}