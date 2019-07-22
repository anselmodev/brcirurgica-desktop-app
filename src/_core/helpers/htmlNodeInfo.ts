const _getDomElement = (elementNode: any) => {
  return document.querySelector(elementNode);
};

export const getElementPosition = (
  elementClassId: string,
  offset?: boolean
) => {
  const getElement = _getDomElement(elementClassId);
  if (offset) {
    return {
      top: getElement.offsetTop,
      left: getElement.offsetLeft,
      type: "px"
    };
  } else {
    const rect = getElement.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      type: "px"
    };
  }
};
export const getElementDimensions = (elementClassId: string) => {
  const getElement = _getDomElement(elementClassId);
  return {
    width: getElement.offsetWidth,
    height: getElement.offsetHeight,
    type: "px"
  };
};
export const getScrollPosition = (elementClassId: string, setValues?: number[]) => {
  const getElement = _getDomElement(elementClassId);

  if(setValues) {
    getElement.scrollTop = setValues[0] || 0;
    getElement.scrollLeft = setValues[1] || 0;
  } else {
    return {
      scrollTop: getElement.scrollTop,
      scrollLeft: getElement.scrollLeft,
      type: "px"
    };
  }
};
