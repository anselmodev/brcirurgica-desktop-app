import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 19;
  background-color: rgba(0, 0, 0, 0.8);

  .btn-exit-search {
    position: absolute;
    top: -60px;
    right: -60px;
    z-index: 19;
    color: rgba(255, 255, 255, 1);
    opacity: 0.5;
    cursor: pointer;
  }
  .btn-exit-search:hover {
    opacity: 0.9;
  }

  .content-search {
    width: 450px;
    height: 440px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -220px;
    margin-left: -200px;
  }
  .group-search {
    width: 450px;
    margin-bottom: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 1;

    -webkit-box-shadow: 0px 40px 69px -10px rgba(0, 0, 0, 0.9);
    -moz-box-shadow: 0px 40px 69px -10px rgba(0, 0, 0, 0.9);
    box-shadow: 0px 40px 69px -10px rgba(0, 0, 0, 0.9);
  }
  .tips-search {
    width: 100%;
    text-align: center;
    position: relative;
    z-index: 2;
    color: #ecd96a;
    margin-top: 100px;
  }
  .result-search {
    width: 100%;
    min-height: 250px;
    max-height: 400px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 6px;
    display: inline-block;
    margin-top: 10px;
    position: relative;
    z-index: 2;
    overflow: hidden;

    -webkit-box-shadow: 0px 40px 69px -27px rgba(0, 0, 0, 0.9);
    -moz-box-shadow: 0px 40px 69px -27px rgba(0, 0, 0, 0.9);
    box-shadow: 0px 40px 69px -27px rgba(0, 0, 0, 0.9);
  }
  .title-result-search {
    padding: 10px;
    box-sizing: border-box;
    b {
      text-transform: uppercase;
    }
  }
  .group-button {
    width: 450px;
    text-align: center;
  }
  .button-result {
    text-decoration: none;
    color: #767676;
  }
  .button-result:hover {
    color: #34c3ff;
  }
  .button-result-active {
    font-style: italic;
    color: #34c3ff !important;
    font-weight: bold;
  }
  .list-results {
    width: 100%;
    min-height: 250px;
    max-height: 318px;
    overflow-x: hidden;
    overflow-y: auto;
    /* background-color: #efefef; */
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #efefef;
  }
  .loader-result{
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba(255,255,255, 0.7);

    span {
      margin-top: 120px;
    }
  }

  /* Box results */
  .box-results-cell {
    width: 100%;
    height: 80px;
    background-color: #f4f4f4;
    margin: 5px 0;
    overflow: hidden;
    border-radius: 6px;
    cursor: pointer;

    p {
      margin: 0;
      padding: 0;
      color: #757575;
    }
    :hover {
      background-color: #afe7ff;
    }
  }
  .box-results-number {
    font-size: 11px;
    padding: 5px !important;
    box-sizing: border-box;
  }
  .box-results-name {
    font-size: 13px;
    text-transform: uppercase;
    padding: 5px !important;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .box-results-options {
    font-size: 11px;
    padding: 5px !important;
    font-style: italic;
    box-sizing: border-box;
  }
  .search-noresult {
      width: 100%; 
      height: 100%; 
      text-align: center;
      padding-top: 90px;
      color: #F39C11;
      font-style: italic;
  }
`;
