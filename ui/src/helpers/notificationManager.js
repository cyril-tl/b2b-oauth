import {notification} from 'ant-design-vue'
import router from '../router'

const openNotificationWithIcon = (type, title, desc) => {
  if(desc.code === 402) {
    router.push('/login', () => {})
    if(title === 'Récupération du panier' ){
      openNotification('error', 'Token expiré', 'Votre session est arrivée à expiration. Merci de bien vouloir vous reconnecter !')
    }
  } else {
    openNotification(type, title, desc)
  }
}

const openNotification = (type, title, desc) => {
  notification[type]({
    message: title,
    description: desc
  });
}

export default {
  openNotificationWithIcon,
}