<template>
  <div class="content">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          v-model="formInline.password"
          placeholder="Password"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">
          Signin
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'contentIMG',
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    };
  }
};
</script>
<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* ::-webkit-scrollbar-track {
} */
::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 3px;
  /* background: url("../../../photos/bar.jpg"); */
}
</style>
<style scoped lang="less">
.content {
  padding-left: 5px;
  height: 100%;
  overflow: auto;
  font-family: 'Microsoft YaHei';
  background: #e4e4e4;

  .gap {
    margin-bottom: 10px;
  }
  .timeAddress {
    position: sticky;
    top: 0;
    background: rgba(204, 204, 204, 0.8);
    background-size: cover;
    padding: 4px 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 40px;
    // margin-bottom: 20px;
    .addrens {
      font-size: 13px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .time {
      font-size: 11px;
      color: rgb(59, 59, 59);
    }
  }

  .img {
    margin: 0 20px;
    padding: 20px 0 40px;
    display: grid;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    grid-template-columns: repeat(auto-fit, 100px);
    .imgBox {
      .dic {
        font-size: 10px;
        text-align: center;
      }
    }
  }
}
</style>
