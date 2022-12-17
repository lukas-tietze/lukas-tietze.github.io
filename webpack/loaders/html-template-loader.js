const path = require('path');
const fs = require('fs/promises');
const glob = require('glob-all');

/**
 * @param {string} content
 */
module.exports = async function (content, map, meta) {
  const callback = this.async();
  const partialDir = path.resolve('');
  const regex = /{{\s*(?<partial>\w+)\s*}}/g;
  let match;
  let file;
  let replaced = 0;
  let newContent = '';

  while ((match = regex.exec(content)) && (file = match.groups['partial'])) {
    const data = await new Promise((resolve, reject) => {
      this.loadModule(path.resolve(`src/partials/${file}.partial.html`), (err, src, srcMap, module) => (err ? reject(err) : resolve(src)));
    });

    const html = data.toString('utf8');

    newContent += content.substring(replaced, match.index) + html;
    replaced = match.index + match[0].length;
  }

  newContent += content.substring(replaced);

  callback(null, newContent, map, meta);
};
