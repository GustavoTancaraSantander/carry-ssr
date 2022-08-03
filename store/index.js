import Cookies from 'js-cookie'

const structureDefaultAlert = () => ({
  type: undefined,
  show: false,
  title: 'Mensaje',
  message: '',
  validation: [],
  icon: '',
})
export const state = () => ({
  token: null,
  /* User */
  user: null,
  userPhone: null,
  userName: null,
  userLastname: null,
  userEmail: null,
  userAvatar: null,

  /* NavBar */
  isNavBarVisible: true,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false,

  /* Common */
  alert: structureDefaultAlert(),
  /* nuxtServerInit */
  loadedCategories: [],
})

export const mutations = {
  /* For Authentication REST JWT */
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  CLEAR_TOKEN(state) {
    state.token = null
  },

  /* User */
  SET_USER: (state, payload) => {
    state.user = payload
    if (payload) {
      if (payload.cellphone) {
        state.userPhone = payload.cellphone
      }
      if (payload.username) {
        state.userName = payload.username
      }
      if (payload.lastname) {
        state.userLastname = payload.lastname
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.img) {
        state.userAvatar = payload.img
      }
    } else {
      state.userPhone = null
      state.userName = null
      state.userLastname = null
      state.userEmail = null
      state.userAvatar = null
    }
  },

  /* A fit-them-all commit */
  basic(state, payload) {
    state[payload.key] = payload.value
  },

  /* Aside Mobile */
  asideMobileStateToggle(state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  },

  /* Common */
  SET_ALERT: (state, data) => {
    if (data.show) {
      state.alert.title = data.title ? data.title : 'Mensaje'
      state.alert.type = data.type
      state.alert.show = data.show
      state.alert.message = data.message
      state.alert.validation = data.validation
      // state.alert.icon = '$vuetify.icons.' + data.type // only custom vue-awesome
      state.alert.timeout = data.timeout
      // if (data.timeout)
      //   setTimeout(() => {
      //     state.alert.show = structureDefaultAlert() // -> [vuex] do not mutate vuex store state outside mutation handlers.
      //   }, data.timeout)
    } else {
      state.alert = structureDefaultAlert()
    }
  },
  /* nuxtServerInit */
  SET_CATEGORIES: (state, payload) => {
    state.loadedCategories = payload
  },
}

