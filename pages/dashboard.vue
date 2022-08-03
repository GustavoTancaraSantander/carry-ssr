<template>
  <div>
    <section class="section is-main-section">
      <HeroBar> Dashboard Servicios</HeroBar>
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
            <Selected :options="servicesList" :label="'Servicios'" />
          </div>
        </div>
        <div class="columns">
          <!-- <div class="column is-two-thirds">is-two-thirds</div> -->
          <div class="column">
            <Selected :options="countryList" :label="'Pais'" />
          </div>
          <div class="column">
            <Selected :options="cityList" :label="'Ciudad'" />
          </div>
          <div class="column is-4">
            <Autocomplete :label="'Busca tus Clientes'" />
          </div>
        </div>
      </div>
      <!-- Cards -->
      <tiles>
        <CardWidget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="512"
          label="Clientes"
        />
        <CardWidget
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          :number="7770"
          prefix="$"
          label="Monto Total"
        />
        <CardWidget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="256"
          label="Servicios realizados"
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

      <!-- <card-component title="Clients" class="has-table has-mobile-sort-spaced">
        <clients-table-sample
          :data-url="`${$router.options.base}data-sources/clients.json`"
        />
      </card-component> -->
      <CardComponent title="Clientes">
        <TableClientsDash />
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
import TableClientsDash from '~/components/reports/TableClientsDash.vue'
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
    TableClientsDash,
  },
  layout: 'admin',
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
      servicesList: [
        {
          id: '',
          name: 'Todos',
          url: '',
        },
        {
          id: 1, // categoryId for search/filter
          name: 'Delivery', // service
          url: 'https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-eating-healthy-food-and-vegan-justicon-flat-justicon.png',
        },
        {
          id: 2,
          name: 'Taxi',
          url: '',
        },
        {
          id: 3,
          name: 'Mensajería',
          url: '',
        },
        {
          id: 4,
          name: 'Auxilio Mecánico',
          url: '',
        },
        {
          id: 5,
          name: 'Ambulancia',
          url: '',
        },
        {
          id: 6,
          name: 'Mudanza',
          url: '',
        },
        {
          id: 7,
          name: 'Turismo',
          url: '',
        },
        {
          id: 8,
          name: 'Alquiler',
          url: '',
        },
      ],
      countryList: [
        {
          id: 1,
          name: 'Bolivia',
        },
      ],
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
      message: 'Welcome back',
      queue: false,
    })
  },
  methods: {
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
            label: 'Delivery',
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
            label: 'Taxi',
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
            label: 'Mensajería',
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
            label: 'Auxilio Mecánico',
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
            label: 'Ambulancia',
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
            label: 'Mudanza',
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
            label: 'Turismo',
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
            label: 'Alquiler',
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
