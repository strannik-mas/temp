import Vue from 'vue';
import {User} from '@/core/store/user/types';

export default Vue.extend({
    computed: {
        isUserLoggedIn() {
            const token: string|null = localStorage.getItem('token');
            const user: User = this.$store.getters['user/userObj'];
            //console.log(user);
            if (token && typeof token !== 'undefined' && typeof user !== 'undefined') {
                return true;
            }
            return false;
        },
    },
    methods: {
        redirectToRoute(route: string) {
            if (this.$router.currentRoute.path !== route) {
                this.$router.push(route);
            }
        },
    },
});
