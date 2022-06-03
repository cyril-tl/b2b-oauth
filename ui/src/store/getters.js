const getProducts = (state) => {
  const products = {
    articles: state.articles,
    gammes: state.gammes
  }
  return JSON.stringify(products)
}

const getUser = (state) => {
  return state.user
}

export default {
  getProducts,
  getUser
}