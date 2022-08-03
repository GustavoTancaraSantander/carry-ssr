export const state = () => ({
  categoryList: [],
  categories: [],
  pagination: {},
})

export const getters = {
  getter_categoryList: (state) => {
    return state.categoryList.map(({ idcategorianegocio, nombre }) => ({
      id: idcategorianegocio,
      name: nombre,
    }))
  },
}

export const mutations = {
  SET_CATEGORY_LIST(state, payload) {
    state.categoryList = payload
  },

  ADD_CATEGORY: (state, payload) => {
    state.categories.push(payload)
    state.pagination.totalCount++
  },
  EDIT_CATEGORY: (state, payload) => {
    const recordIndex = state.categories.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.categories.splice(recordIndex, 1, payload)
  },
  REMOVE_CATEGORY: (state, payload) => {
    const recordIndex = state.categories.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.categories.splice(recordIndex, 1)
    state.pagination.totalCount--
  },
  // For Index
  SET_CATEGORIES: (state, payload) => {
    state.categories = []
    state.categories = payload.map(
      ({
        idcategorianegocio,
        nombre,
        imagen,
        descripcion,
        estado,
        // eslint-disable-next-line
        created_at,
      }) => ({
        id: idcategorianegocio,
        name: nombre, // FARMACIA
        imageUrl: imagen, // TODO: pending
        description: descripcion, // TODO: pending
        status: estado,
        createdAt: created_at, // TODO: pending
      })
    )
  },

  SET_PAGINATION_CATEGORIES: (state, payload) => {
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
  async getCategoriesIndex({ rootState, commit, dispatch }, page = 1) {
    // {{urlcarry}}/api/v1/categorianegocio/search?CategorianegocioSearch[categoriaNegocioId]=null&access-token={{tokencarry}}&page=1
    try {
      const { data } = await this.$axios.get(
        `/api/v1/categorianegocio/search?CategorianegocioSearch[categoriaNegocioId]=null&access-token=${rootState.token}&page=${page}`
      )
      commit('SET_CATEGORIES', data.items)
      commit('SET_PAGINATION_CATEGORIES', data._meta)
      return Promise.resolve(true)
    } catch (e) {
      dispatch('showAlertError', e, { root: true })
      return Promise.reject(e)
    }
  },
  async createCategory({ commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)

    // preparePayload send API
    const createdCategory = {
      ...formData,
      nombre: formData.name,
      imagen: formData.imageUrl, // TODO: pending input file[0](blob)
      descripcion: formData.description, // TODO: pending
      estado: formData.status, // TODO: pending
      createdAt: new Date(),
    }

    // API -> endpoint {{urlcarry}}/api/v1/categorianegocio?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$post(
        `/api/v1/categorianegocio?access-token=${rootState.token}`,
        createdCategory
      )
      commit('ADD_CATEGORY', {
        ...createdCategory,
        id: data.idcategorianegocio,
        createdAt: data.created_at, // TODO: pending
      })
      dispatch('showAlertSuccess', 'CREATE', { root: true })
      return Promise.resolve(true)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async updateCategory({ commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)

    // preparePayload send API
    const updateCategory = {
      ...formData,
      nombre: formData.name,
      imagen: formData.imageUrl, // TODO: pending input file[0](blob)
      descripcion: formData.description, // TODO: pending
      estado: formData.status, // TODO: pending
      updatedAt: new Date(),
    }

    // API -> endpoint {{urlcarry}}/api/v1/categorianegocio/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$put(
        `/api/v1/categorianegocio/${formData.id}?access-token=${rootState.token}`,
        updateCategory
      )
      commit('EDIT_CATEGORY', {
        ...updateCategory,
        id: data.idcategorianegocio,
        updatedAt: data.updated_at,
      })
      dispatch('showAlertSuccess', 'UPDATE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async deleteCategory({ commit, dispatch, rootState }, id) {
    // API -> endpoint {{urlcarry}}/api/v1/categorianegocio/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$delete(
        `/api/v1/categorianegocio/${id}?access-token=${rootState.token}`
      )
      commit('REMOVE_COUNTRY', { id })
      dispatch('showAlertSuccess', 'DELETE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  // Used for subcategories
  async getCategoryList({ commit }) {
    // {{urlcarry}}/api/v1/public/categorianegocio
    const data = await this.$axios.$get(`/api/v1/public/categorianegocio`)
    commit('SET_CATEGORY_LIST', data) // TODO: pending refactor--fix api
  },
}
