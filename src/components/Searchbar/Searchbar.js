import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './Searchbar.css';

class Searchbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: [],
            multipleOptions: false
        }
    }

    componentDidMount() {
        this.setState({
            options: this.props.options
        })
    }

    render() {
        console.log(this.state.options)

        return (
            <Select options={this.props.options} isClearable={true} closeMenuOnScroll={true} isMulti={this.state.multipleOptions}/>
        )
    }
}


Searchbar.propTypes = {
    options: PropTypes.array
}
export default Searchbar
