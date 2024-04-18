import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export const convertImgToBase64 = async (path) => {
    const data = await readFile(path);
    return data.toString('base64');
};

export const convertBase64ToImg = async (base64String, path) => {
    const buffer = Buffer.from(base64String, 'base64');
    await fs.promises.writeFile(path, buffer);
}

