<template>
  <div>
    <div class="flextitle">
      <div>
        <a-button type="primary" @click="addItem">添加</a-button>
      </div>
      <div>
        <a-input-group Large>
          <a-select default-value="0" style="width: 23%" @change="selectChange">
            <a-select-option value="0"> 名称 </a-select-option>
            <a-select-option value="1"> 类型 </a-select-option>
            <a-select-option value="2"> 价格 </a-select-option>
          </a-select>
          <a-input-search
            style="width: 77%"
            placeholder="input search text"
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
        rowKey="kitId"
      >
        <template slot="operation" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              updateModal(
                record.kitId,
                record.kitName,
                record.kitType,
                record.price
              )
            "
            >修改</a-button
          >
          <a-popconfirm
            v-if="data.length"
            title="确定要删除吗?"
            @confirm="() => onDelete(record.kitId)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
      <update-form
        ref="updateForm"
        :visible="updatevisible"
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
        //   dataIndex: "kitId",
        //   key: "kitId",
        //   width: "10%",
        // },
        {
          title: "名称",
          dataIndex: "kitName",
          key: "kitName",
        },
        {
          title: "类型",
          dataIndex: "kitType",
          key: "kitType",
        },
        {
          title: "价格",
          dataIndex: "price",
          key: "price",
          // width: "45%",
        },
        {
          title: "操作",
          width: "20%",
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
      axios.delete("/garagekit/delete?kitId=" + key).then((res) => {
        console.log(res);
        let _this = this;
        _this.loading = true;
        axios
          .get("/garagekit/selectAll")
          .then(function (response) {
            //将返回的数据存入页面中声明的data中
            _this.data = response.data;
            console.log(_this.data);
            _this.loading = false;
          })
          .catch(function (error) {
            alert(error);
          });
      });
    },
    addItem() {
      console.log("show");
      this.visible = true;
    },
    searchModal(value) {
      if (!value || value == "") {
        this.queryTable();
      } else if (this.searchType == 0) {
        const params = {
          kitName: value,
        };
        console.log(params);
        let _this = this;
        _this.loading = true;
        axios
          .get("/garagekit/selectByName?", {
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
      } else if (this.searchType == 1){
        const params = {
          kitType: value,
        };
        let _this = this;
        _this.loading = true;
        axios
          .get("/garagekit/selectByType?", {
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
      }else{
        const params = {
          price: value,
        };
        let _this = this;
        _this.loading = true;
        axios
          .get("/garagekit/selectByPrice?", {
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
      }
    },
    updateModal(rid, rname, rkitType, rprice) {
      this.$store.commit("updateGKBy", { inputGK: rid, index: 0 });
      this.$store.commit("updateGKBy", { inputGK: rname, index: 1 });
      this.$store.commit("updateGKBy", { inputGK: rkitType, index: 2 });
      this.$store.commit("updateGKBy", { inputGK: rprice, index: 3 });
      this.updatevisible = true;
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
        const params = {
          kitId: values.kitId,
          kitName: values.kitName,
          kitType: values.kitType,
          price: values.price,
        };
        axios
          .put("/garagekit/update?", null, {
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
          kitName: values.kitName,
          kitType: values.kitType,
          price: values.price,
        };
        axios
          .post("/garagekit/insert?", null, {
            params: params,
          })
          .then((res) => {
            let _this = this;
            _this.loading = true;
            _this.queryTable();
          });
        form.resetFields();
        this.visible = false;
      });
    },
    queryTable() {
      let _this = this;
      _this.loading = true;
      axios
        .get("/garagekit/selectAll")
        .then(function (response) {
          //将返回的数据存入页面中声明的data中
          _this.data = response.data;
          _this.loading = false;
        })
        .catch(function (error) {
          console.log("error case!");
          _this.$notification.open({
            message: "无法获取GK表格数据",
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
