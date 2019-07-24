import React, { Fragment } from "react";
import  LoginPageContainer from '../../pages/Login/Login.container';
import  DashboardPageContainer from '../../pages/Dashboard/Dashboard.container';
import  BudgetListContainer from '../../pages/BudgetList/BudgetList.container';
import { Sidebar } from "../../components/Sidebar";
import { LockScreen } from "../../components/LockScreen";
import { Search } from "../../components/Search";

interface Props {
  complementComponents?: object;
  children?: any;
  history?: any;
}

const RenderSection: React.FC = (props: Props) => {
  return (
    <Fragment>
      <Sidebar history={props.history} />
      <LockScreen history={props.history} />
      <Search history={props.history} />
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
  },
  {
    id: 'budgetPage',
    path: "/budget",
    exact: false,
    component: BudgetListContainer,
  }
];

export { RenderSection, routeList };
