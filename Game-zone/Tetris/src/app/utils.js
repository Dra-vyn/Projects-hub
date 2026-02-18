export const POINTER_KEYS = {
  "upArrow": ({ index, options }) =>
    ((index - 1) + options.length) % options.length,
  "downArrow": ({ index, options }) => (index + 1) % options.length,
};