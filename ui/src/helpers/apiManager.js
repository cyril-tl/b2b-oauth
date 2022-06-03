
const checkResponseApi = (data) => {
  if(data.code !== 0) {
    return 'error'
  }
}

export default {
  checkResponseApi,
}