<template>
  <div class="section">
    <HeroBar> Detalle de Proveedor </HeroBar>
    <hr />
    <div v-if="$route.params.updated == 'yes'" class="notification is-success">
      <button class="delete"></button>
      Record updated successfully
    </div>
    <client-only>
      <CardComponent
        :title="'Proveedor'"
        icon="folder-plus-outline"
        class="tile is-child"
      >
        <h2 class="is-size-3-fullhd">{{ provider.name }}</h2>
        <b-field label="Categoría ID (código)">
          <NuxtLink
            class="button is-small is-primary"
            :to="{
              name: 'categories-id',
              params: { id: provider.id_category },
            }"
            title="Ver Categoría"
          >
            <b-icon icon="folder-open-outline" size="is-small" />
            <b-button class="button is-small is-primary">
              {{ provider.id_category }}
            </b-button>
          </NuxtLink>
        </b-field>

        <h2>{{ provider.about }}</h2>

        <img :src="provider.logo_img" :alt="provider.name" />

        <h6>{{ provider.logo_img }}</h6>
        <!-- <b-field label="Licencia">
          <button
            class="button is-rounded"
            :class="provider.licence ? 'is-success' : 'is-danger'"
          >
            {{ provider.licence ? 'Si' : 'No' }}
          </button>
        </b-field> -->
        <b-field label="Estado">
          <button
            class="button is-rounded"
            :class="provider.status ? 'is-success' : 'is-danger'"
          >
            {{ provider.status ? 'Habilidado' : 'Deshabilitado' }}
          </button>
        </b-field>

        <p>{{ provider.created_at }}</p>

        <hr />
        <div class="is-flex is-justify-content-space-between">
          <NuxtLink
            :to="'/providers/' + $route.params.id + '/update'"
            class="button is-primary mr-3"
          >
            Actualizar
          </NuxtLink>
          <button class="button is-danger" @click="deleteRecord()">
            Eliminar
          </button>
          <NuxtLink to="/providers"> Volver a Proveedores </NuxtLink>
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
  /* temporal */
  /*  props: {
    provider: {
      type: Object,
      required: false,
      default() {
        return {
          id: 4,
          subCategoryId: 2,
          subCategoryName: 'Tienda',
          name: 'Empresa Proveedora Pruebas', // businessName: 'Empresa App',
          about:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam quisquam optio voluptatibus quasi, ratione facilis sapiente hic, at assumenda molestias soluta porro deserunt nostrum, delectus corrupti blanditiis dolorum? Consequatur, modi?',
          nit: '5987979878465',
          created_at: 'Mar 29, 2020',
          logo_img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          licence: 1,
          status: 0,
        }
      },
    },
  }, */
  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/provider/' + context.route.params.id
    )
    return {
      provider: data,
    }
  },
  methods: {
    deleteRecord() {
      if (confirm('Are you sure?' + this.$route.params.id) === true) {
        this.$axios
          .delete('/api/providers/' + this.$route.params.id)
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
