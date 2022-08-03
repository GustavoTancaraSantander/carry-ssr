<template>
  <div class="section">
    <HeroBar> Crear Categoría </HeroBar>
    <hr />
    <tiles>
      <CardComponent
        :title="'Nueva Categoría'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <CategoryForm @submit="onSubmitted" @cancel="onCanceled" />
      </CardComponent>
    </tiles>
  </div>
</template>

<script>
import CategoryForm from '~/components/admin/CategoryForm.vue'
import CardComponent from '~/components/CardComponent.vue'
import HeroBar from '~/components/HeroBar.vue'
import Tiles from '~/components/Tiles.vue'
export default {
  components: { HeroBar, Tiles, CardComponent, CategoryForm },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],

  methods: {
    onSubmitted(categoryForm) {
      this.$store
        .dispatch('categoriesModule/createCategory', categoryForm)
        .then(() => {
          this.$router.push({
            name: 'categories',
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
