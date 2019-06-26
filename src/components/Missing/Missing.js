/* Missing.js
 * Description:
 * Shows a message when data is not obtained or something else went wrong.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Missing extends Component {
    message = (m) => (
        <h4 className="missing-data-text">{m}</h4>
    )

    render = () => {
        /* Check if a custom message is passed*/
        let message = this.props.customMessage
            ? this.props.customMessage
            : "Er ging iets mis... Pas de instellingen aan of probeer het opnieuw."

        return this.message(message)
    }
}

Missing.propTypes = {
    customMessage: PropTypes.string
}

export default Missing