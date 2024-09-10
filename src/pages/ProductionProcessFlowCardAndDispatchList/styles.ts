const normalWeight = {
  fontWeight: 400,
};
const boldWeight = {
  fontWeight: 700,
};
const fontSize22 = {
  fontSize: 22,
};
const fontSize28 = {
  fontSize: 28,
};
const fontSize32 = {
  fontSize: 32,
};
const fontSize24 = {
  fontSize: 24,
};

const fontColorRed = {
  color: "red",
};

const normalStyle = {
  ...normalWeight,
  ...fontSize22,
};
const boldValue = {
  ...fontSize22,
  ...boldWeight,
};
const bold32 = {
  ...fontSize32,
  ...boldWeight,
};
const bold28 = {
  ...fontSize28,
  ...boldWeight,
};
const bold24 = {
  ...fontSize24,
  ...boldWeight,
};

const redLabel = {
  ...fontColorRed,
  ...boldValue,
};
export {
  normalWeight,
  boldWeight,
  fontSize22,
  fontSize24,
  fontColorRed,
  normalStyle,
  boldValue,
  redLabel,
  bold32,
  bold28,
  bold24,
};
