const isTodo = (arg: any): arg is Todo => {
  return (
    typeof arg === 'object' &&
    Object.keys(arg).length === 4 &&
    // arg !== null &&
    typeof arg.id === 'string' &&
    typeof arg.title === 'string' &&
    typeof arg.completed === 'boolean' &&
    typeof arg.deleted === 'boolean'
  );
};

export const isTodos = (arg: any): arg is Todo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};

// export const isTodoFilter = (arg: any): arg is todoFilter => {
//   return arg instanceof todoFilter
// }