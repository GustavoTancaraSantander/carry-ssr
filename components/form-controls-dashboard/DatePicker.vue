<template>
  <section>
    <b-field :label="label">
      <b-datepicker
        placeholder="Escriba o seleccione una fecha ..."
        icon="calendar-today"
        :locale="locale"
        editable
      >
      </b-datepicker>
    </b-field>
  </section>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: 'Seleccionar una fecha',
    },
  },
  data() {
    return {
      // locale: undefined, // Browser locale
      locale: 'es-ES', // Browser locale
    }
  },
  /* computed: {
    sampleFormat() {
      // const dtf = new Intl.DateTimeFormat(this.locale)
      const dtf = new Intl.DateTimeFormat('es-ES')
      return dtf.format(new Date(2000, 11, 25, 12))
    },
  }, */
}
</script>
