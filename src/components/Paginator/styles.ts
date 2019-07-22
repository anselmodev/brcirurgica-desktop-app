import styled from "styled-components";

export const PaginatorContainer = styled.p`
  width: 100%;
  position: relative;
  top: 0px;
  right: 0px;
  margin: 0;
  padding: 0;

  .paginator-content {
    min-width: 260px;
    position: absolute;
  }

  .paginator-label {
    position: relative;
    font-size: 13px;
    top: -5px;
    /* color: #00C0EF; */
  }
  .paginator-counter {
    font-size: 11px;
    color: #858585;
  }
  button {
    color: #00c0ef;
  }
  button:hover {
    color: #00c0ef;
  }
  button:active {
    color: #858585;
  }
  button:first-child {
    float: left;
  }
  button:last-child {
    float: right;
  }
`;

export const PaginatorContent = styled.span<{ orientation?: 'left' | 'right' }>(props => ({
  minWidth: 240,
  position: 'absolute',
  margin: 5,
  top: 0,
  left: props.orientation === 'left' ? 0 : undefined,
  right: props.orientation === 'right' ? 0 : undefined,
}));
