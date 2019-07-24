import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TweenMax, Back } from "gsap/TweenMax";
import { IconButton, Icon, Loader } from "rsuite";
import { ModalChartContainer, BoxChart } from "./styles";
import { chartAction } from "../../_core/redux/actions";
import { getElementPosition, getElementDimensions } from "../../_core/helpers";
import { ToolTip } from "../ToolTip";
import  { BarsChartContainer } from './BarsInfo';
import chartsDataDB from "../../mockData/chart.json";

interface PropsAnimationChart {
  element: string;
  open: boolean;
  callback: Function;
}

const animationChartHandler = (props: PropsAnimationChart) => {
  const getPos = getElementPosition(props.element);
  const getDim = getElementDimensions(props.element);

  if (props.open) {
    TweenMax.set(props.element, {
      opacity: 0.3,
    });

    TweenMax.set(".box-chart", {
      width: getDim.width,
      height: getDim.height,
      top: getPos.top,
      left: getPos.left
    });
    TweenMax.to(".box-chart", 0.5, {
      width: "500px",
      height: "400px",
      top: "50%",
      left: "50%",
      marginTop: "-200px",
      marginLeft: "-250px",
      ease: Back.easeOut.config(1.7),
      onComplete: () => props.callback()
    });
  } else {
    TweenMax.to(".box-chart", 0.2, {
      width: getDim.width,
      height: getDim.height,
      top: getPos.top,
      left: getPos.left,
      marginTop: 0,
      marginLeft: 0,
      onComplete: () => {
        props.callback();
        TweenMax.set(props.element, {
          opacity: 1,
        });
      }
    });
  }
};

export const ModalChart = () => {
  const dispatch = useDispatch();
  const chartStore = useSelector((state: any) => state.charts.data);
  const [chartInfo, setChartInfo] = useState<{ element: string; data: any }>({
    element: "",
    data: {}
  });

  const closeChartHandler = () => {
    animationChartHandler({
      element: chartStore.elementClassId,
      open: false,
      callback: () => {
        dispatch(chartAction({ open: false }));
        setChartInfo({
          element: '',
          data: {}
        });
    }
    });
  };

  const updateDataChartHandler = () => {
    console.log('atualizar dados do chart!');
    // loadChartHandler(chartStore.type)
    console.log(chartInfo);
  };

  const loadChartHandler = useCallback((type: string) => {
      setTimeout(() => {
        // get data from DB type = 'all' or 'canceled' or 'await' or 'success'
        setChartInfo({
          element: chartStore.elementClassId,
          data: chartsDataDB[0]
        });
      }, 1000);
    }, [chartStore]);

  useEffect(() => {
    if (chartStore.open && chartStore.elementClassId) {
      animationChartHandler({
        element: chartStore.elementClassId,
        open: chartStore.open,
        callback: () => loadChartHandler(chartStore.type)
      });
    }
  }, [chartStore.open, chartStore.elementClassId, chartStore.type, loadChartHandler]);

  return chartStore.open ? (
    <ModalChartContainer>
      <BoxChart color={chartStore.type} className="box-chart">
        {/* reload button */}
        <ToolTip placement="bottom" trigger="hover" content="Atualizar">
          <div className="btn-close-charts reload-ch">
            <IconButton
              icon={<Icon icon="refresh" />}
              appearance="subtle"
              size="xs"
              circle
              onClick={() => {
                updateDataChartHandler();
              }}
            />
          </div>
        </ToolTip>
        {/* Close button */}
        <ToolTip placement="bottom" trigger="hover" content="Fechar">
          <div className="btn-close-charts">
            <IconButton
              icon={<Icon icon="close" />}
              appearance="subtle"
              size="xs"
              circle
              onClick={() => {
                closeChartHandler();
              }}
            />
          </div>
        </ToolTip>
        <h3>{chartInfo.data.title || "Carregando ..."}</h3>
        {!chartInfo.data.values && <Loader size="lg" className="loader-chart"/>}
        {
          chartInfo.data.values && <BarsChartContainer 
          icon={chartStore.icon}
          labels={chartInfo.data.labels}
          values={chartInfo.data.values}
          tooltipInfo={chartInfo.data.tooltipInfo}
          />
        }
      </BoxChart>
    </ModalChartContainer>
  ) : (
    <div />
  );
};
