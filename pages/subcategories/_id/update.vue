<template>
  <div>
    <HeroBar> Actualizar Subcategoría </HeroBar>
    <CardComponent
      :title="'Editar Subcategoría'"
      icon="folder-plus-outline"
      class="tile is-child"
    >
      <client-only>
        <SubcategoryForm
          :subcategory="subcategory"
          :category-list="categoryList"
          @submit="onSubmitted"
          @cancel="onCanceled"
        />
      </client-only>
    </CardComponent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubcategoryForm from '~/components/admin/SubcategoryForm.vue'
import HeroBar from '~/components/HeroBar.vue'
export default {
  components: {
    HeroBar,
    SubcategoryForm,
  },
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

  computed: {
    ...mapGetters('categoriesModule', {
      categoryList: 'getter_categoryList',
    }),
  },

  methods: {
    onSubmitted(subcategoryForm) {
      // eslint-disable-next-line no-console
      console.log('updateForm', subcategoryForm)
      this.$store
        .dispatch('subcategoriesModule/updateSubcategory', subcategoryForm)
        .then(() => {
          this.$router.push({
            name: 'subcategories',
            params: { updated: 'yes' },
            query: {
              categoryId: this.$route.params.previousCategoryId,
              page: this.$route.params.previousPage,
            },
          })
        })
    },
    onCanceled() {
      this.$router.push({
        name: 'subcategories',
        query: {
          categoryId: this.$route.params.previousCategoryId,
          page: this.$route.params.previousPage,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
