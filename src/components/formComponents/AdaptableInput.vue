<template>
    <div>
        <label v-if="label" :for="id">{{ label }}</label>
        <input v-if="fieldType == 'string'" :id="id" type="text">
        <input v-if="fieldType == 'number'" :id="id" type="number">
    </div>
</template>
<script>
export default {
  name: 'AdaptableInput',
  data(){
    return {
        localValue : undefined,
        id : Math.floor(Math.random() * 1000) + this.name
    }
  },
  props: {
    fieldType : {
        type: String,
        default: "string" 
    },
    label : {
        type: String,
        required: false
    },
    name : {
        type: String,
        default: "field"
    }
  }
}
</script>