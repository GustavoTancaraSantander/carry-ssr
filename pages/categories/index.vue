<template>
  <div>
    <HeroBar> Administración de Categorías </HeroBar>

    <div class="is-align-items-center is-justify-content-space-between is-flex">
      <p>
        En esta sección puede administrar las categorías, que se utilizan para la
        formulario de registro de proveedores y filtros de busqueda del cliente.
      </p>
      <NuxtLink
        :to="{
          name: 'categories-create',
          params: { previousPage: pagination.currentPage },
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
          :data="categories"
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
          <b-table-column v-slot="props" field="name" label="Categoría" sortable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column v-slot="props" field="imageUrl" label="Imagen" sortable>
            <img :src="props.row.imageUrl || ''" alt="" max-height="80px" />
          </b-table-column>
          <!-- <b-table-column
            v-slot="props"
            field="description"
            label="Descripción"
          >
            {{ props.row.description }}
          </b-table-column> -->

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

          <b-table-column
            v-slot="props"
            field="createdAt"
            label="Registrado"
            sortable
            centered
          >
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
                title="Ver subcategorías"
                class="button is-small"
                :to="{
                  name: 'subcategories',
                  query: { categoryId: props.row.id },
                }"
              >
                Ver subcategorías
              </NuxtLink>
              <NuxtLink
                title="Ver detalle"
                class="button is-small is-primary"
                :to="{
                  name: 'categories-id',
                  params: {
                    id: props.row.id,
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
                  name: 'categories-id-update',
                  params: {
                    id: props.row.id,
                    previousPage: pagination.currentPage,
                  },
                }"
              >
                <b-icon icon="account-edit" size="is-small" />
              </NuxtLink>
              <button
                title="Eliminar"
                class="button is-small is-danger"
                type="button"
                @click.prevent="deleteRecord(props.row.id, props.row.name)"
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
import { mapState } from 'vuex'
import HeroBar from '~/components/HeroBar.vue'
export default {
  components: { HeroBar },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {},
  /* async asyncData({ $axios, query, store }) {
    const page = query.page || 1
    const loading = true
    // ? {{urlcarry}}/api/v1/categorianegocio/search?CategorianegocioSearch[categoriaNegocioId]=null&access-token={{tokencarry}}&page=1
    // ? {{urlcarry}}/api/v1/categorianegocio?access-token={{tokencarry}}&page=1
    // const { data } = await $axios.get('/api/categories?page=' + page)
    const { data } = await $axios.get(
      `/api/v1/categorianegocio?&access-token=${store.state.token}&page=${page}`
    )
    // eslint-disable-next-line no-console
    // console.log('asyncData', data)
    return {
      categories: data.items.map(
        // eslint-disable-next-line
        ({ idcategorianegocio, nombre, desc, created_at }) => ({
          id: idcategorianegocio,
          name: nombre,
          imageUrl: '', // TODO: pending
          description: desc, // TODO: pending
          status: 0, // TODO: pending
          createdAt: created_at,
        })
      ),
      page: data._meta.currentPage || page,
      perPage: data._meta.perPage,
      total: data._meta.totalCount,
      loading: !loading,
    }
  }, */
  data() {
    return {
      // categories: [],
      // page: 0,
      // perPage: 0,
      // total: 0,
      loading: false,
    }
  },
  computed: {
    ...mapState('categoriesModule', {
      categories: (state) => state.categories,
      pagination: (state) => state.pagination,
    }),
  },
  watchQuery: ['page'],
  created() {
    // eslint-disable-next-line no-console
    // console.log('created', this.categories.length, 'Route', this.$route)
    if (this.categories.length === 0) {
      this.getIndex(this.$route.query.page)
    }
  },
  methods: {
    onPageChange(page) {
      // eslint-disable-next-line no-console
      console.log('onPageChange', page)
      this.$router.push({ query: { page } })
      this.getIndex(page)
    },
    async getIndex(page) {
      this.loading = true
      await this.$store.dispatch('categoriesModule/getCategoriesIndex', page)
      this.loading = false
    },
    // async getIndex(page = 1) {
    //   this.loading = true
    //   const { data } = await this.$axios.get(
    //     `/api/v1/categorianegocio?&access-token=${this.$store.state.token}&page=${page}`
    //   )
    //   this.categories = data.items.map(
    //     // eslint-disable-next-line
    //     ({ idcategorianegocio, nombre, desc, created_at }) => ({
    //       id: idcategorianegocio,
    //       name: nombre,
    //       imageUrl: '', // TODO: pending
    //       description: desc, // TODO: pending
    //       status: 0, // TODO: pending
    //       createdAt: created_at,
    //     })
    //   )
    //   this.page = data._meta.currentPage || page
    //   this.perPage = data._meta.perPage
    //   this.total = data._meta.totalCount
    //   this.loading = false
    // },
    deleteRecord(id, name) {
      this.$buefy.dialog.confirm({
        title: 'Eliminando Categoría',
        message: `¿Está seguro de que desea <b>eliminar</b> la categoría <b>${name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar Categoría',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store.dispatch('categoriesModule/deleteCategory', id).then(() => {
            this.$buefy.toast.open(`Categoría ${name} eliminada!`)
          }),
      })
    },
  },
}
</script>
