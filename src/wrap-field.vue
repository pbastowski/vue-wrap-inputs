<template>

    <!--
        We wrap our custom input in v-input and bind it to it's consumer's
        $attrs, $listeners and value (to support v-model). This will
        make our wrapper component behave like a Vuetify input element
        and allow it to hook into Vuetify's v-form component validation.
    -->
    <v-input
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
    >

        <!--
            We also bind $attrs, $listeners and value to out input control,
            so it can be used like any other Vue control.
            However, because we are wrapping a native element, we need to
            modify the input listener, to emit the correct value.
        -->
        <input
            class="ml-2"
            @blur.native="log(123)"
            v-bind="$attrs"
            v-on="{ ...$listeners, input: e => $emit('input', e.target.value) }"
            :value="value"
            style="
                border: 1px solid silver;
                background: yellow;
                color: black;
            "
        />
    </v-input>

</template>

<script>
// We import the VInput component, so we can use it to extend our
// component with it's behaviours, specifically hooking into
// Vuetify form validation and error messages that appear below
// the input. So, in this case we wrap our component in VInput,
// because we do want to reuse it's layout for error messages.
import VInput from 'vuetify/es5/components/VInput'

export default {
    // You must give your component a name, otherwise, it will appear
    // as "VInput" in the Vue Dev tools hierarchy.
    name: 'my-input',

    // We extend the VInput component, thus adding all basic validation
    // functionality into our component.
    // extends: VInput,

    props: {
        // This is required to support v-model.
        value: String
    }
}
</script>
