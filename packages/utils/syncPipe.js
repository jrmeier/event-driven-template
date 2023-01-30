export const syncPipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x)
