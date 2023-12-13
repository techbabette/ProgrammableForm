<template>
    <form action="">
        <AdaptableInput v-for="input in Object.keys(inputs)" v-bind="inputs[input].props" v-bind:name="input" v-model="formData[input]"/>
    </form>
</template>
<script>
import AdaptableInput from "./AdaptableInput.vue";
export default {
    name: "ProgrammableForm",
    components: { AdaptableInput },
    data(){
        return {
            formData : {},
        }
    },
    props: {
        inputs: {
            Type: Object,
            required: true
        }
    },
    methods: {
        checkValue(){

        },
        checkValues(){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
   },
    watch : {
        formData : function(){
            console.log(this.formData);
        }
    },
}
</script>