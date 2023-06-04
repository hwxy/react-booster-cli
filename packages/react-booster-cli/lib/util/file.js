const fs = require('fs');
const path = require("path");

module.exports = {
  writeFileTree: (projectPath, fileJson) => {
    fs.mkdirSync(projectPath);
    const P = new Promise((res, rej) => {
      const files = Object.entries(fileJson);
      let count = files.length;
      files.forEach(([key, value]) => {
        const dirPaths = key.split('/').slice(0, -1);
        if(dirPaths.length >= 1) {
          let paths = ''
          dirPaths.forEach((dirpath) => {
            paths += dirpath;
            const filePath = path.resolve(projectPath, paths)
            if(!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath)
            }
          });
        }

        const filePath = path.resolve(projectPath, key)
        
        fs.writeFileSync(filePath, value)

        count--;
      })
      if(count === 0) {
        res('构建成功')
      } else {
        rej(new Error('构建失败'))
      }
    });

    return P;
  }
}