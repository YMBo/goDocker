import { setting_db } from './datastore';

// ------------------------------setting-----------------------------------
// 获取setting配置
function getSetting(key) {
  return setting_db
    .read()
    .get(key)
    .value();
}

function setSetting(key, value) {
  return setting_db.set(key, value).write();
}

export { getSetting, setSetting };
