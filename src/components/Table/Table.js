/* Table.js:
 * Description: This is the Table component. The table is shown in a grid box.
 */

import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'

import Missing from '../Missing/Missing'
import {toLocalUrl} from '../../helper'

import * as R from 'ramda'

import "./Table.css"
import "react-table/react-table.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            headers: [],
            values: []
        }
    }

    componentDidMount = () => {
        this.setState({headers: this.props.headers})
    }

    update = (newData) => {
        this.convertData(R.flatten(newData))
    }

    /* Gets metric and value data from fetched data in order to put it in the
     * ReactTable to be able to sort. */
    parseData = (data) => {
        return Object.values(data).map((d, i) => ({
            Nr: i + 1,
            Halte: d["metric"]["stop_end"],
            Vervoerstype: d["metric"]["transport_type"],
            Stadsdeel: d["metric"]["district"],
            Lijn: parseInt(d["metric"]["line_number"]),
            Vertraging: this.formatTime(d["value"][1])
        }))
    }


    /* If the new data contains stop data, we should fetch the
     * stop names to display. */
    convertData = (data) => {
        const allHaveStops = R.all(R.hasPath(['metric', 'stop_end']))

        if (allHaveStops(data)) {
            this.getStopNames(data)
                .then(res => R.zipWith(R.assocPath(['metric', 'stop_end']), res, data))
                .then(data => this.setState({values: this.parseData(data)}))
        } else {
            this.setState({values: this.parseData(data)})
        }
    }

    /* Get the stop names and match the correct name to the stop code */
    getStopNames = (data) => {
        var stops = R.map(item => item.metric.stop_end, data)

        return fetch(toLocalUrl(`http://18.224.29.151:5000/get-stops?stop_code=${R.join(",", stops)}`))
            .then(res => res.json())
            .then(res => R.map(stop =>
                R.includes({ stop_code: stop })
                    ? res[R.findIndex(R.propEq('stop_code', stop))(res)].stop_name
                    : "Geen haltenaam beschikbaar", stops
                )
            )
    }

    formatTime = (item) => {
        const minutes = Math.floor(item / 60).toString()
        const seconds = Math.round(item % 60).toString()

        return (minutes >= 1 ? minutes + " minuten en " : "") + seconds + " seconden"
    }

    /* Extracts minutes and seconds from time string and calculates back
     * to seconds. */
    delaySort = (a, b) => {
        const calcSeconds = (time) => {
            const matches = R.map(parseInt, time.match(/\d+/g))
            return (matches.length === 2) ? matches[0] * 60 + matches[1] : matches[1]
        }

        /* React-table requires a return value of 0 when two objects match,
         * 1 if object a > b and -1 if a < b. */
        return calcSeconds(a) > calcSeconds(b) ? 1 : (a === b) ? 0 : -1
    }


    render = () => {
        if (this.state.values == null) {
            return <Missing />
        }

        /* Creates the table header and binds the rows to the data in the columns
         * using the accessor. Also manually sets width for first row. */
        const getColumnWidth = (rows, accessor) => {
            const maxWidth = 400
            const magicSpacing = 10
            const cellLength = Math.max(
              ...rows.map(row => (`${row[accessor]}` || '').length),
              accessor.length
            )
            return Math.min(maxWidth, cellLength * magicSpacing)
        }

        /* Creates a header for each header and binds variables to it. If the header equals delay we
         * add a custom sorting function. */
        const columns = this.state.headers.map(h => {
            const header = {Header: h, accessor: h, minWidth: getColumnWidth(this.state.values, h)}
            return (h === "Vertraging") ? R.assoc("sortMethod", this.delaySort, header) : header
        })

        return <ReactTable
              className="-striped -highlight"
              data={this.state.values}
              columns={columns}
              showPagination={false}
              resizable={false}
              showPageSizeOptions={false}
              minRows={0}
              defaultPageSize={100}
              multiSort={false}
              style={{height: "100%"}} // Makes sure the top row is pinned to the top.
        />
    }
}

DataTable.propTypes = {
    headers: PropTypes.any,
    values: PropTypes.any,
    top: PropTypes.any,
    order: PropTypes.any
}

export default DataTable
