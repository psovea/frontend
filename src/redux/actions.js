/*
 * action types
 */

export const TOGGLE_DOUGHNUT = 'TOGGLE_DOUGHNUT'
export const TOGGLE_BARCHART = 'TOGGLE_BARCHART'
export const TOGGLE_LIST = 'TOGGLE_LIST'

/*
 * action creators
 */

export function toggleDougnut(value) {
    return { type: TOGGLE_DOUGHNUT, value }
}

export function toggleBarchart(value) {
    return { type: TOGGLE_BARCHART, value }
}

export function toggleList(value) {
    return { type: TOGGLE_LIST, value }
}