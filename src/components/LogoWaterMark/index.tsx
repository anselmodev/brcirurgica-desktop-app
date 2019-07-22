import React from 'react';
import { LogoWaterMarkContainer } from './styles';

import Logo from '../../assets/images/logo_icon.png';

export const LogoWaterMark = () => {
    return (
        <LogoWaterMarkContainer>
           <img src={Logo} alt="" />
        </LogoWaterMarkContainer>
    );
}