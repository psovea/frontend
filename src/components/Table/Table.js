/* Table.js:
 * Discription: This is the Table component. The table is shown in a grid box.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Missing from '../Missing/Missing'
// import ReactTable from 'react-table'

import * as R from 'ramda'


import "./Table.css"
import "react-table/react-table.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [],
            values: []
        }
    }

    componentDidMount() {
        this.setState({ headers: this.props.headers })
    }

    update(newData) {
        /* If the new data contains stop data, we should fetch the
         * stop names to display.
         */
        const allHaveStops = R.all(R.hasPath(['metric', 'stop_end']))
        const data = R.flatten(newData)

        if (allHaveStops(data)) {
            this.getStopNames(data)
                .then(res => R.zipWith(R.assocPath(['metric', 'stop_end']), res, data))
                .then(data => this.setState({values: data}))
        } else {
            this.setState({values: data})
        }
    }

    getStopNames(data) {
        var stops = R.map(item => item.metric.stop_end, data)

        /* Get the stop names and match the correct name to the stop code */
        return fetch(`https://cors-anywhere.herokuapp.com/http://18.224.29.151:5000/get-stops?stop_code=${R.join(",", stops)}`)
            .then(res => res.json())
            .then(res => R.map(stop => R.includes({ stop_code: stop }) ? res[R.findIndex(R.propEq('stop_code', stop))(res)].stop_name : "Geen haltenaam beschikbaar", stops))
    }

    formatTime(item) {
        let minutes = Math.floor(item / 60).toString()
        let seconds = (item % 60).toString()

        return (minutes >= 1 ? minutes + " minuten en " : "") + seconds +  " seconden"
      }

    render() {
        if (this.state.values == null) {
            return <Missing/>
        }

        return (
            <table className="striped">
                <tbody>
                    <tr className="table-header-row">
                        {this.state.headers.map(col => <th key={col} className="table-header-row-value">{col}</th>)}
                    </tr>

                    {
                        this.state.values.map((row, i) => {
                            var metric = row.metric
                            var values = row.value

                            return <tr className="table-row" key={i}>
                                <td className="table-row-value" key={i}>{i + 1}</td>
                                {

                                    this.props.order.map(val => {
                                        return <td className="table-row-value" key={metric[val]}>{metric[val]}</td>
                                    })
                                }

                                <td className="table-row-value" key={values[1]}>{this.formatTime(parseInt(values[1]))}</td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
      )
    }
}

DataTable.propTypes = {
    headers: PropTypes.any,
    values: PropTypes.any,
    top: PropTypes.any,
    stateF: PropTypes.any,
    order: PropTypes.any
}

export default DataTable
