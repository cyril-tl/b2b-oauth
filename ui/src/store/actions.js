import notificationManager from '../helpers/notificationManager'
import loginRepository from '../repository/login'
import productRepository from '../repository/products'
import userRepository from '../repository/users'
import cartRepository from '../repository/cart'
import gedRepository from '../repository/ged'
import gpaoRepository from '../repository/gpao'
import homeRepository from '../repository/home'
import otlRepository from '../repository/otl'
import router from '../router'
import moment from 'moment'
//import login from '../repository/login'

const addLine = async (token, cart, params, context) => {
  let lignes = [
    {
      "CODE_ARTICLE": params.article.id,
      "QTE": params.quantity,
    }
  ]
  if (params.article.com !== undefined) {
    lignes[0].COMM = params.article.com
  }
  let body = {
    "ACTION": "CREATION",
    "PANIER_ID": cart.PANIER_ID,
    "LIGNES": lignes
  }
  let result = await cartRepository.initLCart(token, body).then(async function (res) {
    let code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur ajout article', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur ajout article', 'Veuillez vous reconnecter')
    } else {
      const data = {
        token: token,
        id: cart.PANIER_ID
      }
      await getLinesCart(context, data)
      return true
    }
  })
  return result
}

const addLineCart = async (context, params) => {
  let cart = JSON.parse(localStorage.getItem('cartInfos'))
  const user = await JSON.parse(localStorage.getItem('userInfos'))
  const token = params.token;
  let result
  if (!cart) {
    const body = {
      "ACTION": "CREATION",
      "FACTURATION": {
        "NOM": user.FACTURATION.NOM,
        "RUE1": user.FACTURATION.RUE1,
        "RUE2": user.FACTURATION.RUE2,
        "VILLE": user.FACTURATION.VILLE,
        "CODEPOSTAL": user.FACTURATION.CODEPOSTAL,
        "CODEPAYS": user.FACTURATION.CODEPAYS,
        "CONTACT": {
          "NOM": user.FACTURATION.CONTACT.NOM,
          "TEL": user.FACTURATION.CONTACT.TEL,
          "MAIL": user.FACTURATION.CONTACT.MAIL,
        }
      },
      "LIVRAISON": {
        "NOM": user.LIVRAISON.NOM,
        "RUE1": user.LIVRAISON.RUE1,
        "RUE2": user.LIVRAISON.RUE2,
        "VILLE": user.LIVRAISON.VILLE,
        "CODEPOSTAL": user.LIVRAISON.CODEPOSTAL,
        "CODEPAYS": user.LIVRAISON.CODEPAYS,
        "CONTACT": {
          "NOM": user.LIVRAISON.CONTACT.NOM,
          "TEL": user.LIVRAISON.CONTACT.TEL,
          "MAIL": user.LIVRAISON.CONTACT.MAIL,
        }
      }
    }
    cartRepository.initECart(token, body).then(async function (res) {
      let code = res.data.code
      if (code !== 0) {
        if (code !== 402)
          notificationManager.openNotificationWithIcon('error', 'Initialisation panier impossible', res.data.description)
        else
          removeToken(context)
        notificationManager.openNotificationWithIcon('error', 'Initialisation panier impossible', 'Veuillez vous reconnecter')
      } else {
        const cart = await res.data.data
        context.commit('SET_CART', cart)
        localStorage.setItem('cartInfos', JSON.stringify(cart))
        result = await addLine(token, cart, params, context)
      }
    })
  } else {
    const cart = await context.state.cart;
    result = await addLine(token, cart, params, context)
  }
  return result
}

const changePassword = async (context, email) => {
  await userRepository.forgotPassword(email).then(async function (res) {
    let code = res.data.code
    if (code !== 0) {
      if (code >= 5 && code <= 9) {
        notificationManager.openNotificationWithIcon('error', 'Demande impossible', res.data.description)
      } else {
        // console.log(res.data.description)
      }
    }
    else {
      router.push({ name: 'SendMailAccount', params: { message: 'réinitialiser votre mot de passe.' } })
    }
  })
}

