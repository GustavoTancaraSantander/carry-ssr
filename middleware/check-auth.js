export default function (context) {
  // eslint-disable-next-line no-console
  console.log('[middleware] Check Auth')
  if (process.client) {
    context.store.dispatch('initAuth', null)
    // eslint-disable-next-line no-console
    console.log('executing Log middleware run CLIENT', context)
  } else {
    context.store.dispatch('initAuth', context.req)
    // eslint-disable-next-line no-console
    console.log('executing Log middleware run SERVER')
  }
}
