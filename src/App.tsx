import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { store } from "./_core/redux/store";
import { routeList, RenderSection } from "./_core/routes";
import  { LogoWaterMark } from './components/LogoWaterMark';

import "./assets/css/global-styles.css";

import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    <HashRouter basename="/" hashType="noslash">
      <Provider store={store}>
        <HashRouter basename="/" hashType="noslash">
          <div className="root-container">
            <LogoWaterMark />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            {routeList.map(Page => {
              return (
                <Route
                  key={Page.id}
                  path={Page.path}
                  exact={Page.exact}
                  render={props => (
                    <RenderSection {...props}>
                      <Page.component {...props} />
                    </RenderSection>
                  )}
                />
              );
            })}
            <Footer />
          </div>
        </HashRouter>
      </Provider>
    </HashRouter>
  );
};

export default App;
