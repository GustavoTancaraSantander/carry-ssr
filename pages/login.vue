<template>
  <div class="centerall">
    <section class="section is-relative is-clipped">
      <div
        class="is-hidden-touch has-background-primary"
        style="position: absolute; top: 0; left: 0; width: 70%; height: 100%"
      ></div>
      <div
        class="is-hidden-desktop has-background-primary is-fullwidth"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
      ></div>
      <div class="container mx-auto is-relative">
        <div class="is-vcentered columns is-multiline">
          <div class="column is-6 is-5-desktop mb-5">
            <div>
              <h2
                class="
                  has-text-white
                  mb-4
                  is-size-1 is-size-3-mobile
                  has-text-weight-bold
                "
              >
                Admistración de la plataforma
              </h2>
              <p class="has-text-white mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan
                aliquet orci.
              </p>
              <img src="~assets/logo_carry.png" alt="Buefy" height="28" />
            </div>
          </div>
          <div class="column is-6 is-4-desktop mx-auto">
            <div class="box has-background-light has-text-centered">
              <form action="#" @submit.prevent="onSubmit()">
                <span class="has-text-grey-dark">Ingresa tus </span>
                <h3 class="mb-5 is-size-4 has-text-weight-bold">
                  Credenciales de acceso
                </h3>
                <div class="field">
                  <div class="control">
                    <input
                      v-model="phoneNumber"
                      class="input"
                      placeholder="Número de celular"
                    />
                    <!-- type="number" -->
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input
                      v-model="password"
                      class="input"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="button is-primary mb-4 is-fullwidth"
                >
                  Inicia Sesión
                </button>
                <a class="mb-4 is-inline-block" href="#">
                  <small>Olvidaste tu contraseña ?</small>
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: null,
      password: '',
      errors: null,
      isLogin: true,
    }
  },
  methods: {
    onSubmit() {
      this.$store
        // .dispatch('authenticateUser', {
        .dispatch('login', {
          isLogin: this.isLogin,
          cellphone: this.phoneNumber,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          this.$buefy.snackbar.open({
            indefinite: true,
            message: err.response.data.message,
            queue: false,
            cancelText: 'Entendido',
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
// https://github.com/jgthms/bulma/issues/1647
.centerall {
  height: 100vh;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>
