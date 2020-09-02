<template>
    <v-app>
        <v-navigation-drawer
                app
                :right="checkRightPosition"
                temporary
                v-model="drawer"
        >
            <v-list-item v-if="isUserLoggedIn()">
                <v-list-item-content>
                    <v-list-item-title class="v-avatar--left">
                        <v-icon light large>mdi-account-circle</v-icon>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <span v-html="fullName" class="subtitle-2"/>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list>
                <v-list-item
                        :to="link.url"
                        v-for="link of links"
                        :key="link.title"
                >
                    <v-list-item-icon>
                        <v-icon>{{link.icon}}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"/>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <LanguageSwitcher
                            :heightIcon="'28px'"
                            :widthIcon="'28px'"
                            :needPadding="false"
                            :key="switcherUpdatedCounter"
                            @componentUpdate="forceRerender()"
                    />
                </v-list-item>
                <v-list-item
                        @click="onLogout"
                        v-if="isUserLoggedIn()"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="$t('main_menu.logout')"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark color="rgb(9, 33, 96)" :style="{boxShadow: 'none'}">
            <a
                    class="header__logo"
                    @click="redirectToRoute('/')"
                    :style="{
                        background: 'url(' + logoUrl + ') no-repeat 50%',
                        backgroundSize: 'contain' + ' '
                    }"
            />
            <v-spacer/>
            <v-badge
                    :class="checkRightPosition ? 'mr-2' : 'ml-2'"
                    v-if="isUserLoggedIn()"
                    :content="messages"
                    :value="messages"
                    color="green"
                    overlap
            >
                <v-icon>mdi-email</v-icon>
            </v-badge>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                        text
                        v-for="link in links"
                        :key="link.title"
                        :to="link.url"
                >
                    <v-icon left>{{link.icon}}</v-icon>
                    {{link.title}}
                </v-btn>
                <LanguageSwitcher
                        :heightIcon="'28px'"
                        :widthIcon="'28px'"
                        :needPadding="true"
                        :key="switcherUpdatedCounter"
                        @componentUpdate="forceRerender()"
                />
                <v-btn
                        text
                        @click="onLogout"
                        v-if="isUserLoggedIn()"
                >
                    <v-icon left>mdi-exit-to-app</v-icon>
                    {{$t('main_menu.logout')}}
                </v-btn>

                <v-btn
                        text
                        @click="needRegister = ! needRegister"
                        v-else-if="! isUserLoggedIn() && noToken"
                >
                    <v-icon center>mdi-login</v-icon>
                    {{$t('main_menu.login')}}
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items class="hidden-md-and-up">
                <v-btn
                        text
                        v-for="link in links"
                        :key="link.title"
                        :to="link.url"
                >
                    <v-icon center>{{link.icon}}</v-icon>
                </v-btn>
                <v-btn
                        text
                        @click="onLogout"
                        v-if="isUserLoggedIn()"
                >
                    <v-icon center>mdi-exit-to-app</v-icon>
                </v-btn>
                <v-btn
                        text
                        @click="needRegister = true"
                        v-else-if="! isUserLoggedIn() && noToken"
                >
                    <v-icon center>mdi-login</v-icon>
                </v-btn>
            </v-toolbar-items>

            <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                    class="hidden-md-and-up"
            />
        </v-app-bar>

        <app-phone-registration
                v-if="! this.isUserLoggedIn() && needRegister"
                @dialogClose="needRegister = $event, showLogin = false"
        />

        <!-- Sizes your content based upon application components -->
        <v-main
                :style="{padding: '56px 0'}"
        >
            <!-- If using vue-router -->
            <router-view/>
        </v-main>

        <v-footer
                v-if="isUserLoggedIn()"
                fixed
                :style="{margin: '0', padding: '0'}"
        >
            <v-tabs
                    fixed-tabs
                    background-color="rgb(9, 33, 96)"
                    dark
            >
                <v-tab
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :to="tab.url"
                        :style="{
                            fontSize: '16px',
                            lineHeight: '20px'
                        }"
                >
                    {{tab.title}}
                </v-tab>
            </v-tabs>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import PhoneRegistration from '@/core/components/Auth/PhoneRegistration.vue';
import LanguageSwitcher from '@/core/components/LanguageSwitcher.vue';
import Common from '@/core/mixins/Common';
import i18n from '@/core/plugins/i18n';

