export default function (context) {
  // eslint-disable-next-line no-console
  console.log('[middleware] Just Auth')
  if (!context.store.getters.isAuthenticated) {
    // context.redirect('/admin/auth') // important '/parent/child' vs 'parent/child' (added last route)
    context.redirect('/login') // important '/parent/child' vs 'parent/child' (added last route)
  }
}
