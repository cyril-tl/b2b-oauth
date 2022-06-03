<template>
  <div>
    
  </div>
</template>
<script>
export default {
  name: "ChatBot",
  mounted() {
    (function (d, m) {
      setTimeout(() => {
        const userInfos = JSON.parse(localStorage.getItem('userInfos'));
        const nomPrenom = userInfos.PRENOM + ' ' + userInfos.NOM;
        var kommunicateSettings = {
          appId: "10757e7b4519381caa48fb3f619a954bc",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
          userId: nomPrenom,
          metadata: {
            //this.$store.state.token = token
            Prénom: userInfos.PRENOM,
            Nom: userInfos.NOM,
            Courriel: userInfos.LOGIN,
            Tel: userInfos.TELMOBILE,
            CODE_CLIENT: userInfos.CODE_CLIENT,
            //LastName: "DUPONT",
            // Name: "Jean",
            // code_CEGID: "123456",
          },
          onInit: function () {
            var defaultSettings = {
              defaultAgentIds: ["chat-distri@thiriez-literie.fr"],
              agentId: "chat-distri@thiriez-literie.fr",
              defaultBotIds: ["groupe-thiriez-lqxzr"], // Replace <BOT_ID> with your bot ID which you can find in bot section of dashboard
              defaultAssignee: "", // Replace <BOT_ID> with your bot ID which you can find in bot section of dashboard
              skipRouting: true,
            };
          // console.log(defaultSettings);
            window.Kommunicate.updateUserLanguage("fr");
            window.Kommunicate.updateSettings(defaultSettings);
          },
          labels: {
            'input.message': 'Tapez votre message',
            'conversations.title': 'Conversations',
            'start.new': 'Nouvelle Conversation',
            'empty.messages': 'Pas encore de mesages!',
            'no.more.messages': 'Fin des messages',
            'empty.conversations': 'Pas encore de conversations !',
            'no.more.conversations': 'Fin des conversations!',
            'search.placeholder': 'Recherche...',
            'location.placeholder': 'Entrez unh lieu',
            'members.title': 'Membres',
            'typing': 'écrit...',
            'is.typing': 'est en train d\'écrire...',
            'online': 'Connecté',
            'offline': 'Déconnecté',
            'clear.messages': 'Supprimer Les Messages',
            'delete': 'Supprimer',
            'reply': 'Répondre',
            'location.share.title': 'Partage d\'adresse',
            'my.location': 'Mon adresse',
            'send': 'Envoyer',
            'send.message': 'Envoyer Message',
            'smiley': 'Emoji Picker',
            'close': 'Fermer',
            'edit': 'Editer',
            'save': 'Sauvegarder',
            'file.attachment': 'Téléverser pièce-jointe',
            'file.attach.title': 'Joindre un fichier',
            'last.seen': 'Last seen',
            'last.seen.on': 'Last seen on',
            'time.format.AM': 'AM',
            'time.format.PM': 'PM',
            'hour': ' heure',
            'min': ' minute',
            'yesterday': 'hier',
            'hours': ' houres',
            'mins': ' minutes',
            'ago': 'ago',
            'admin': 'Admin',
            'user': 'Utilisateur',
            'member': 'Membre',
            'you': 'Vous',
            'away': 'Parti',
            'closed.conversation.message': 'Cette conversation a été marquée comme résolue. Si vous avez d\'autres questions, envoyez simplement un message ici ou démarrez une nouvelle conversation.',
            'search.faq': 'Recherche dans la FAQs...',
            'looking.for.something.else': 'Vous cherchez quelque chose d\'autre?',
            'no-faq-found': 'Nous sommes là pour vous aider.',
            'talk.to.agent': 'Parler à un agent',
            'how.to.reachout': 'Comment vous contacter ?',
            'email.error.alert': 'Email invalide',
            'conversation.rated': 'a noté la conversation',
            'char.limit.warn': 'Gardez votre message à moins de 256 caractères pour aider le bot à comprendre facilement',
            'limit.remove': 'Retirer',
            'limit.characters': 'charactères',
            'limit.remaining': 'restant',
            'lead.collection': {
                'email': 'Email',
                'name': 'Name',
                'phone': 'Contact Number',
                'title': 'Conversations',
                'heading': 'Before starting, we just need a few details so that we may serve you better',
                'submit': 'Start Conversation',
            },
            'csat.rating': {
                'CONVERSATION_RATED': 'Vous avez évalué la conversation',
                'RATE_CONVERSATION': 'Évaluer cette conversation',
                'CONVERSATION_REVIEW_PLACEHOLDER': 'Ajouter un commentaire…',
                'OTHER_QUERIES': 'Vous avez d\'autres requêtes ?',
                'RESTART_CONVERSATION': 'Recommencer cette conversation',
                'SUBMIT_RATING' : 'Soumettre votre avis '
            },
            'page.title.on.new.message': 'Nouveau message de ',
            'emoji.hover.text': {
                'poor': 'Mauvais',
                'great': 'Génial',
                'average': 'Moyen'
            },
            'rich.message': {
                'notification.preview' : 'Message'
            },
            'filter.conversation.list': {
                'ALL_CONVERSATIONS': 'Toutes les conversations',
                'ACTIVE_CONVERSATIONS': 'Conversations actives ',
                'HIDE_RESOLVED': 'Cacher résolues',
                'SHOW_RESOLVED': 'Afficher résolues'
            },
            'time.stamp': {
                'sec.ago': 'sec ',
                'secs.ago': 'secs ',
                'min.ago': 'min ',
                'mins.ago': 'mins ',
                'hr.ago': 'hr ',
                'hrs.ago': 'hrs '
            },
            'voice.output': {
                'location': {
                    'init': 'Une adresse a été partagée avec vous.',
                    'lat': 'Latitude ',
                    'lon': 'et Longitude  '

                },
                'attachment': 'Vous avez une pièce jointe.'
              }
          },
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      }, 1500)
    })(document, window.kommunicate || {});
  },
};
</script> 