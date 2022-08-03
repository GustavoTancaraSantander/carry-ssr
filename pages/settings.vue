<template>
  <div>
    <HeroBar>
      Configuraciones
      <nuxt-link slot="right" to="/" class="button"> Dashboard </nuxt-link>
    </HeroBar>
    <section class="section is-main-section">
      <Tiles>
        <CardComponent
          title="Notificaciones"
          icon="alert"
          class="tile is-child"
        >
          <b-field>
            <b-switch :value="true">
              Recibir alertas en la plataforma:
            </b-switch>
          </b-field>
          <hr />
          <ul>
            <li>Cuando registra un transportista.</li>
            <li>Cuando se registra un proveedor.</li>
          </ul>
        </CardComponent>
        <CardComponent title="Emails" icon="alert" class="tile is-child">
          <b-field>
            <b-switch :value="true"> Recibir emails: </b-switch>
          </b-field>
          <hr />
          <ul>
            <li>Cuando me envían un mensaje desde la página de contactos.</li>
          </ul>
        </CardComponent>
      </Tiles>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import HeroBar from '@/components/HeroBar.vue'
import Tiles from '@/components/Tiles.vue'
export default {
  name: 'Settings',
  components: {
    Tiles,
    HeroBar,
    CardComponent,
  },
  layout: 'admin',
  head() {
    return {
      title: 'Configuraciones — Admin Carry',
    }
  },
}
</script>
