import React, { Component } from 'react';
import _ from 'lodash';


class Currently extends Component {

    render() {
        if (_.isEmpty(this.props.weather)) {
            return (
                <div></div>
            );
        }
        else {
            const { currently } = this.props.weather;
            return (
                <div className="currently">
                    <h2 className="clickable">Currently</h2>
                    <div className="detail">
                        Summary: {currently.summary} <br />
                        Temp: {currently.temperature} F <br />
                        Wind Speed: {currently.windSpeed} mph <br />
                        Humidity: {currently.humidity} <br />
                        Percipitation Probability: {currently.precipProbability}
                    </div>
                </div>
            );
        }
    }
}

export default Currently;