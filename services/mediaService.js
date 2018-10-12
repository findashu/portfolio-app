const fs = require('fs');
const path = require('path');
const multer = require('multer');

function mkdirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';
    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir)
        } catch (error) {
            console.log(error);
        }
        return curDir;
    }, initDir)
}



module.exports.uploadMedia = function(req,res,dirPath, fileName, goBack) {
    mkdirByPathSync(dirPath);
    var storage = multer.diskStorage({
        destination: function(req,file,callback) {
            callback(null, dirPath)
        },
        filename: function(req,file, callback) {
            console.log(JSON.stringify(file));
            callback(null, fileName)
        }
    });

    var upload = multer({storage : storage}).single('image');
    upload(req,res, function(err, data) {
        if(err) {
            goBack(err, null)
        }else {
            goBack(null, {'fileName':dirPath+ '' + fileName})
        }
    });
}