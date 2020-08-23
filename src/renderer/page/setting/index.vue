<template>
  <div class="bg">
    <div class="save">
      <Button class="button" type="warning" size="small" @click="exportFile">
        导出配置
      </Button>
      <Button
        class="button"
        style="background:#8d70ff;border-color:#8d70ff"
        type="warning"
        size="small"
        @click="importFile"
      >
        导入配置
      </Button>
      <Button class="button" type="primary" size="small" @click="save">
        保存
      </Button>
    </div>
    <div class="setting_body">
      <div>
        <div
          style="position:sticky;top:30px;background:#fff;padding-bottom:10px;z-index:10;color:#054792;box-shadow: 0 4px 15px -9px #ccc;"
        >
          <Divider orientation="left">
            &nbsp;&nbsp;
            <Icon type="ios-basket-outline" />
            <span class="icon">基础配置&nbsp;</span>
          </Divider>
        </div>
        <div class="w">
          <div class="formW server">
            <Form
              ref="localhost"
              style="margin:20px 40px 0;font-size:12px;"
              :model="loginConfig"
              :rules="ruleValidate"
              :label-width="150"
            >
              <FormItem label="relay账号" prop="email">
                <Input
                  type="text"
                  v-model="loginConfig.email"
                  placeholder="xxx@relay.zuoyebang.cc"
                />
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input
                  password
                  v-model="loginConfig.password"
                  type="password"
                  placeholder="密码"
                />
              </FormItem>
            </Form>
          </div>
        </div>
      </div>

      <div>
        <div
          style="position:sticky;top:30px;background:#fff;padding-bottom:10px;z-index:10;color:#054792;box-shadow: 0 4px 15px -9px #ccc;"
        >
          <Divider orientation="left">
            &nbsp;&nbsp;
            <Icon type="logo-tux" />
            <span class="icon">登录配置&nbsp;</span>
          </Divider>
        </div>
        <!-- :rules="ruleValidate" -->
        <div class=" formW w">
          <transition-group tag="div" name="list">
            <div
              :class="`formW server`"
              v-for="(item, index) in server"
              :key="`${item.id}`"
            >
              <Form
                :ref="'form' + index"
                style="margin:20px 40px 0;font-size:12px;"
                :model="item"
                :rules="ruleValidate"
                :label-width="150"
              >
                <FormItem label="目标机器" prop="ip">
                  <Input
                    type="text"
                    v-model="item.ip"
                    placeholder="rd@172.xx.xxx.x"
                  />
                </FormItem>
                <FormItem label="docker名" prop="docker">
                  <Input type="text" v-model="item.docker" placeholder="yyrd" />
                </FormItem>
                <FormItem label="容器名" prop="continer">
                  <Input
                    type="text"
                    v-model="item.continer"
                    placeholder="yaya"
                  />
                </FormItem>
                <FormItem label="登录后执行命令" prop="command">
                  <Input
                    type="text"
                    v-model="item.command"
                    placeholder="gg deployfe yy-phone-web dev"
                  />
                </FormItem>
                <FormItem label="备注">
                  <Input password v-model="item.comment" type="textarea" />
                </FormItem>
                <transition name="fade">
                  <Button
                    v-if="server.length != 1"
                    class="delete_button"
                    type="error"
                    ghost
                    @click="remove(index)"
                  >
                    删除
                  </Button>
                </transition>
              </Form>
            </div>
          </transition-group>
          <div style="width:60%;margin:10px auto;">
            <Button type="dashed" long @click="handleAdd" icon="md-add">
              添加
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSetting, setSetting } from 'ROOT/database/db';
import {
  importSettingFile,
  exportSettingFile,
  alertMessage
} from '@/utils/file';
export default {
  name: 'setting',
  data() {
    return {
      loginConfig: {
        email: '',
        passWord: ''
      },
      server: [],
      ruleValidate: {
        password: [{ required: true, message: '必填项', trigger: 'blur' }],
        ip: [{ required: true, message: '必填项', trigger: 'blur' }],
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        email: {
          validator: (rule, value, callback) => {
            let f = /(.)@relay\.zuoyebang\.cc/g.test(value);
            if (!value) {
              callback(new Error('relay邮箱必填'));
            } else if (!f) {
              callback(new Error('relay格式错误'));
            } else {
              callback();
            }
          },
          required: true,
          trigger: 'blur'
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let { server, loginConfig } = getSetting('setting_server');
      this.server = server;
      this.loginConfig = loginConfig;
    },
    remove(i) {
      if (this.server.length == 1) {
        return;
      }
      this.server.splice(i, 1);
    },
    handleAdd() {
      this.server.push({
        id: Math.random(),
        ip: '',
        continer: '',
        docker: '',
        command: '',
        comment: ''
      });
    },
    localhostRule() {
      return new Promise((resolve, reject) => {
        this.$refs['localhost'].validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    async save() {
      let i = this.server.length;
      let flag = true;

      //   检测服务器参数符合要求
      for (let m = 0; m < i; m++) {
        let name = 'form' + m;
        this.$refs[name][0].validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
      }
      let flag2 = await this.localhostRule();
      if (flag && flag2) {
        let server = this.server;
        let loginConfig = this.loginConfig;
        try {
          setSetting('setting_server', {
            server,
            loginConfig
          });
          alertMessage('info', '保存成功');
        } catch (error) {
          alertMessage('error', '保存失败');
        }
        this.init();
      }
    },
    importFile() {
      // 第一个参数，作为main进程的模态框
      importSettingFile('导入文件', () => {
        this.init();
      });
    },
    exportFile() {
      exportSettingFile('导出配置');
    }
  }
};
</script>
<style lang="less">
.setting_body {
  width: 100%;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
<style scoped lang="less">
.bg {
  height: 100%;
  padding: 0 30px 30px 30px;
  overflow: auto;
  .ivu-divider-horizontal.ivu-divider-with-text-left,
  .ivu-divider-horizontal {
    margin: 0;
  }
  .save {
    height: 30px;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 11;
    > .button {
      float: right;
      font-size: 13px;
      margin-right: 10px;
    }
  }
  .w {
    margin: 20px 100px;
  }
  .formW {
    // width: 600px;
    min-width: 300px;
    max-width: 1000px;
    position: relative;
  }
  .enable {
    border: 1px dashed #7cade0 !important;
  }
  .server {
    position: relative;
    padding: 10px;
    transition: all 0.3s;
    border: 1px dashed #dcdee2;
    margin-bottom: 10px;
    padding-right: 50px;
    .delete_button {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 0;
      height: 100%;
      background: #f5f5f5;
      border: 0;
      &:hover {
        color: #fff;
        background: #dc5e5e;
      }
    }
  }
}
.icon {
  font-size: 14px;
}
</style>
