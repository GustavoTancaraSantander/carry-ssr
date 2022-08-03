<template>
  <section>
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
      default-sort="date"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
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

      <b-table-column
        v-slot="props"
        field="first_name"
        label="Nombre Cliente"
        sortable
      >
        {{ props.row.first_name }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="last_name"
        label="Apellido Cliente"
        sortable
      >
        {{ props.row.last_name }}
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
        field="categoryName"
        label="Categoria"
        sortable
      >
        {{ props.row.categoryName }}
      </b-table-column>
      <b-table-column v-slot="props" field="paymentType" label="Pago" sortable>
        {{ props.row.paymentType }}
      </b-table-column>
      <b-table-column v-slot="props" field="total" label="Monto Total" sortable>
        {{ props.row.total }}
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
export default {
  data() {
    const data = [
      {
        date: '2016/10/15 13:43:27',
        id: 1,
        first_name: 'Jesse',
        last_name: 'Simmons',
        gender: 'Male',
        providerName: 'Tienda A', // providerId: 1,
        serviceType: 'Delivery', // and serviceId
        categoryName: 'Tienda',
        paymentType: 'Efectivo',
        total: 230.0,
      },
      {
        date: '2016/12/15 06:00:53',
        id: 2,
        first_name: 'John',
        last_name: 'Jacobs',
        gender: 'Male',
        providerName: 'Pizza Planet',
        serviceType: 'Delivery', // and serviceId
        categoryName: 'Gastronomia',
        paymentType: 'Efectivo',
        total: 230.0,
      },
      {
        date: '2016/04/26 06:26:28',
        id: 3,
        first_name: 'Tina',
        last_name: 'Gilbert',
        gender: 'Female',
        providerName: 'Sucursal A',
        serviceType: 'Delivery', // and serviceId
        categoryName: 'Licoreria',
        paymentType: 'Credito',
        total: 30.0,
      },
      {
        date: '2016/04/10 10:28:46',
        id: 4,
        first_name: 'Clarence',
        last_name: 'Flores',
        gender: 'Male',
        providerName: 'Farmacia Punto Blanco',
        serviceType: 'Delivery', // and serviceId
        categoryName: 'Farmacia',
        paymentType: 'Tarjeta',
        total: 230.0,
      },
      {
        date: '2016/12/06 14:38:38',
        id: 5,
        first_name: 'Anne',
        last_name: 'Lee',
        gender: 'Female',
        providerName: 'Tienda B',
        serviceType: 'Delivery', // and serviceId
        categoryName: 'Ropa',
        paymentType: 'Tarjeta',
        total: 1530.0,
      },
      {
        date: '2016/12/06 14:38:38',
        id: 6,
        first_name: 'Jonh',
        last_name: 'Joe',
        gender: 'Masculino',
        providerName: 'Super Mercado',
        serviceType: 'Delivery', // and serviceId
        categoryName: 'UNDEFINED',
        paymentType: 'Tarjeta',
        total: 2230.0,
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
