<template>
    <form action="">
        <AdaptableInput v-for="input in Object.keys(inputs)" v-bind="inputs[input].props" v-bind:name="input" v-bind:errorMessage="errorMessages[input]" v-model="formData[input]"/>
        <div class="formButtonArea">
            <button v-if="closeFormButton" type="button" :value="closeFormButton.name" :class="closeFormButton.class"> {{ closeFormButton.text }}</button>
            <button v-if="submitFormButton" type="submit" :value="submitFormButton.name" :class="submitFormButton.class"> {{ submitFormButton.text }}</button>
        </div>
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
            errorMessages : {}
        }
    },
    props: {
        inputs: {
            Type: Object,
            required: true
        },
        submitFormButton : {
            Type: [Object,Boolean],
            required: false,
            default : {
                name : "submitForm",
                text : "Submit form"
            }
        },
        closeFormButton : {
            Type: [Object,Boolean],
            default : false
        }
    },
    methods: {
        checkValue : function(fieldToCheck){
            if(!Object.hasOwn(this.inputs[fieldToCheck], "checkFunction")){
                return true;
            }
            let result = this.inputs[fieldToCheck].checkFunction(this.formData[fieldToCheck]);

            this.errorMessages[fieldToCheck] = result.errorMessage;

            return result.success;
        },
        checkAllValues : function(){
            let errorExists = false;
            for(let input of Object.keys(this.inputs)){
                if(!this.checkValue(input)){
                    errorExists = true;
                };
            }
            return errorExists;
        }
   },
    watch : {
        formData : {
            handler : function(){
                console.log(this.formData);
                this.checkAllValues();
            },
            deep : true
        }
    },
}
</script>