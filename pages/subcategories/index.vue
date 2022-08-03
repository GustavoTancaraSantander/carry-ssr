<template>
  <div>
    <HeroBar> Administración de Subcategorías </HeroBar>
    <p>
      En esta sección puede administrar las subcategorías, que se utilizan para la
      formulario de registro de proveedores y filtros de búsqueda del cliente.
    </p>
    <div class="is-align-items-center is-justify-content-space-between is-flex">
      <SelectCore
        :label="'Filtrar por Categoría'"
        :options="categoryList"
        :value-id="parseInt($route.query.categoryId) || categoryId"
        class="mb-1"
        @option-selected="categorySelected"
      />
      <NuxtLink
        :to="{
          name: 'subcategories-create',
          params: {
            previousCategoryId: $route.query.categoryId || categoryId,
            previousPage: pagination.currentPage,
          },
        }"
        class="button is-primary"
      >
        Crear Nueva
      </NuxtLink>
    </div>
    <hr />
    <client-only>
      <div id="tableAsyncPag_crud">
        <b-table
          :data="subcategories"
          :loading="loading"
          :current-page="pagination.currentPage"
          :per-page="pagination.perPage"
          :total="pagination.totalCount"
          :striped="true"
          :range-after="5"
          paginated
          backend-pagination
          @page-change="onPageChange"
        >
          <!-- <b-table-column v-slot="props" field="id" label="ID" sortable>
            {{ props.row.id }}
          </b-table-column> -->

          <b-table-column v-slot="props" field="name" label="Subcategoría" sortable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column v-slot="props" field="imageUrl" label="Imagen">
            <img :src="props.row.imageUrl || ''" alt="" max-height="80px" />
          </b-table-column>

          <b-table-column
            v-slot="props"
            field="status"
            label="Estado"
            class="has-text-danger"
            sortable
            centered
          >
            <b :class="props.row.status === 1 ? 'has-text-success' : 'has-text-danger'">
              {{ props.row.status === 1 ? 'Habilitado' : 'Deshabilitado' }}
            </b>
          </b-table-column>

          <b-table-column v-slot="props" field="createdAt" label="Registrado" sortable>
            {{ props.row.createdAt }}
          </b-table-column>

          <b-table-column
            v-slot="props"
            field="actions"
            label="Acciones"
            class="is-actions-cell"
          >
            <div class="buttons is-center">
              <NuxtLink
                title="Ver detalle"
                class="button is-small is-primary"
                :to="{
                  name: 'subcategories-id',
                  params: {
                    id: props.row.id,
                    previousCategoryId: $route.query.categoryId || categoryId,
                    previousPage: pagination.currentPage,
                  },
                }"
              >
                <b-icon icon="folder-open-outline" size="is-small" />
              </NuxtLink>

              <NuxtLink
                title="Editar"
                class="button is-small is-primary"
                :to="{
                  name: 'subcategories-id-update',
                  params: {
                    id: props.row.id,
                    previousCategoryId: $route.query.categoryId || categoryId,
                    previousPage: pagination.currentPage,
                  },
                }"
              >
                <b-icon icon="folder-edit" size="is-small" />
              </NuxtLink>

              <button
                title="Eliminar"
                class="button is-small is-danger"
                type="button"
                @click.prevent="
                  deleteRecord(props.row.id, props.row.name, props.row.categoryId)
                "
              >
                <b-icon icon="trash-can" size="is-small" />
              </button>
            </div>
          </b-table-column>

          <template #bottom-left>
            <b>Total</b>: {{ pagination.totalCount }}
            <p class="position_perPage">
              Se muestran {{ pagination.perPage }} por página.
            </p>
          </template>

          <template #empty>
            <div class="has-text-centered notification is-info">
              No se encontraron registros.
            </div>
          </template>
        </b-table>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HeroBar from '~/components/HeroBar.vue'
import SelectCore from '~/components/base/SelectCore.vue'
export default {
  components: { HeroBar, SelectCore },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],

  async asyncData({ store }) {
    const loading = true
    await store.dispatch('categoriesModule/getCategoryList')
    return {
      loading: !loading,
    }
  },

  data() {
    return {
      categoryId: null,
      loading: false,
    }
  },

  computed: {
    ...mapGetters('categoriesModule', {
      categoryList: 'getter_categoryList',
    }),
    ...mapState('subcategoriesModule', {
      latestCategory: (state) => state.latestCategory,
      subcategories: (state) => state.subcategories,
      pagination: (state) => state.pagination,
    }),
  },

  watchQuery: ['page'],
  mounted() {
    // console.log('MOUNTED ROUTE', this.$route)
    this.categoryId = parseInt(this.$route.query.categoryId)
    if (this.categoryId) {
      if (this.subcategories.length === 0 || this.latestCategory !== this.categoryId) {
        this.searchSubcategoriesByCategoryId()
      }
    } else {
      this.$store.commit('subcategoriesModule/SET_SUBCATEGORIES', null)
    }
  },

  methods: {
    onPageChange(page) {
      // eslint-disable-next-line no-console
      // console.log('onPageChange', page)
      this.$router.push({ query: { page } })
      this.searchSubcategoriesByCategoryId(page)
    },
    async searchSubcategoriesByCategoryId(page = 1) {
      this.loading = true
      await this.$store.dispatch('subcategoriesModule/getCategoriesByCategoryId', {
        categoryId: this.categoryId,
        page,
      })
      this.loading = false
    },
    deleteRecord(id, name, categoryId) {
      this.$buefy.dialog.confirm({
        title: 'Eliminando Subcategoría',
        message: `¿Está seguro de que desea <b>eliminar</b> la Subcategoría <b>${name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar Subcategoría',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store
            .dispatch('subcategoriesModule/deleteSubcategory', {
              id,
              categoryId,
            })
            .then(() => {
              this.$buefy.toast.open(`Subcategoría ${name} eliminada!`)
            }),
      })
    },
    // CUSTOM COMPONENT
    categorySelected(eventValue) {
      // console.log('categorySelected ', eventValue)
      this.categoryId = eventValue
      this.$router.replace({
        name: 'subcategories',
        query: {
          categoryId: this.categoryId,
          page: this.$route.query.page,
        },
      })
      this.searchSubcategoriesByCategoryId()
    },
  },
}
</script>
