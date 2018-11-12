<template>
    <!--
        We bind $attrs, $listeners and value to our input control,
        so it can be used like any other Vue control.

        Note: because we are wrapping a native element, we need to
        modify the input listener, to emit the element value. Vuetify
        input components emit their value as the event payload, whereas
        native controls emit the event itself.
    -->
    <label>
        {{ label }}
        <input
            class="ml-2"
            :class="{ invalid: !valid }"
            v-bind="$attrs"
            v-on="{ ...$listeners, input: e => $emit('input', e.target.value) }"
            :value="value"
            style="
                border: 1px solid silver;
                background: yellow;
                color: black;
                margin-left: 6px;
            "
        />
        <slot name="messages">
            <span class="red--text" v-if="hasMessages">
                {{ errorBucket[0] }}</span
            >
        </slot>
        <!-- <pre>{{ $data }}</pre> -->
    </label>
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
    extends: VInput,

    props: {
        // This is required to support v-model.
        value: String,
        label: String
    },

    data() {
        return {}
    }
}
</script>
