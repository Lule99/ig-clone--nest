export const generateSalt = (n: number) => {
  let res = '';
  for (let i = 0; i < n; i++) {
    const random = Math.floor(Math.random() * 27);
    res += String.fromCharCode(97 + random);
  }
  return res;
};
