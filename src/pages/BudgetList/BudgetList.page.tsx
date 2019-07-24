import React from "react";
import { History } from "history";
import { DisplayBudgetPage } from "./styles";

type Props = {
  history: History;
  budgetList: any;
};

const BudgetList = (props: Props) => {
  return (
    <DisplayBudgetPage>
      Content Budget List ... [ Carregar Lista de {props.budgetList[1]} ]
    </DisplayBudgetPage>
  );
};

export default React.memo(BudgetList);
