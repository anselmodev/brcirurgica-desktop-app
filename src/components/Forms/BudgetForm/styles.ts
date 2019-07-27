import styled from "styled-components";

export const BudgetFormContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

export const BudgetFormBody = styled.div`
  width: 900px;
  height: 95%;
  position: absolute;
  bottom: -100%; /* 0 is open */
  left: 50%;
  margin-left: -450px;
  background-color: #ffffff;
  box-shadow: 0px 30px 82px -21px rgba(0, 0, 0, 1);
  border-radius: 6px 6px 0 0;
  z-index: 1;
`;

export const Preloader = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 6px 6px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 6;

  .loader-budget {
    position: relative;
    top: 50%;
  }
`;

export const HeaderForm = styled.div<{ color?: any }>(({ color }) => ({
  width: "100%",
  height: 160,
  position: "absolute",
  top: 0,
  left: 0,
  borderRadius: "6px 6px 0 0",
  backgroundColor: color ? color : "#CCCACA",
  zIndex: 3
}));

export const WaterIcon = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 47%;
  left: 50%;
  margin-top: -8px;
  margin-left: -8px;
  transform: scale(7);
  user-select: none;
  opacity: 0.1;
`;

export const LeftBlockInfo = styled.div`
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 10px 20px;
  p {
    margin: 0;
    padding: 4px 3px;
  }

  .customer-name {
    font-weight: 500;
    width: 100%;
    text-transform: uppercase;
    font-size: 20px;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(0.95);
      cursor: pointer;
      color: #333333;
    }
  }
  .customer-contact {
    font-weight: 600;
    font-size: 12px;
    font-style: italic;
    margin-left: 5px;
  }
`;

export const RightBlockInfo = styled.div`
  width: 30%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  /* background-color: rgba(0, 0, 0, 0.1); */
  box-sizing: border-box;
  font-weight: 600;
  padding: 10px;
  p {
    margin: 0;
    padding: 3px;
  }

  .os-number {
    font-size: 12px;
    margin: 10px 0 0 0;
  }
  .os-date,
  .os-status,
  .os-number {
    font-size: 12px;
    font-style: italic;
  }
  .os-status {
    margin-top: 10px;
  }
  .os-value {
    margin: 10px 0;
    font-size: 16px;
  }
`;

export const BtnCloseForm = styled.div<any>(() => ({
  position: "absolute",
  top: -11,
  right: -11,
  zIndex: 7,
}));

export const ContentForm = styled.div<any>(() => ({
  width: "100%",
  height: "calc(100% - 215px)",
  marginTop: 160,
  overflow: "hidden auto",
  padding: "10px 20px"
}));

export const FormBudget = styled.div`
  .row-form {
    min-height: 65px;
    margin-top: 20px;
  }

  .input-form-size {
    width: 90%;
    /* margin: 0 3%; */
  }
  .input-container {
    width: 100%;
    position: relative;
    margin: 0 10px;

    .input-title {
      font-weight: 600;
      color: #525252;
      margin: 2px;
      display: inline-block;

      .input-icon-required {
        color: red;
        opacity: 0.3;
        font-size: 9px;
        position: relative;
        /* top: -2px; */
      }
    }
    .input-tips {
      width: 100%;
      font-weight: 500;
      font-size: 11px;
      font-style: italic;
      color: #2a9bb6;
      /* display: props.tip ? "inline" : "none" */
    }
  }
`;

export const TableLineHead = styled.div`
  font-size: 12px;
  font-style: italic;
  color: #9c9c9c;
  margin: 3px 0;
  padding: 3px 0;
`;
export const TableLineContainerInput = styled.div`
  border: 1px solid #e5e5ea;
  transition: border-color ease-in-out 0.3s;
  border-radius: 6px;
  padding: 7px 11px;
  font-size: 14px;
  line-height: 1.42857143;
`;
export const TableLineContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
`;
export const TableLineContainerTable = styled.div`
  height: 40px;
  /* border-bottom: 1px solid #e5e5ea; */
  transition: border-color ease-in-out 0.3s;
  padding: 7px 5px;
  font-size: 14px;
  line-height: 1.42857143;
`;

export const FooterForm = styled.div`
  width: 100%;
  height: 55px;
  border-top: 1px solid #efefef;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 9px;

  button {
    margin: 0 5px;
  }
  .block-left-footer {
    width: 50%;
    float: left;
  }
  .block-right-footer {
    width: 50%;
    float: right;
    button {
      float: right;
    }
  }
`;
