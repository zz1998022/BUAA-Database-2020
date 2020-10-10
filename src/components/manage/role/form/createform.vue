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
      <a-form-item label="roleName">
        <a-input
          v-decorator="[
            'roleName',
            {
              rules: [{ required: true, message: 'roleName 不能为空！' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="gender">
        <a-input v-decorator="['gender']" />
      </a-form-item>
      <a-form-item label="intro">
        <a-input type="textarea" v-decorator="['intro']" />
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
