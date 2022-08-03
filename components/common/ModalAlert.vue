<template>
  <b-modal :active="showAlert" :width="640" scroll="keep" :can-cancel="false">
    <div class="card">
      <b-message
        :title="$store.state.alert.title"
        :type="$store.state.alert.type"
        has-icon
        @close="onClose"
      >
        {{ $store.state.alert.message }}
      </b-message>

      <div
        v-for="(item, index) in $store.state.alert.validation"
        :key="index"
        class="card-content"
      >
        <div class="columns">
          <div class="column is-one-third">
            <b>Campo {{ item.field }}:</b>
          </div>
          <div class="column">
            <p align="justify">{{ item.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  computed: {
    showAlert: {
      get() {
        return this.$store.state.alert.show
      },
      set(value) {
        this.onClose()
      },
    },
  },
  methods: {
    onClose() {
      this.$store.commit('SET_ALERT', {
        show: false,
      })
    },
  },
}
</script>
