/* Table.js:
 * Discription: This is the Table component. The table is shown in a grid box.
 */

import React from 'react';
import PropTypes from 'prop-types';

import "./Table.css"

const DataTable = props => {
   return (
        <table className="striped">
            <tbody>
                <tr className="table-header-row">
                    {props.headers.map(col => <th key={col} className="table-header-row-value">{col}</th>)}
                </tr>

                {
                    props.values.map(row => 
                        <tr className="table-row" key={row}>{row.map(col => 
                            <td className="table-row-value" key={col}>{col}</td>)}
                        </tr>
                    )
                }

            </tbody>
        </table>
  )
}

DataTable.propTypes = {
    headers: PropTypes.any,
    values: PropTypes.any,
}

export default DataTable;
