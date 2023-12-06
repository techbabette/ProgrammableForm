<template>
    <div class="form-group">
        <label v-if="label" :for="id" class="form-label">{{ label }}</label>
        <input v-if="fieldType == 'string'" v-model="localValue" :id="id" type="text" class="form-control">
        <input v-if="fieldType == 'number'" v-model="localValue" :id="id" type="number" class="form-control">
        <select v-if="fieldType == 'select'" v-model="localValue" :name="name" :id="id" class="col-12">
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
  mounted() {
       this.localValue = this.value
  },
  props: {
    value,
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
   },
   watch: {
       localValue: function() {
           this.$emit("input", this.localValue)
       },
       value: function() {
           this.localValue = this.value
       }
   }
}
</script>