<template>
  <div class="containter">
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import { getSetting } from 'ROOT/database/db';
import { connect } from '@/utils/connect';
export default {
  name: 'dockerList',
  data() {
    return {
      columns: [
        {
          title: 'ip',
          key: 'ip',
          align: 'center',
          width: 200
        },
        {
          title: 'continer',
          key: 'continer',
          width: 120,
          align: 'center'
        },
        {
          title: 'docker',
          key: 'docker',
          width: 120,
          align: 'center'
        },
        {
          title: 'command',
          key: 'command',
          align: 'center',
          width: 200
        },
        {
          title: 'comment',
          key: 'comment',
          align: 'center',
          width: 200
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.connect();
                    }
                  }
                },
                'run'
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    connect() {
      return connect();
    },
    init() {
      let { server } = getSetting('setting_server');
      this.data = server;
    }
  }
};
</script>

<style></style>
