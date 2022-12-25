const path = require('path');

async function evalInContext(js, context) {
  return async function () {
    return String(await eval(js));
  }.call(context);
}

function applyPipe(val, pipe) {
  if (!pipe) {
    return val;
  }

  switch (pipe) {
    case 'date':
      return new Intl.DateTimeFormat('de', {
        dateStyle: 'medium',
      }).format(new Date(val));
    default:
      throw new Error('Unknown Pipe: ', pipe);
  }
}

/**
 * @param {string} content
 */
module.exports = async function (content, map, meta) {
  const callback = this.async();
  const partialDir = path.resolve('');
  const regex = /{{(?<mode>>|!)(?<exp>[^\|}]+)(\|(?<pipe>.+))?}}/g;
  let match;
  let mode;
  let exp;
  let replaced = 0;
  let newContent = '';

  while ((match = regex.exec(content)) && (mode = match.groups['mode']) && (exp = match.groups['exp']?.trim())) {
    let replacedExpression = '';

    console.log(mode, exp);

    if (mode === '>') {
      const data = await new Promise((resolve, reject) => {
        this.loadModule(path.resolve(`src/partials/${exp}.partial.html`), (err, src, _srcMap, _module) =>
          err ? reject(err) : resolve(src)
        );
      });

      replacedExpression = data.toString('utf8');
    } else if (mode === '!') {
      replacedExpression = applyPipe(await evalInContext(exp, {}), match.groups['pipe']?.trim());
    }

    newContent += content.substring(replaced, match.index) + replacedExpression;
    replaced = match.index + match[0].length;
  }

  newContent += content.substring(replaced);

  callback(null, newContent, map, meta);
};
