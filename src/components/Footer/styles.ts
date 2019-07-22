import styled from "styled-components";

export const FooterContainer = styled.p`
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    text-align: center;
    font-size: 11px;
    font-style: italic;

    .footer-dev {
        position: absolute;
        right: 5px;
        bottom: 5px;
        cursor: pointer;
        opacity: 0.8;
        transition: all .2s;
        z-index: 22;
    }
    .footer-dev:hover {
        opacity: 1;
        transform: scale(1.08);
    }
`;