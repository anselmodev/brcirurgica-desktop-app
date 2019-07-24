import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 300px;
  height: 90%;
  margin: 1% 0;
  background-color: #173d50;
  transform: translateX(-260px) translateZ(0px);
  position: absolute;
  top: 3.5%;
  z-index: 10;
  overflow: hidden;

  border-radius: 0px 30px 30px 0px;
  -moz-border-radius: 0px 30px 30px 0px;
  -webkit-border-radius: 0px 30px 30px 0px;
  border: 0px solid #000000;

  -webkit-box-shadow: 3px 1px 4px -3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 1px 4px -3px rgba(0, 0, 0, 1);
  box-shadow: 3px 1px 4px -3px rgba(0, 0, 0, 1);
`;

export const ButtonOpenClose = styled.div`
  width: 40px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  cursor: pointer;
  .iconBtnSide {
    position: absolute;
    top: 50%;
    left: 14px;
    margin-top: -17px;
    color: rgba(255, 255, 255, 0.7);
    transform: scale(1.5);
  }
  :hover .iconBtnSide {
    color: rgba(255, 255, 255, 1);
  }
`;
export const OverlaySide = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;
export const ContentSide = styled.div`
  width: 75%;
  height: 630px;
  position: absolute;
  top: 50%;
  left: 30px;
  z-index: 2;
  margin-top: -315px;
  color: #f4f4f4;
  .logoSide {
    width: 60px;
    height: 60px;
    margin: 10px auto;
    position: relative;
    top: 0px;
    left: 20px;
    text-align: center;
    padding: 10px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    .default-avatar {
      position: absolute;
      top: 3px;
      left: 0px;
    }
    .person-avatar {
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
  .content-items {
    width: 100%;
    padding: 10px 0px;
    box-sizing: border-box;
    position: relative;
    left: 10px;
  }
`;

interface PropsItems {
  upercase: boolean;
  activeMenu: boolean;
  disabledItem: boolean;
  typeItem: string;
}
export const ItemMenu = styled.li<PropsItems>(
  ({ upercase, activeMenu, disabledItem, typeItem }) => ({
    cursor: "pointer",
    listStyle: "none",
    textTransform: upercase ? "uppercase" : "none",
    color: activeMenu ? "#ffca28" : "#f4f4f4",
    fontStyle: activeMenu ? "italic" : "",
    pointerEvents: disabledItem ? "none" : "auto",
    opacity: disabledItem ? 0.7 : 1,
    userSelect: disabledItem ? "none" : "auto",
    position: "relative",
    left: 25,
    fontWeight: activeMenu ? "bold" : 500,
    transition: "all .2s",
    margin: typeItem === "main" ? "13px 0" : "8px 15px",
    fontSize: typeItem === "main" ? "inherit" : "14px",
    ".iconItemMenu": {
      marginRight: 5
    },
    ":hover": {
      color: "#eac878",
      transform: "scale(1.05)"
    },
    small: {
      fontSize: 10,
      textTransform: "none",
      fontStyle: "italic"
    }
  })
);
