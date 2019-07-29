import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { store } from "_core/redux/store";
import { routeList, RenderSection } from "_core/routes";
import  { BackgroundApp } from 'components/BackgroundApp';
import  { ModalDialog } from 'components/ModalDialog';

import "assets/css/global-styles.css"; 

import { Footer } from "components/Footer";
import { BudgetForm } from "components/Forms/BudgetForm";

const App: React.FC = () => {
  return (
    <HashRouter basename="/" hashType="noslash">
      <Provider store={store}>
        <HashRouter basename="/" hashType="noslash">
          <div className="root-container">
            <BackgroundApp />
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
            <ModalDialog />
            <Footer />
            <BudgetForm />
          </div>
        </HashRouter>
      </Provider>
    </HashRouter>
  );
};

export default App;
