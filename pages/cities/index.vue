<template>
  <div>
    <HeroBar> Administración de Ciudades </HeroBar>
    <p>
      En esta sección puede administrar las Ciudades, que se utilizan para la
      formulario de registro de proveedores y filtros de búsqueda del cliente.
    </p>
    <div class="is-align-items-center is-justify-content-space-between is-flex">
      <SelectCore
        :label="'Filtrar por País'"
        :options="countryList"
        :value-id="parseInt($route.query.countryId) || countryId"
        class="mb-1"
        @option-selected="countrySelected"
      />
      <NuxtLink
        :to="{
          name: 'cities-create',
          params: {
            previousCountryId: $route.query.countryId || countryId,
            previousPage: pagination.currentPage,
          },
        }"
        class="button is-primary"
      >
        Nuevo Registro
      </NuxtLink>
    </div>
    <hr />
    <client-only>
      <div id="tableAsyncPag_crud">
        <b-table
          :data="cities"
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

          <b-table-column v-slot="props" field="name" label="Ciudad" sortable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column v-slot="props" field="code" label="Código Ciudad">
            {{ props.row.code }}
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

          <!-- <b-table-column
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
            field="updatedAt"
            label="Actualizado"
            sortable
            centered
          >
            {{ props.row.updatedAt }}
          </b-table-column> -->

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
                  name: 'cities-id',
                  params: {
                    id: props.row.id,
                    previousCountryId: $route.query.countryId || countryId,
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
                  name: 'cities-id-update',
                  params: {
                    id: props.row.id,
                    previousCountryId: $route.query.countryId || countryId,
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
                @click.prevent="
                  deleteRecord(
                    props.row.id,
                    props.row.name,
                    props.row.countryId
                  )
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
    await store.dispatch('countriesModule/getCountryList')
    return {
      loading: !loading,
    }
  },

  data() {
    return {
      countryId: null,
      loading: false,
    }
  },

  computed: {
    ...mapGetters('countriesModule', {
      countryList: 'getter_countryList',
    }),
    ...mapState('citiesModule', {
      cities: (state) => state.cities,
      pagination: (state) => state.pagination,
    }),
  },
  watchQuery: ['page'],
  mounted() {
    // console.log('MOUNTED ROUTE', this.$route)
    this.countryId = parseInt(this.$route.query.countryId)
    if (this.countryId) {
      if (this.cities.length === 0) {
        this.searchCitiesByCountryId()
      }
    } else {
      this.$store.commit('citiesModule/SET_CITIES', null)
    }
  },

  methods: {
    onPageChange(page) {
      // eslint-disable-next-line no-console
      // console.log('onPageChange', page)
      this.$router.push({ query: { page } })
      this.searchCitiesByCountryId(page)
    },

    async searchCitiesByCountryId(page = 1) {
      this.loading = true
      await this.$store.dispatch('citiesModule/getCitiesByCountryId', {
        countryId: this.countryId,
        page,
      })
      this.loading = false
    },
    deleteRecord(id, name, countryId) {
      this.$buefy.dialog.confirm({
        title: 'Eliminando Ciudad',
        message: `¿Está seguro de que desea <b>eliminar</b> la ciudad <b>${name}</b> ? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar Ciudad',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () =>
          this.$store
            .dispatch('citiesModule/deleteCity', { id, countryId })
            .then(() => {
              this.$buefy.toast.open(`Ciudad ${name} eliminada!`)
            }),
      })
    },
    // CUSTOM COMPONENT
    countrySelected(eventValue) {
      // eslint-disable-next-line no-console
      // console.log('countrySelected ', eventValue)
      this.countryId = eventValue
      this.$router.replace({
        name: 'cities',
        query: {
          countryId: this.countryId,
          page: this.$route.query.page,
        },
      })
      this.searchCitiesByCountryId()
    },
  },
}
</script>
