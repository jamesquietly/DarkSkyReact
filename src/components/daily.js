import React, { Component } from 'react';
import _ from 'lodash';

class Daily extends Component {
    renderDaily(day) {
        const date = new Date(parseInt(day.time, 10) * 1000);
        var dateStr = date.toString().split(' ');
        dateStr = `${dateStr[0]} ${dateStr[1]} ${dateStr[2]} ${dateStr[3]}`

        return (
            <div className="detail" key={day.time}>
                <div className="day">
                    <h2 className="clickable">{dateStr}</h2>
                    <div className="detail">
                    Summary: {day.summary} <br />
                    Temp Low: {day.temperatureLow} <br />
                    Temp High: {day.temperatureHigh} <br />
                    Wind Speed: {day.windSpeed} <br />
                    Humidity: {day.humidity} <br />
                    Percipitation Probability: {day.precipProbability} <br />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (_.isEmpty(this.props.weather)) {
            return (
                <div></div>
            );
        }
        else {
            const { daily } = this.props.weather;
            return (
                <div className="daily">
                    <h2 className="clickable">Daily</h2>
                    {daily.data.map((day) => this.renderDaily(day))}
                </div>
            );
        }
    }
}

export default Daily;