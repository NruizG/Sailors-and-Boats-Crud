module.exports = function noContent(msg) {
  var res = this.res;

  res.status(200);

  return (msg) ? res.send(msg) : res.send();
};
