<!--
    In this example we add Vuetify form validation to our custom
    input component by extending the v-input base component.
-->

<template>
    <div>
        <label
            class="mr-2 label"
            style="vertical-align: top;"
            :class="{
                'red--text': hasFocused && hasError,
                placeholder: !isFocused && value === ''
            }"
        >
            {{ label }}
        </label>
        <span style="display:inline-block;">
            <!--
                We bind $attrs, $listeners and value to our input control,
                so it can be used like any other Vue control.

                Note 1: because we are wrapping a native element, we need to
                modify the input listener, to emit the element value. Vuetify
                input components emit their value as the event payload, whereas
                native controls emit the raw event itself.

                Note 2: We have to set hasFocused ourselves and use it to
                display error messages and change border colors accordingly.
            -->
            <input
                class="input"
                :class="{ invalid: hasFocused && hasError }"
                v-bind="$attrs"
                v-on="{
                    ...$listeners,
                    input: e => $emit('input', e.target.value)
                }"
                @blur="
                    hasFocused = true
                    isFocused = false
                "
                @focus="isFocused = true"
                :value="value"
            />
            <div class="red--text message">
                {{ ((hasFocused || isDirty) && errorBucket[0]) || '&nbsp;' }}
            </div>
        </span>
    </div>
</template>

<script>
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
        // We want to display a label
        label: String
    }
}
</script>

<style scoped>
.message {
    margin-left: 6px;
}

.label {
    transition: all 0.25s;
    position: absolute;
    padding: 4px 6px;
    font-size: 12px;
    color: grey;
}

.placeholder {
    font-size: 16px;
    padding-top: 20px;
}

.input {
    outline: none;
    border: 1px solid silver;
    color: black;
    padding: 20px 6px 3px;
    height: 52px;
    font-size: 16px;
}

.invalid {
    border-color: red;
}
</style>
