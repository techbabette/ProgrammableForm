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
        checkValue : function(fieldToCheck){
            if(!inputs[input].hasOwn("checkFunction")){
                return true;
            }
            let result = inputs[fieldToCheck].checkFunction(this.formData[fieldToCheck]);

            return result;
        },
        checkAllValues : function(){
            for(let input of Object.keys(inputs)){
                checkValue(input);
            }
        }
   },
    watch : {
        formData : function(){
            console.log(this.formData);
        }
    },
}
</script>