<template>
  <div>
    <section class="section is-main-section">
      <HeroBar> Panel de Control Delivery </HeroBar>
      <!-- Filters -->
      <div id="Filters">
        <div class="columns">
          <div class="column">
            <DatePicker :label="'De'" />
          </div>
          <div class="column">
            <DatePicker :label="'A'" />
          </div>
          <div class="column">
            <Selected
              :options="categoryList"
              :label="'Categorias'"
              @option-selected="categorySelected"
            />
          </div>
        </div>
        <div class="columns">
          <!-- <div class="column is-two-thirds">is-two-thirds</div> -->
          <div class="column">
            <Selected
              :options="countryList"
              :label="'Pais'"
              @option-selected="countrySelected"
            />
          </div>
          <div class="column">
            <Selected :options="cityList" :label="'Ciudad'" />
          </div>
          <div class="column is-4">
            <Autocomplete v-show="country" :label="'Busca Proveedores'" />
          </div>
        </div>
      </div>
      <!-- Cards -->
      <tiles>
        <CardWidget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="126"
          label="Clientes"
        />
        <CardWidget
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          :number="4300"
          prefix="$"
          label="Monto Total"
        />
        <CardWidget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="68"
          label="Ventas"
        />
        <!-- suffix="%" -->
      </tiles>
      <!-- Graphics -->
      <CardComponent
        title="Resultados"
        icon="finance"
        header-icon="reload"
        @header-icon-click="fillChartData"
      >
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart
            ref="bigChart"
            style="height: 100%"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          >
          </line-chart>
        </div>
      </CardComponent>
      <br class="m-3" />
      <CardComponent title="Pedidos">
        <TableOrders />
      </CardComponent>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/charts/chart.config'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import LineChart from '@/components/charts/LineChart'
import DatePicker from '~/components/form-controls-dashboard/DatePicker.vue'
import Selected from '~/components/form-controls-dashboard/Selected.vue'
import Autocomplete from '~/components/form-controls-dashboard/Autocomplete.vue'
import TableOrders from '~/components/reports/TableOrders.vue'
// import ClientsTableSample from '@/components/ClientsTableSample'
export default {
  name: 'Home',
  components: {
    //  ClientsTableSample,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    DatePicker,
    Selected,
    Autocomplete,
    TableOrders,
  },
  layout: 'admin',
  middleware: ['check-auth', 'auth-jwt'],
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
      categoryList: [
        {
          id: '',
          name: 'Todos',
          url: '',
        },
        {
          id: 1,
          name: 'Gastronomía',
          imgUrl: 'https://img.icons8.com/office/80/000000/dining-room.png',
        },
        {
          id: 2,
          name: 'Farmacia',
          imgUrl:
            'https://img.icons8.com/external-becris-solid-becris/64/000000/external-medical-literary-genres-becris-solid-becris.png',
        },
        {
          id: 3,
          name: 'Licorería',
          imgUrl:
            'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-drink-grocery-flatart-icons-flat-flatarticons-1.png',
        },
        {
          id: 4,
          name: 'Almacén',
          imgUrl:
            'https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/64/000000/external-store-urban-living-inipagistudio-lineal-color-inipagistudio.png',
        },
        {
          id: 5,
          name: 'Librería',
          imgUrl:
            'https://img.icons8.com/ultraviolet/80/000000/library--v2.png',
        },
        {
          id: 6,
          name: 'PetShop',
          imgUrl:
            'https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-petshop-shop-and-store-wanicon-flat-wanicon.png',
        },
        {
          id: 7,
          name: 'Ferretería',
          imgUrl:
            'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-tools-automobile-kiranshastry-lineal-color-kiranshastry.png',
        },
        {
          id: 8,
          name: 'Mercado',
          imgUrl: 'https://img.icons8.com/dusk/64/000000/marketplace-hub.png',
        },
        {
          id: 9,
          name: 'Súper Mercado',
          imgUrl:
            'https://img.icons8.com/external-becris-flat-becris/64/000000/external-market-business-world-becris-flat-becris.png',
        },
        {
          id: 10,
          name: 'Tienda',
          imgUrl:
            'https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-fish-market-shop-and-store-wanicon-lineal-color-wanicon.png',
        },
      ],
      category: null,
      countryList: [
        {
          id: 1,
          name: 'Bolivia',
        },
      ],
      country: null,
      cityList: [
        {
          id: 1,
          name: 'La Paz',
        },
        {
          id: 2,
          name: 'Cochabamba',
        },
        {
          id: 3,
          name: 'Santa Cruz',
        },
        {
          id: 4,
          name: 'Oruro',
        },
        {
          id: 5,
          name: 'Potosi',
        },
        {
          id: 6,
          name: 'Chuquisaca',
        },
        {
          id: 7,
          name: 'Tarija',
        },
        {
          id: 8,
          name: 'Beni',
        },
        {
          id: 9,
          name: 'Pando',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Dashboard — Admin',
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Dashboard']
    },
  },
  mounted() {
    this.fillChartData()

    this.$buefy.snackbar.open({
      message: 'Bienvenido!',
      queue: false,
    })
  },
  methods: {
    categorySelected(eventValue) {
      // eslint-disable-next-line no-console
      console.log('categorySelected ', eventValue)
      this.category = eventValue
    },
    countrySelected(eventValue) {
      // eslint-disable-next-line no-console
      console.log('countrySelected ', eventValue)
      this.country = eventValue
    },
    randomChartData(n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
    },
    fillChartData() {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Gastronomía',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Licorería',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(139,103,239,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Almacén',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.yellow,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.yellow,
            pointBorderColor: 'rgba(0,100,25,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.yellow,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Librería',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.orange,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.orange,
            pointBorderColor: 'rgba(0,0,80,0.5)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.orange,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'PetShop',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.purple,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.purple,
            pointBorderColor: 'rgba(89,25,60,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.purple,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Ferretería',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.brown,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.brown,
            pointBorderColor: 'rgba(79,25,25,0.3)',
            pointHoverBackgroundColor: chartConfig.chartColors.default,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Mercado',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Súper Mercado',
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.green,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.green,
            pointBorderColor: 'rgba(255,90,50,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.green,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
            label: 'Tienda',
          },
        ],
        labels: [
          '01/05/21',
          '20/05/21',
          '15/06/21',
          '18/07/21',
          '01/08/21',
          '06/08/21',
          '07/09/21',
          '27/09/21',
          '04/10/21',
        ],
      }
    },
  },
}
</script>
