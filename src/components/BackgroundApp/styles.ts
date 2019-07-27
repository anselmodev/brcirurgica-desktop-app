import styled from "styled-components";

export const BackgroundAppContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    pointer-events: none; 

    .image-default {
        width: 400px;
        opacity: 0.08;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -200px; 
        margin-left: -200px; 
        user-select: none;
    }
`;