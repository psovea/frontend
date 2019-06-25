/* Table.js:
 * Discription: This is the Table component. The table is shown in a grid box.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Missing from '../Missing/Missing'
import ReactTable from 'react-table'

import "./Table.css"
import "react-table/react-table.css"

class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: this.props.headers,
            values: []
        }
    }

    update(newData) {
        const data = this.convertData(newData)
        this.setState({values: data}, () => {console.log(newData)})
    }

    convertData(data) {
        const convertedData = []

        /* Gets metric and value data from fetched data. */
        Object.values(data).map((d, i)=> {
            convertedData.push({
                Nr: i + 1,
                Stop: d["metric"]["stop_end"],
                Vervoerstype: d["metric"]["transport_type"],
                Stadsdeel: d["metric"]["district"],
                Lijn: parseInt(d["metric"]["line_number"]),
                Vertraging: this.formatTime(d["value"][1])
            })
        })

        return convertedData
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

        const columns = this.state.headers.map(h => ({Header: h, accessor: h}))

        return <ReactTable
              data={this.state.values}
              columns={columns}
              showPagination={false}
              defaultSortDesc={true}
              resizable={false}
        />
    }
}

DataTable.propTypes = {
    headers: PropTypes.any,
    values: PropTypes.any,
    top: PropTypes.any,
    stateF: PropTypes.any
}

export default DataTable;
