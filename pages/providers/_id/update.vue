<template>
  <div>
    <HeroBar> Actualizar Proveedor </HeroBar>

    <section class="section is-main-section">
      <tiles>
        <CardComponent
          :title="'Editar Proveedor'"
          icon="folder-plus-outline"
          class="tile is-child"
        >
          <client-only>
            <ProviderForm
              :provider="loadedProvider"
              :categories="loadedCategories"
              @submit="onSubmitted"
            />
          </client-only>
        </CardComponent>
        <CardComponent
          title="Propietario - Responsable"
          icon="account"
          class="tile is-child"
        >
          <UserAvatar
            class="image is-aligned-center"
            :avatar="owner_admin.img"
          />
          <b-field label="CI">
            <b-input
              :value="owner_admin.ci"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr />
          <b-field label="Nombre">
            <b-input
              :value="owner_admin.name"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Apellido">
            <b-input
              :value="owner_admin.lastname"
              custom-class="is-static"
              readonly
            />
          </b-field>

          <b-field label="Celular">
            <b-input
              :value="owner_admin.cellphone"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr />
          <b-field label="E-mail">
            <b-input
              :value="owner_admin.email"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Direction">
            <b-input
              :value="owner_admin.address"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </CardComponent>
      </tiles>
    </section>
  </div>
</template>

<script>
import ProviderForm from '~/components/admin/ProviderForm.vue'
import HeroBar from '~/components/HeroBar.vue'
import UserAvatar from '~/components/UserAvatar.vue'
export default {
  components: {
    HeroBar,
    UserAvatar,
    ProviderForm,
  },
  layout: 'admin',
  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/provider/' + context.route.params.id
    )
    return {
      loadedProvider: data,
    }
  },
  data() {
    return {
      /*  loadedProvider: {
        id: 4,
        subCategoryId: 2,
        subCategoryName: 'Tienda',
        name: 'Empresa Proveedora Pruebas', // businessName: 'Empresa App',
        description: '',
        nit: '5987979878465',
        created_at: 'Mar 29, 2020',
        logoUrl: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
        licence: 1,
        status: 0,
        // address: 'Av.6 de Agosto 2577, La Paz',
        // rating: '2.5',
        // city: 'La Paz',
        // country: 'Bolivia',
        // phone: '2225658'
      }, */
      owner_admin: {
        cellphone: '785222221',
        name: 'Jonh',
        lastname: 'Mendoza',
        ci: '98222214',
        email: 'jong@empresa.com',
        address: 'Av.6 de Agosto 2577, La Paz',
        img: 'https://avatars.dicebear.com/v2/human/somename.svg?options[mood][]=happy',
        type: 3,
        // status: 'activo'
      },
      categories: [
        {
          id: 1,
          name: 'Gastronomía',
          date: 'Mar 29, 2020',
          imgUrl: 'https://img.icons8.com/office/80/000000/dining-room.png',
        },
        {
          id: 2,
          name: 'Farmacia',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/external-becris-solid-becris/64/000000/external-medical-literary-genres-becris-solid-becris.png',
        },
        {
          id: 3,
          name: 'Licorería',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-drink-grocery-flatart-icons-flat-flatarticons-1.png',
        },
        {
          id: 4,
          name: 'Almacén',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/64/000000/external-store-urban-living-inipagistudio-lineal-color-inipagistudio.png',
        },
        {
          id: 5,
          name: 'Librería',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/ultraviolet/80/000000/library--v2.png',
        },
        {
          id: 6,
          name: 'PetShop',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-petshop-shop-and-store-wanicon-flat-wanicon.png',
        },
        {
          id: 7,
          name: 'Ferretería',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-tools-automobile-kiranshastry-lineal-color-kiranshastry.png',
        },
        {
          id: 8,
          name: 'Mercado',
          date: 'Mar 29, 2020',
          imgUrl: 'https://img.icons8.com/dusk/64/000000/marketplace-hub.png',
        },
        {
          id: 9,
          name: 'Súper Mercado',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/external-becris-flat-becris/64/000000/external-market-business-world-becris-flat-becris.png',
        },
        {
          id: 10,
          name: 'Tienda',
          date: 'Mar 29, 2020',
          imgUrl:
            'https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-fish-market-shop-and-store-wanicon-lineal-color-wanicon.png',
        },
      ],
    }
  },
  computed: {
    loadedCategories() {
      return this.$store.getters.getter_loadedCategories
    },
  },
  methods: {
    async onSubmitted(updateForm) {
      // eslint-disable-next-line no-console
      console.log('updateForm', updateForm)
      /*  this.$store.dispatch('updateCategory', updateForm).then(() => {
        this.$router.push('/admin')
      }) */
      const data = await this.$axios.$put(
        `/api/provider/${this.$route.params.id}`,
        updateForm
      )

      if (data) {
        this.$router.push({
          name: 'providers',
          params: { created: 'yes' },
        })
        this.$buefy.notification.open({
          message: 'Registro agregado exitosamente!',
          type: 'is-success',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
