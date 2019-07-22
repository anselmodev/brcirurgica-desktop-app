import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { reducerPages }  from './reducers/page.reducer';
import { reducerLogin }  from './reducers/login.reducer';
import { reducerCharts }  from './reducers/chart.reducer';

const reducers = combineReducers({
    pageSection: reducerPages,
    login: reducerLogin,
    charts: reducerCharts
  })


export const store = createStore(
    reducers,
    applyMiddleware(
      // logger,
      thunk
      )
  );