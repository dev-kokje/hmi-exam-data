<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn rounded outlined color="primary" dark v-bind="attrs" v-on="on">
                <img class="flag-icon mr-2" :src="flagImage" />
                {{ currentLocale }}
            </v-btn>
        </template>
        <v-list>
            <v-list-item>
                <v-list-item-title @click="onSetLocale('en')">
                    <img class="flag-icon mr-2" :src="flags.en" />
                    English
                </v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title @click="onSetLocale('de')">
                    <img class="flag-icon mr-2" :src="flags.de" />
                    Deutsch
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import en from '../../assets/flags/english.png'
import de from '../../assets/flags/germany.png'

export default {
    name: 'LanguageSwitcher',
    data: () => ({
        flags: {
            en: en,
            de: de
        }
    }),
    computed: {
        ...mapState('locale', ['locale']),
        currentLocale() {
            return this.locale.toUpperCase()
        },
        flagImage() {
            if(this.currentLocale === 'EN'){
                return en
            } else {
                return de
            }
        }
    },
    created() {
        this.$i18n.locale = this.locale
    },
    methods: {
        ...mapMutations('locale', ['setLocale']),
        onSetLocale(locale) {
            this.$i18n.locale = locale
            this.setLocale(locale)
            console.log("Called set ", locale)
        },
        isCurrentLocale(locale) {
            return this.locale === locale
        }
    }
}
</script>

<style scoped>

.flag-icon {
    width: 20px;
    height: auto;
}

v-list-item-title {
    cursor: pointer !important;
}

</style>