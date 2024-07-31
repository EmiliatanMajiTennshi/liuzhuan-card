const normalWeight = {
  fontWeight: 400,
};
const boldWeight = {
  fontWeight: 700,
};
const fontSize18 = {
  fontSize: 18,
};

const fontColorRed = {
  color: "red",
};

const normalStyle = {
  ...normalWeight,
  ...fontSize18,
};
const boldValue = {
  ...fontSize18,
  ...boldWeight,
};

const redLabel = {
  ...normalWeight,
  ...fontColorRed,
  ...boldValue,
};
export {
  normalWeight,
  boldWeight,
  fontSize18,
  fontColorRed,
  normalStyle,
  boldValue,
  redLabel,
};
