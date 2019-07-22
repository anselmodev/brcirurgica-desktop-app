import styled from "styled-components";

export const BudgetListContainer = styled.div<{height?: string}>(props => ({
  width: "100%",
  height: `${props.height || "100%"}`,
  position: "relative",
  boxSizing: "border-box",
}));

export const HeadListCell = styled.p`
  width: 100%;
  height: 20px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 11px;
  color: #959595;
  line-height: 19px;
  padding-left: 30px;
  font-style: italic;

  span {
    font-weight: bold;
  }

  .head-coll1 {
    width: 8%;
    float: left;
    overflow: hidden;
  }
  .head-coll2 {
    width: 31.8%;
    float: left;
    overflow: hidden;
  }
  .head-coll3 {
    width: 12.2%;
    float: left;
    overflow: hidden;
  }
  .head-coll4 {
    width: 11.8%;
    float: left;
    overflow: hidden;
  }
  .head-coll5 {
    width: 12.8%;
    float: left;
    overflow: hidden;
  }
  .head-coll6 {
    width: 12%;
    float: left;
    overflow: hidden;
  }
  .head-coll7 {
    width: 10%;
    float: left;
    overflow: hidden;
  }
`;
export const CellsContainer = styled.div<{height?: string}>(props => ({
  width: "calc(100% - 4px)",
  height: `calc(${props.height || "86% - 5px"})`,
  overflowX: "hidden",
  overflowY: "auto",
  position: "relative",
  marginTop: "5px",
  boxSizing: "border-box"
}));

export const ListCell = styled.div<{color?: string}>(props => ({
    cursor: 'pointer',
    width: '98.5%',
    height: '55px',
    margin: '18px 1%',
    borderRadius: '4px',
    border: `1px solid  rgba(0, 0, 0, 0.05)`,
    backgroundColor: `${props.color || '#FFFFFF'}`,
    boxShadow: '1px 3px 14px -7px rgba(0,0,0,0.58)',
    position: 'relative',
    ':hover': {
      backgroundColor: '#f4f4f4',
    }
}));

export const CellLine = styled.p`
    width: 100%;
    color: #656565;
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 14px;
    line-height: 53px;
    padding-left: 20px;
    overflow: hidden;

    .cell-coll1{
        width: 8%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cell-coll2{
        width: 32.3%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-transform: uppercase;
    }
    .cell-coll3{
        width: 12.4%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cell-coll4{
        width: 12%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #F54844;
    }
    .cell-coll5{
        width: 13%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .cell-coll7{
        width: 10%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 0px;
    }
    .btn-cell{
        margin: 0px 8px;
        opacity: 0.7;
        padding: 19px 8px;
        cursor: pointer;
    }
    .btn-cell:hover{
        opacity: 1;
    }
    .btn-cell:active{
        color: #656565;
    }
    .btn-open {
        color: #858585;
    }
    .btn-pdf {
        color: #F54844;
        position: relative;
        z-index: 2;
        :hover {
          color: red;
        }
    }
`;

export const CellLineStatus = styled.span<{color?: string}>( props => ({
    width: '11%',
    float: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    opacity: 0.7,
    'em': {
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '2px 7px',
        borderRadius: '4px',
        backgroundColor: props.color
    }
}));
