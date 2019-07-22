import styled from "styled-components";

const getColorsBox = (type: string) => {
  return type === "all"
    ? "#605CA8"
    : type === "canceled"
    ? "#F39C11"
    : type === "await"
    ? "#00C0EF"
    : type === "success"
    ? "#00A65A"
    : "";
};

export const ModalChartContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 100;
  color: #f4f4f4;
`;

export const BoxChart = styled.div<{ color: any }>(props => ({
  width: "0px", // width: '500px',
  height: "0px", // height: '400px',
  position: "absolute",
  backgroundColor: getColorsBox(props.color),
  top: "0%", // top: '50%',
  left: "0%", // left: '50%',
  marginTop: "0px", // marginTop: '-200px',
  marginLeft: "0px", // marginLeft: '-250px',
  borderRadius: "6px",
  overflow: "hidden",
  boxShadow: "0px 30px 82px -21px rgba(0, 0, 0, 1)",
  ".btn-close-charts": {
    position: "absolute",
    top: "10px",
    right: "10px",
    button: {
      color: "#f4f4f4"
    },
    "button:hover": {
      color: "#656565"
    },
    "button:focus": {
      color: "#656565"
    }
  },
  ".reload-ch": {
    right: "40px"
  },
  h3: {
    marginLeft: "20px"
  },
  ".tooltipChart": {
    padding: "10px",
    backgroundColor: "#656565"
  },
  "#chart-1": {
    position: "absolute",
    top: "80px",
    left: "55px"
  }, ".loader-chart": {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-35px",
    marginLeft: "-35px",
  }
}));

export const BarsContainer = styled.div<{ color?: any }>(props => ({
  width: "80%",
  height: "65%",
  margin: "10%",
  borderLeft: "1px solid rgba(255,255,255,0.7)",
  borderBottom: "1px solid rgba(255,255,255,0.7)",
  position: "relative",
  "em": {
    position: "absolute",
    top: -20, 
    left: -30
  },
  ".icon-box": {
    transform: 'scale(3)',
    position: "absolute",
    top: 40, 
    left: 170,
    opacity: 0.1,
    color: '#000000'
  }
}));

export const BarItem = styled.div<{ dimmension?: number; leftPos: number }>(
  props => ({
    width: 35,
    height: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    position: "absolute",
    bottom: 0,
    left: `${props.leftPos}%`,
    borderRadius: "2px 2px 0 0",
    cursor: 'pointer',
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.7)",
      border: "1px solid rgba(255,255,255,0.9)"
    },
    "p": {
      width: '100%',
      position: "absolute",
      bottom: -22, 
      left: 0,
      textAlign: 'center'
    }, 
  })
);
