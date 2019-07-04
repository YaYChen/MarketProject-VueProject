export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    config.headers['X-Token'] = store.state.user.user.token
  })

  $axios.onError(error => {
    const code = parseInt(error.response.status)
    if (code === 401) {
      console.log('No auth')
    }
  })
}
