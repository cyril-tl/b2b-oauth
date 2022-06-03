import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import HomeComponent from '../components/Home.vue'
import CreateAccount from '../components/CreateAccount.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import Welcome from '../components/Welcome.vue'
import Products from '../components/Products.vue'
import Cart from '../components/CartStepper.vue'
import Orders from '../components/Orders.vue'
import Files from '../components/Files.vue'
import Profile from '../components/Profile.vue'
import Contact from '../components/Contact.vue'
import SendMailAccount from '../components/SendMailAccount.vue'
import OAuthLogin from '../components/OAuthLogin.vue'
//import Background from '../components/Background.vue'
const Background = () => import('../components/Background.vue')

import notificationManager from '../helpers/notificationManager'

Vue.use(VueRouter)

function handleTime(date, now) {
  var leftTime = date - now;
  if (leftTime < 60000) {
    return ((date - now) / 60000).toFixed(0) + " minutes et " + (((date - now) / 1000).toFixed(2) % 60).toFixed(0) + " secondes";
  }
  else {
    return ((date - now) / 60000).toFixed(0) + " minutes";
  }
}
function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (sessionStorage.getItem('tokenInfos')) {
    const token = JSON.parse(sessionStorage.getItem('tokenInfos'))
    const date = new Date(token.EXPIRATION).getTime()
    const now = new Date().getTime()
    if (date - 10000 <= now) {
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
      if ((date - now) < 300000) {
        let timeDesc = handleTime(date, now);
        notificationManager.openNotificationWithIcon('warning', 'Votre session expire bientôt', 'Vous devrez vous reconnecter dans ' + timeDesc)
      }
    }
  } else {
    isAuthenticated = false;
    notificationManager.openNotificationWithIcon('error', 'Vous n\'êtes pas connecté', 'Veuillez vous authentifier pour continuer')
  }

  if (isAuthenticated) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }
}

const routes = [
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: "/oauth",
    name: "OAuthLogin",
    component: OAuthLogin,
  },
  {
    path: '/',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        beforeEnter: guardMyroute,
        path: "accueil",
        name: "Home",
        component: HomeComponent,
      },
      {
        beforeEnter: guardMyroute,
        path: "produits",
        name: "Products",
        component: Products
      },
      {
        beforeEnter: guardMyroute,
        path: "panier",
        name: "Cart",
        component: Cart
      },
      {
        beforeEnter: guardMyroute,
        path: "commandes",
        name: "Orders",
        component: Orders
      },
      {
        beforeEnter: guardMyroute,
        path: "fichiers",
        name: "Files",
        component: Files
      },
      {
        beforeEnter: guardMyroute,
        path: "mes-informations",
        name: "Profile",
        component: Profile
      },
      {
        beforeEnter: guardMyroute,
        path: '/contact',
        name: 'Contact',
        component: Contact
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      default: Login,
      background: Background,
    }
  },
  {
    path: '/creation-de-compte',
    name: 'CreateAccount',
    components: {
      default: CreateAccount,
      background: Background,
    }
  },
  {
    path: '/mot-de-passe-oublie',
    name: 'ForgotPassword',
    components: {
      default: ForgotPassword,
      background: Background,
    }
  },
  {
    path: '/verification-par-mail',
    name: 'SendMailAccount',
    component: SendMailAccount,
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
