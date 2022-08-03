<template>
  <div>
    <form @submit.prevent="onSave()">
      <b-field label="Subcategoría" horizontal>
        <SelectCore
          :label="''"
          :options="categoryList"
          :value-id="parseInt(subcategoryForm.categoryId)"
          @option-selected="categorySelected"
        />
      </b-field>
      <hr />

      <b-field label="Nombre" message="Nombre de Subcategoría" horizontal>
        <b-input v-model="subcategoryForm.name" placeholder="Restaurante" required />
      </b-field>

      <b-field label="Descripción" message="Proporcione una descripción..." horizontal>
        <b-input
          v-model="subcategoryForm.description"
          type="textarea"
          minlength="10"
          maxlength="100"
          placeholder="Proporcione una descripción"
        >
        </b-input>
      </b-field>

      <b-field label="Cargar Imagen" horizontal>
        <FilePicker @input="getPickerFile" />
      </b-field>

      <b-field label="Estado" horizontal>
        <b-switch
          v-model="subcategoryForm.status"
          true-value="Habilitado"
          false-value="Deshabilitado"
        >
          <b
            :class="
              subcategoryForm.status === 'Habilitado'
                ? 'has-text-success'
                : 'has-text-danger'
            "
          >
            {{ subcategoryForm.status }}
          </b>
        </b-switch>
      </b-field>

      <hr />
      <b-field label="Creado" horizontal>
        <b-input :value="subcategoryForm.createdAt" custom-class="is-static" readonly />
      </b-field>

      <hr />
      <!-- TODO: next possible convert to component @emit(onCancel) -->
      <b-field horizontal>
        <b-button type="is-primary" native-type="submit">
          {{ $route.path.includes('update') ? 'Actualizar' : 'Crear' }}
        </b-button>
        <b-button class="is-cancel is-rounded" @click="onCancel"> Cancelar </b-button>
      </b-field>
      <!-- end TODO -->
    </form>
  </div>
</template>

<script>
import FilePicker from '../FilePicker.vue'

import SelectCore from '@/components/base/SelectCore.vue'
export default {
  name: 'SubcategoryForm',
  components: { FilePicker, SelectCore },
  props: {
    categoryList: {
      type: Array,
      required: true,
    },
    subcategory: {
      type: Object,
      required: false, // For CREATE
      default() {
        // https://eslint.vuejs.org/rules/require-valid-default-prop.html
        return {
          id: null,
          categoryId: null,
          name: '',
          description: '',
          imageUrl: '',
          status: null,
          createdAt: new Date().toString(),
        }
      },
    },
  },
  data() {
    return {
      pickerFile: false,
      subcategoryForm: {
        ...this.subcategory,
        status: this.subcategory.status === 1 ? 'Habilitado' : 'Deshabilitado',
      },
    }
  },
  methods: {
    onSave() {
      // eslint-disable-next-line no-console
      console.log('form', this.subcategoryForm)
      this.$emit('submit', {
        ...this.subcategoryForm,
        status: this.subcategoryForm.status === 'Habilitado' ? 1 : 0,
      })
    },
    onCancel() {
      // navigate back
      this.$emit('cancel', true)
    },
    // CUSTOM COMPONENT
    categorySelected(eventValue) {
      // eslint-disable-next-line no-console
      console.log('categorySelected ', eventValue)
      this.subcategoryForm.categoryId = eventValue.toString()
    },
    getPickerFile(event) {
      // eslint-disable-next-line no-console
      console.log('event', event)
      this.subcategoryForm.imageUrl = event.name
      this.pickerFile = true
    },
  },
}
</script>