export const actions = {
  /* nuxtServerInit({ commit }, context) {
    return (
      // .get(process.env.baseURL + '/posts.json')
      context.app.$axios
        .$get('/api/categories-index')
        .then((data) => {
          // const categoriesArray = []
          // for (const key in data) {
          //   categoriesArray.push({ ...data[key], id: key })
          // }
          commit('SET_CATEGORIES', data)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('err', err)
        })
    )
  }, */
  initAuth({ commit, dispatch }, req) {
    let token
    let expirationDate
    // eslint-disable-next-line no-console
    // console.log('STORE', req)
    if (req) {
      // isServer
      if (!req.headers.cookie) return
      // eslint-disable-next-line no-console
      console.log('jwtCookie', req.headers.cookie)
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='))
      if (!jwtCookie) return
      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else {
      // isClient
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    this.$axios.setHeader('Authorization', `Bearer ${token}`)

    if (new Date().getTime() > +expirationDate || !token) {
      // eslint-disable-next-line no-console
      console.log('No token or invalid!')
      dispatch('logout')
      return
    }
    commit('SET_TOKEN', token)
  },
  async login({ commit }, authData) {
    try {
      // const authUrl = authData.isLogin ? '/api/login' : '/api/registro' //  do not implement (admin - only authLogin)
      const authUrl = authData.isLogin
        ? '/api/v1/auth/usuario'
        : '/api/registro' //  do not implement (admin - only authLogin)
      const preparePayload = {
        LoginForm: {
          username: authData.cellphone,
          password: authData.password,
        },
      }
      const data = await this.$axios.$post(authUrl, preparePayload)
      // eslint-disable-next-line no-console
      console.log('RES AUTH', data)
      commit('SET_TOKEN', data.access_token)
      commit('SET_USER', data)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem(
        'tokenExpiration',
        new Date().getTime() + Number.parseInt(data.expiresIn || '3600') * 10000
      )
      Cookies.set('jwt', data.access_token)
      Cookies.set(
        'expirationDate',
        new Date().getTime() + Number.parseInt(data.expiresIn || '3600') * 10000
      )
      this.$axios.setHeader(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      )
      return Promise.resolve(true)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('ws_login', e)
      return Promise.reject(e)
    }
  },
  async logout({ commit }) {
    try {
      // TODO: temporal don't exist endpoint Yii --pending
      /*  this.$axios.setHeader(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      )
      await this.$axios.$post('/api/logout') */
      commit('CLEAR_TOKEN')
      Cookies.remove('jwt')
      Cookies.remove('expirationDate')
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')
      }
      commit('SET_USER', null)
      await this.$axios.setHeader('Authorization', null)
      // this.$axios.setToken(false)
      return Promise.resolve(true)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error-logout', error.response)
      return Promise.reject(error)
    }
  },
  showAlertSuccess({ commit }, method) {
    commit('SET_ALERT', {
      type: 'is-success',
      show: true,
      message:
        method === 'CREATE'
          ? `Registro exitoso!`
          : method === 'UPDATE'
          ? `Actualización exitosa`
          : method === 'DELETE'
          ? `Eliminado con éxito`
          : `Operación exitosa`,
      // timeout: 4000,
    })
    // resolve issue -> [vuex] do not mutate vuex store state outside mutation handlers.
    setTimeout(() => {
      commit('SET_ALERT', {
        show: false,
      })
    }, 4000)
  },
  showAlertError({ commit }, error) {
    // eslint-disable-next-line no-console
    console.log('showAlertError', error) // TODO:custom error handler => e: {typeError, error}
    if (error.response) {
      const response = error.response
      const data = response.data
      if (response.status === 401) {
        commit('SET_ALERT', {
          type: 'is-info',
          show: true,
          message: `${data.message}`,
        })
        return Promise.reject(new Error('something bad happened 401'))
      }
      if (response.status === 403) {
        commit('SET_ALERT', {
          type: 'is-warning',
          show: true,
          message: data.message,
        })
        return Promise.reject(new Error('something bad happened 403'))
      }
      if (response.status === 404) {
        commit('SET_ALERT', {
          type: 'is-warning',
          show: true,
          message: `Recurso no encontrado/inexistente. Warning: ${data.message}`,
          timeout: 4000,
        })
        return Promise.reject(new Error('something bad happened 404'))
      }
      if (response.status === 422) {
        commit('SET_ALERT', {
          type: 'is-warning',
          show: true,
          message: `Verifique los datos:`,
          validation: data, // [{ field: respJSON.name, message: respJSON.message }]
          // timeout: data.length * 4000,
        })
        return Promise.reject(new Error('something bad happened 422'))
      }
      if (response.status === 500) {
        commit('SET_ALERT', {
          type: 'is-danger',
          show: true,
          message: `Error del servidor, inténtelo más tarde. Si persiste, comuníquese con su proveedor de software.`,
        })
        return Promise.reject(new Error('something bad happened 500'))
      }
      return Promise.reject(new Error('RESPONSE bad happened'))
    } else if (error.request) {
      // The request was made but no response was received
      const request = error.request
      commit('SET_ALERT', {
        type: 'is-danger',
        show: true,
        message: `Se realizó la solicitud pero no se recibió respuesta. inténtelo más tarde. Error: ${request.status}`, // 503
      })

      return Promise.reject(new Error('REQUEST bad happened'))
    } else {
      // Something happened in setting up the request that triggered an Error othercase
      commit('SET_ALERT', {
        type: 'is-danger',
        show: true,
        message: `Error de sistema, inténtelo más tarde. Si persiste, comuníquese con su proveedor de software. Error: ${error.message}`,
      })
      return Promise.reject(new Error('OTHERCASE bad happened'))
    }
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  },

  /* nuxtServerInit */
  getter_loadedCategories(state) {
    return state.loadedCategories
  },
}