const checkcartInfo = async (context, token) => {
  const body = {
    "ACTION": "ENUMERATION_UTILISATEUR",
    "CLOTURE": 2
  }
  await cartRepository.enumECart(token, body).then(async function (res) {
    let code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Information du panier', res.data.description)
      else {
        removeToken(context)
        notificationManager.openNotificationWithIcon('error', 'Information du panier', 'Veuillez vous reconnecter')
      }
    }
    else {
      let cart = res.data.data
      if (cart !== null) {
        const openCart = cart.find(el => el.CLOTURE === false);
        if (openCart !== undefined) {
          await context.commit('SET_CART', cart.find(el => el.CLOTURE === false))
          await context.commit('SET_CART_STATUS', 'Panier en cours')
          localStorage.setItem('cartInfos', JSON.stringify(openCart))
          // console.log('toto ' + JSON.stringify(openCart));
        }
      } else {
        // console.log('tata');
        await context.commit('SET_CART_STATUS', 'Pas de panier en cours')
      }
    }
  })
}

const createUserAccount = async (context, createUserData) => {
  await userRepository.createAccount(createUserData).then(async function (res) {
    let code = res.data.code
    if (code !== 0) {
      if (code === 5 || code === 4) {
        notificationManager.openNotificationWithIcon('error', res.data.description, 'Merci de vérifier les éléments saisis.')
      } else if (code === 100) {
        notificationManager.openNotificationWithIcon('error', 'Erreur lors de l\'envoi du mail', 'Merci de réessayer la création du compte. En cas de problème merci de contacter l\'administrateur du site.')
      } else {
        // console.log(res.data.description)
      }
    }
    else {
      router.push({ name: 'SendMailAccount', params: { message: 'finaliser la création de votre compte.' } })
    }
  })
}

const deleteLineCart = async (context, params) => {
  const body = {
    "ACTION": "SUPPRESSION",
    "PANIER_ID": params.cartId,
    "LIGNES": [{ "LIGNE_ID": params.lineId }]
  }
  let result = await cartRepository.deleteLCart(params.token, body).then(async function (res) {
    let code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur suppression article', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur suppression article', 'Veuillez vous reconnecter')
    } else {
      const data = {
        token: params.token,
        id: params.cartId
      }
      await getLinesCart(context, data)
      return true
    }
  })
  return result
}

const downloadDoc = async (context, params) => {
  const body = {
    "DOC_ID": params.docId
  }
  let result = ''
  await gedRepository.downloadDocument(params.token, body).then(async function (res) {
    if (res.statusText !== 'OK') {
      let code = res.data.code
      if (code !== 0) {
        if (code !== 402)
          notificationManager.openNotificationWithIcon('error', 'Téléchargement du fichier', res.data.description)
        else
          removeToken(context)
        notificationManager.openNotificationWithIcon('error', 'Téléchargement du fichier', 'Veuillez vous reconnecter')
      }
    } else {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      let name = params.titleFile.split('(')
      name = name[0].trim() + '_' + params.doc
      link.setAttribute('download', name + '.pdf')
      document.body.appendChild(link);
      link.click();
      result = res.data
    }
  })
  return result
}

const downloadFile = async (context, params) => {
  const body = {
    "FICHIER_ID": params.docId
  }
  let result = ''
  await productRepository.downloadFile(params.token, body).then(async function (res) {
    if (res.statusText !== 'OK') {
      let code = res.data.code
      if (code !== 0) {
        if (code !== 402)
          notificationManager.openNotificationWithIcon('error', 'Téléchargement du fichier', res.data.description)
        else
          removeToken(context)
        notificationManager.openNotificationWithIcon('error', 'Téléchargement du fichier', 'Veuillez vous reconnecter')
      }
    } else {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', params.titleFile);
      document.body.appendChild(link);
      link.click();
      result = res.data
    }
  })
  return result
}

const getContactsInfos = async (context, token) => {
  await userRepository.getContacts(token).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des contacts', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des codes pays', 'Veuillez vous reconnecter')
    } else {
      const contacts = res.data.data
      localStorage.setItem('contactsInfos', JSON.stringify(contacts))
    }
  })
}

