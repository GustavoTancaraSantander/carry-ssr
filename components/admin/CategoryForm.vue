<template>
  <div>
    <form @submit.prevent="onSave()">
      <!--  <b-field label="ID" horizontal>
        <b-input v-model="categoryForm.id" custom-class="is-static" readonly />
      </b-field>
      <hr /> -->

      <b-field label="Nombre" message="Nombre de categoría" horizontal>
        <b-input v-model="categoryForm.name" placeholder="Tienda" required />
      </b-field>
      <b-field
        label="Descripción"
        message="Proporcione una descripción..."
        horizontal
      >
        <b-input
          v-model="categoryForm.description"
          type="textarea"
          minlength="10"
          maxlength="100"
          placeholder="Proporcione una descripción"
        >
        </b-input>
      </b-field>
      <b-field label="Url de Imagen" message="Url de Imagen" horizontal>
        <b-input
          v-model="categoryForm.imageUrl"
          type="url"
          placeholder="Ejemplo: https://img.icons8.com/office/80/000000/dining-room.png"
          :readonly="pickerFile"
          required
        />
      </b-field>
      <b-field label="Cargar Imagen" horizontal>
        <FilePicker @input="getPickerFile" />
      </b-field>
      <hr />
      <b-field label="Estado" horizontal>
        <b-switch
          v-model="categoryForm.status"
          true-value="Habilitado"
          false-value="Deshabilitado"
        >
          {{ categoryForm.status }}
        </b-switch>
      </b-field>
      <hr />
      <b-field label="Creado" horizontal>
        <b-input
          :value="categoryForm.createdAt"
          custom-class="is-static"
          readonly
        />
      </b-field>
      <hr />
      <b-field horizontal>
        <b-button type="is-primary" native-type="submit">
          {{ $route.path.includes('update') ? 'Actualizar' : 'Crear' }}
        </b-button>
        <b-button class="is-cancel is-rounded" @click="onCancel">
          Cancelar
        </b-button>
      </b-field>
    </form>
  </div>
</template>

<script>
import FilePicker from '../FilePicker.vue'
export default {
  components: { FilePicker },
  props: {
    category: {
      type: Object,
      required: false, // For CREATE
      default() {
        // https://eslint.vuejs.org/rules/require-valid-default-prop.html
        return {
          id: null,
          name: null,
          description: null,
          imageUrl: null,
          status: null,
          createdAt: new Date().toString(),
        }
      },
    },
  },
  data() {
    return {
      pickerFile: false,
      categoryForm: {
        ...this.category,
        status: this.category.status === 1 ? 'Habilitado' : 'Deshabilitado',
      },
      /* ? { ...this.category }
        : {
            name: '',
            imageUrl: '',
            status: this.category.status === 1,
            createdAt: null,
          }, */
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(';category', this.category, 'PARAMS', this.$route)
  },
  methods: {
    onSave() {
      // Save category
      // eslint-disable-next-line no-console
      console.log('form', this.categoryForm)
      this.$emit('submit', {
        ...this.categoryForm,
        status: this.categoryForm.status === 'Habilitado' ? 1 : 0,
      })
    },
    onCancel() {
      // navigate back
      this.$emit('cancel', true)
    },
    getPickerFile(event) {
      // eslint-disable-next-line no-console
      console.log('event', event)
      this.categoryForm.imageUrl = event.name
      this.pickerFile = true
    },
  },
}
</script>

<style scoped></style>
