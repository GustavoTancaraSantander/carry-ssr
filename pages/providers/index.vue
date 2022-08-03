<template>
  <div>
    <HeroBar> Administración de Provedores </HeroBar>

    <div class="is-align-items-center is-justify-content-space-between is-flex">
      <p>En esta sección puede administrar proveedores registrados</p>
      <!-- <nuxt-link to="/providers/create" class="button is-primary">
        Crear Nueva
      </nuxt-link> -->
    </div>
    <hr />
    <!--  <div v-if="$route.params.created == 'yes'" class="alert alert-success">
      Record added successfully
    </div>
    <div v-if="$route.params.deleted == 'yes'" class="alert alert-success">
      Record deleted successfully
    </div> -->
    <client-only>
      <div v-if="providers.length" id="tableAsyncPag_crud">
        <b-table
          :data="providers"
          :loading="loading"
          paginated
          backend-pagination
          :per-page="perPage"
          :total="total"
          :striped="true"
          @page-change="onPageChange"
        >
          <b-table-column
            v-slot="props"
            field="id"
            label="ID"
            width="40"
            sortable
            numeric
          >
            {{ props.row.id }}
          </b-table-column>

          <b-table-column
            v-slot="props"
            field="name"
            label="Empresa - Proveedor"
            sortable
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            v-slot="props"
            field="logo_img"
            label="Imagen"
            sortable
          >
            <!-- <img :src="props.row.logo_img || ''" alt="" max-height="80px" /> -->
            {{ props.row.logo_img }}
          </b-table-column>
          <b-table-column
            v-slot="props"
            field="id_category"
            label="Categoría ID (código)"
            sortable
          >
            <NuxtLink
              class="button is-small is-primary"
              :to="{
                name: 'categories-id',
                params: { id: props.row.id_category },
              }"
              title="Ver Categoría"
            >
              <b-icon icon="folder-open-outline" size="is-small" />
              <b-button class="button is-small is-primary">
                {{ props.row.id_category }}
              </b-button>
            </NuxtLink>
          </b-table-column>
          <!-- <b-table-column v-slot="props" field="nit" label="NIT" sortable>
            {{ props.row.nit }}
          </b-table-column> -->
          <!-- <b-table-column
            v-slot="props"
            field="licence"
            label="Licencia"
            sortable
          >
            <button
              class="button is-rounded"
              :class="props.row.licence ? 'is-success' : 'is-danger'"
            >
              {{ props.row.licence ? 'Si' : 'No' }}
            </button>
          </b-table-column> -->
          <b-table-column v-slot="props" field="status" label="Estado" sortable>
            <button
              class="button is-rounded"
              :class="props.row.status == 1 ? 'is-success' : 'is-danger'"
            >
              {{ props.row.status == 1 ? 'Habilidado' : 'Deshabilitado' }}
            </button>
          </b-table-column>
          <b-table-column
            v-slot="props"
            field="created_at"
            label="Registrado"
            sortable
            centered
          >
            {{ props.row.created_at }}
          </b-table-column>
          <b-table-column
            v-slot="props"
            field="actions"
            label="Acciones"
            class="is-actions-cell"
          >
            <div class="buttons is-center">
              <!-- :to="'/providers/' + props.row.id" -->
              <NuxtLink
                class="button is-small is-primary"
                :to="{ name: 'providers-id', params: { id: props.row.id } }"
              >
                <b-icon icon="folder-open-outline" size="is-small" />
              </NuxtLink>
              <NuxtLink
                class="button is-small is-primary"
                :to="'/providers/' + props.row.id + '/update'"
              >
                <b-icon icon="account-edit" size="is-small" />
              </NuxtLink>

              <button
                class="button is-small is-danger"
                type="button"
                @click.prevent="deleteRecord(props.row.id)"
              >
                <b-icon icon="trash-can" size="is-small" />
              </button>
            </div>
          </b-table-column>
        </b-table>
      </div>
      <div v-else class="notification is-info">
        No se encontraron registros.
      </div>
    </client-only>
  </div>
</template>

<script>
import HeroBar from '~/components/HeroBar.vue'
export default {
  components: { HeroBar },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  async asyncData({ $axios, query }) {
    const page = query.page || 1
    const loading = true
    const { data } = await $axios.get('/api/providers?page=' + page)
    // eslint-disable-next-line no-console
    console.log('asyncData', page)
    return {
      providers: data.data,
      page: data.current_page || page,
      perPage: data.per_page,
      total: data.total,
      loading: !loading,
    }
  },
  // data() {
  //   const providers = [
  //     {
  //       id: 4,
  //       subCategoryId: 2,
  //       subCategoryName: 'Tienda',
  //       name: 'Empresa Proveedora Pruebas', // businessName: 'Empresa App',
  //       description: '',
  //       nit: '5987979878465',
  //       created_at: 'Mar 29, 2020',
  //       logo_img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
  //       licence: 1,
  //       status: 0,
  //       // address: 'Av.6 de Agosto 2577, La Paz',
  //       // rating: '2.5',
  //       // city: 'La Paz',
  //       // country: 'Bolivia',
  //       // phone: '2225658'
  //     },
  //   ]
  //   return {
  //     providers,
  //     loading: false,
  //     page: 1,
  //     perPage: 5,
  //     total: 0,
  //   }
  // },
  watchQuery: ['page'],

  methods: {
    onPageChange(page) {
      // eslint-disable-next-line no-console
      console.log('onPageChange', page)
      this.$router.push({ query: { page } })
    },
    deleteRecord(id) {
      if (confirm('Are you sure?' + id) === true) {
        this.$axios
          .delete('/providers/' + id)
          .then((response) => {
            if (response.data._id) {
              this.$router.push({
                name: 'providers',
                params: { deleted: 'yes' },
              })
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },
  },
}
</script>
