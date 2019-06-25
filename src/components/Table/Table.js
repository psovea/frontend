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
        this.setState({values: newData}, () => {console.log(newData)})
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

        const columns = []
        this.state.headers.map(h => {
            columns.push({Header: h})
        })

        const data = []

        return <ReactTable
              data={data}
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
