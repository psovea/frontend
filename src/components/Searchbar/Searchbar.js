/* Searchbar.js
 * Description: A select bar to filter the data on different types of static
 *              properties.
 *              It is possible to select multiple options if the
 *              'multipleOptions' is set to true.
 *              The 'filterFunc' is VERY hacky, but it makes sure the data
 *              received from the given endpoint is nicely formatted into a
 *              list containing the desired options.
 *
 * TO FILTER OUT STOPS: Use filterFunc (item) => R.replace(/([A-Za-z]*), /g, "", item.stop_name)
 * TO FILTER OUT LINES: Use filterFunc (item) => `${item.public_id}: ${item.line_name}`
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import './Searchbar.css'
import {toLocalUrl} from '../../helper';

import * as R from 'ramda'

var naturalSort = require('natural-sort')

class Searchbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: [],
            multipleOptions: false,
            params: [],
            endpoint: undefined,
            placeholderText: "...",
            filterFunc: (x) => x,
            selected: []
        }
    }

    componentDidMount() {
        this.setState({
            placeholderText: this.props.placeholderText,
            multipleOptions: this.props.multipleOptions
        })

        if (this.props.endpoint) {
            this.setState({
                params: this.props.params,
                endpoint: this.props.endpoint,
                filterFunc: this.props.filterFunc
            })
            this.setOptions()
        } else {
            this.setState({
                options: R.map(item => ({ value: item, label: item }), this.props.options)
            })
        }
    }

    /* Update the state if the options should be filtered based on selections
     * from earlier search bars.
     */
    componentDidUpdate(oldProps) {
        const newProps = this.props

        if (newProps.params && !R.equals(newProps.params, oldProps.params)) {
            this.setState({ params: newProps.params })
            this.setOptions()
        }
    }

    /* Get the options from the given enpoint and filter then accordingly so
     * they are put into a list of options.
     */
    getOptions(endpoint, params, f) {
        var format_params = R.join("&", R.map((item) => `${R.replace("[]", "", item.key)}=${item.value}`, params))
        var url = toLocalUrl(`http://18.224.29.151:5000/${endpoint}?operator=GVB&${format_params}`)

        return fetch(url)
            .then(res => res.json())
            .then(res => R.uniq(R.map(f, res)))
    }

    /* Set the options for the search bar. */
    setOptions() {
        var params = R.map(([key, value]) => ({ "key": key, "value": R.join(",", value) }), R.filter((i) => R.equals(R.type(i[1]), "Array"), R.toPairs(this.props.params)))

        this.getOptions(this.props.endpoint, params, this.props.filterFunc)
            .then(res => this.setState({ options: R.map(item => ({ value: item, label: item }), res.sort(naturalSort())) }))
    }

    /* Update the state of the search bar if new options are selected. */
    handleChange = (selection) => {
        var updatedState = selection && this.state.multipleOptions ?
            { selected: R.map(opt => opt.value, selection) } :
            (selection ? { selected: [selection.value] } : { selected: [] })

        this.setState(updatedState, () => {
            this.props.updater(this.state.selected)
        })
    }

    render() {
        return (
            <Select
                options={this.state.options}
                isClearable={true}
                closeMenuOnScroll={true}
                isMulti={this.state.multipleOptions}
                placeholder={`Selecteer ${this.state.placeholderText}`}
                maxMenuHeight={200}
                onChange={this.handleChange}
            />
        )
    }
}

Searchbar.propTypes = {
    options: PropTypes.array,
    params: PropTypes.object,
    endpoint: PropTypes.string,
    filterFunc: PropTypes.func,
    placeholderText: PropTypes.string,
    multipleOptions: PropTypes.bool,
    updater: PropTypes.func
}

export default Searchbar
