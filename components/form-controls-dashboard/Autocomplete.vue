<template>
  <section>
    <!-- <p class="content"><b>Selected:</b> {{ selected }}</p> -->
    <b-field :label="label">
      <b-autocomplete
        v-model="name"
        rounded
        :data="filteredDataArray"
        placeholder="e.g. Manuel"
        icon="magnify"
        clearable
        @select="(option) => (selected = option)"
      >
        <template #empty>No results found</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: 'Buscar',
    },
  },
  data() {
    return {
      data: [
        'Manuel',
        'Angular 2',
        'Aurelia',
        'Backbone',
        'Ember',
        'jQuery',
        'Meteor',
        'Node.js',
        'Polymer',
        'React',
        'RxJS',
        'Vue.js',
      ],
      name: '',
      selected: null,
    }
  },
  computed: {
    filteredDataArray() {
      return this.data.filter((option) => {
        return (
          option.toString().toLowerCase().includes(this.name.toLowerCase()) >= 0
        )
      })
    },
  },
}
</script>
