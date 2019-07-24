import React, { Fragment, useEffect } from "react";
import { History } from "history";
import { useDispatch } from "react-redux";
import DashboardPage from "./Dashboard.page";
import { setPageAction, chartAction } from "../../_core/redux/actions";
import { appInfo } from "../../_core/config/constants";
import { ModalChart } from "../../components/ModalChart";


interface Props {
  history: History;
}

const DashboardPageContainer = (props: Props) => {
  const dispatch = useDispatch();

  const toggleChartHandler = (element: string, type: string, icon: string) => {
    dispatch(chartAction({
      open: true,
      type, 
      elementClassId: element,
      icon
    }));
  };

  useEffect(() => {
    dispatch(
      setPageAction({
        title: `Dashboard | Home - ${appInfo.orgShortName}`,
        location: props.history.location
      })
    );
  }, [dispatch, props.history]);

  return (
    <Fragment>
      <ModalChart />
      <DashboardPage {...props} toggleChartHandler={toggleChartHandler}/>
    </Fragment>
  );
};

export default DashboardPageContainer;
