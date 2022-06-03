const SET_ARTICLES = (state, articles) => {
  state.articles = articles
}

const SET_CART = (state, cart) => {
  state.cart = cart
}

const SET_CART_STATUS = (state, cartStatus) => {
  state.cartStatus = cartStatus
}

const SET_GAMMES = (state, gammes) => {
  state.gammes = gammes
}

const SET_HEADER_TITLE = (state, headerTitle) => {
  state.headerTitle = headerTitle
}

const SET_LINE_CART = (state, linesCart) => {
  state.linesCart = linesCart
  state.linesCartLength = linesCart.length
}

const SET_TOKEN_PROPERTIES = (state, tokenData) => {
  state.token = tokenData
}

const SET_USER = (state, user) => {
  state.user = user
}

const REMOVE_TOKEN = (state) => {
  state.token = null
  state.user = null
  state.cart = null
}

const VALIDATE_CART = (state) => {
  state.cart = null,
  state.cartStatus = null,
  state.linesCart = [],
  state.linesCartLength = 0
}

export default {
  SET_ARTICLES,
  SET_CART,
  SET_CART_STATUS,
  SET_GAMMES,
  SET_HEADER_TITLE,
  SET_LINE_CART,
  SET_TOKEN_PROPERTIES,
  SET_USER,
  REMOVE_TOKEN,
  VALIDATE_CART
}