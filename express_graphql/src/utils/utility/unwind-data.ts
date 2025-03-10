const { flatten } = require("safe-flat");

export function unwindData(data: { [key in string]: unknown }[]) {
  const final = data.map((item) => {
    return flatten(item);
  });

  return final;
}
