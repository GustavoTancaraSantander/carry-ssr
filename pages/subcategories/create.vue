<template>
  <div class="section">
    <HeroBar>Crear Subcategoría</HeroBar>
    <hr />
    <tiles>
      <CardComponent
        :title="'Nueva Subcategoría'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <SubcategoryForm
          :category-list="categoryList"
          @submit="onSubmitted"
          @cancel="onCanceled"
        />
      </CardComponent>
    </tiles>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubcategoryForm from '~/components/admin/SubcategoryForm.vue'
import CardComponent from '~/components/CardComponent.vue'
import HeroBar from '~/components/HeroBar.vue'
import Tiles from '~/components/Tiles.vue'
export default {
  components: { HeroBar, Tiles, CardComponent, SubcategoryForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],

  async asyncData({ store }) {
    const loading = true
    await store.dispatch('categoriesModule/getCategoryList')
    return {
      loading: !loading,
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
      console.log('onSubmitted >>> subcategoryForm', subcategoryForm)
      this.$store
        .dispatch('subcategoriesModule/createSubcategory', subcategoryForm)
        .then(() => {
          this.$router.push({
            name: 'subcategories',
            params: { created: 'yes' },
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
