import React from "react";
import { useDispatch } from "react-redux";
import { Icon } from "rsuite";
import {
  BudgetListContainer,
  HeadListCell,
  CellsContainer,
  ListCell,
  CellLine,
  CellLineStatus
} from "./styles";
import {
  statusNames,
  statusBackgroundColors,
  calendarDate,
  formatValue
} from "_core/helpers";
import { Paginator } from "components/Paginator";
import { ToolTip } from "components/ToolTip";
import { toggleBudgetAction } from "_core/redux/actions";

interface PropsBudgetList {
  dataItems: any[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  containerHeight?: string;
}
interface PropsDataItems {
  number: number;
  customerName: string;
  status: string;
  updateAt: string;
  expireAt: string;
  totalPrice: number;
}

const generatePDFHandler = (numberOS: number) => {
  console.log("gerar PDF: ", numberOS);
};

export const BudgetList = (props: PropsBudgetList) => {
  const dispatch = useDispatch();

  const openBudgetHandler = (numberOS: number) => {
    dispatch(
      toggleBudgetAction({
        open: true,
        number: numberOS
      })
    );
  };

  return (
    <BudgetListContainer height="calc(100% - 35px)">
      <HeadListCell>
        <span className="head-coll1">Número</span>
        <span className="head-coll2">Cliente</span>
        <span className="head-coll3">Última Atualização</span>
        <span className="head-coll4">Expira Em</span>
        <span className="head-coll5">Valor Bruto</span>
        <span className="head-coll6">Status</span>
        <span className="head-coll7">Gerar PDF</span>
      </HeadListCell>
      <CellsContainer className="scroll-style" height={props.containerHeight}>
        {props.dataItems && props.dataItems.length >= 1 ? (
          props.dataItems.map((props: PropsDataItems) => {
            return (
              <ListCell key={props.number}>
                <CellLine>
                  <span
                    onClick={() => {
                      openBudgetHandler(props.number);
                    }}
                  >
                    <span className="cell-coll1">{props.number}</span>
                    <ToolTip content={`Cliente: ${props.customerName}`}>
                      <span className="cell-coll2">{props.customerName}</span>
                    </ToolTip>
                    <span className="cell-coll3">
                      {calendarDate(undefined, undefined, props.updateAt, "L")}
                    </span>
                    <span className="cell-coll4">
                      {calendarDate(undefined, undefined, props.expireAt, "L")}
                    </span>
                    <span className="cell-coll5">
                      R$ {formatValue("toMoney", props.totalPrice)}
                    </span>
                    <CellLineStatus color={statusBackgroundColors(props.status)}>
                      <em>{statusNames(props.status)}</em>
                    </CellLineStatus>
                  </span>
                  <span className="cell-coll7">
                    <Icon
                      icon="file-pdf-o"
                      className="btn-cell btn-pdf"
                      size="lg"
                      onClick={() => {
                        generatePDFHandler(props.number);
                      }}
                    />
                  </span>
                </CellLine>
              </ListCell>
            );
          })
        ) : (
          <p>Não Existem Orçamentos para Exibir!</p>
        )}
      </CellsContainer>
      <Paginator
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        totalResults={props.totalResults}
      />
    </BudgetListContainer>
  );
};
