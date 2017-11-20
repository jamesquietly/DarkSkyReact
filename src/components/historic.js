import React, { Component } from 'react';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';

class Historic extends Component {

    dateString() {
        return this.props.dayArr.map(day => {
            const d = new Date(day * 1000);
            let str = d.toString().split(" ");
            return str[1] + " " + str[2];
        });
    }


    render() {
        if (_.isEmpty(this.props.dayArr)) {
            return (
                <div className="Historic"></div>
            );
        }
        else {
            const strArr = this.dateString();
            const tempData = {
              labels: strArr,
              datasets: [
                {
                  label: 'Temperature in Farenhiet',
                  backgroundColor: 'rgba(200,0,0,0.4)',
                  borderColor: 'rgba(200,0,0,1)',
                  data: this.props.tempArr
                }
              ]
            };

            const windData = {
              labels: strArr,
              datasets: [
                {
                  label: 'Wind Speed in mph',
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  data: this.props.windArr
                }
              ]
            };

            return (
                <div className="Historic">
                    <h2 className="clickable">Historic</h2>
                    <div className="detail">
                        <Line data={tempData} />
                        <Line data={windData} />
                    </div>
                </div>
            );
        }
    }
}

export default Historic;