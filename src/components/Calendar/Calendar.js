/* Calendar.js:
 * Description: The calendar can be used to select a time range in which
 * data is shown.
 *
 * N.B.: Right now the 'to'-date is exclusive, so it does not take data from that
 * date. We should look into fixing this later.
 */

import React from 'react'
import PropTypes from 'prop-types'

import DayPicker, { DateUtils } from 'react-day-picker'
import MomentLocaleUtils from 'react-day-picker/moment'

import * as moment from 'moment'
import 'react-day-picker/lib/style.css'
import './Calendar.css'

class Calendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            to: undefined,
            from: undefined,
            range: {
                days: undefined,
                offset: undefined,
                perDay: undefined
            }
        }
    }

    componentDidMount() {
        this.setState({
            to: new Date(),
            from: moment().subtract(7, 'days').toDate(),
            range: {
                days: 7,
                offset: 0,
                perDay: (this.props.perDay ? this.props.perDay : false)
            }
        })
    }

    /* Change the range when the user selects a new date. */
    handleClick = (day) => {
        var newRange = DateUtils.addDayToRange(day, this.state)
        var midnight = new Date()
        midnight.setHours(12,0,0,0)

        var newState = {
            days: this.dateDiff(newRange.from, newRange.to),
            offset: this.dateDiff(newRange.to, new Date()),
            perDay: this.state.range.perDay
        }

        this.setState({
            ...newRange,
            range: newState
        }, () => {
            this.props.updater(newState)
        })
    }

    /* Calculate the difference in days between two dates. */
    dateDiff(from, to) {
        const dayInMilliSecs = 86400000
        return Math.round(Math.abs(to.getTime() - from.getTime()) / dayInMilliSecs)
    }

    render() {
        const { from, to } = this.state
        const today = new Date()
        const modifiers = { start: from, end: to }

        return (
            <div className="Calendar">
                <DayPicker
                    className="DateSelector"
                    numberOfMonths={1}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleClick}
                    disabledDays={{ after: today }}
                    localeUtils={MomentLocaleUtils}
                    locale={"nl"}
                />
            </div>
        )
    }
}

Calendar.propTypes = {
    updater: PropTypes.func,
    perDay: PropTypes.bool
}

export default Calendar