const getCountries = async (context, token) => {
  const body = {
    "ACTION": "CODE_PAYS"
  }
  await userRepository.getUserCountries(token, body).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des codes pays', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des codes pays', 'Veuillez vous reconnecter')
    } else {
      const countries = res.data.data.VALEURS
      localStorage.setItem('countriesInfos', JSON.stringify(countries))
    }
  })
}

const getDatesFermees = async (context, token) => {
  // console.log("getting closure dates...")
  const body = {
    "ACTION": "DATEFERMEES"
  }
  await cartRepository.getDatesFermees(token, body).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des dates de fermeture', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des dates de fermeture', 'Veuillez vous reconnecter')
    } else {
      // console.log("got closure dates!");
      const dates = res.data.data
      localStorage.setItem('datesFermees', JSON.stringify(dates))
    }
  })
}

const getDeliveryAddress = async (context, token) => {
  await userRepository.getDeliveryAddress(token).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      if (code === 402) {
        notificationManager.openNotificationWithIcon('error', 'Erreur', 'Veuillez vous reconnecter')
        removeToken(context)
      }
    } else {
      const address = res.data.data
      localStorage.setItem('deliveryAddress', JSON.stringify(address))
    }
  })
}

const getEstimerDelai = async (context, params) => {
  let data = [];
  await gpaoRepository.getEstimerDelai(params.token, params.body).then(async function (res) {
    const code = res.data.code
    // console.log("res extracost " + JSON.stringify(data))
    if (code !== 0) {
      console.log("error getting delay!");
      if (code === 402) {
        notificationManager.openNotificationWithIcon('error', 'Erreur', 'Veuillez vous reconnecter')
        removeToken(context)
      }
      else {
        notificationManager.openNotificationWithIcon("error", "Erreur de calcul de l'adresse de livraison",
          "La date sera ajustée par l'équipe commerciale lors de la validation");
      }
      return data;
    } else {
      let test = [];
      res.data.data.ARTICLES.forEach((article) => test.push(
        {
          "CODE_ARTICLE": article.CODE_ARTICLE.trim().replace('"', ""),
          "DATE_LIVRAISON": article.DATE_LIVRAISON.trim().replace('"', "")
        },
      ));
      localStorage.setItem('estimerDelai', JSON.stringify(test))
      res.data.data.ARTICLES.forEach((article) => data.push(article.DATE_LIVRAISON.replace('"', "")));
      return data;
    }
  })
    .catch(function (error) {
      notificationManager.openNotificationWithIcon('error', 'Erreur lors de la récupération du délai', 'Veuillez réessayer ultérieurement ou demandez de l\'aide');
      return { code: 911, description: "Erreur", data: error };
    })
  return data;
}

const getExtracost = async (context, params) => {
  // console.log("getting extra cost...")
  let data = {};
  const body = {
    "PANIER_ID": params.PANIER_ID,
    "CLIENT_CODE": params.CLIENT_CODE,
    "DATE_LIVRAISON": params.DATE_LIVRAISON,
    "MAILS": params.MAILS,
    "LIVRAISON": params.livraison,
  }
  await cartRepository.getExtracostOrder(params.token, body).then(async function (res) {
    data = res.data
    const code = data.code
    // console.log("res extracost " + JSON.stringify(data))
    if (code !== 0) {
      console.log("error getting extra cost!");
      if (code === 402) {
        notificationManager.openNotificationWithIcon('error', 'Erreur', 'Veuillez vous reconnecter')
        removeToken(context)
      }
      // else {
      //   let descr = "";
      //   if (code === 15) { descr = "Le port n'a pas pu être déterminé. Il sera ajusté par l'équipe commerciale lors de la validation" }
      //   else if (code === 16) { descr = "Le port doit être déterminé par le service commercial." }
      //   else { descr = res.data.description }
      //   notificationManager.openNotificationWithIcon('error', 'Erreur de récupération du surcoût', descr);
      // }
      return data;
    } else {
      return data;
    }
  })
    .catch(function (error) {
      // console.log(error);
      notificationManager.openNotificationWithIcon('error', 'Erreur lors de la récupération du surcoût', 'Veuillez réessayer ultérieurement ou demandez de l\'aide');
      return { code: 911, description: "Erreur", data: error };
    })
  return data;
}

