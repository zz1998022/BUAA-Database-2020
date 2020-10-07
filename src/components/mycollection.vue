<template>
  <div>
    <div class="flextitle">
      <div>
        <a-button type="primary" @click="showModal">添加</a-button>
      </div>
      <div>
        <a-input-group Large>
          <a-select default-value="0" style="width: 23%" @change="selectChange">
            <a-select-option value="0"> 名称 </a-select-option>
            <a-select-option value="1"> 主页 </a-select-option>
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
        rowKey="manuId"
      >
        <template slot="operation" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              updateModal(record.manuId, record.manuName, record.manuLink)
            "
            >修改</a-button
          >
          <a-popconfirm
            v-if="data.length"
            title="确定要删除吗?"
            @confirm="() => onDelete(record.manuId)"
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
import CollectionCreateForm from "../components/form/createform.vue";
import UpdateForm from "../components/form/updateform.vue";
import axios from "axios";

export default {
  components: {
    CollectionCreateForm,
    UpdateForm,
  },
  data() {
    return {
		pagination:{
			defaultPageSize:7,
			showTotal:total=>`共${total}条数据`,
		},
      columns: [
        // {
        //   title: "编号",
        //   dataIndex: "manuId",
        //   key: "manuId",
        //   width: "10%",
        // },
        {
          title: "厂商名称",
          dataIndex: "manuName",
          key: "manuName",
          width: "20%",
        },
        {
          title: "厂商主页",
          dataIndex: "manuLink",
          key: "manuLink",
          width: "55%",
        },
        {
          title: "操作",
          width: "15%",
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
      axios.delete("/manufacturer/delete?manuId=" + key).then((res) => {
        console.log(res);
        let _this = this;
        _this.loading = true;
        axios
          .get("/manufacturer/selectAll")
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
    showModal() {
      console.log("show");
      this.visible = true;
    },
    searchModal(value) {
      if (!value || value == "") {
        console.log("search undefined");
        this.queryTable();
      } else if (this.searchType == 0) {
        console.log("searchType 0");
        const params = {
          manuName: value,
        };
        console.log(params);
        let _this = this;
        _this.loading = true;
        axios
          .get("/manufacturer/selectByName?", {
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
          manuLink: value,
        };
        console.log(params);
        let _this = this;
        _this.loading = true;
        axios
          .get("/manufacturer/selectByLink?", {
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
    updateModal(mid, mname, mlink) {
      console.log("update");
      this.$store.commit("updateItemId", mid);
      this.$store.commit("updateItemName", mname);
      this.$store.commit("updateItemLink", mlink);
      this.updatevisible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    updateCancel() {
      this.updatevisible = false;
    },
    updateCreate() {
      console.log("update up");
      const form = this.$refs.updateForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        const params = {
          manuId: values.manuId,
          manuName: values.manuName,
          manuLink: values.manuLink,
        };
        console.log("Update values of form: ", values);
        axios
          .put("/manufacturer/update?", null, {
            params: params,
          })
          .then((res) => {
            console.log(res);
            let _this = this;
            _this.loading = true;
            axios
              .get("/manufacturer/selectAll")
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
          manuName: values.manuName,
          manuLink: values.manuLink,
        };
        axios
          .post("/manufacturer/insert?", null, {
            params: params,
          })
          .then((res) => {
            console.log(res);
            let _this = this;
            _this.loading = true;
            axios
              .get("/manufacturer/selectAll")
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
        form.resetFields();
        this.visible = false;
      });
    },
    queryTable() {
      console.log("init");
      let _this = this;
      _this.loading = true;
      axios
        .get("/manufacturer/selectAll")
        .then(function (response) {
          //将返回的数据存入页面中声明的data中
          _this.data = response.data;
          _this.loading = false;
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
  //   beforeCreate() {
  //     this.form = this.$form.createForm(this, {
  //       name: "update_form_in_modal",
  //     });
  //   },
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
