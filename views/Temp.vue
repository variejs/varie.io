<template>
    <div>
        TEMP
        <input type="text" v-model="form.input" name="test_input">


        <div>
            <select v-model="form.select" name="test_select">
                <option value="0">0</option>
                <option value="1">1</option>
            </select>
        </div>

        <div>
            Radio
            <label>
                <input type="radio" value="1" name="test_radio" v-model="form.radio">
                1
            </label>
            <label>
                <input type="radio" value="2" name="test_radio" v-model="form.radio">
                2
            </label>
            <label>
                <input type="radio" value="3" name="test_radio" v-model="form.radio">
                3
            </label>
        </div>

        <div>
            Checkbox
            <label>
                <input type="checkbox" value="1" name="test_checkbox[]" v-model="form.checkbox">
                1
            </label>

            <label>
                <input type="checkbox" value="2" name="test_checkbox[]" v-model="form.checkbox">
                2
            </label>
            <label>
                <input type="checkbox" value="3" name="test_checkbox[]" v-model="form.checkbox">
                3
            </label>
        </div>
        <pre>{{ form }}</pre>
    </div>
</template>
<script>
    export default {
        data() {
          return {
           form  :{
             select : null,
             input : null,
             checkbox : [],
             radio : null,
           }
          }
        }
    }
</script>
