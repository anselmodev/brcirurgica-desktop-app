import React from "react";
import { FooterContainer } from "./styles";
import { appInfo } from "../../_core/config/constants";
import ADSLogo from "../../assets/images/ad-studio.png";
import { ToolTip } from "../ToolTip";

const windowAppObj = window as any;
const { shell } = windowAppObj.require("electron");

const handlerSiteDev = () => {
  shell.openExternal(appInfo.developerInf.developerUrl);
};

export const Footer = () => {
  return (
    <FooterContainer>
      <span>
        {appInfo.dateDist} - {appInfo.organization}
      </span>
      <ToolTip
        placement="left"
        trigger="hover"
        content={
          <span>
            Desenvolvido por AD Studio <br />
          </span>
        }
      >
        <span
          onClick={() => {
            handlerSiteDev();
          }}
          className="footer-dev"
        >
          <img src={ADSLogo} alt="" width="35" />
        </span>
      </ToolTip>
    </FooterContainer>
  );
};
