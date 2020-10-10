<template>
  <div>
    <a-modal
      :visible="visible"
      title="修改项目"
      okText="Update"
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
        <a-form-item v-show="false" label="manuId">
          <a-input
            type="textarea"
            v-decorator="[
              'manuId',
              { initialValue: this.$store.state.mId },
            ]"
          />
        </a-form-item>
        <a-form-item label="manuName">
          <a-input
            v-decorator="[
              'manuName',
              {
                rules: [{ required: true, message: 'manuName 不能为空！' }],
                initialValue: this.$store.state.mName,
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="manuLink">
          <a-input
            type="textarea"
            v-decorator="[
              'manuLink',
              { initialValue: this.$store.state.mLink },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  // props: ['visible'],
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "update_form_in_modal1",
    });
  },
};
</script>
<style>
</style>
