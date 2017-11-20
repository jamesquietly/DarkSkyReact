/* global $ */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Currently from './currently';
import Daily from './daily';
import Historic from './historic';
import { getCoordinates, getWeather } from '../actions';


class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = { tempArr: [], windArr: [], dayArr: [] };
    }

    componentDidUpdate() {
        $(".detail").hide();
        $(".currently").find(".detail").slideToggle(400);
        $(".clickable").unbind();
        $(".clickable").on("click", function() {
            $(this).siblings().slideToggle(400);
        });
    }

    renderSearchBar(field) {
        const { meta : { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className} >
                <input
                    type="text"
                    placeholder="Enter name of a city or address" 
                    { ...field.input } 
                />
                <button type="submit" className="btn btn-primary">Search</button>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    setHistoric(arr) {
        let tempArr = [];
        let dayArr = [];
        let windArr = [];

        arr.sort((a, b) => {
            return a.currently.time - b.currently.time;
        })

        arr.map(data => {
            const { currently } = data;
            tempArr.push(currently.temperature);
            dayArr.push(currently.time);
            windArr.push(currently.windSpeed);
            return null;
        })

        this.setState({ tempArr, windArr, dayArr });
    }

    onSubmit(values) {
        const address = encodeURI(values.search);
        getCoordinates(address, this.props.getWeather, this.setHistoric.bind(this));
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="Weather">
                <h1>Dark Sky Weather Forecast</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="search" label= "here" component={this.renderSearchBar} />
                </form>
                <Currently weather={this.props.weather} />
                <Daily weather={this.props.weather} />
                <Historic tempArr={this.state.tempArr} windArr={this.state.windArr} dayArr={this.state.dayArr} />
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.search) {
        errors.search = "Enter a city or address to search weather info";
    }

    return errors;

}

function mapStateToProps(state) {
    return { weather : state.weather };
}

export default reduxForm({
    form: 'WeatherSearch',
    validate
})(connect(mapStateToProps , { getCoordinates, getWeather } )(Weather));