import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { reducerPages }  from './reducers/page.reducer';
import { reducerSidebar }  from './reducers/sidebar.reducer';
import { reducerLogin }  from './reducers/login.reducer';
import { reducerCharts }  from './reducers/chart.reducer';
import { reducerModal }  from './reducers/modal.reducer';
import { reducerLockscreen }  from './reducers/lockscreen.reducer';
import { reducerSearch }  from './reducers/search.reducer';

const reducers = combineReducers({
    pageSection: reducerPages,
    sidebar: reducerSidebar,
    login: reducerLogin,
    charts: reducerCharts,
    modalDialog: reducerModal,
    lockScreen: reducerLockscreen,
    search: reducerSearch
  })


export const store = createStore(
    reducers,
    applyMiddleware(
      // logger,
      thunk
      )
  );