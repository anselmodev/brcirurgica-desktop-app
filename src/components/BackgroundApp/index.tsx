import React, { useEffect, useState } from "react";
import { BackgroundAppContainer } from "./styles";
import Logo from "../../assets/images/logo_icon.png";

export const BackgroundApp = () => {
  return (
    <BackgroundAppContainer>
      <img src={Logo} alt="" className="image-default" />
    </BackgroundAppContainer>
  );
};
