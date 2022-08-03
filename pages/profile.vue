<template>
  <div>
    <hero-bar>
      Mi Perfil
      <nuxt-link slot="right" to="/" class="button"> Dashboard </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <ProfileUpdateForm class="tile is-child" />
        <CardComponent title="Profile" icon="account" class="tile is-child">
          <user-avatar class="image is-aligned-center" />
          <hr />
          <b-field label="Nombre">
            <b-input :value="userName" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Apellido">
            <b-input :value="userLastname" custom-class="is-static" readonly />
          </b-field>
          <hr />
          <b-field label="E-mail">
            <b-input :value="userEmail" custom-class="is-static" readonly />
          </b-field>
        </CardComponent>
      </tiles>
      <PasswordUpdateForm />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
// import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
import PasswordUpdateForm from '~/components/account/PasswordUpdateForm.vue'
import ProfileUpdateForm from '~/components/account/ProfileUpdateForm.vue'
export default {
  name: 'Profile',
  components: {
    UserAvatar,
    Tiles,
    HeroBar,
    CardComponent,
    PasswordUpdateForm,
    ProfileUpdateForm,
  },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  head() {
    return {
      title: 'Perfil — Admin Carry',
    }
  },
  computed: {
    // titleStack() {
    //   return ['Admin', 'Profile']
    // },
    ...mapState(['userName', 'userLastname', 'userEmail']),
  },
}
</script>
