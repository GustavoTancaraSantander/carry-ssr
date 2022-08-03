<template>
  <div>
    <HeroBar> Actualizar País </HeroBar>
    <CardComponent
      :title="'Editar País'"
      icon="folder-plus-outline"
      class="tile is-child"
    >
      <client-only>
        <CountryForm
          :country="country"
          @submit="onSubmitted"
          @cancel="onCanceled"
        />
      </client-only>
    </CardComponent>
  </div>
</template>

<script>
import CountryForm from '~/components/admin/CountryForm.vue'
import HeroBar from '~/components/HeroBar.vue'
export default {
  components: {
    CountryForm,
    HeroBar,
  },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  // async asyncData({ route, params, store, error, $axios }) {
  async asyncData({ params, store, $axios }) {
    // eslint-disable-next-line no-console
    // console.log('params', params)
    try {
      const { data } = await $axios.get(
        `/api/v1/paisciudad/${params.id}?access-token=${store.state.token}`
      )
      return {
        country: {
          id: data.idpais,
          name: data.nombre, // BOLIVIA
          code: data.code, // BO
          phoneCode: data.codtel, // +591
          status: data.estado,
          createdAt: data.created_at, // TODO: pending
        },
      }
    } catch (error) {
      store.dispatch('showAlertError', error)
    }
  },

  methods: {
    onSubmitted(countryForm) {
      // eslint-disable-next-line no-console
      // console.log('updateForm', countryForm)
      this.$store
        .dispatch('countriesModule/updateCountry', countryForm)
        .then(() => {
          this.$router.push({
            name: 'countries',
            params: { updated: 'yes' },
            query: { page: this.$route.params.previousPage },
          })
        })
    },
    onCanceled() {
      this.$router.push({
        name: 'countries',
        query: { page: this.$route.params.previousPage },
      })
    },
  },
}
</script>
