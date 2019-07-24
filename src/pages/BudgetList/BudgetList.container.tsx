import React, { useEffect } from "react";
import { History } from "history";
import { useDispatch } from "react-redux";
import BudgetList from "./BudgetList.page";
import { appInfo } from "../../_core/config/constants";
import { setPageAction } from "../../_core/redux/actions";
import  { statusNames } from '../../_core/helpers/statusProps';

type Props = {
  history: History;
};

const BudgetListContainer = (props: Props) => {
  const dispatch = useDispatch();

  const getTypeList = () => {
      const getType = props.history.location.search.split("?type=")[1];
    return [
        getType,
        statusNames(getType)
    ];
  };
  const updatePageSection = () => {
    dispatch(
        setPageAction({
            title: `Orçamentos ( ${getTypeList()[1]} ) - ${appInfo.orgShortName}`,
          location: props.history.location
        })
      );
  };

  useEffect(() => {
    dispatch(
      setPageAction({
        title: `Orçamentos ( ${getTypeList()[1]} ) - ${appInfo.orgShortName}`,
        location: props.history.location
      })
    );
  }, [dispatch, props.history]);

  useEffect(() => {
    updatePageSection()
  }, [props.history.location.search]);

  return <BudgetList {...props} budgetList={getTypeList()} />;
};

export default BudgetListContainer;
