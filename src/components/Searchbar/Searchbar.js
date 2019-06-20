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

    componentDidUpdate(oldProps) {
        const newProps = this.props

        if (newProps.params && !R.equals(newProps.params, oldProps.params)) {
            this.setState({ params: newProps.params })
            this.setOptions()
        }
    }

    getOptions(uri, params, f) {
        var format_params = R.join("&", R.map((item) => `${item.key}=${item.value}`, params))
        var url = `https://cors-anywhere.herokuapp.com/http://18.224.29.151:5000/${uri}?operator=GVB&${format_params}`

        return fetch(url)
            .then(res => res.json())
            .then(res => R.uniq(R.map(f, res)))
    }

    handleChange = (selection) => {
        var updatedState = selection && this.state.multipleOptions ?
            { selected: R.map(opt => opt.value, selection) } :
            (selection ? { selected: [selection.value] } : { selected: [] })

        this.setState(updatedState, () => {
            this.props.updater(this.state.selected)
        })
    }

    setOptions() {
        console.log(this.props.params)
        var params = R.map(([key, value]) => ({ "key": key, "value": R.join(",", value) }), R.filter((i) => typeof i === 'array', R.toPairs(this.props.params)))

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
