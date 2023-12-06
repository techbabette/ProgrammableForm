<template>
    <form action="">
        <AdaptableInput v-for="input in inputs" v-bind="input.props" v-model="formData[input.props.name]"/>
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
            Type: Array,
            required: true
        }
    },
    watch : {
        formData : function(){
            console.log(this.formData);
        }
    }
}
</script>