const getFilesList = async (context, token) => {
  await productRepository.getAllFiles(token).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des codes pays', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des codes pays', 'Veuillez vous reconnecter')
    } else {
      const files = res.data.data
      localStorage.setItem('filesInfos', JSON.stringify(files))
    }
  })
}

const getHomeContent = async (context, token) => {
  const body = {
    "ACTION": "ACCEUIL"
  }
  await homeRepository.getHomeData(token, body).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur de récupération de l\'accueil', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur de récupération de l\'accueil', 'Veuillez vous reconnecter')
    } else {
      const homeContent = res.data.data.VALEURS
      localStorage.setItem('homeContent', JSON.stringify(homeContent))
    }
  })
}

const getLinesCart = async (context, params) => {
  // console.log('entrée getLinesCart')
  let result = []
  const body = {
    "ACTION": "LECTURE",
    "PANIER_ID": params.id
  }
  await cartRepository.readLCart(params.token, body).then(async function (res) {
    //localStorage.setItem('GetLineCart', JSON.stringify(res.data))
    let code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Récupération du panier 1', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Récupération du panier 2', 'Veuillez vous reconnecter')
    } else {
      const linesCart = res.data.data.LIGNES
      if (linesCart !== undefined) {
        await context.commit('SET_LINE_CART', linesCart)
        localStorage.setItem('linesCartInfos', JSON.stringify(linesCart))
        result = linesCart
      } else {
        await context.commit('SET_LINE_CART', [])
        // localStorage.removeItem('cartInfos', []);
        localStorage.setItem('linesCartInfos', [])
      }
    }
  })
  // console.log('sortie getLinesCart')
  return result
}

const getEnteteCart = async (context, params) => {
  // console.log('entrée getLinesCart')
  let result = { code: -1 };
  const body = {
    "ACTION": "LECTURE",
    "PANIER_ID": params.id
  }
  await cartRepository.readECart(params.token, body).then(async function (res) {
    // console.log('getEntete', JSON.stringify(res.data.code));
    let code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Lecture en-tête du panier', 'Panier déjà validé ou supprimé')
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Lecture en-tête du panier', 'Veuillez vous reconnecter')
    } else {
      result = res.data;
    }
  })
  // console.log('sortie getLinesCart')
  return result;
}

function getOnlyNewestDocs(data) {
  let docs = {
    NUMDOC: data.NUMDOC,
    OFFRE: [],
    COMMANDE: [],
    BL: [],
    FACTURE: [],
    AVOIR: []
  };
  if (data.OFFRE.length > 0) { docs.OFFRE.push(data.OFFRE[data.OFFRE.length - 1]) }
  if (data.COMMANDE.length > 0) { docs.COMMANDE.push(data.COMMANDE[data.COMMANDE.length - 1]) }
  if (data.BL.length > 0) { docs.BL.push(data.BL[data.BL.length - 1]) }
  if (data.FACTURE.length > 0) { docs.FACTURE.push(data.FACTURE[data.FACTURE.length - 1]) }
  if (data.AVOIR.length > 0) { docs.AVOIR.push(data.AVOIR[data.AVOIR.length - 1]) }
  return docs;
}
const getOrderList = async (context, token) => {
  const body = {
    "ACTION": "ENUMERATION_UTILISATEUR",
    "FIN": moment().add(1, 'days').format("YYYY-MM-DD"),
    "CLOTURE": 1
  }
  await cartRepository.enumECart(token, body).then(async function (res) {
    const carts = res.data.data
    let data = null
    if (carts !== null) {
      data = await Promise.all(carts.map(async item => {
        const body = {
          "ACTION": "LISTE_PANIER",
          "PANIER_ID": item.PANIER_ID
        }
        return gedRepository.getAllDocuments(token, body).then(res => {
          const resp = {
            cart: item,
            // garder seulement le dernier doc de chaque catégorie
            docs: getOnlyNewestDocs(res.data.data[0])
          }
          return resp
        })
      }))
      localStorage.setItem('ordersInfos', JSON.stringify(data))
    }
    return data
  })
}

