<template>
  <div id="app">
    <Input label='准驾车型'
           v-model='data'
           :validateRule='carClassRule'
           :lineIsShow='true'
           errmessage='准驾车型格式输入有误'
           placeholder='请输入准驾车型'
           :maxlength='10'
           :istoUpperCase='true'
    ></Input>
  </div>
</template>

<script>
  import Input from './component/index'
export default {
  name: 'app',
  data () {
    return {
      data:''
    }
  },
  components:{
    Input
  },
  methods:{
    carClassRule(value){
      //正确格式要求为大写字母和数字（其他文字不允许）；
      let re = /^[0-9A-Z]+$/
      return re.test(value)
    }
  }
}
</script>

<style>
#app{
  width: 100px;
}
</style>
