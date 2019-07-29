import React, { useEffect, useCallback } from "react";
import { History } from "history";
import { useDispatch } from "react-redux";
import BudgetList from "./BudgetList.page";
import { appInfo } from "_core/config/constants";
import { setPageAction } from "_core/redux/actions";
import  { statusNames } from '_core/helpers/statusProps';

type Props = {
  history: History;
};

const BudgetListContainer = (props: Props) => {
  const dispatch = useDispatch();
  const getTypeList = useCallback(() => {
      const getType = props.history.location.search.split("?type=")[1];
    return [
        getType,
        statusNames(getType)
    ];
  }, [props.history.location.search]);
  const updatePageSection = useCallback(() => {
    dispatch(
        setPageAction({
            title: `Orçamentos ( ${getTypeList()[1]} ) - ${appInfo.orgShortName}`,
          location: props.history.location
        })
      );
  }, [dispatch, getTypeList, props.history.location]);

  useEffect(() => {
    dispatch(
      setPageAction({
        title: `Orçamentos ( ${getTypeList()[1]} ) - ${appInfo.orgShortName}`,
        location: props.history.location
      })
    );
  }, [dispatch, props.history, getTypeList]);

  useEffect(() => {
    updatePageSection()
  }, [props.history.location.search, updatePageSection]);

  return <BudgetList {...props} budgetList={getTypeList()} />;
};

export default BudgetListContainer;
