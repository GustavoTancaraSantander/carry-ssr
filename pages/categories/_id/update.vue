<template>
  <div>
    <HeroBar> Actualizar Categoría </HeroBar>
    <CardComponent
      :title="'Editar Categoría'"
      icon="folder-plus-outline"
      class="tile is-child"
    >
      <client-only>
        <CategoryForm
          :category="category"
          @submit="onSubmitted"
          @cancel="onCanceled"
        />
      </client-only>
    </CardComponent>
  </div>
</template>

<script>
import CategoryForm from '~/components/admin/CategoryForm.vue'
import HeroBar from '~/components/HeroBar.vue'
export default {
  components: {
    CategoryForm,
    HeroBar,
  },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  async asyncData({ params, store, $axios }) {
    // {{urlcarry}}/api/v1/categorianegocio/7?access-token={{tokencarry}}
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

  methods: {
    onSubmitted(categoryForm) {
      // eslint-disable-next-line no-console
      console.log('updateForm', categoryForm)
      this.$store
        .dispatch('categoriesModule/updateCategory', categoryForm)
        .then(() => {
          this.$router.push({
            name: 'categories',
            params: { updated: 'yes' },
            query: { page: this.$route.params.previousPage },
          })
        })
    },
    onCanceled() {
      this.$router.push({
        name: 'categories',
        query: { page: this.$route.params.previousPage },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
