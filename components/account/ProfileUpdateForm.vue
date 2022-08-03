<template>
  <CardComponent title="Editar perfil" icon="account-circle">
    <form @submit.prevent="submit">
      <b-field horizontal label="Avatar">
        <FilePicker />
      </b-field>
      <hr />
      <b-field horizontal label="Celular">
        <b-input v-model="form.phone" name="phone" required disabled />
      </b-field>
      <b-field horizontal label="Nombre" message="Required. Su nombre">
        <b-input v-model="form.name" name="name" required />
      </b-field>
      <b-field horizontal label="Apellido" message="Required. Su apellido">
        <b-input v-model="form.lastname" name="name" required />
      </b-field>
      <b-field horizontal label="E-mail" message="Required. Your e-mail">
        <b-input v-model="form.email" name="email" type="email" />
      </b-field>
      <hr />
      <b-field horizontal>
        <div class="control">
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
          >
            Guardar cambios
          </button>
        </div>
      </b-field>
    </form>
  </CardComponent>
</template>

<script>
import { mapState } from 'vuex'
import FilePicker from '@/components/FilePicker'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProfileUpdateForm',
  components: {
    CardComponent,
    FilePicker,
  },
  data() {
    return {
      isFileUploaded: false,
      isLoading: false,
      form: {
        phone: null,
        name: null,
        lastname: null,
        email: null,
      },
    }
  },
  computed: {
    ...mapState(['userName', 'userLastname', 'userEmail', 'userPhone']),
  },
  watch: {
    userPhone(newValue) {
      this.form.phone = newValue
    },
    userName(newValue) {
      this.form.name = newValue
    },
    userLastname(newValue) {
      this.form.lastname = newValue
    },
    userEmail(newValue) {
      this.form.email = newValue
    },
  },
  mounted() {
    this.form.phone = this.userPhone
    this.form.name = this.userName
    this.form.lastname = this.userLastname
    this.form.email = this.userEmail
  },
  methods: {
    submit() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$store.commit('user', this.form)
        this.$buefy.snackbar.open({
          message: 'Actualizado',
          queue: false,
        })
      }, 500)
    },
  },
}
</script>
