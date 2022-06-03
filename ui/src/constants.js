let clientId = '';
let clientSecret = '';

const mode = process.env.NODE_ENV;
if (mode === 'production') {
  clientId = process.env.VUE_APP_CLIENT_ID_PROD
  clientSecret = process.env.VUE_APP_CLIENT_SECRET_PROD
}
if (mode === 'development') {
  clientId = process.env.VUE_APP_CLIENT_ID_DEV
  clientSecret = process.env.VUE_APP_CLIENT_SECRET_DEV
}

export const API = {
  baseUrl: 'https://api.thiriez-literie.fr',
  clientId: clientId,
  clientSecret: clientSecret,
}

export const ENDPOINTS = {
  login: "/auth/token?grant_type=password&",
  userAccount: "/auth?call=v2",
  b2b: '/b2b',
  gpao: '/gpao',
  otl: '/otl'
}

export const HEADERS = {
  createUser: { 'API': 'CREAT_USER' },
  updateUser: { 'API': 'EDIT_USER' },
  epanier: 'EPANIER',
  lpanier: 'LPANIER',
  spanier: 'SPANIER',
  vpanier: 'VPANIER',
  readUser: { 'API': 'READ_USER' },
  forgotPassword: { 'API': 'FORGOT_PASSWORD' },
  b2b: 'LISTEARTICLE',
  divers: "CONSTANTES",
  gedListe: 'GED_DOC_LISTE',
  gedDocInfo: 'GED_DOC_JSON',
  gedDocDl: 'GED_DOC_DL',
  gpaoEstimerDelai: 'ESTIMERDELAI',
  otlEmail: 'EMAIL',
  ficDocListe: 'FIC_DOC_LISTE',
  ficDocDl: 'FIC_DOC_DL',
  //contacts: 'CONTACTS',
  contacts: 'CONTACTS_COMMERCE',
  deliveryAddress: 'CLIENT_ADR_LIVRAISON',
  datesFermees: "DATES",
  searchProduct: 'POURJEJE'
}