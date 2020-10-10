<template>
  <a-modal
    :visible="visible"
    title="创建新项目"
    okText="Create"
    @cancel="
      () => {
        $emit('cancel');
      }
    "
    @ok="
      () => {
        $emit('create');
      }
    "
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="kitName">
        <a-input
          v-decorator="[
            'kitName',
            {
              rules: [{ required: true, message: 'kitName 不能为空！' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="kitType">
        <a-input v-decorator="['kitType']" />
      </a-form-item>
      <a-form-item label="price">
        <a-input type="textarea" v-decorator="['price']" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "form_in_modal",
    });
  },
};
</script>

<style>
</style>
