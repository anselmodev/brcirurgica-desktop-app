import React, { useState } from "react";
import { Tooltip, Whisper, Popover, Button } from "rsuite";

interface PropsTooltipPopover {
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
  content?: any;
  children: any;
  title?: any;
  buttons?: any;
}

const _tooltip = (props: HTMLElement | string) => <Tooltip> {props} </Tooltip>;
const _popover = (props: HTMLElement | string, title: string) => {
  return <Popover title={title}>{props}</Popover>;
};

export const ToolTip = (props: PropsTooltipPopover) => {
  return (
    <Whisper
      placement={props.placement}
      trigger={props.trigger || "hover"}
      speaker={_tooltip(props.content)}
    >
      {props.children}
    </Whisper>
  );
};

export const PopOver = (props: PropsTooltipPopover) => {
  return (
    <Whisper
      placement={props.placement}
      trigger={props.trigger || "hover"}
      speaker={_popover(props.content, props.title)}
    >
        {props.children}
    </Whisper>
  );
};
