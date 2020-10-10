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
        <a-form-item v-show="false" label="kitId">
          <a-input
            type="textarea"
            v-decorator="['kitId', { initialValue: this.$store.state.gk.id }]"
          />
        </a-form-item>
        <a-form-item label="kitName">
          <a-input
            v-decorator="[
              'kitName',
              {
                rules: [{ required: true, message: 'kitName 不能为空！' }],
                initialValue: this.$store.state.gk.name,
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="kitType">
          <a-input
            v-decorator="[
              'kitType',
              { initialValue: this.$store.state.gk.type },
            ]"
          />
        </a-form-item>
        <a-form-item label="price">
          <a-input
            type="textarea"
            v-decorator="[
              'price',
              { initialValue: this.$store.state.gk.price },
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