const getProducts = async (context, token) => {
  let result = ''
  await productRepository.getAllProducts(token).then(async (res) => {
    // const body = {
    //   "CONDITION": "GRE*80*190"
    // }
    //const search = await productRepository.searchProducts(token, body)
    //console.log(search)
    const code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des produits', res.data.description)
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur de récupération des produits', 'Veuillez vous reconnecter')
    } else {
      const gammes = res.data.data.GAMMES
      context.commit('SET_GAMMES', gammes)
      const gammesInfos = gammes.map(data => {
        return {
          id: data.ID,
          lib: data.LIB,
          color: data.COULEUR
        }
      })
      context.commit('SET_GAMMES', gammes)
      localStorage.setItem('gammesInfos', JSON.stringify(gammesInfos))
      const articles = res.data.data.ARTICLES.AUTORISER
      context.commit('SET_ARTICLES', articles)
      result = {
        gammes: gammes,
        articles: articles
      }
    }
  })
  return result
}

const getCSVProductsList = async (context, params) => {
  let result = ''
  const body = {
    "CLIENT_CODE": params.client_code,
    "FORMAT": "CSV",
  }
  await productRepository.downloadProductsList(params.token, body)
    .then(async (res) => {
      // console.log(res.data)
      // console.log('csv list in progress')
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv;charset=utf-8;' }));
      const link = document.createElement('a');
      link.href = url;
      let name = 'THIRIEZ-LITERIE-LISTE-DES-PRODUITS'
      link.setAttribute('download', name + '.csv')
      document.body.appendChild(link);
      link.click();
      result = res.data
    })
    .catch(function (error) {
      // console.log(error);
      notificationManager.openNotificationWithIcon('error', 'Erreur lors de la récupération du fichier', 'Veuillez réessayer ultérieurement ou demandez de l\'aide (' + error + ')');
    })
  return result
}

const getTokenProperties = async (context, credentials) => {
  localStorage.clear()
  sessionStorage.clear()
  await loginRepository.login(credentials.username, credentials.password)
    .then(async res => {
      // const description = res.data.description
      const code = res.data.code

      sessionStorage.setItem('tokenProperties', JSON.stringify(res.data))
      // console.log("description depuis getTokenProp : " + description)
      // console.log("code depuis getTokenProp : " + code)

      if (code !== 0) {
        if (code == 402) {
          removeToken(context)
        }
        // if(code !== 402){
        //   if(code !== 8){
        //     notificationManager.openNotificationWithIcon('error', 'Erreur d\'identification', description)
        //   }
        //   else {
        //     notificationManager.openNotificationWithIcon('error', 'Erreur d\'identification', description)
        //   }
        // }
        // else {
        //   removeToken(context)
        // } 
      }
      else {
        const tokenData = res.data.data.ACCESSTOKEN
        context.commit('SET_TOKEN_PROPERTIES', tokenData)
        //localStorage.setItem('tokenInfos', JSON.stringify(tokenData))
        sessionStorage.setItem('tokenInfos', JSON.stringify(tokenData))
        await userRepository.getUserInfo(credentials.username)
          .then(res => {
            const code = res.data.code
            if (code !== 0) {
              if (code !== 402)
                notificationManager.openNotificationWithIcon('error', 'Erreur de récupération de données', 'Une erreur est survenue lors de la récupération des informations de l\'utilisateur')
              else
                removeToken(context)
              notificationManager.openNotificationWithIcon('error', 'Erreur de récupération de données', 'Veuillez vous reconnecter')
            } else {
              const user = res.data.data
              context.commit('SET_USER', user)
              localStorage.setItem('userInfos', JSON.stringify(user))
            }
          })
        //router.push('/accueil', () => {})
      }
    })
}

const removeToken = (context) => {
  localStorage.clear()
  sessionStorage.clear()
  context.commit('REMOVE_TOKEN')
  router.push('/login', () => { })
}

const sendEmail = async (context, params) => {
  await otlRepository.sendEmail(params.token, params.body).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      console.log(res.data);
      if (code !== 402) {
        return;
        // notificationManager.openNotificationWithIcon('error', 'Erreur à l\'envoi de l\'email', res.data.description)
      }
      else {
        removeToken(context)
        // notificationManager.openNotificationWithIcon('error', 'Erreur 402', 'Veuillez vous reconnecter')
      }
    } else {
      return;
      // notificationManager.openNotificationWithIcon('success', 'Frais de port indéterminé : Un email a été envoyé à l\'équipe technique.', res.data.description)
    }
  })
}

