import styled from "styled-components";

export const DisplayDashboardPage = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  overflow-x: hidden;
  overflow-y: auto;

  .info-boxes {
    width: 100%;
    height: 160px;
    padding: 15px;
  }
  .icon-box {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0.2;
    color: #000000;
  }
  .title-list {
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    padding: 15px 0 5px 0;
    box-sizing: border-box;
    opacity: 0.7;
    position: relative;
  }
  .box-info {
    position: relative;
    width: 20%;
    height: 100%;
    margin: 0 6.5%;
    margin-left: 0px;
    border-radius: 4px;
    float: left;
    :last-child {
      float: right;
      margin-right: 0px;
    }
    color: #f4f4f4;
    cursor: pointer;

    b {
      width: 100%;
      font-size: 50px;
      padding: 2px 10px;
    }
    p {
      width: 100%;
      font-weight: bold;
      padding: 0px 10px;
    }
    span {
      text-align: right;
      padding: 5px 20px;
      background-color: rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      left: 0px;
      bottom: 0px;
      color: rgba(255, 255, 255, 0.7);
      font-weight: bold;
      font-style: italic;
      text-decoration: none;
      user-select: none;
    }
    :hover span {
      background-color: rgba(0, 0, 0, 0.3);
      color: rgba(255, 255, 255, 0.8);
    }
    :active span {
      background-color: rgba(0, 0, 0, 0.4);
      color: rgba(255, 255, 255, 1);
    }
  }
  .box-total {
    background-color: #605ca8;
  }
  .box-canceled {
    background-color: #f39c11;
  }
  .box-await {
    background-color: #00c0ef;
  }
  .box-success {
    background-color: #00a65a;
  }

  .list-budget {
    width: 100%;
    height: calc(100% - 220px);
    display: inline-block;
    position: absolute;
    top: 220px;
    left: 0px;
  }
`;
