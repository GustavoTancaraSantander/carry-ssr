<template>
  <div class="section">
    <HeroBar> Detalle de Subcategoría </HeroBar>
    <hr />
    <client-only>
      <CardComponent
        :title="'Subcategoría'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <b-field label="Nombre" message="Nombre de Subcategoría">
          {{ subcategory.name }}
        </b-field>

        <b-field label="Url de Imagen">
          <img :src="subcategory.imageUrl" :alt="`Imagen de ${subcategory.name}`" />
        </b-field>

        <b-field label="Descripción">
          {{ subcategory.description }}
        </b-field>

        <b-field label="Estado">
          {{ subcategory.status }}
        </b-field>

        <b-field label="Creado">
          <p>{{ subcategory.createdAt }}</p>
        </b-field>

        <hr />
        <div class="is-flex is-justify-content-space-between">
          <NuxtLink
            title="Editar"
            class="button is-primary mr-3"
            :to="{
              name: 'subcategories-id-update',
              params: {
                id: $route.params.id,
                previousCategoryId: $route.params.previousCategoryId,
                previousPage: $route.params.previousPage,
              },
            }"
          >
            Actualizar
          </NuxtLink>

          <button class="button is-danger" @click="deleteRecord()">Eliminar</button>

          <NuxtLink
            :to="{
              name: 'subcategories',
              query: {
                categoryId: $route.params.previousCategoryId,
                page: $route.params.previousPage,
              },
            }"
          >
            Volver a subcategorías
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
  async asyncData({ params, store, $axios }) {
    try {
      const { data } = await $axios.get(
        `/api/v1/categorianegocio/${params.id}?access-token=${store.state.token}`
      )
      return {
        subcategory: {
          id: data.idcategorianegocio,
          categoryId: data.categoriaNegocioId,
          name: data.nombre, // RESTAURANTE
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

  methods: {
    deleteRecord() {
      this.$buefy.dialog.confirm({
        title: 'Eliminando Subcategoría',
        message: `¿Está seguro de que desea <b>eliminar</b> la Subcategoría <b>${this.subcategory.name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar Subcategoría',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store
            .dispatch('subcategoriesModule/deleteSubcategory', {
              id: this.$route.params.id,
              categoryId: this.subcategory.categoryId,
            })
            .then(() => {
              this.$router.push({
                name: 'subcategories',
                params: { deleted: 'yes' },
                query: {
                  categoryId: this.$route.params.previousCategoryId,
                  page: this.$route.params.previousPage,
                },
              })
            }),
      })
    },
  },
}
</script>
