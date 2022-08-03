<template>
  <div class="section">
    <HeroBar> Detalle de Ciudad </HeroBar>
    <hr />

    <client-only>
      <CardComponent
        :title="'Ciudad'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <b-field label="Nombre" message="Nombre de Ciudad">
          {{ city.name }}
        </b-field>

        <b-field label="Código Ciudad">
          {{ city.code }}
        </b-field>

        <!-- <b-field label="Código Telefónico">
          {{ city.phoneCode }}
        </b-field> -->

        <b-field label="Estado">
          <b
            :class="city.status === 1 ? 'has-text-success' : 'has-text-danger'"
          >
            {{ city.status === 1 ? 'Habilitado' : 'Deshabilitado' }}
          </b>
        </b-field>

        <b-field label="Creado">
          <p>{{ city.createdAt }}</p>
        </b-field>

        <hr />
        <div class="is-flex is-justify-content-space-between">
          <NuxtLink
            title="Editar"
            class="button is-primary mr-3"
            :to="{
              name: 'cities-id-update',
              params: {
                id: $route.params.id,
                previousCountryId: $route.params.previousCountryId,
                previousPage: $route.params.previousPage,
              },
            }"
          >
            Actualizar
          </NuxtLink>

          <button class="button is-danger" @click="deleteRecord()">
            Eliminar
          </button>

          <NuxtLink
            :to="{
              name: 'cities',
              query: {
                countryId: $route.params.previousCountryId,
                page: $route.params.previousPage,
              },
            }"
          >
            Volver a Ciudades
          </NuxtLink>
        </div>
      </CardComponent>
    </client-only>
  </div>
</template>

<script>
import CardComponent from '~/components/CardComponent.vue'
export default {
  components: { CardComponent },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  async asyncData({ route, store, $axios }) {
    try {
      const { data } = await $axios.get(
        `/api/v1/paisciudad/${route.params.id}?access-token=${store.state.token}`
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
  // mounted() {
  //   // eslint-disable-next-line no-console
  //   console.log('this.$route.params.id', this.$route.params)
  // },
  methods: {
    deleteRecord() {
      this.$buefy.dialog.confirm({
        title: 'Eliminando Ciudad',
        message: `¿Está seguro de que desea <b>eliminar</b> la Ciudad <b>${this.city.name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar Ciudad',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store
            .dispatch('citiesModule/deleteCity', {
              id: this.$route.params.id,
              countryId: this.city.countryId,
            })
            .then(() => {
              this.$router.push({
                name: 'cities',
                params: { deleted: 'yes' },
                query: {
                  countryId: this.$route.params.previousCountryId,
                  page: this.$route.params.previousPage,
                },
              })
            }),
      })
    },
  },
}
</script>
