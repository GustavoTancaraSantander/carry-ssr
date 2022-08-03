<template>
  <div class="section">
    <HeroBar> Crear Ciudad </HeroBar>
    <hr />
    <tiles>
      <CardComponent
        :title="'Nueva Ciudad'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <CityForm
          :country-list="countryList"
          @submit="onSubmitted"
          @cancel="onCanceled"
        />
      </CardComponent>
    </tiles>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CityForm from '~/components/admin/CityForm.vue'
import CardComponent from '~/components/CardComponent.vue'
import HeroBar from '~/components/HeroBar.vue'
import Tiles from '~/components/Tiles.vue'
export default {
  components: { HeroBar, Tiles, CardComponent, CityForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  async asyncData({ store }) {
    const loading = true
    await store.dispatch('countriesModule/getCountryList')
    return {
      loading: !loading,
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
      // console.log('onSubmitted >>> CityForm', cityForm)
      this.$store.dispatch('citiesModule/createCity', cityForm).then(() => {
        this.$router.push({
          name: 'cities',
          params: { created: 'yes' },
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
