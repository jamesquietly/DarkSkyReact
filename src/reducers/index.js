import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import WeatherReducer from './weather_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  weather: WeatherReducer
});

export default rootReducer;