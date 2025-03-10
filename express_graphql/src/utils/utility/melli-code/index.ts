export const validateMelliCode = (melliCode: string) => {
  const L = melliCode.length;

  if (L < 8 || parseInt(melliCode, 10) == 0) return false;
  melliCode = ("0000" + melliCode).substr(L + 4 - 10);
  if (parseInt(melliCode.substr(3, 6), 10) == 0) return false;
  const c = parseInt(melliCode.substr(9, 1), 10);
  let s = 0;
  for (let i = 0; i < 9; i++)
    s += parseInt(melliCode.substr(i, 1), 10) * (10 - i);
  s = s % 11;
  return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
};
