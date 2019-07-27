import React from "react";
import { Icon } from "rsuite";
import { DisplayDashboardPage } from "./Dashboard.styles";
import { BudgetList } from "../../components/ListItems/BudgetList";
import mockList from "../../mockData/mockList.json";

interface PropsDashboardPage {
  toggleChartHandler: Function;
}

const DashboardPage = (props: PropsDashboardPage) => {
  // const { history } = props;

  return (
    <DisplayDashboardPage className="scroll-style">
      
      {/* Info Box */}
      <div className="info-boxes">
        <div
          className="box-info box-total"
          id="totalBox"
          onClick={() => {
            props.toggleChartHandler('#totalBox', 'all', 'share-square');
          }}
        >
          <Icon icon="share-square" className="icon-box" size="5x" />
          <b>0000</b>
          <p>Total Emitidos</p>
          <span><Icon icon="charts-line"/> Detalhes</span>
        </div>
        <div
          className="box-info box-canceled"
          id="canceledBox"
          onClick={() => {
            props.toggleChartHandler('#canceledBox', 'canceled', 'thumbs-down');
          }}
        >
          <Icon icon="thumbs-down" className="icon-box" size="5x" />
          <b>0000</b>
          <p>Cancelados / Reprovados</p>
          <span><Icon icon="charts-line"/> Detalhes</span>
        </div>
        <div
          className="box-info box-await"
          id="awaitBox"
          onClick={() => {
            props.toggleChartHandler('#awaitBox',  'await', 'clock-o');
          }}
        >
          <Icon icon="clock-o" className="icon-box" size="5x" />
          <b>0000</b>
          <p>Aguardando</p>
          <span><Icon icon="charts-line"/> Detalhes</span>
        </div>
        <div
          className="box-info box-success"
          id="successBox"
          onClick={() => {
            props.toggleChartHandler('#successBox', 'success', 'handshake-o');
          }}
        >
          <Icon icon="handshake-o" className="icon-box" size="5x" />
          <b>0000</b>
          <p>Aprovados</p>
          <span><Icon icon="charts-line"/> Detalhes</span>
        </div>
      </div>
      {/* Title */}
      <p className="title-list">
        <em> Últimos Orçamentos Emitidos ( {mockList.length} )</em>
      </p>

      {/* List */}
      <div className="list-budget">
        <BudgetList
          dataItems={mockList}
          currentPage={1}
          totalPages={2}
          totalResults={10}
        />
      </div>
    </DisplayDashboardPage>
  );
};

export default DashboardPage;
