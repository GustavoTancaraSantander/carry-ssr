<template>
  <div class="is-relative">
    <nav
      v-show="isNavBarVisible"
      id="navbar-main"
      class="navbar is-fixed-top py-4 container"
    >
      <div class="navbar-brand is-right">
        <a
          class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
          @click.prevent="menuNavBarToggle"
        >
          <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
        </a>
      </div>
      <div
        class="navbar-menu fadeIn animated faster"
        :class="{ 'is-active': isMenuNavBarActive }"
      >
        <div class="navbar-end">
          <NavBarMenu class="has-divider has-user-avatar">
            <b-icon icon="menu" custom-size="default" />
            <UserAvatar :avatar="userAvatar" />

            <div class="is-user-name">
              <span>{{ userName }} {{ userLastname }}</span>
              <!-- <span>{{ $auth.user.name }}</span> -->
            </div>

            <div slot="dropdown" class="navbar-dropdown">
              <div v-for="item of menuNavigation" :key="item.title">
                <NuxtLink
                  :to="item.to"
                  class="navbar-item"
                  exact-active-class="is-active"
                >
                  <b-icon :icon="item.icon" custom-size="default" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </div>

              <hr class="navbar-divider" />

              <!-- <a class="navbar-item">
                <b-icon icon="logout" custom-size="default"></b-icon>
                <span>Log Out</span>
              </a> -->
            </div>
          </NavBarMenu>
          <a
            class="navbar-item is-desktop-icon-only"
            title="Log out"
            @click="logout"
          >
            <b-icon icon="logout" custom-size="default" />
            <span>Cerrar Sesion</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/_navigation/NavBarMenu.vue'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
  },
  props: {
    menuNavigation: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMenuNavBarActive: false,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    ...mapState([
      'isNavBarVisible',
      'isAsideMobileExpanded',
      'userName',
      'userLastname',
      'userAvatar',
    ]),
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    logout() {
      this.$buefy.snackbar.open({
        message: 'Cerrando Sesión',
        queue: false,
      })
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$buefy.snackbar.open({
            message: 'Sesión Cerrada',
            queue: false,
          })
          this.$router.push('/login')
        })
        .catch((err) => {
          this.$buefy.snackbar.open({
            indefinite: true,
            message: err.response
              ? err.response.message
                ? err.response.message
                : err.response.data.message
              : err.toString(),
            queue: false,
          })
        })
    },
  },
}
</script>
