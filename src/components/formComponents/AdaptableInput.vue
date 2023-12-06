<template>
    <div>
        <label v-if="label" :for="id">{{ label }}</label>
        <input v-if="fieldType == 'string'" :id="id" type="text">
        <input v-if="fieldType == 'number'" :id="id" type="number">
        <select v-if="fieldType == 'select'" :name="name" :id="id">
            <option v-for="option in options" :key="option[optionsValueField]" :value="option[optionsValueField]">
                {{makeUpperCase(option[optionsTextField])}}
            </option>
        </select>
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
    },
    options : {
        type: Array,
        required : false
    },
    optionsValueField : {
        type: String,
        default: "id"
    },
    optionsTextField : {
        type: String,
        default: "name"
    }
  },
  methods: {
        makeUpperCase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
   }
}
</script>