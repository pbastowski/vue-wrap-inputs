<!--
    Here we implement the Vuetify error interface ourselves.

    - inject "form"
    - register ourselves with Vuetify's form handler
    - implement hasError and errorBucket
-->
<template>
    <!--
        We bind $attrs, $listeners and value to our input control,
        so it can be used like any other Vue control.

        Note: because we are wrapping a native element, we need to
        modify the input listener, to emit the element value. Vuetify
        input components emit their value as the event payload, whereas
        native controls emit the event itself.
    -->
    <div>
        <label class="mr-2" style="vertical-align: top;"> {{ label }} </label>
        <span style="display:inline-block;">
            <input
                class="input"
                :class="{ invalid: hasError }"
                v-bind="$attrs"
                v-on="{
                    ...$listeners,
                    input: e => $emit('input', e.target.value)
                }"
                :value="value"
            />
            <slot name="messages">
                <div class="red--text">{{ errorBucket[0] || '&nbsp;' }}</div>
            </slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'my-input',

    // Inject Vuetify's form handler
    inject: ['form'],

    props: {
        // This is required to support v-model.
        value: String,
        label: String,
        rules: Array
    },

    created() {
        // Register ourselves with the form handler
        this.form.register(this)
    },

    data() {
        return {}
    },

    computed: {
        hasError() {
            return this.rules.some(r => typeof r(this.value) === 'string')
        },

        errorBucket() {
            return this.rules.map(r => r(this.value)).filter(r => r !== true)
        }
    }
}
</script>

<style scoped>
.input {
    outline: none;
    border: 1px solid silver;
    color: black;
}

.invalid {
    border-color: red;
}
</style>
