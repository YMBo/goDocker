import Datastore from 'lowdb';
import LodashId from 'lodash-id';
import FileSync from 'lowdb/adapters/FileSync';
import { setting_path } from './config';

// 保存的机器列表
const adapter = new FileSync(setting_path);
const setting_db = Datastore(adapter);
setting_db._.mixin(LodashId);
setting_db
  .defaults({
    setting_server: {
      server: [],
      loginConfig: {}
    }
  })
  .write();

export { setting_db };
