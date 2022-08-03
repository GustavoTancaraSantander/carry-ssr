<template>
  <div>
    <HeroBar> Actualizar Ciudad </HeroBar>
    <CardComponent
      :title="'Editar Ciudad'"
      icon="folder-plus-outline"
      class="tile is-child"
    >
      <client-only>
        <CityForm
          :city="city"
          :country-list="countryList"
          @submit="onSubmitted"
          @cancel="onCanceled"
        />
      </client-only>
    </CardComponent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CityForm from '~/components/admin/CityForm.vue'
import HeroBar from '~/components/HeroBar.vue'
export default {
  components: {
    HeroBar,
    CityForm,
  },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],

  async asyncData({ params, store, $axios }) {
    // eslint-disable-next-line no-console
    // console.log('params', params)
    await store.dispatch('countriesModule/getCountryList')
    try {
      const { data } = await $axios.get(
        `/api/v1/paisciudad/${params.id}?access-token=${store.state.token}`
      )
      return {
        city: {
          id: data.idpais,
          countryId: data.idpaisx,
          name: data.nombre, // LA PAZ
          code: data.code, // LP
          phoneCode: data.codtel, // 22
          status: data.estado,
          createdAt: data.created_at, // TODO: pending
        },
      }
    } catch (error) {
      store.dispatch('showAlertError', error)
    }
  },

  computed: {
    ...mapGetters('countriesModule', {
      countryList: 'getter_countryList',
    }),
  },

  methods: {
    onSubmitted(cityForm) {
      // eslint-disable-next-line no-console
      // console.log('updateForm', cityForm)
      this.$store.dispatch('citiesModule/updateCity', cityForm).then(() => {
        this.$router.push({
          name: 'cities',
          params: { updated: 'yes' },
          query: {
            countryId: this.$route.params.previousCountryId,
            page: this.$route.params.previousPage,
          },
        })
      })
    },
    onCanceled() {
      this.$router.push({
        name: 'cities',
        query: {
          countryId: this.$route.params.previousCountryId,
          page: this.$route.params.previousPage,
        },
      })
    },
  },
}
</script>
