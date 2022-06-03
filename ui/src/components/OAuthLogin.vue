<template>
    <div>
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <button @click="login()">Login</button>
        <pre>{{ resCall }}</pre>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'OAuthLogin',
    data: () => {
        return {
            email: "DEMOAPITL@THIRIEZ-LITERIE.FR",
            password: "Qwerty954",
            count: 0,
            resCall: null,
        }
    },
    mounted: async function () {
        console.log("Created");
        console.log(process.env)
    },
    methods: {
        async callLogin(options) {
            try {
                options.config.headers = {
                    ...options.config.headers
                };
                const response = await axios(options.config);
                const { data } = response;
                return data;
            } catch (error) {
                if (error.response) {
                    return error.response.data;
                }
                return error.message;
            }
        },

        async login() {
            const config = {
                url: `${process.env.VUE_APP_APIURL}/gmao/login`,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: 'Basic ' + Buffer.from(this.email + ':' + this.password, 'utf-8').toString('base64')
                },
            };
            const data = await this.callLogin({ config });
            const stringifiedRes = JSON.stringify(data, null, 2);
            this.resCall = stringifiedRes;
        },
    }
}
</script>