<template>
  <div>
    <div style="margin-bottom: 20px;">
      <a-button type="primary" @click="showModal">Add Boat</a-button>
      <collection-create-form
        ref="collectionForm"
        :visible="visible"
        @cancel="handleCancel"
        @create="handleCreate"
      />
    </div>
    <a-table :columns="columns" :dataSource="data" bordered size="small" rowKey="id">
      <template v-for="col in ['bname', 'color']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.id)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.id)">Edit</a>
          </span>
          <a-popconfirm
            v-if="data.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.id)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import axios from "axios";
import CollectionCreateForm from '../components/AddBoatsModal.vue'

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "10%",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "Name",
    dataIndex: "bname",
    width: "35%",
    scopedSlots: { customRender: "bname" }
  },
  {
    title: "Color",
    dataIndex: "color",
    width: "15%",
    scopedSlots: { customRender: "color" }
  },
  {
    title: "Operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  components: { CollectionCreateForm },
  data() {
    return {
      data: [],
      columns,
      visible: false
    };
  },
  methods: {
    fetchSailors() {
      axios.get("http://localhost:1337/boats").then(response => {
        this.data = response.data;
      });
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];

      axios
        .patch(`http://localhost:1337/boats/${target.id}`, {
          bname: target.bname,
          color: target.color
        })
        .then(response => {
        });
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.id)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    onDelete(key) {
      const newData = [...this.data];
      this.data = newData.filter(item => item.id !== key);
      const target = newData.filter(item => item.id === key)[0];
      axios
        .delete(`http://localhost:1337/boats/${target.id}`)
        .then(response => {
        });
    },
    showModal () {
      this.visible = true;
    },
    handleCancel  () {
      this.visible = false;
    },
    handleCreate  () {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        axios
        .post(`http://localhost:1337/boats/`, {
          bname: values.bname,
          color: values.color
        })
        .then(response => {
          this.fetchSailors();
        });
        form.resetFields();
        this.visible = false;
      });
    },
  },
  created() {
    this.fetchSailors();
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
