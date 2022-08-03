<template>
  <div>
    <b-field :label="label">
      <!-- {{ typeof selectedOptions }} -->
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
  name: 'SelectCore',
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    valueId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selectedOptions: this.valueId ? this.valueId : null,
    }
  },
  watch: {
    selectedOptions(newValue, oldValue) {
      // eslint-disable-next-line no-console
      console.log(newValue, 'watch', oldValue, this.selectedOptions) // resolved bug
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
