<template>
  <div>
    <form @submit.prevent="onSave()">
      <b-field
        label="Seleccione País"
        message="El país al cual pertenecerá la ciudad"
        horizontal
      >
        <SelectCore
          :label="''"
          :options="countryList"
          :value-id="parseInt(cityForm.countryId)"
          class="mb-1"
          @option-selected="countrySelected"
        />
      </b-field>

      <b-field label="Nombre" message="Nombre de Ciudad" horizontal>
        <b-input v-model="cityForm.name" placeholder="La Paz" required />
      </b-field>

      <b-field label="Código Ciudad" message="Ingrese la sigla" horizontal>
        <b-input v-model="cityForm.code" placeholder="LP" />
      </b-field>

      <!-- <b-field
        label="Código Telefónico"
        message="Código Telefónico Internacional"
        horizontal
      >
        <b-input v-model="cityForm.phoneCode" placeholder="(22)" />
      </b-field> -->

      <hr />
      <b-field label="Estado" horizontal>
        <b-switch
          v-model="cityForm.status"
          true-value="Habilitado"
          false-value="Deshabilitado"
        >
          <b
            :class="
              cityForm.status === 'Habilitado'
                ? 'has-text-success'
                : 'has-text-danger'
            "
          >
            {{ cityForm.status }}
          </b>
        </b-switch>
      </b-field>

      <hr />
      <b-field label="Creado" horizontal>
        <b-input
          :value="cityForm.createdAt"
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
import SelectCore from '~/components/base/SelectCore.vue'

export default {
  components: { SelectCore },

  props: {
    countryList: {
      type: Array,
      required: true,
    },
    city: {
      type: Object,
      required: false, // For CREATE
      default() {
        // https://eslint.vuejs.org/rules/require-valid-default-prop.html
        return {
          id: null,
          countryId: null,
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
      cityForm: {
        ...this.city,
        status: this.city.status === 1 ? 'Habilitado' : 'Deshabilitado',
      },
    }
  },
  /* mounted() {
    // eslint-disable-next-line no-console
    console.log(';PROPS city', this.city, 'PARAMS', this.$route)
  }, */
  methods: {
    onSave() {
      // Save city
      // eslint-disable-next-line no-console
      // console.log('form', this.cityForm)
      this.$emit('submit', {
        ...this.cityForm,
        status: this.cityForm.status === 'Habilitado' ? 1 : 0,
      })
    },
    onCancel() {
      // navigate back
      this.$emit('cancel', true)
    },
    // CUSTOM COMPONENT
    countrySelected(eventValue) {
      // eslint-disable-next-line no-console
      // console.log('countrySelected ', eventValue)
      this.cityForm.countryId = eventValue.toString()
    },
  },
}
</script>

<style scoped></style>
