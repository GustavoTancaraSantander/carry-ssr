export const state = () => ({
  latestCountry: null,
  cities: [],
  pagination: {},
})

export const getters = {}

export const mutations = {
  ADD_CITY: (state, payload) => {
    state.cities.push(payload)
    state.pagination.totalCount++
  },
  EDIT_CITY: (state, payload) => {
    const recordIndex = state.cities.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.cities.splice(recordIndex, 1, payload)
  },
  REMOVE_CITY: (state, payload) => {
    const recordIndex = state.cities.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.cities.splice(recordIndex, 1)
    state.pagination.totalCount--
  },
  SET_LATEST_COUNTRY: (state, payload) => {
    state.latestCountry = payload // countryId
  },
  SET_CITIES: (state, payload) => {
    state.cities = []
    if (payload)
      state.cities = payload.map(
        // eslint-disable-next-line
        ({ idpais, idpaisx, nombre, code, codtel, estado, created_at }) => ({
          id: idpais,
          countryId: idpaisx,
          name: nombre, // LA PAZ
          code, // LP
          phoneCode: codtel, // 22
          status: estado,
          createdAt: created_at, // TODO: pending
        })
      )
  },
  SET_PAGINATION_CITIES: (state, payload) => {
    // Model Yii -> payload = data._meta
    state.pagination = {
      totalCount: payload.totalCount || 0,
      pageCount: payload.pageCount || 0,
      currentPage: payload.currentPage || 0,
      perPage: payload.perPage || 0,
    }
  },
}

export const actions = {
  async getCitiesByCountryId({ rootState, commit, dispatch }, queryParams) {
    // `/api/v1/paisciudad/search?PaisciudadSearch[idpaisx]=${this.countryId}&access-token=${this.$store.state.token}&page=${page}`
    try {
      const { data } = await this.$axios.get(
        `/api/v1/paisciudad/search?PaisciudadSearch[idpaisx]=${queryParams.countryId}&access-token=${rootState.token}&page=${queryParams.page}`
      )
      commit('SET_CITIES', data.items)
      commit('SET_LATEST_COUNTRY', queryParams.countryId)
      commit('SET_PAGINATION_CITIES', data._meta)
      return Promise.resolve(true)
    } catch (e) {
      dispatch('showAlertError', e, { root: true })
      return Promise.reject(e)
    }
  },
  async createCity({ state, commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)

    // preparePayload send API
    const createdCity = {
      ...formData,
      idpaisx: parseInt(formData.countryId),
      nombre: formData.name,
      codtel: formData.phoneCode,
      estado: formData.status,
      createdAt: new Date(),
    }

    // API -> endpoint {{urlcarry}}/api/v1/paisciudad?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$post(
        `/api/v1/paisciudad?access-token=${rootState.token}`,
        createdCity
      )

      if (state.latestCountry === createdCity.idpaisx) {
        commit('ADD_CITY', {
          ...createdCity,
          id: data.idpais,
          createdAt: data.created_at,
        })
      }
      dispatch('showAlertSuccess', 'CREATE', { root: true })
      return Promise.resolve(true)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async updateCity({ state, commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)

    // preparePayload send API
    const updatedCity = {
      ...formData,
      idpaisx: parseInt(formData.countryId),
      nombre: formData.name,
      codtel: formData.phoneCode,
      estado: formData.status,
      updatedAt: new Date(),
    }

    // API -> endpoint {{urlcarry}}/api/v1/paisciudad/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$put(
        `/api/v1/paisciudad/${formData.id}?access-token=${rootState.token}`,
        updatedCity
      )
      if (state.latestCountry === updatedCity.idpaisx) {
        commit('EDIT_CITY', {
          ...updatedCity,
          id: data.idpais,
          countryId: data.idpaisx,
          updatedAt: data.updated_at,
        })
      } else {
        // run when @changed to other country
        commit('REMOVE_CITY', { id: updatedCity.id }) // idpais <> cityId
      }
      dispatch('showAlertSuccess', 'UPDATE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async deleteCity({ state, commit, dispatch, rootState }, { id, countryId }) {
    // API -> endpoint {{urlcarry}}/api/v1/paisciudad/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$delete(
        `/api/v1/paisciudad/${id}?access-token=${rootState.token}`
      )
      // 'typeof' + typeof state.latestCountry + 'typeof' + typeof countryId
      if (state.latestCountry === parseInt(countryId)) {
        commit('REMOVE_CITY', { id })
      }
      dispatch('showAlertSuccess', 'DELETE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
}
