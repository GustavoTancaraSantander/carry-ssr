<template>
  <div class="section">
    <HeroBar> Detalle de País </HeroBar>
    <hr />

    <client-only>
      <CardComponent
        :title="'País'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <!-- <b-field label="ID">
          {{ country.id }}
        </b-field> -->

        <b-field label="Nombre" message="Nombre de País">
          {{ country.name }}
        </b-field>

        <b-field label="Código País">
          {{ country.code }}
        </b-field>

        <b-field label="Código Telefónico">
          {{ country.phoneCode }}
        </b-field>

        <b-field label="Estado">
          <b
            :class="
              country.status === 1 ? 'has-text-success' : 'has-text-danger'
            "
          >
            {{ country.status === 1 ? 'Habilitado' : 'Deshabilitado' }}
          </b>
        </b-field>

        <b-field label="Creado">
          <p>{{ country.createdAt }}</p>
        </b-field>

        <hr />
        <div class="is-flex is-justify-content-space-between">
          <NuxtLink
            title="Editar"
            class="button is-primary mr-3"
            :to="{
              name: 'countries-id-update',
              params: {
                id: $route.params.id,
                previousPage: $route.params.previousPage,
              },
            }"
          >
            <!-- :to="'/countries/' + $route.params.id + '/update'" -->
            Actualizar
          </NuxtLink>

          <button class="button is-danger" @click="deleteRecord()">
            Eliminar
          </button>

          <NuxtLink
            :to="{
              name: 'countries',
              query: { page: $route.params.previousPage },
            }"
          >
            Volver a Países
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
  // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {},
  async asyncData({ params, $axios, store }) {
    // {{urlcarry}}/api/v1/paisciudad/16?access-token={{tokencarry}}
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
          status: data.estado, // 0 || 1
          createdAt: data.created_at, // TODO: pending
        },
      }
    } catch (error) {
      store.dispatch('showAlertError', error)
    }
  },
  /*  mounted() {
    // eslint-disable-next-line no-console
    console.log('this.$route.params.id', this.$route.params)
  }, */
  methods: {
    deleteRecord() {
      this.$buefy.dialog.confirm({
        title: 'Eliminando País',
        message: `¿Está seguro de que desea <b>eliminar</b> el País <b>${this.country.name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar País',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store
            .dispatch('countriesModule/deleteCountry', this.$route.params.id)
            .then(() => {
              this.$router.push({
                name: 'countries',
                params: { deleted: 'yes' },
                query: { page: this.$route.params.previousPage },
              })
            }),
      })
    },
  },
}
</script>
