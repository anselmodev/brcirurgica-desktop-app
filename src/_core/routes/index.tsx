import React, { Fragment } from "react";

import  LoginPageContainer from '../../pages/Login/Login.container';
import  DashboardPageContainer from '../../pages/Dashboard/Dashboard.container';

interface Props {
  complementComponents?: object;
  children?: any;
  history?: object;
}

const RenderSection: React.FC = (props: Props) => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
};
const routeList: any[] = [
  {
    id: 'loginPage',
    path: "/login",
    exact: false,
    component: LoginPageContainer,
  },
  {
    id: 'dashboardPage',
    path: "/home",
    exact: false,
    component: DashboardPageContainer,
  }
];

export { RenderSection, routeList };
