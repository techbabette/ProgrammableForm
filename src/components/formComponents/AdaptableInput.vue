<template>
    <div>
        <input v-if="fieldType == 'string'" type="text">
        <input v-if="fieldType == 'number'" type="number">
    </div>
</template>
<script>
export default {
  name: 'AdaptableInput',
  props: {
    fieldType : {
        type: String,
        default: "string" 
    }
  }
}
</script>