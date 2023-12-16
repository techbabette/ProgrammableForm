<template>
    <form action="">
        <AdaptableInput v-for="input in Object.keys(inputs)" v-bind="inputs[input].props"
        v-bind:name="input" v-bind:errorMessage="errorMessages[input]" v-model="formData[input]"
        @blur="checkValue"/>
        <div class="formButtonArea">
            <button v-if="closeFormButton" type="button" :name="closeFormButton.name"
            :class="closeFormButton.class" @click="closeFormButton.onClick ?? function(){}"> {{ closeFormButton.text }}</button>
            <button v-if="submitFormButton" type="submit" :name="submitFormButton.name"
            :class="submitFormButton.class" @click.prevent="checkAllValuesAndSubmit()"> {{ submitFormButton.text }}</button>
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
                text : "Submit form",
            }
        },
        closeFormButton : {
            Type: [Object,Boolean],
            default : false
        },
        onValidForm : {
            Type : Function,
        },
        onSuccess : {
            Type : Function,
            required : false
        }
    },
    methods: {
        checkValue : function(fieldToCheck){
            if(!Object.hasOwn(this.inputs[fieldToCheck], "checkFunction")){
                return true;
            }
            let result = this.inputs[fieldToCheck].checkFunction(this.formData[fieldToCheck]);

            this.$set(this.errorMessages, fieldToCheck, result.errorMessage);

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
        },
        checkAllValuesAndSubmit : async function(){
            if(!this.onValidForm){
                return;
            }

            if(!this.checkAllValues){
                return;
            }

            let result = await this.onValidForm(this.formData);

            if(result.errorMessages){
                this.errorMessages = result.errorMessages;
                return;
            }

            if(this.onSuccess){
                this.onSuccess(result);
            }
        }
   },
    watch : {
    },
}
</script>