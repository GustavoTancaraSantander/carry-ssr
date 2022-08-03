<template>
  <div class="section">
    <HeroBar> Detalle de Categoría </HeroBar>
    <hr />

    <client-only>
      <CardComponent
        :title="'Categoría'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <b-field label="Nombre" message="Nombre de categoría">
          {{ category.name }}
        </b-field>

        <b-field label="Url de Imagen">
          <img :src="category.imageUrl" :alt="`Imagen de ${category.name}`" />
        </b-field>

        <b-field label="Descripción">
          {{ category.description }}
        </b-field>

        <b-field label="Estado">
          <b :class="category.status === 1 ? 'has-text-success' : 'has-text-danger'">
            {{ category.status === 1 ? 'Habilitado' : 'Deshabilitado' }}
          </b>
        </b-field>

        <b-field label="Registrado">
          <p>{{ category.createdAt }}</p>
        </b-field>

        <hr />
        <div class="is-flex is-justify-content-space-between">
          <NuxtLink
            title="Editar"
            class="button is-primary mr-3"
            :to="{
              name: 'categories-id-update',
              params: {
                id: $route.params.id,
                previousPage: $route.params.previousPage,
              },
            }"
          >
            Actualizar
          </NuxtLink>
          <button class="button is-danger" @click="deleteRecord()">Eliminar</button>
          <NuxtLink
            :to="{
              name: 'categories',
              query: { page: $route.params.previousPage },
            }"
          >
            Volver a categorías
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
  //  asyncData({ params, error, $axios }) {
  async asyncData({ params, $axios, store }) {
    // {{urlcarry}}/api/v1/categorianegocio/search?CategorianegocioSearch[categoriaNegocioId]=3&access-token={{tokencarry}}&page=1
    // {{urlcarry}}/api/v1/categorianegocio/2?&access-token={{tokencarry}}
    try {
      const { data } = await $axios.get(
        `/api/v1/categorianegocio/${params.id}?access-token=${store.state.token}`
      )
      return {
        category: {
          id: data.idcategorianegocio,
          name: data.nombre, // GASTRONOMIA
          imageUrl: data.imagen, // TODO: pending
          description: data.descripcion, // TODO: pending
          status: data.estado, // TODO: pending
          createdAt: data.created_at,
        },
      }
    } catch (error) {
      store.dispatch('showAlertError', error)
    }
  },
  /*   mounted() {
    // eslint-disable-next-line no-console
    console.log('this.$route.params.id', this.$route.params)
  }, */
  methods: {
    deleteRecord() {
      this.$buefy.dialog.confirm({
        title: 'Eliminando Categoría',
        message: `¿Está seguro de que desea <b>eliminar</b> la categoría <b>${this.category.name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar Categoría',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store
            .dispatch('categoriesModule/deleteCategory', this.$route.params.id)
            .then(() => {
              this.$router.push({
                name: 'categories',
                params: { deleted: 'yes' },
                query: { page: this.$route.params.previousPage },
              })
            }),
      })
    },
  },
}
</script>
