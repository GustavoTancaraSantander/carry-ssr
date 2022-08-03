export const state = () => ({
  countryList: [],
  countries: [],
  pagination: {},
})

export const getters = {
  getter_countryList: (state) => {
    return state.countryList.map(({ idpais, nombre }) => ({
      id: idpais,
      name: nombre,
    }))
  },
}

export const mutations = {
  SET_COUNTRY_LIST(state, payload) {
    state.countryList = payload
  },

  ADD_COUNTRY: (state, payload) => {
    state.countries.push(payload)
    state.pagination.totalCount++
  },
  EDIT_COUNTRY: (state, payload) => {
    const recordIndex = state.countries.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.countries.splice(recordIndex, 1, payload)
  },
  REMOVE_COUNTRY: (state, payload) => {
    const recordIndex = state.countries.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.countries.splice(recordIndex, 1)
    state.pagination.totalCount--
  },
  // For Index
  SET_COUNTRIES: (state, payload) => {
    state.countries = []
    state.countries = payload.map(
      // eslint-disable-next-line
      ({ idpais, nombre, code, codtel, estado, created_at }) => ({
        id: idpais,
        name: nombre, // BOLIVIA
        code, // BO
        phoneCode: codtel, // +591
        status: estado,
        createdAt: created_at, // TODO: pending
      })
    )
  },

  SET_PAGINATION_COUNTRIES: (state, payload) => {
    // Model Yii -> payload = data._meta
    state.pagination = {
      totalCount: payload.totalCount,
      pageCount: payload.pageCount,
      currentPage: payload.currentPage,
      perPage: payload.perPage,
    }
  },
}

export const actions = {
  async readingCountriesIndex({ rootState, commit, dispatch }, page = 1) {
    try {
      const { data } = await this.$axios.get(
        `/api/v1/paisciudad/search?PaisciudadSearch[idpaisx]=0&access-token=${rootState.token}&page=${page}`
      )
      commit('SET_COUNTRIES', data.items)
      commit('SET_PAGINATION_COUNTRIES', data._meta)
      return Promise.resolve(true)
    } catch (e) {
      dispatch('showAlertError', e, { root: true })
      return Promise.reject(e)
    }
  },
  async createCountry({ commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)
    // preparePayload send API
    const createdCountry = {
      ...formData,
      nombre: formData.name,
      codtel: formData.phoneCode,
      estado: formData.status,
      createdAt: new Date(),
    }
    // API -> endpoint {{urlcarry}}/api/v1/paisciudad?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$post(
        `/api/v1/paisciudad?access-token=${rootState.token}`,
        createdCountry
      )
      commit('ADD_COUNTRY', {
        ...createdCountry,
        id: data.idpais,
        createdAt: data.created_at,
      })
      dispatch('showAlertSuccess', 'CREATE', { root: true })
      return Promise.resolve(true)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async updateCountry({ commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)

    // preparePayload send API
    const updateCountry = {
      ...formData,
      nombre: formData.name,
      codtel: formData.phoneCode,
      estado: formData.status,
      updatedAt: new Date(),
    }

    // API -> endpoint {{urlcarry}}/api/v1/paisciudad/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$put(
        `/api/v1/paisciudad/${formData.id}?access-token=${rootState.token}`,
        updateCountry
      )
      commit('EDIT_COUNTRY', {
        ...updateCountry,
        id: data.idpais,
        updatedAt: data.updated_at,
      })
      dispatch('showAlertSuccess', 'UPDATE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async deleteCountry({ commit, dispatch, rootState }, id) {
    // API -> endpoint {{urlcarry}}/api/v1/paisciudad/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$delete(
        `/api/v1/paisciudad/${id}?access-token=${rootState.token}`
      )
      commit('REMOVE_COUNTRY', { id })
      dispatch('showAlertSuccess', 'DELETE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async getCountryList({ commit }) {
    // {{urlcarry}}/api/v1/public/paisciudad
    // ALTERNATIVE TEMP `/api/v1/paisciudad/search?PaisciudadSearch[idpaisx]=0&access-token=${rootState.token}`
    const data = await this.$axios.$get(`/api/v1/public/paisciudad`)
    commit('SET_COUNTRY_LIST', data) // TODO: pending refactor--fix api
  },
}
