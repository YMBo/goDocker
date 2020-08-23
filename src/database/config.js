import { app, remote } from 'electron'; // 引入remote模块
import fs from 'fs-extra';
import path from 'path';

const APP = process.type === 'renderer' ? remote.app : app;
// 存储用户设置的系统目录
const STORE_PATH = APP.getPath('userData');
console.log(1111, STORE_PATH);
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    // 如果不存在路径
    fs.mkdirpSync(STORE_PATH);
  }
}

// setting的配置文件
const setting_path = path.join(STORE_PATH, '/setting.json');

export { setting_path };
