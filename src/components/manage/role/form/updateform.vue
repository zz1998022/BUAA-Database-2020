<template>
  <div>
    <a-modal
      :visible="visible"
      title="修改项目"
      okText="修改"
      cancelText="取消"
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
      destroyOnClose
    >
      <a-form layout="vertical" :form="form">
        <a-form-item v-show="false" label="roleId">
          <a-input
            type="textarea"
            v-decorator="['roleId', { initialValue: this.$store.state.rId }]"
          />
        </a-form-item>
        <a-form-item label="roleName">
          <a-input
            v-decorator="[
              'roleName',
              {
                rules: [{ required: true, message: 'roleName 不能为空！' }],
                initialValue: this.$store.state.rName,
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="gender">
          <a-input
            v-decorator="[
              'gender',
              { initialValue: this.$store.state.rGender },
            ]"
          />
        </a-form-item>
        <a-form-item label="intro">
          <a-input
            type="textarea"
            v-decorator="[
              'intro',
              { initialValue: this.$store.state.rIntro },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "update_form_in_modal2",
    });
  },
};
</script>
<style>
</style>
