const path = require('path');
const fs = require('fs/promises');
const glob = require('glob-all');

/**
 * @param {string} content
 */
module.exports = async function (content, map, meta) {
  const callback = this.async();
  const partialDir = path.resolve('src/partials');
  const files = await fs.readdir(partialDir);

  const contents = await Promise.all(
    files.map((file) => {
      const filePath = path.resolve(partialDir, file);

      return fs.readFile(filePath, { encoding: 'utf-8' }).then((data) => ({ data, file, filePath }));
    })
  );

  contents.forEach(({ data, file, filePath }) => {
    this.addDependency(filePath);

    const ext = path.extname(file).substring(1);
    const name = file.substring(0, file.length - ext.length - 1);
    const regEx = new RegExp(`{{\\s*${name}(\\.${ext})?\\s*}}`, 'g');

    content = content.replaceAll(regEx, data);
  });

  callback(null, content, map, meta);
};
