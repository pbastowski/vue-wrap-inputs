<!--
    This example shows how to make a custom component validatable
    as a whole, within the scope of Vuetify v-form's validation.

    Our component, below, contains a form with fields. When any of the
    fields are not valid the whole form is also not valid. We want to
    expose this validity to the consumer of this component, so that they
    can test it for validity like this:

    <v-form v-model="valid">
        ...
        <data-import
            :data="dataImport"
            :rules="[ v=>!!v || 'Data import form is not valid' ]"
        />
        ...
    </v-form>

    So, the above variable `valid` will be false when the `data-import`
    fields are not valid.
-->
<template>
    <v-card>
        <v-card-text
            :class="{ 'pink lighten-5': !value && formHasErrors() }"
        >
            <!--
                We bind our form to it's consumer's attributes, listeners
                and value (to support v-model). This will make our component
                behave like a Vuetify form and it's v-model will be valid or
                invalid as the validity of the form below changes.
            -->
            <v-form v-bind="$attrs" v-on="$listeners" :value="value" ref="form">

                <v-layout column>
                    <v-text-field
                        label="Name"
                        v-model="data.name"
                        :rules="[v=>!!v || 'Name required']"
                    />

                    <v-text-field
                        label="Surname"
                        v-model="data.surname"
                        :rules="[v=>!!v || 'Surname required']"
                    />

                    <v-text-field
                        label="Favorite colour"
                        v-model="data.favoriteColour"
                        :rules="[v=>!!v || 'Surely, there must be a colour that you like?']"
                    />

                    <v-btn :disabled="!value" color="primary">OK</v-btn>
                </v-layout>

            </v-form>
            <pre>formIsDirty: {{ formIsDirty() }}</pre>
            <pre>formHasErrors: {{ formHasErrors() }}</pre>
        </v-card-text>
    </v-card>
</template>

<script>
// We import the VInput component, so we can use it to extend our
// component with it's behaviours, specifically hooking into
// Vuetify's form validation.
import VInput from 'vuetify/es5/components/VInput'

export default {
    // You must give your component a name, otherwise, it will appear
    // as "VInput" in Vue Dev Tools.
    name: 'data-import',

    // We extend the VInput component, thus adding Vuetify validation
    // and other VInput functionality into our component, but without
    // inheriting it's layout.
    extends: VInput,

    props: {
        // This is required to support v-model.
        value: Boolean,

        // This prop is used to pass the data object to this component
        // Members of this object will be bound to your form fields.
        data: Object
    },

    methods: {
        // When any field in the form has been focused and has errors, the
        // form is said to have errors.
        formHasErrors() {
            return !!(
                this.$refs.form &&
                this.$refs.form.inputs.some(i => i.hasError && i.hasFocused)
            )
        },

        formIsDirty() {
            return !!(
                this.$refs.form && this.$refs.form.inputs.some(i => i.isDirty)
            )
        }
    }
}
</script>
