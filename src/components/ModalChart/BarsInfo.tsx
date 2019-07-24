import React, { Fragment, useEffect } from "react";
import { TweenMax, Back } from "gsap/TweenMax";
import { BarsContainer, BarItem } from "./styles";
import { ToolTip } from "../ToolTip";
import { Icon } from "rsuite";

interface PropsBarInfo {
  label: string;
  value: number;
  percentInfo: number;
  leftPos: number;
  tooltipInfo: string[];
}
interface PropsBarConstainer {
  labels: string[];
  values: number[];
  tooltipInfo: string[];
  icon: any;
}

const positionsBars = [6.6, 22.2, 38, 54, 69.6, 85.1];
const calcValues = (
  type: string,
  allValues: number[],
  monthValue?: any
): number => {
  let result = 0;
  const sumValues = allValues.reduce((total, num) => total + num);

  if (type === "percent" && monthValue) {
    const percentMonth = (monthValue / sumValues) * 100;
    result = parseFloat(percentMonth.toFixed(2));
  } else if (type === "sum") {
    result = sumValues;
  }
  return result;
};
const animateBars = (element: string, toValue: number) => {
  TweenMax.to(element, 0.8, {
    height: `${toValue}%`,
    ease: Back.easeOut.config(1.7),
    delay: 0.5
  });
};

const BarsInfo = (props: PropsBarInfo) => {
  useEffect(() => {
    animateBars(`.${props.label}`, props.percentInfo);
  });
  return (
    <Fragment>
      <ToolTip
        placement="top"
        trigger="hover"
        content={
          <p style={{ textAlign: "left" }}>
            <b style={{ textTransform: "uppercase" }}>Em {props.label}:</b>
            <br />
            <em>
              <Icon icon="caret-right" /> {props.value} {props.tooltipInfo[0]}.
            </em>
            <br />
            <em>
              <Icon icon="caret-right" /> {props.percentInfo} % {props.tooltipInfo[1]}.
            </em>
          </p>
        }
      >
        <BarItem dimmension={props.percentInfo} leftPos={props.leftPos} className={props.label}>
          <p>{props.label.substr(0, 3)}</p>
        </BarItem>
      </ToolTip>
    </Fragment>
  );
};

export const BarsChartContainer = (props: PropsBarConstainer) => {
  return (
    <BarsContainer>
      <Icon icon={props.icon} className="icon-box" size="5x" />

      <em>{calcValues( "sum", props.values )} orçamentos</em>
      {positionsBars.map((position: number, indx: number) => {
        return (
          <BarsInfo
            key={indx}
            label={props.labels[indx]}
            value={props.values[indx]}
            percentInfo={calcValues(
              "percent",
              props.values,
              props.values[indx]
            )}
            leftPos={position}
            tooltipInfo={props.tooltipInfo}
          />
        );
      })}
    </BarsContainer>
  );
};
