export const state = () => ({
  latestCategory: null,
  subcategories: [],
  pagination: {},
})

export const getters = {}

export const mutations = {
  SET_LATEST_CATEGORY: (state, payload) => {
    state.latestCategory = payload // categoryId
  },

  ADD_SUBCATEGORY: (state, payload) => {
    state.subcategories.push(payload)
    state.pagination.totalCount++
  },
  EDIT_SUBCATEGORY: (state, payload) => {
    const recordIndex = state.subcategories.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.subcategories.splice(recordIndex, 1, payload)
  },
  REMOVE_SUBCATEGORY: (state, payload) => {
    const recordIndex = state.subcategories.findIndex((x) => x.id === payload.id)
    if (recordIndex !== -1) state.subcategories.splice(recordIndex, 1)
    state.pagination.totalCount--
  },
  SET_SUBCATEGORIES: (state, payload) => {
    state.subcategories = []
    if (payload)
      state.subcategories = payload.map(
        ({
          idcategorianegocio,
          categoriaNegocioId,
          nombre,
          imagen,
          descripcion,
          estado,
          // eslint-disable-next-line
          created_at,
        }) => ({
          id: idcategorianegocio,
          categoryId: categoriaNegocioId,
          name: nombre, // RESTAURANTE
          imageUrl: imagen, // TODO: pending
          description: descripcion, // TODO: pending
          status: estado, // TODO: pending
          createdAt: created_at,
        })
      )
  },

  SET_PAGINATION_SUBCATEGORIES: (state, payload) => {
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
  async getCategoriesByCategoryId({ rootState, commit, dispatch }, queryParams) {
    //  {{urlcarry}}/api/v1/categorianegocio/search?CategorianegocioSearch[categoriaNegocioId]=3&access-token={{tokencarry}}&page=1
    try {
      const { data } = await this.$axios.get(
        `/api/v1/categorianegocio/search?CategorianegocioSearch[categoriaNegocioId]=${queryParams.categoryId}&access-token=${rootState.token}&page=${queryParams.page}`
      )
      commit('SET_SUBCATEGORIES', data.items)
      commit('SET_LATEST_CATEGORY', queryParams.categoryId)
      commit('SET_PAGINATION_SUBCATEGORIES', data._meta)
      return Promise.resolve(true)
    } catch (e) {
      dispatch('showAlertError', e, { root: true })
      return Promise.reject(e)
    }
  },
  async createSubcategory({ state, commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)

    // preparePayload send API
    const createdSubcategory = {
      ...formData,
      categoriaNegocioId: parseInt(formData.categoryId), // if exist & send => insert Subcategory else insert Category
      nombre: formData.name,
      imagen: formData.imageUrl, // TODO: pending
      descripcion: formData.description, // TODO: pending
      estado: formData.status, // TODO: pending
      createdAt: new Date(),
    }

    // API -> endpoint {{urlcarry}}/api/v1/categorianegocio?access-token={{tokencarry}} [if send categoriaNegocioId => insert Subcategory]
    try {
      const data = await this.$axios.$post(
        `/api/v1/categorianegocio?access-token=${rootState.token}`,
        createdSubcategory
      )
      if (state.latestCategory === createdSubcategory.categoriaNegocioId) {
        commit('ADD_SUBCATEGORY', {
          ...createdSubcategory,
          id: data.idcategorianegocio,
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
  async updateSubcategory({ state, commit, dispatch, rootState }, dataForm) {
    const formData = this.$functionsUtils.cleanDataForm(dataForm)

    // preparePayload send API
    const updatedSubcategory = {
      ...formData,
      categoriaNegocioId: parseInt(formData.categoryId), // [if send categoriaNegocioId => update Category]
      nombre: formData.name,
      imagen: formData.imageUrl, // TODO: pending
      descripcion: formData.description, // TODO: pending
      estado: formData.status, // TODO: pending
      updatedAt: new Date(),
    }

    // API -> endpoint {{urlcarry}}/api/v1/categorianegocio/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$put(
        `/api/v1/categorianegocio/${formData.id}?access-token=${rootState.token}`,
        updatedSubcategory
      )
      if (state.latestCategory === updatedSubcategory.categoriaNegocioId) {
        commit('EDIT_SUBCATEGORY', {
          ...updatedSubcategory,
          id: data.idcategorianegocio, // <subcategoryId>
          categoryId: data.categoriaNegocioId, // <categoryId>
          updatedAt: data.updated_at,
        })
      } else {
        // run when @changed to other category
        commit('REMOVE_SUBCATEGORY', { id: updatedSubcategory.id }) // idcategorianegocio <> subcategoryId
      }
      dispatch('showAlertSuccess', 'UPDATE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
  async deleteSubcategory({ state, commit, dispatch, rootState }, { id, categoryId }) {
    // API -> endpoint {{urlcarry}}/api/v1/categorianegocio/1?access-token={{tokencarry}}
    try {
      const data = await this.$axios.$delete(
        `/api/v1/categorianegocio/${id}?access-token=${rootState.token}`
      )
      if (state.latestCategory === parseInt(categoryId)) {
        commit('REMOVE_SUBCATEGORY', { id })
      }
      dispatch('showAlertSuccess', 'DELETE', { root: true })
      return Promise.resolve(data)
    } catch (error) {
      dispatch('showAlertError', error, { root: true })
      return Promise.reject(error)
    }
  },
}
