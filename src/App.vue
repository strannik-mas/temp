<template>
    <v-app>
        <v-navigation-drawer
                app
                right
                temporary
                v-model="drawer"
        >
            <v-list-item v-if="isUserLoggedIn">
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
                <v-list-item
                        @click="onLogout"
                        v-if="isUserLoggedIn"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="'Logout'"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark color="rgb(9, 33, 96)" :style="{boxShadow: 'none'}">
            <a
                    class="header__logo"
                    :href="'#/'"
                    :style="{
                        background: 'url(' + logoUrl + ') no-repeat 50%',
                        backgroundSize: 'contain' + ' '
                    }"
            />
            <v-spacer/>
            <v-badge
                    v-if="isUserLoggedIn"
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
                <v-btn
                        text
                        @click="onLogout"
                        v-if="isUserLoggedIn"
                >
                    <v-icon left>mdi-exit-to-app</v-icon>
                    Logout
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
                        v-if="isUserLoggedIn"
                >
                    <v-icon center>mdi-exit-to-app</v-icon>
                </v-btn>
            </v-toolbar-items>

            <v-app-bar-nav-icon
                    @click="drawer = !drawer"
                    class="hidden-md-and-up"
            />
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- If using vue-router -->
            <router-view/>
        </v-main>

        <v-footer
                v-if="isUserLoggedIn && state === 1"
                fixed
                :style="{margin: '0', padding: '0'}"
        >
            <v-tabs
                    fixed-tabs
                    background-color="indigo"
                    dark
            >
                <v-tab
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :to="tab.url"
                        ripple
                >
                    {{tab.title}}
                </v-tab>
            </v-tabs>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import appMixin from '@/core/mixins/ApplicationMain';

export default Vue.extend({
    mixins: [appMixin],
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
