<!--
    Here we show how to use the v-input base component to add
    Vuetify form validation to our custom input component.
-->

<template>
    <!--
        We wrap our custom input in v-input and bind it to it's consumer's
        $attrs, $listeners and value (to support v-model). This will
        make our wrapper component behave like a Vuetify input element
        and allow it to hook into Vuetify's v-form component validation.

        Note: the only attrs that need to be bound in v-input are:
        - value, so that v-input can validate the value
        - rules, so we have the rules used to validate the value
        - label, if you want the standard v-input label

        We could also (optionally) bind all $attrs and $listeners.
    -->
    <v-input
        Xv-bind="$attrs"
        Xv-on="$listeners"
        :value="value"
        :rules="rules"
        :label="label"
    >
        <!--
            We bind $attrs, $listeners and value to our input control,
            so it can be used like any other Vue control.

            Note: because we are wrapping a native element, we need to
            modify the input listener to emit the element value. Vuetify
            input components emit their value as the event payload,
            whereas native controls emit the raw event itself.
        -->
        <input
            class="ml-2 input"
            @blur.native="log(123)"
            v-bind="$attrs"
            v-on="{ ...$listeners, input: e => $emit('input', e.target.value) }"
            :value="value"
        />
    </v-input>
</template>

<script>
export default {
    // You must give your component a name, otherwise, it will appear
    // as "VInput" in the Vue Dev tools hierarchy.
    name: 'my-input',

    // We extend the VInput component, thus adding all basic validation
    // functionality into our component.
    // extends: VInput,

    props: {
        // We must declare the `value` from in order to support v-model,
        // which does not automatically create the `value` prop for us
        // nor add it to `$attrs`.
        value: String,
        label: String,
        rules: Array
    }
}
</script>

<style scoped>
.input {
    outline: none;
    border: 1px solid silver;
    color: black;
    padding: 3px 6px;
}

.invalid {
    border-color: red;
}
</style>
