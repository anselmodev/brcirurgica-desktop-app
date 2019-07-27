import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import App from './App';

Sentry.init({dsn: "https://00290fb1da184448a82139e59c88b097@sentry.io/1514691"});

ReactDOM.render(<App />, document.getElementById('root'));
