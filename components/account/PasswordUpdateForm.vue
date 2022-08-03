<template>
  <CardComponent title="Cambiar Contraseña" icon="lock">
    <form @submit.prevent="submit">
      <b-field
        horizontal
        label="Contraseña actual"
        message="Requerido. Tu contraseña actual"
      >
        <b-input
          v-model="form.password_current"
          name="password_current"
          type="password"
          required
          autcomplete="current-password"
        />
      </b-field>
      <hr />
      <b-field
        horizontal
        label="Nueva contraseña"
        message="Requerido. Nueva contraseña"
      >
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <b-field
        horizontal
        label="Confirme contraseña"
        message="Requerido. Nueva contraseña una vez más"
      >
        <b-input
          v-model="form.password_confirmation"
          name="password_confirmation"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <hr />
      <b-field horizontal>
        <div class="control">
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
          >
            Enviar
          </button>
        </div>
      </b-field>
    </form>
  </CardComponent>
</template>

<script>
import CardComponent from '@/components/CardComponent'
export default {
  name: 'PasswordUpdateForm',
  components: {
    CardComponent,
  },
  data() {
    return {
      isLoading: false,
      form: {
        password_current: null,
        password: null,
        password_confirmation: null,
      },
    }
  },
  methods: {
    submit() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$buefy.snackbar.open(
          {
            message: 'Updated',
            queue: false,
          },
          500
        )
      })
    },
  },
}
</script>