const setHeaderTitle = async (context, headerTitle) => {
  await context.commit('SET_HEADER_TITLE', headerTitle)
}

const updateUserInfos = async (context, user) => {
  const infos = {
    livraison: user.livraison
  }
  await userRepository.updateUserInfos(user.email, infos).then(async function (res) {
    const code = res.data.code
    if (code !== 0) {
      if (code !== 402)
        notificationManager.openNotificationWithIcon('error', 'Erreur de récupération de données', 'Une erreur est survenue lors de la récupération des informations de l\'utilisateur')
      else
        removeToken(context)
      notificationManager.openNotificationWithIcon('error', 'Erreur de récupération de données', 'Veuillez vous reconnecter')
    } else {
      const user = res.data.data
      context.commit('SET_USER', user)
      localStorage.setItem('userInfos', JSON.stringify(user))
      notificationManager.openNotificationWithIcon('success', 'Modification de profil', res.data.description)
    }
  })
}

const updateLineCart = async (context, params) => {
  let cartId = JSON.parse(localStorage.getItem('cartInfos')).PANIER_ID
  let body = {
    "ACTION": "MODIFICATION",
    "PANIER_ID": cartId,
    "LIGNES": [
      {
        "LIGNE_ID": params.article.id,
        "CODE_ARTICLE": params.article.codeArticle,
        "QTE": params.quantity
      }
    ]
  }

  if (params.article.com !== undefined) {
    body.LIGNES[0].COMM = params.article.com
  }
  let result = await cartRepository.updateLCart(params.token, body)
    .then(async res => {
      let code = res.data.code
      if (code !== 0) {
        if (code !== 402)
          notificationManager.openNotificationWithIcon('error', 'Modification impossible', res.data.description)
        else
          removeToken(context)
        notificationManager.openNotificationWithIcon('error', 'Modification impossible', 'Veuillez vous reconnecter')
      }
      else {
        const data = {
          token: params.token,
          id: cartId
        }
        // await getLinesCart(context, data).then(res => {
        //   if (res !== '') {
        //     result = true
        //   }
        // })
        await getLinesCart(context, data)
        return true
      }
    })
  return result
}

const validateCart = async (context, params) => {
  let result = false

  const userInfos = JSON.parse(localStorage.getItem("userInfos"));
  // console.log('login ' + test.LOGIN)
  let body = {
    "PANIER_ID": params.id,
    "DATE_LIVRAISON": params.deliveryDate,
    "LIVRAISON": params.livraison,
    "REFCDE": params.refCde,
    "MAILS": [userInfos.LOGIN]
  }
  await cartRepository.validateCart(params.token, body)
    .then(async res => {
      let code = res.data.code
      if (code !== 0) {
        if (code !== 402) {
          notificationManager.openNotificationWithIcon('error', 'Erreur lors de la validation du panier', res.data.description)
        }
        else {
          removeToken(context)
          notificationManager.openNotificationWithIcon('error', 'Erreur lors de la validation du panier', 'Vérifiez la validité des informations saisies')
        }
      }
      else {
        await context.commit('VALIDATE_CART')
        localStorage.removeItem('cartInfos')
        localStorage.removeItem('linesCartInfos')
        result = res.data.data
      }
    })
  return result
}

export default {
  addLine,
  addLineCart,
  changePassword,
  checkcartInfo,
  createUserAccount,
  deleteLineCart,
  downloadDoc,
  downloadFile,
  getCSVProductsList,
  getContactsInfos,
  getCountries,
  getDatesFermees,
  getDeliveryAddress,
  getEstimerDelai,
  getExtracost,
  getFilesList,
  getHomeContent,
  getLinesCart,
  getOrderList,
  getEnteteCart,
  getProducts,
  getTokenProperties,
  removeToken,
  sendEmail,
  setHeaderTitle,
  updateLineCart,
  updateUserInfos,
  validateCart
}