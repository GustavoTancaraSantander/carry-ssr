<template>
  <div>
    <HeroBar> Administración de Países </HeroBar>

    <div class="is-align-items-center is-justify-content-space-between is-flex">
      <p>
        En esta sección puede administrar los países, que se utilizan para la
        formulario de registro de proveedores y filtros de búsqueda del cliente.
      </p>
      <NuxtLink
        :to="{
          name: 'countries-create',
          params: { previousPage: pagination.currentPage },
        }"
        class="button is-primary"
      >
        Crear Nuevo
      </NuxtLink>
    </div>
    <hr />

    <client-only>
      <div id="tableAsyncPag_crud">
        <b-table
          :data="countries"
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

          <b-table-column v-slot="props" field="name" label="País" sortable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column v-slot="props" field="code" label="Código País">
            {{ props.row.code }}
          </b-table-column>

          <b-table-column
            v-slot="props"
            field="phoneCode"
            label="Código Telefónico"
          >
            {{ props.row.phoneCode }}
          </b-table-column>

          <b-table-column
            v-slot="props"
            field="status"
            label="Estado"
            class="has-text-danger"
            sortable
            centered
          >
            <b
              :class="
                props.row.status === 1 ? 'has-text-success' : 'has-text-danger'
              "
            >
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
                title="Ver ciudades"
                class="button is-small"
                :to="{ name: 'cities', query: { countryId: props.row.id } }"
              >
                Ver ciudades
              </NuxtLink>
              <NuxtLink
                title="Ver"
                class="button is-small is-primary"
                :to="{
                  name: 'countries-id',
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
                  name: 'countries-id-update',
                  params: {
                    id: props.row.id,
                    previousPage: pagination.currentPage,
                  },
                }"
              >
                <!-- :to="'/countries/' + props.row.id + '/update'" -->
                <b-icon icon="account-edit" size="is-small" />
              </NuxtLink>
              <button
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
      <!-- <div v-else class="notification is-info">
        No se encontraron registros.
      </div> -->
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

  data() {
    return {
      // countries: [],
      // page: 0,
      // perPage: 0,
      // total: 0,
      loading: false,
    }
  },
  computed: {
    ...mapState('countriesModule', {
      countries: (state) => state.countries,
      pagination: (state) => state.pagination,
    }),
  },
  watchQuery: ['page'],
  created() {
    // eslint-disable-next-line no-console
    // console.log('created', this.countries.length, 'Route', this.$route)
    if (this.countries.length === 0) {
      this.getIndex(this.$route.query.page)
    }
  },
  methods: {
    onPageChange(page) {
      // eslint-disable-next-line no-console
      // console.log('onPageChange', page)
      this.$router.push({ query: { page } })
      this.getIndex(page)
    },
    async getIndex(page) {
      this.loading = true
      await this.$store.dispatch('countriesModule/readingCountriesIndex', page)
      this.loading = false
    },
    /* async getIndex(page = 1) {
      this.loading = true
      // {{urlcarry}}/api/v1/paisciudad/search?PaisciudadSearch[idpaisx]=0&page=1&access-token={{tokencarry}}
      const { data } = await this.$axios.get(
        `/api/v1/paisciudad/search?PaisciudadSearch[idpaisx]=0&access-token=${this.$store.state.token}&page=${page}`
      )
      this.countries = data.items.map(
        // eslint-disable-next-line
        ({ idpais, nombre, code, codtel, estado, created_at }) => ({
          id: idpais,
          name: nombre, // BOLIVIA
          code, // BO
          phoneCode: codtel, // +591
          status: estado, // TODO: pending
          createdAt: created_at, // TODO: pending
        })
      )
      this.page = data._meta.currentPage || page
      this.perPage = data._meta.perPage
      this.total = data._meta.totalCount
      this.loading = false
    }, */
    deleteRecord(id, name) {
      this.$buefy.dialog.confirm({
        title: 'Eliminando País',
        message: `¿Está seguro de que desea <b>eliminar</b> el país <b>${name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar País',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store.dispatch('countriesModule/deleteCountry', id).then(() => {
            this.$buefy.toast.open(`País: ${name} eliminado!`)
          }),
      })
    },
  },
}
</script>
