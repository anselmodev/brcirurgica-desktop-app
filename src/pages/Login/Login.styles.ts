import styled from "styled-components";

export const DisplayLoginPage = styled.div`
  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20;
  }

  .login-box,
  .recover-box {
    width: 400px;
    height: 500px;
    position: absolute;
    margin-top: -250px;
    margin-left: -200px;
    top: 50%;
    left: 50%;
    z-index: 21;
    background-color: #f4f4f4;
    transform: scale(0);

    border-radius: 8px 8px 8px 8px;
    -moz-border-radius: 8px 8px 8px 8px;
    -webkit-border-radius: 8px 8px 8px 8px;
    border: 0px solid #000000;

    -webkit-box-shadow: 0px 30px 82px -21px rgba(0, 0, 0, 0.56);
    -moz-box-shadow: 0px 30px 82px -21px rgba(0, 0, 0, 0.56);
    box-shadow: 0px 30px 82px -21px rgba(0, 0, 0, 0.56);
  }

  .logo-box {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -45px;
    left: 50%;
    margin-left: -50px;
  }

  .box-title {
    width: 100%;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 80px;
    color: #147faa;
  }
  .box-input {
    width: 70%;
    text-align: center;
    margin: 50px 15% 0 15%;
  }
  .box-button {
    width: 70%;
    text-align: center;
    margin: 50px 15% 0 15%;

    button {
      background-color: #0093c9;
      color: #f4f4f4;
      font-weight: bold;
      cursor: default;
    }
  }
  .box-link {
    width: 70%;
    text-align: center;
    margin: 60px 15% 0 15%;

    button {
      cursor: default;
    }
  }
  .checking-user-title {
    position: relative;
    top: 150px;
  }
`;
