import less from 'less';

function getVars(content) {
  return less.parse(content).then(res => res.rules.filter(v => v.variable === true));
}

export default function lessVariablesLoader(content) {
  const callback = this.async();

  if (this.cacheable) {
    this.cacheable();
  }

  getVars(content)
  .then(lessVars => callback(null, `module.exports = JSON.stringify(${lessVars})`))
  .catch(ex => callback(ex.message));
}