export default Vue.extend({
    mixins: [Common],
    components: {
        appPhoneRegistration: PhoneRegistration,
        LanguageSwitcher,
    },
    data: () => ({
        drawer: false,
        logoUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MTMxIiBoZWlnaHQ9IjIwMDAiPjxwYXRoIGQ9Ik0zMzkwIDQzOGgzMjl2MjI3aC0zMjl2MzE3YzAgNjUuMjItMi41MyAxMzEuNDggMjIgMTcyIDM1LjMyIDU4LjM2IDEzMS4zNiA3NS43OSAyMjQgNThxMzMgMTExLjk5IDY2IDIyNGMtNDYuNTkgMTEuODYtOTQuNyAxMC4zLTE0OCAxOXEtMjUuOTk1LTEuMDA1LTUyLTJjLTU1LjczLTkuMDktMTAxLjQ2LTEwLjg3LTE0NS0yOC05My44OS0zNi45NC0xNjMuMDYtOTEuNzItMjAxLTE4NC0zNC4yNS04My4zMi0zNC0xOTcuNzEtMzQtMzE2VjY2NWgtMjc3bDEyLTEzcTI2Ni40NzUtMjQ1LjQ3NSA1MzMtNDkxdjI3N3ptMzQxMyAwaDMyOHYyMjdoLTMyOHYzMjhjLS4wMSA4My4wNC43OCAxNTQuMDEgNDcgMTkwIDI2LjczIDIwLjgxIDc5LjU1IDQzLjE2IDEzMiAzNXEzMy40OTUtMi41MDUgNjctNSAzMyAxMTEuNDk1IDY2IDIyM2MtNDQuMzcgMTEuMy05NC44NCAxMC40OC0xNDcgMTlxLTI3LTEuMDA1LTU0LTJjLTU2LjY3LTkuMjctMTAyLjc2LTExLjU3LTE0Ny0yOS05MC43LTM1LjczLTE1OC4xOC04OS45My0xOTYtMTc4LTM2LjE4LTg0LjI1LTM2LTIwMC41Ni0zNi0zMjJWNjY1aC0yNzdjLjMzLTEgLjY3LTIgMS0zcTI3MS40Ny0yNTAuNDc1IDU0My01MDFoMXYyNzd6TTkzNiA0MTdjMjU5LjYxLTQuNzY5IDQzMC45NyAxNDUuOTE2IDUwNSAzMjggMjkuMjIgNzEuODU1IDUwLjU3IDE4Ny41NTkgMjkgMjg1LTkuODkgNDQuNy0yMS40OSA4NS4yMy0zOCAxMjMtNjAuNzUgMTM4Ljk2LTE3OS4yNiAyMzUuNjEtMzMzIDI4Mi00Mi4xNiAxMi43Mi04Ny4zNCAxMS41MS0xMzcgMjBxLTI1LjUtMS4wMDUtNTEtMi0yNy41LTIuNTA1LTU1LTVjLTQ1LjYyNi05LjI1LTg3LjQ1Ni0yMC44Mi0xMjUtMzctMTQ1LjQ0OS02Mi43LTI0NC41MTktMTcwLjE3LTI5My0zMzAtMTcuNi01OC4wMy0yOS43NTItMTUwLjktMTUtMjI0IDYuOTc2LTM0LjU2NyAxMy4xNzctNjguNjcxIDI1LTk5IDU4LjM2NS0xNDkuNzI1IDE2MS4zNzMtMjUwLjQ4NCAzMTEtMzA5IDM2LjIwNS0xNC4xNTkgNzYuNjY5LTIwLjA4MSAxMTktMjh6bTE3OTUgMTAxN2gtMjY4Vjk5NWMwLTg5LjQ3NiA0LjAxLTE3OS45NjQtMjktMjM2LTMyLjUyLTU1LjItODEuNDQtODIuMDM3LTE1OC05NC0xMTMuMjUtMTcuNy0yNDUuNDggNzcuMzkyLTI2MyAxNTR2NjE1aC0yNjhWNDM4aDI1N3EuNDk1IDY2Ljk5MyAxIDEzNGMzLjIzLTQ2LjYyNyA0NC4wNi03OS40MTEgNzUtMTAwIDE1MS42OS0xMDAuOTQ5IDM2NS43OS00OS4xMjYgNDg1IDQxIDczLjMxIDU1LjQyMSAxMjQuNzkgMTM1LjM3OSAxNTEgMjM4IDIwIDc4LjMxIDE3IDE3Ny4yOTUgMTcgMjc1djQwOHptMTkyOC05OTZoMjU3djk5NmgtMjU3cS0uNDk1LTY5LTEtMTM4Yy0yLjc3IDM2LjQ4LTI5LjQ5IDY2Ljk0LTUyIDg1LTg4LjgyIDcxLjI1LTIyOC42OSA5Ni41MS0zNjkgNTMtMTY3Ljc5LTUyLjAzLTI4My4wMy0xNjkuMzEtMzM1LTMzNy0xMS40NC0zNi45MS0xNS40NC03Ni4xNy0yMi0xMTktMTAuNDItNjggNS4wNi0xNDIuNTc2IDIwLTE5MyA0OC43My0xNjQuNTEzIDE0OS43NS0yNzkuMzcxIDMwMy0zMzkgMzAuODMtMTIgNjUuMTctMTguNTE0IDEwMS0yNSAxMzAuMjQtMjMuNTc1IDI3MC45MiAyNy40NzggMzI0IDk1IDE0LjU0IDE4LjUgMTkuMzMgMzguMTE1IDMxIDYxVjQzOHptMTAwNi0yMWMxNTkuMzMtMy4wODcgMjY4LjAxIDUzLjkyNiAzNTYgMTIzIDI2LjQ5IDIwLjggNTguMTkgNDcuMDkxIDc1IDc3cS05NC45OTUgODMuNDkxLTE5MCAxNjdjLTYuMjYtMTMuNTM0LTE5LjkxLTIzLjkxMS0zMC0zNC01NC43My01NC43MjgtMTU4Ljc0LTExMC44MjMtMjczLTc2cS0xNTAuNTcgNDUuODktMTg4IDIwNmMtNC43IDIwLjEyNC0xMC40MSA1MS40MjktNiA3OCAxNy45MiAxMDcuOTYgNTUuNjUgMTcwLjA3IDEzNCAyMTYgMTQ2LjI1IDg1Ljc0IDMxMS40Ni4wMSAzNzgtOThxMTAyLjk5IDc3LjQ5IDIwNiAxNTVjLTYyLjU2IDg5LjczLTE1NS4wOCAxNjMuMDktMjcxIDE5OS0zMi4yMSA5Ljk4LTY2LjgxIDE0Ljk1LTEwMyAyMS02Ny40OSAxMS4yOC0xNTAuNTcgMi45Ni0yMDctMTEtMTY2LjY5LTQxLjIzLTI5My44NC0xMzcuMTItMzU3LTI4MWE2MzguMjI0IDYzOC4yMjQgMCAwIDEtMzgtMTE1Yy02My4xNy0yNzYuNyAxMTkuNzMtNTAyLjAzNiAyOTMtNTc4IDQyLjc2LTE4Ljc0OCA4OS4yNy0zMS45NTEgMTQxLTQyek00MzgwIDY1OGwtMjkgMy01NSAxNWMtNzYuMDMgMzAuMzUtMTMxLjM0IDkwLjIyNi0xNTkgMTY5LTU0LjIgMTU0LjM1MiA0NS42NCAyOTMuMyAxNDcgMzM3IDI4LjU4IDEyLjMyIDY5LjYgMjguNzkgMTEyIDI1IDEyNy4wNS0xMS4zNiAyMDUuMTMtNzEuNSAyNDYtMTY4IDgyLjk2LTE5NS44ODItNzAuOTgtMzgxLjgzMS0yNjItMzgxem0tMzQ1NCA3bC0yNSAzLTUxIDE0Yy03My43OTIgMjkuNDE5LTEyNy4zNTkgODguNTE4LTE1MiAxNjctNTAuMDQ3IDE1OS40IDM5Ljg4MSAyOTQuMjYgMTQ5IDMzOSAyOS45MjUgMTIuMjcgNzcuMTUzIDI2LjgzIDEyNCAxOSAxMDcuNTMtMTcuOTggMTc3LjUtNjUuMjggMjE1LTE1MiA2Ny45OC0xNTcuMi0xNC43Ny0zMTguNzQtMTMxLTM2OS0zNi4xNy0xNS42NDEtNzUuOTY3LTIxLjIzMS0xMjktMjF6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg4MyAwYzI4NS41OC00IDQ3MC40IDgxLjM2MSA2MjkgMjAzIDQzLjc1IDMzLjU1OCA4NS42NCA3MS4wNjQgMTIwIDExNHExNi4wMDUgMTkgMzIgMzgtODEuNDk1IDY4Ljk5My0xNjMgMTM4Yy0xMC4zOCA5LjQ1My00NC44NCA0My40NTktNTQgMzgtMTQuOTctMzEuMDY4LTc2Ljk3LTg0LTEwNS0xMDYtODAuMTctNjIuOTE3LTE2NC4zMS0xMTEuNzEzLTI4MS0xNDAtMjguMTMtNi44Mi01NS41Ni02LjI3OS04Ny0xMS0zNy4zMzUtNS42MDYtODcuMTUtNC4wMzktMTIzIDItMzUuNSA1Ljk3OS02OS45IDEwLjQ1OC0xMDIgMjAtMjEyLjY1OSA2My4yMTctMzUwLjYxMiAyMDUuOTgxLTQyMiA0MTEtMTQuNiA0MS45MTctMjIuNiA4OC40NTgtMzEgMTM4bC0zIDUxLTEgNjZjOC4yNzkgNTQuOTkgOS4xMDUgMTA1Ljc3IDIzIDE1MyA2MC43NjMgMjA2LjUyIDE4NS4xNCAzNDQuNjMgMzc1IDQyMiA3Ny43NzQgMzEuNjkgMjE3LjQ5NCA2NC44OCAzMzMgNDYgNTQtOC44MyAxMDQuNjUtMTUuNTIgMTUwLTMzIDEwMi43Ny0zOS42MSAxNzAuNS04OS40NiAyNDgtMTUyIDMwLjA3LTI0LjI3IDUwLjc0LTU4Ljk2IDc5LTg1cTExMi40ODUgODAuOTg1IDIyNSAxNjJ2MWMtMzguMyA0My41Mi02Ny44IDk0LjU1LTExMyAxMzEtMjkuNTggMjMuODUtNTcuNjYgNDkuODktODkgNzItOTcuNDggNjguNzctMjA2LjM5IDExNC44LTMzOCAxNTEtNzcuMjQgMjEuMjQtMjE2LjQyIDQxLjEzLTMxNCAyNS02MC45MDktMTAuMDctMTE4LjI2NC05LjE4LTE3MC0yNy0yNS40MzcgMTguNjctNDguNDg3IDQwLjc3LTc2IDU4LTEyMC43OTQgNzUuNjMtMjc2LjY0NSAxMTIuMjMtNDcxIDExNCAuMzMzLS42Ny42NjctMS4zMyAxLTIgNTMuNDQ2LTI0LjA3IDc3LjUwOC0xMTMuMiA5MS0xODBsNi03NXYtNzdsLTctMTAyLTQxLTQ1Yy0yNi4wNDktMzMuMzktNTEuNTI0LTY4LjI1LTc0LTEwNUM1MS44NDcgMTI4Ni4yMy4wMjkgMTEyOS40MiAwIDkyNWMtLjAwNy00OS44MDguNTI3LTk2LjM5NCA5LTE0MCAxMi45LTY2LjM5NSAyMy43ODgtMTI5Ljg1NCA0Ni0xODcgOTkuNTQtMjU2LjA5MyAyNjkuOTMtNDM0LjggNTI0LTUzNiA1OS4xOTQtMjMuNTc4IDEyMy45LTM3LjA1NiAxOTMtNTF6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        messages: 5,
        /**
         * для обновления всех переключателей языка
         */
        switcherUpdatedCounter: 0,
        needRegister: false,
        showLogin: false,
    }),
    computed: {
        links() {
            /*if (this.isUserLoggedIn()) {
                return null;
            }
            return [
                {title: 'Login', icon: 'mdi-lock', url: '/login'},
                {title: 'Registration', icon: 'mdi-face', url: '/registration'},
            ];*/
            return null;
        },
        fullName() {
            return this.$store.getters['user/fullName'];
        },
        checkRightPosition() {
            return i18n.locale === 'en';
        },
        tabs() {
            return [
                {title: i18n.t('tabs.main'), url: '/'},
                {title: i18n.t('tabs.history'), url: '/history'},
                {title: i18n.t('tabs.scheduler'), url: '/scheduler'},
            ];
        },
        noToken() {
            return localStorage.getItem('token') === null;
        },
    },
    methods: {
        onLogout() {
            this.$store.dispatch('user/logoutUser');
            this.needRegister = false;
            this.showLogin = true;
            if (this.$router.currentRoute.path !== '/') {
                this.$router.push('/');
            }
        },
        forceRerender() {
            this.switcherUpdatedCounter += 1;
        },
    },
});
</script>

<style scoped lang="scss">
    .header__logo {
        width: 150px;
        height: 40px;
        min-width: 84px;
        display: inline-block;
        font-size: 0;
        line-height: 0;
        text-decoration: none;
        margin-right: 6px;
    }
</style>
