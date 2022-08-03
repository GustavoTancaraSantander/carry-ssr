<template>
  <div>
    <form @submit.prevent="onSave()">
      <b-field label="ID" horizontal>
        <b-input v-model="providerForm.id" custom-class="is-static" readonly />
      </b-field>
      <hr />
      <b-field
        v-model="providerForm.id_category"
        label="Categoría"
        message="Nombre de categoría"
        horizontal
      >
        <Selected :label="'seleccionar'" :options="categories" />
      </b-field>
      <b-field label="Proveedor" message="Nombre proveedor" horizontal>
        <b-input
          v-model="providerForm.name"
          placeholder="Mi negocio"
          required
        />
      </b-field>
      <!-- <b-field label="Nit" message="nit" horizontal>
        <b-input v-model="providerForm.nit" placeholder="Mi negocio" required />
      </b-field> -->
      <b-field label="Cargar Imagen" horizontal>
        <FilePicker @input="getPickerFile" />
      </b-field>
      <hr />
      <b-field label="Url de Imagen" message="Url de Imagen" horizontal>
        <b-input
          v-model="providerForm.logo_img"
          placeholder="'https://img.icons8.com/office/80/000000/dining-room.png"
          :readonly="pickerFile"
        />
      </b-field>
      <!-- <b-field label="Licencia" message="tiene licencia?" horizontal>
        <b-switch
          v-model="providerForm.licence"
          true-value="Si"
          false-value="No"
        >
          {{ providerForm.licence }}
        </b-switch>
      </b-field> -->
      <b-field label="Estado" message="Habilite o deshabilite" horizontal>
        <b-switch
          v-model="providerForm.status"
          true-value="Habilidado"
          false-value="Deshabilitado"
        >
          {{ providerForm.status }}
        </b-switch>
      </b-field>

      <hr />
      <b-field label="Creado" horizontal>
        <b-input
          :value="providerForm.created_at.toString()"
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
import Selected from '../form-controls-dashboard/Selected.vue'
export default {
  components: { FilePicker, Selected },
  props: {
    provider: {
      type: Object,
      required: false,
      default() {
        // https://eslint.vuejs.org/rules/require-valid-default-prop.html
        return {
          id: null,
          name: '',
          logo_img: '',
          created_at: new Date(),
        }
      },
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pickerFile: false,
      providerForm: this.provider
        ? { ...this.provider, status: this.provider.status === 1 }
        : {
            name: '',
            logo_img: '',
            created_at: new Date(),
          },
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(';provider', this.provider, 'PARAMS', this.$route)
  },
  methods: {
    onSave() {
      // Save provider
      // eslint-disable-next-line no-console
      console.log('form', this.providerForm)
      this.$emit('submit', {
        ...this.providerForm,
        status: this.providerForm.status === 'Habilidado' ? 1 : 0,
      })
    },
    onCancel() {
      // navigate back
      // this.$router.push('/providers')
      this.$router.push({ name: 'providers' })
    },
    getPickerFile(event) {
      // eslint-disable-next-line no-console
      console.log('event', event)
      this.providerForm.imgUrl = event.name
      this.pickerFile = true
    },
  },
}
</script>

<style scoped></style>
