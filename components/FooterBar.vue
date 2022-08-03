<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid columns">
      <div class="column is-2"></div>
      <div class="level column is-10">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ year }}, Developer.me</b> &mdash; Admin Nuxt
              <span class="tag">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  computed: {
    year() {
      return dayjs().year()
    },
    ...mapState(['isFooterBarVisible']),
  },
}
</script>
