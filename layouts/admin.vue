<template>
  <div id="app">
    <NavBar :menu-navigation="menuNavigation" />
    <section class="columns py-6">
      <SideBar :items-navigation="itemsNavigation" class="column is-2" />
      <div class="column is-10 container pl-6 ml-auto">
        <Nuxt />
      </div>
    </section>
    <FooterBar />
    <ModalAlert />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/_navigation/NavBar.vue'
import SideBar from '~/components/_navigation/SideBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import ModalAlert from '~/components/common/ModalAlert.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    SideBar,
    FooterBar,
    ModalAlert,
  },
  // middleware: ['check-auth', 'auth-jwt'], // TODO: pending eval performance
  computed: {
    itemsNavigation() {
      return [
        {
          title: 'Dashboard Delivery',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Dashboard Servicios',
          icon: 'view-dashboard',
          to: { name: 'dashboard' },
        },
        {
          title: 'Categorias',
          icon: 'folder',
          to: { name: 'categories' },
          isExpanded: this.$route.path.includes('/categories/'),
          // isExpanded: this.$route.name !== 'categories',
          children: [
            // {
            //   title: 'Lista',
            //   icon: 'account',
            //   to: { name: 'categories' },
            // },
            {
              title: 'Crear',
              icon: 'folder-plus',
              to: { name: 'categories-create' },
            },
            {
              title: 'Detalle',
              icon: 'folder-open-outline',
              to: {
                name: 'categories-id',
                params: { id: this.$route.params.id || 1 },
              },
            },
            {
              title: 'Actualizar',
              icon: 'folder-refresh',
              to: {
                name: 'categories-id-update',
                params: { id: this.$route.params.id || 1 },
              },
            },
          ],
        },
        {
          title: 'Subcategorias',
          icon: 'folder-outline',
          to: { name: 'subcategories' },
          isExpanded: this.$route.path.includes('/subcategories/'),
          children: [
            {
              title: 'Crear',
              icon: 'folder-plus',
              to: { name: 'subcategories-create' },
            },
            {
              title: 'Detalle',
              icon: 'folder-open',
              to: {
                name: 'subcategories-id',
                params: { id: this.$route.params.id || 1 },
              },
            },
            {
              title: 'Actualizar',
              icon: 'folder-refresh',
              to: {
                name: 'subcategories-id-update',
                params: { id: this.$route.params.id || 1 },
              },
            },
          ],
        },
        {
          title: 'Paises',
          icon: 'folder',
          to: { name: 'countries' },
          isExpanded: this.$route.path.includes('/countries/'),
          // isExpanded: this.$route.name !== 'countries',
          children: [
            // {
            //   title: 'Lista',
            //   icon: 'account',
            //   to: { name: 'countries' },
            // },
            {
              title: 'Crear',
              icon: 'folder-plus',
              to: { name: 'countries-create' },
            },
            {
              title: 'Detalle',
              icon: 'folder-open-outline',
              to: {
                name: 'countries-id',
                params: { id: this.$route.params.id || 1 },
              },
            },
            {
              title: 'Actualizar',
              icon: 'folder-refresh',
              to: {
                name: 'countries-id-update',
                params: { id: this.$route.params.id || 1 },
              },
            },
          ],
        },
        {
          title: 'Ciudades',
          icon: 'folder',
          to: { name: 'cities' },
          isExpanded: this.$route.path.includes('/cities/'),
          // isExpanded: this.$route.name !== 'cities',
          children: [
            // {
            //   title: 'Lista',
            //   icon: 'account',
            //   to: { name: 'cities' },
            // },
            {
              title: 'Crear',
              icon: 'folder-plus',
              to: { name: 'cities-create' },
            },
            {
              title: 'Detalle',
              icon: 'folder-open-outline',
              to: {
                name: 'cities-id',
                params: { id: this.$route.params.id || 1 },
              },
            },
            {
              title: 'Actualizar',
              icon: 'folder-refresh',
              to: {
                name: 'cities-id-update',
                params: { id: this.$route.params.id || 1 },
              },
            },
          ],
        },
        {
          title: 'Proveedores',
          icon: 'truck-delivery',
          to: { name: 'providers' },
          // isExpanded: this.$route.name !== 'providers',
          // isExpanded: !this.$route.name.includes('providers'),
          isExpanded: this.$route.path.includes('/providers/'),
          children: [
            // {
            //   title: 'Crear',
            //   icon: 'folder-plus',
            //   to: { name: 'subcategories-create' },
            // },
            {
              title: 'Detalle',
              icon: 'folder-open',
              to: {
                name: 'providers-id',
                params: { id: this.$route.params.id || 1 },
              },
            },
            {
              title: 'Actualizar',
              icon: 'folder-refresh',
              to: {
                name: 'providers-id-update',
                params: { id: this.$route.params.id || 1 },
              },
            },
          ],
        },
        // {
        //   title: 'Inspire',
        //   icon: 'lightbulb',
        //   to: { name: 'inspire' },
        // },
        // {
        //   title: 'Buefy',
        //   icon: 'lightbulb',
        //   to: { name: 'indexBuefy' },
        // },
      ]
    },
    menuNavigation() {
      return [
        {
          title: 'Mi Perfil',
          icon: 'account',
          to: { name: 'profile' },
        },
        {
          title: 'Configuraciones',
          icon: 'tools',
          to: { name: 'settings' },
        },
        // {
        //   title: 'Messages',
        //   icon: 'email',
        //   to: { name: 'email' },
        // },
      ]
    },
  },
  // created() {
  //   this.$store.commit('user', {
  //     phone: '7581000',
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
  //   })
  // },
  // mounted() {
  //   document.documentElement.classList.add('has-aside-left')
  //   document.documentElement.classList.add('has-aside-mobile-transition')
  //   document.documentElement.classList.add('has-navbar-fixed-top')
  //   document.documentElement.classList.add('has-aside-expanded')
  // },
}
</script>
