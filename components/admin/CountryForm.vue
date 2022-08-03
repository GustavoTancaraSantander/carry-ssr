<template>
  <div>
    <form @submit.prevent="onSave()">
      <!-- <b-field label="ID" horizontal>
        <b-input v-model="countryForm.id" custom-class="is-static" readonly />
      </b-field>
      <hr /> -->

      <b-field label="Nombre" message="Nombre de País" horizontal>
        <b-input v-model="countryForm.name" placeholder="Bolivia" required />
      </b-field>

      <b-field label="Código País" message="Ingrese la sigla" horizontal>
        <b-input v-model="countryForm.code" placeholder="BO" />
      </b-field>

      <b-field
        label="Código Telefónico"
        message="Código Telefónico Internacional"
        horizontal
      >
        <b-input v-model="countryForm.phoneCode" placeholder="+591" />
      </b-field>

      <hr />
      <b-field label="Estado" horizontal>
        <b-switch
          v-model="countryForm.status"
          true-value="Habilitado"
          false-value="Deshabilitado"
        >
          <!-- {{ countryForm }} -->
          <b
            :class="
              countryForm.status === 'Habilitado'
                ? 'has-text-success'
                : 'has-text-danger'
            "
          >
            {{ countryForm.status }}
          </b>
        </b-switch>
      </b-field>

      <hr />
      <b-field label="Creado" horizontal>
        <b-input
          :value="countryForm.createdAt"
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
export default {
  props: {
    country: {
      type: Object,
      required: false, // For CREATE
      default() {
        // https://eslint.vuejs.org/rules/require-valid-default-prop.html
        return {
          id: null,
          name: null,
          code: null,
          phoneCode: null,
          status: null,
          createdAt: new Date().toString(),
        }
      },
    },
  },
  data() {
    return {
      countryForm: {
        ...this.country,
        status: this.country.status === 1 ? 'Habilitado' : 'Deshabilitado',
      },
    }
  },
  /* mounted() {
    // eslint-disable-next-line no-console
    console.log(';PROPS country', this.country, 'PARAMS', this.$route)
  }, */
  methods: {
    onSave() {
      // Save country
      // eslint-disable-next-line no-console
      // console.log('form', this.countryForm)
      this.$emit('submit', {
        ...this.countryForm,
        status: this.countryForm.status === 'Habilitado' ? 1 : 0,
      })
    },
    onCancel() {
      // navigate back
      this.$emit('cancel', true)
    },
  },
}
</script>

<style scoped></style>
