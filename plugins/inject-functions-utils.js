// https://nuxtjs.org/docs/directory-structure/plugins/#inject-in-root--context

/* export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('hello', msg => console.log(`Hello ${msg}!`))
} */
const functionsUtils = {
  name: 'Test',
  cleanDataForm(dataForm) {
    for (const prop in dataForm) {
      if (dataForm[prop] === null) {
        delete dataForm[prop]
      }
    }
    return dataForm
  },
}
export default ({ app }, inject) => {
  inject('functionsUtils', functionsUtils)
}

// export default (context, inject) => {
//   const hello = (msg) => console.log(`Hello ${msg}!`)
//   // Inject $hello(msg) in Vue, context and store.
//   inject('hello', hello)
//   // For Nuxt <= 2.12, also add 👇
//   context.$hello = hello
// }
