import Input from './input'
import _Vue from 'vue'

Input.install = Vue => {
  if (!Vue) {
    window.Vue = Vue = _Vue
  }
  Vue.component(Input.name, Input)
}
export default Input;
