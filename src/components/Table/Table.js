import React from 'react';
import PropTypes from 'prop-types';

import "./Table.css"

const DataTable = props => {
   return (
    <div className="dashboard-widget">
        <div className="dashboard-widget-header row">
            <div className="dashboard-widget-header-title-wrapper col-10">
                <p className="dashboard-widget-header-title">Top 5 vertragingen</p>
            </div>

            <div className="dashboard-widget-header-settings-wrapper col-2">
                <i className="dashboard-widget-header-settings-wrapper-icon fa fa-sliders" aria-hidden="true"></i>
            </div>
        </div>
        <div className="dashboard-widget-content" id="table">
            <table className="striped">
                <tbody>
                    <tr className="table-header-row">
                        {props.headers.map(col => <th key={col} className="table-header-row-value">{col}</th>)}
                    </tr>

                    {props.values.map(row => 
                        <tr className="table-row" key={row}>{row.map(col => 
                            <td className="table-row-value" key={col}>{col}</td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}

DataTable.propTypes = {
    headers: PropTypes.any,
    values: PropTypes.any,
};

export default DataTable;
