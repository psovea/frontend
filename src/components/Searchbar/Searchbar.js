import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './Searchbar.css'

import * as R from 'ramda'

class Searchbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: [],
            multipleOptions: false
        }
    }

    componentDidMount() {
        this.setOptions()
    }

    getOptions(uri, params, f) {
        var format_params = R.join("&", R.map((item) => `${item.key}=${item.value}`, params))
        var url = `http://localhost:5000/${uri}?${format_params}`

        return fetch(url)
            .then(res => res.json())
            .then(res => R.uniq(R.map(f, res)))
    }

    setOptions() {
        var params = R.map(([key, value]) => ({ "key": key, "value": value }), R.toPairs(this.props.params))

        this.getOptions(this.props.endpoint, params, this.props.filterFunc)
            .then(res => this.setState({ options: R.map(item => ({ value: item, label: item }), res.sort()) }))
    }

    render() {
        return (
            <Select
                options={this.state.options}
                isClearable={true}
                closeMenuOnScroll={true}
                isMulti={this.state.multipleOptions}
                placeholder={"Selecteer..."}
                maxMenuHeight={200}
            />
        )
    }
}

Searchbar.propTypes = {
    options: PropTypes.array,
    params: PropTypes.object,
    endpoint: PropTypes.string,
    filterFunc: PropTypes.func
}

export default Searchbar
