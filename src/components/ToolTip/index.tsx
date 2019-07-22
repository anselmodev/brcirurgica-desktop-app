import React from "react";
import { Tooltip, Whisper } from "rsuite";

interface PropsTooltip {
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "bottomLeft"
    | "bottomRight"
    | "topLeft"
    | "topRight"
    | "leftTop"
    | "rightTop"
    | "leftBottom"
    | "rightBottom"
    | "auto"
    | "autoVerticalLeft"
    | "autoVerticalRight"
    | "autoHorizontalTop"
    | "autoHorizontalBottom";
  trigger?: "click" | "hover" | "focus" | "active";
  content: any;
  children: any;
}

const _tooltip = (props: HTMLElement | string) => <Tooltip> {props} </Tooltip>;

export default (props: PropsTooltip) => {
  return (
    <Whisper
      placement={props.placement}
      trigger={props.trigger || 'hover'}
      speaker={_tooltip(props.content)}
    >
      {props.children}
    </Whisper>
  );
};
