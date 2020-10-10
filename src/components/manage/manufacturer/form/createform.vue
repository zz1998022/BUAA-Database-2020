<template>
	<a-modal :visible="visible" title='创建新项目' 
	okText='Create' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
		<a-form layout='vertical' :form="form">
			<a-form-item label='manuName'>
				<a-input v-decorator="[
	          'manuName',
	          {
	            rules: [{ required: true, message: 'manuName 不能为空！' }],
	          }
	        ]" />
			</a-form-item>
<!-- 			<a-form-item label='manuName'>
				<a-input v-decorator="['manuName']" />
			</a-form-item> -->
			<a-form-item label='manuLink'>
				<a-input type='textarea' v-decorator="['manuLink']" />
			</a-form-item>
<!-- 			<a-form-item class='collection-create-form_last-form-item'>
				<a-radio-group v-decorator="[
	          'modifier',
	          {
	            initialValue: 'private',
	          }
	        ]">
					<a-radio value='public'>Public</a-radio>
					<a-radio value='private'>Private</a-radio>
				</a-radio-group>
			</a-form-item> -->
		</a-form>
	</a-modal>
</template>

<script>
	export default {
		props: ['visible'],
		beforeCreate() {
			this.form = this.$form.createForm(this, {
				name: 'form_in_modal'
			});
		},
	};
</script>

<style>
</style>
