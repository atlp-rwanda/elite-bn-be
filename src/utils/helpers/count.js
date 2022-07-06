const round = (num) => {
    const k = Number((Math.abs(num) * 20).toPrecision(30));
    return (Math.round(k) / 10) * Math.sign(num);
  };
  const avg = (a) => {
    const add = a.reduce((b, c) => b + c, 0);
    return round(add / a.length);
  };
  export { avg };