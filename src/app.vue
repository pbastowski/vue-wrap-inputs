<template>
    <v-app>
        <v-content>
            <v-container fluid grid-list-lg>
                <v-form v-model="formValid" style="width: 400px;">
                    <v-layout column>
                        <v-flex>
                            <data-import
                                ref="wrap"
                                v-model="wrapValid"
                                :data.sync="wrapData"
                                :rules="[
                                    v => v || 'Hey, who turned off the light?'
                                ]"
                                Xhide-details
                            />
                        </v-flex>

                        <v-flex column>
                            <my-input
                                flat
                                v-model="comment"
                                label="Comment"
                                :rules="[
                                    v => !!v || 'Aaaaarghhhh!',
                                    v => v === '1' || 'Not 1'
                                ]"
                            />
                        </v-flex>

                        <v-flex>
                            <v-btn color="primary" :disabled="!formValid"
                                >OK
                            </v-btn>
                        </v-flex>

                        <!--
                                                    <v-flex xs-2>
                                                        <pre>test valid: {{ formValid }}</pre>
                                                        <pre>data-import valid: {{ wrapValid }}</pre>
                                                        <pre>data: {{ wrapData }}</pre>
                                                        <pre v-if="$refs.wrap">
                            wrap: {{ $refs.wrap.hasError }}</pre
                                                        >
                                                    </v-flex>
                        -->
                    </v-layout>
                </v-form>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import DataImport from './wrap-form.vue'
import MyInput from './wrap-input-vinput.vue'

export default {
    name: 'my-feature',

    components: {
        DataImport,
        MyInput
    },

    data() {
        return {
            comment: '',
            formValid: false,
            wrapValid: false,
            wrapData: {}
        }
    }
}
</script>
