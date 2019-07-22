export const keypressType = (
  event: React.KeyboardEvent,
  requiredKey: any[number | string],
  callFn?: Function
) => { 
  const key = event.key || event.keyCode || event.which;
  if (requiredKey[0] === key || requiredKey[1] === key) {
    return callFn && callFn();
  }
};
