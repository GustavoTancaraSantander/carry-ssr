<template>
  <div>
    <b-field :label="label">
      <b-select v-model="selectedOptions" placeholder="Seleccione">
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedOptions: [],
    }
  },
  watch: {
    selectedOptions(newValue, oldValue) {
      // eslint-disable-next-line no-console
      console.log(newValue, 'watch', oldValue) // resolved bug
      if (newValue !== oldValue) {
        this.emitOption(newValue)
      }
    },
  },
  methods: {
    emitOption(value) {
      this.$emit('option-selected', value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
