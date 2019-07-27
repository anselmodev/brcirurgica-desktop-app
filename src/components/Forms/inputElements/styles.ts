import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 10px;

  .input-form-size {
    width: 90%;
    position: relative;
    z-index: 1;
    background-color: #FFFFFF;
    border-radius: 6px;
  }
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
  .input-error-msg{
      width: calc(100% - 46px);
      text-align: left;
      font-size: 12px;
      color: red;
      font-style: italic;
      position: absolute;
      left: 0px;
      bottom: -24px;
      padding: 10px 0px 3px 6px;
      background-color: #fff4f3;
      border: 1px solid #f5dfde;
      border-radius: 0 0 8px 8px;
      z-index: 0;

      .icon-error-opac {
          opacity: 0.5;
      }
  }
`;
