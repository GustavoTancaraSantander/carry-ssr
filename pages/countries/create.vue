<template>
  <div class="section">
    <HeroBar> Crear País </HeroBar>
    <hr />
    <tiles>
      <CardComponent
        :title="'Nuevo País'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <CountryForm @submit="onSubmitted" @cancel="onCanceled" />
      </CardComponent>
    </tiles>
  </div>
</template>

<script>
import CountryForm from '~/components/admin/CountryForm.vue'
import CardComponent from '~/components/CardComponent.vue'
import HeroBar from '~/components/HeroBar.vue'
import Tiles from '~/components/Tiles.vue'
export default {
  components: { HeroBar, Tiles, CardComponent, CountryForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],

  /*  mounted() {
    // eslint-disable-next-line no-console
    console.log('; CREATE $route', this.$route)
  }, */

  methods: {
    onSubmitted(countryForm) {
      this.$store
        .dispatch('countriesModule/createCountry', countryForm)
        .then(() => {
          this.$router.push({
            name: 'countries',
            params: { created: 'yes' },
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
