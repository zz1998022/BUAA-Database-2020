<template>
  <div>
    <div class="flextitle">
      <div>
        <a-button type="primary" @click="addItem(true)">添加</a-button>
      </div>
      <div>
        <a-input-group style="width: 400px">
          <a-select default-value="0" style="width: 25%" @change="selectChange">
            <a-select-option value="0"> 手办名称 </a-select-option>
            <a-select-option value="1"> 对应角色 </a-select-option>
          </a-select>
          <a-input-search
            style="width: 75%"
            placeholder="请输入要搜索的关键词"
            allow-clear
            enter-button
            @search="searchModal"
          />
        </a-input-group>
      </div>
    </div>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      :roleList="roleList"
      :figureList="figureList"
      @cancel="handleCancel"
      @create="handleCreate"
    />
    <div>
      <a-table
        bordered
        :pagination="pagination"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        rowKey="ftrId"
      >
        <template slot="operation" slot-scope="text, record">
          <a-button type="link" @click="updateModal(record)">修改</a-button>
          <a-popconfirm
            v-if="data.length"
            title="确定要删除吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="() => onDelete(record.ftrId)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
      <update-form
        ref="updateForm"
        :visible="updatevisible"
        :roleList="roleList"
        :figureList="figureList"
        :recorder="updateRecorder"
        @cancel="updateCancel"
        @create="updateCreate"
      />
    </div>
  </div>
</template>

<script>
import CollectionCreateForm from "./form/createform.vue";
import UpdateForm from "./form/updateform.vue";
import axios from "axios";

export default {
  components: {
    CollectionCreateForm,
    UpdateForm,
  },
  data() {
    return {
      pagination: {
        defaultPageSize: 7,
        showTotal: (total) => `共${total}条数据`,
      },
      columns: [
        // {
        //   title: "编号",
        //   dataIndex: "roleId",
        //   key: "roleId",
        //   width: "10%",
        // },
        {
          title: "手办名称",
          dataIndex: "figureName",
          key: "figureName",
          width: "40%",
        },
        {
          title: "对应角色",
          dataIndex: "roleName",
          key: "roleName",
        },
        {
          title: "操作",
          width: "10%",
          dataIndex: "operation",
          scopedSlots: {
            customRender: "operation",
          },
        },
      ],
      data: [],
      visible: false,
      updatevisible: false,
      loading: false,
      searchType: 0,
      updateRecorder: {},
      roleList: [],
      figureList: [],
    };
  },
  methods: {
    selectChange(value) {
      this.searchType = value;
      console.log(this.searchType);
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      console.log(key);
      axios.delete("/figuretorole/delete?ftrId=" + key).then((res) => {
        console.log(res);
        let _this = this;
        _this.loading = true;
        _this.queryTable();
      });
    },
    addItem(modelOfUpdate) {
      let _this = this;
      axios
        .get("/figure/selectAll")
        .then(function (response1) {
          _this.figureList = response1.data;
          axios
            .get("/role/selectAll")
            .then(function (response2) {
              //将返回的数据存入页面中声明的data中
              _this.roleList = response2.data;
              if (modelOfUpdate) {
                _this.visible = true;
              } else {
                _this.updatevisible = true;
              }
            })
            .catch(function (error) {
              console.log("role fail");
            });
        })
        .catch(function (error) {
          console.log("fail");
        });
    },
    searchModal(value) {
      if (!value || value == "") {
        this.queryTable();
      } else if (this.searchType == 0) {
        console.log("searchType 0");
        const params = {
          figureName: value,
        };
        console.log(params);
        let _this = this;
        _this.loading = true;
        axios
          .get("/figuretorole/selectByFigureName?", {
            params: params,
          })
          .then(function (response) {
            //将返回的数据存入页面中声明的data中
            _this.data = response.data;
            _this.loading = false;
          })
          .catch(function (error) {
            alert(error);
          });
      } else {
        console.log("searchType 1");
        const params = {
          roleName: value,
        };
        console.log(params);
        let _this = this;
        _this.loading = true;
        axios
          .get("/figuretorole/selectByRoleName?", {
            params: params,
          })
          .then(function (response) {
            //将返回的数据存入页面中声明的data中
            console.log("selectByRoleName? ", response.data);
            _this.data = response.data;
            _this.loading = false;
          })
          .catch(function (error) {
            alert(error);
          });
      }
    },
    updateModal(record) {
      console.log("record is ", record);
      this.updateRecorder = record;
      this.addItem(false);
    },
    handleCancel() {
      this.visible = false;
    },
    updateCancel() {
      this.updatevisible = false;
    },
    updateCreate() {
      const form = this.$refs.updateForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("upodate ",values);
        const params = {
          ftrId: values.ftrId,
          figureId: values.fId,
          roleId: values.rId,
        };
        axios
          .put("/figuretorole/update?", null, {
            params: params,
          })
          .then((res) => {
            console.log(res);
            let _this = this;
            _this.loading = true;
            _this.queryTable();
          });
        form.resetFields();
        this.updatevisible = false;
      });
    },
    handleCreate() {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        const params = {
          figureId: values.fId,
          roleId: values.rId,
        };
        let _this = this;
        axios
          .post("/figuretorole/insert?", null, {
            params: params,
          })
          .then((res) => {
            console.log(res);
            _this.loading = true;
            _this.queryTable();
          });
        form.resetFields();
        _this.visible = false;
      });
    },
    queryTable() {
      let _this = this;
      _this.loading = true;
      axios
        .get("/figuretorole/selectAll")
        .then(function (response) {
          //将返回的数据存入页面中声明的data中
          _this.data = response.data;
          _this.loading = false;
        })
        .catch(function (error) {
          console.log("error case!");
          _this.$notification.open({
            message: "无法获取关系表格数据",
            icon: <a-icon type="warning" style="color: #ff1820" />,
            description:
              "请检查后端是否正常运行，是否允许跨域；或修改main.js中的axios全局参数，以匹配后端Api",
            duration: 10,
          });
        });
    },
  },
  created() {
    this.queryTable();
    console.log(this.data);
  },
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}

.editable-row-operations a {
  margin-right: 8px;
}

.flextitle {
  margin: 0 0 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
