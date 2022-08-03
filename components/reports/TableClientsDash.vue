<template>
  <section>
    <!-- <b-field grouped group-multiline>
      <b-select v-model="defaultSortDirection">
        <option value="asc">Default sort direction: ASC</option>
        <option value="desc">Default sort direction: DESC</option>
      </b-select>
      <b-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </b-select>
      <div class="control">
        <b-button
          label="Set page to 2"
          :disabled="!isPaginated"
          @click="currentPage = 2"
        />
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginated">Paginated</b-switch>
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginationSimple" :disabled="!isPaginated"
          >Simple pagination</b-switch
        >
      </div>
      <div class="control is-flex">
        <b-switch v-model="isPaginationRounded" :disabled="!isPaginated"
          >Rounded pagination</b-switch
        >
      </div>
      <b-select v-model="paginationPosition" :disabled="!isPaginated">
        <option value="bottom">bottom pagination</option>
        <option value="top">top pagination</option>
        <option value="both">both</option>
      </b-select>
      <b-select v-model="sortIcon">
        <option value="arrow-up">Arrow sort icon</option>
        <option value="menu-up">Caret sort icon</option>
        <option value="chevron-up">Chevron sort icon</option>
      </b-select>
      <b-select v-model="sortIconSize">
        <option value="is-small">Small sort icon</option>
        <option value="">Regular sort icon</option>
        <option value="is-medium">Medium sort icon</option>
        <option value="is-large">Large sort icon</option>
      </b-select>
    </b-field> -->

    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="id"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        v-slot="props"
        field="id"
        label="ID"
        width="40"
        sortable
        numeric
      >
        {{ props.row.id }}
      </b-table-column>

      <b-table-column v-slot="props" field="first_name" label="Nombre" sortable>
        {{ props.row.first_name }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="last_name"
        label="Apellido"
        sortable
      >
        {{ props.row.last_name }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="date"
        label="Fecha"
        sortable
        centered
      >
        <span class="tag is-success">
          {{ new Date(props.row.date).toLocaleDateString() }}
        </span>
      </b-table-column>

      <b-table-column v-slot="props" label="Genero">
        <span>
          <b-icon
            pack="fas"
            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"
          >
          </b-icon>
          {{ props.row.gender }}
        </span>
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="providerId"
        label="Codigo Proveedor"
        sortable
      >
        {{ props.row.providerName }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="providerName"
        label="Proveedor"
        sortable
      >
        {{ props.row.providerName }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="serviceType"
        label="Servicio"
        sortable
      >
        {{ props.row.serviceType }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="category"
        label="Categoria"
        sortable
      >
        {{ props.row.category }}
      </b-table-column>
      <b-table-column v-slot="props" field="mount" label="Monto Total" sortable>
        {{ props.row.mount }}
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
// const data = require('@/data/sample.json')

export default {
  data() {
    const data = [
      {
        id: 1,
        first_name: 'Jesse',
        last_name: 'Simmons',
        date: '2016/10/15 13:43:27',
        gender: 'Male',
        providerId: 1,
        providerName: 'Tienda A',
        serviceType: 'Delivery', // and serviceId
        category: 'Tienda',
        mount: 230.0,
      },
      {
        id: 2,
        first_name: 'John',
        last_name: 'Jacobs',
        date: '2016/12/15 06:00:53',
        gender: 'Male',
        providerName: 'Pizza Planet',
        serviceType: 'Delivery', // and serviceId
        category: 'Gastronomia',
        mount: 230.0,
      },
      {
        id: 3,
        first_name: 'Tina',
        last_name: 'Gilbert',
        date: '2016/04/26 06:26:28',
        gender: 'Female',
        providerName: 'Sucursal A',
        serviceType: 'Delivery', // and serviceId
        category: 'Licoreria',
        mount: 30.0,
      },
      {
        id: 4,
        first_name: 'Clarence',
        last_name: 'Flores',
        date: '2016/04/10 10:28:46',
        gender: 'Male',
        providerName: 'Associados Taxi veloz', // Question ?
        serviceType: 'Taxi', // and serviceId
        category: 'Transporte',
        mount: 230.0,
      },
      {
        id: 5,
        first_name: 'Anne',
        last_name: 'Lee',
        date: '2016/12/06 14:38:38',
        gender: 'Female',
        providerName: 'Tienda A',
        serviceType: 'Mudanza', // and serviceId
        category: 'Transporte',
        mount: 1530.0,
      },
      {
        id: 6,
        first_name: 'Jonh',
        last_name: 'Joe',
        date: '2016/12/06 14:38:38',
        gender: 'Masculino',
        providerName: 'Edificio YYYY',
        serviceType: 'Alquiler', // and serviceId
        category: 'UNDEFINED',
        mount: 2230.0,
      },
    ]
    return {
      data,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'chevron-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5,
    }
  },
}
</script>
