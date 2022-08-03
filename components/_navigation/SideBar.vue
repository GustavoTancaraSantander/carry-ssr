<template>
  <section>
    <b-sidebar
      v-model="open"
      :type="modeType ? 'is-theme-custom' : 'is-light'"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :position="position"
      class="aside is-placed-left is-expanded"
    >
      <div class="p-1">
        <img
          src="~assets/logo_carry.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <b-menu>
          <b-menu>
            <div class="control">
              <b-switch v-model="modeType">
                Modo {{ modeType ? 'oscuro' : 'claro' }}
              </b-switch>
            </div>
          </b-menu>
          <b-menu-list label="Menu">
            <client-only>
              <b-menu-item
                v-for="(item, key) of itemsNavigation"
                :key="key"
                :expanded="item.isExpanded"
                @click="item.isExpanded = !item.isExpanded"
              >
                <template slot="label" slot-scope="props">
                  <NuxtLink :to="item.to" exact-active-class="is-active">
                    <b-icon :icon="item.icon" /> {{ item.title }}
                  </NuxtLink>
                  <b-icon
                    v-show="false"
                    class="is-pulled-right"
                    :icon="props.expanded ? 'menu-down' : 'menu-up'"
                  >
                  </b-icon>
                </template>

                <li
                  v-for="child of item.children"
                  :key="child.title"
                  class="disable_link_pointer"
                >
                  <NuxtLink :to="child.to" exact-active-class="is-active ">
                    <b-icon :icon="child.icon" /> {{ child.title }}
                  </NuxtLink>
                </li>
              </b-menu-item>
            </client-only>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script>
export default {
  props: {
    itemsNavigation: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      open: true,
      overlay: false,
      modeType: true,
      fullheight: true,
      fullwidth: false,
      right: false,
      position: 'fixed',
    }
  },
}
</script>

<style>
.p-1 {
  padding: 1em;
}
.disable_link_pointer {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
}
</style>
