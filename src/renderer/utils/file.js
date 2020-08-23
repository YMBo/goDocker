import { remote } from 'electron';
import fs from 'fs-extra';
import { setting_path } from 'ROOT/database/config';

function alertMessage(type, message) {
  remote.dialog.showMessageBox(remote.getCurrentWindow(), {
    type,
    message
  });
}

// 导入
function importSettingFile(title, fn) {
  let fileName = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
    title: title || '',
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });
  if (!fileName) return Promise.reject('cancel');
  if (!fileName[0]) {
    alertMessage('error', '文件路径获取失败！');
    return Promise.reject('文件路径获取失败！');
  }
  return fs
    .readJson(fileName[0])
    .then(json => {
      if (typeof json.setting_server == 'object') {
        fs.copy(fileName[0], setting_path).then(r => {
          alertMessage('info', '文件已导入');
          fn();
        });
      } else {
        alertMessage('error', '文件内容不匹配！ 请重试');
      }
    })
    .catch(err => {
      alertMessage('error', `读取文件失败，错误信息 : ${err.message}`);
      return Promise.reject(`读取文件失败！ ${err.message}`);
    });
}

// 导出
function exportSettingFile(title) {
  let fileName = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
    title: title || '',
    defaultPath: 'setting.json'
  });
  if (!fileName) {
    return Promise.reject('cancel');
  }
  console.log(setting_path, fileName);
  return fs.copy(setting_path, fileName).catch(err => {
    alertMessage('error', `存储文件失败，错误信息 : ${err.message}`);
    return Promise.reject(`存储文件失败！ ${err.message}`);
  });
}
export { importSettingFile, exportSettingFile, alertMessage };
