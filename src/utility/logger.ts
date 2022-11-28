export const log = (message: any, ...items: any): void => {
  // replace it by some Logger class
  console.log(message, items);
};
export const error = (message: any, ...items: any): void => {
  // replace it by some Logger class
  console.error(message, items);
};
