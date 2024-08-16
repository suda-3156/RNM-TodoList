const isTodo = (arg: any): arg is Todo => {
  return (
    typeof arg === 'object' &&
    Object.keys(arg).length === 3 &&
    // arg !== null &&
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    typeof arg.checked === 'boolean'
  );
};

export const isTodos = (arg: any): arg is Todo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};

// export const isTodoFilter = (arg: any): arg is todoFilter => {
//   return arg instanceof todoFilter
// }