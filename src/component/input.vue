<template>
  <div class='box'>
    <div class='inputBox' :style='{borderBottom:lineIsShow?"1px solid rgb(231,231,231)":""}'>
      <p class='label'>{{label}}</p>
      <input type="text" class='inputContent'
             ref="input"
             @focus="focus()"
             @blur="blur($event)"
             :value='value'
             :maxlength='maxlength'
             :readonly='disable'
             :placeholder='placeholder'
             :style="{color:disable?'rgb(155,155,155)':(isError?'rgb(233,59,57)':'rgb(0,0,0)')}"
             @input="onChange($event)">
      <div class='inputRight'>
        <img src="../assets/icon-close.png"
             alt=""
             class='close'
             v-if='isFocus && value'
             @mousedown='clear($event)'>
        <img src="../assets/icon-warning.png"
             alt=""
             class='warning'
             v-if='isError && value'
             @click=''>
      </div>
      <slot></slot>
    </div>
    <Toast :text='errmessage' :value='show' position='middle' type='text' @on-hide='()=>{this.show = false}'/>
  </div>
</template>

<script>
  import { Toast } from 'vux'

  export default {
    data() {
      return {
        isFocus: false,
        isError: false,
        show:false
      }
    },
    components:{
      Toast
    },
    methods: {
      onChange(e) {
        // 改变父组件中value的值
        // 如果内容为空则字体为黑色没有错误
        this.isFocus = true
        if (!e.target.value) this.isError = false
        if (this.istoUpperCase) this.$emit('input', e.target.value.toUpperCase())
        else this.$emit('input', e.target.value)
      },
      clickTitle() {
        this.$refs['input'].focus()
        this.isFocus = true
      },
      focus() {
        (!this.disable) && (this.isFocus = true)
      },
      blur(e) {
        if (!this.disable) {
          this.isFocus = false
          //矫正ios聚焦不回弹
          this.blurAdjust()
          // 是否不符合校验规则
          this.isError = !this.validateRule(e.target.value)
          // 如果不符合则toast提示
          if (!this.validateRule(e.target.value) && e.target.value) {
            this.show = true
          } else {
            if (!e.target.value) this.isError = false
          }
        }
      },
      clear(e) {
        this.isError = false
        this.$emit('input', '')
        if (e && e.preventDefault) {
          //现代浏览器阻止默认事件
          e.preventDefault()
        } else {
          //IE阻止默认事件
          window.event.returnValue = false;
          return false;
        }
      },
      // 解决苹果不回弹页面
      blurAdjust(e) {
        setTimeout(() => {
          if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            return
          }
          let result = 'pc';
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
            result = 'ios'
          } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
            result = 'android'
          }

          if (result = 'ios') {
            document.activeElement.scrollIntoViewIfNeeded(true);
          }
        }, 100)
      }
    },
    props: {
      // 左边标题
      label: {
        type: String
      },
      // input内容
      value: {
        type: String
      },
      // 下滑线是否显示
      lineIsShow: {
        type: Boolean,
        default: true
      },
      // 是否禁用编辑
      disable: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: 100
      },
      //检验规则
      validateRule: {
        type: Function,
        default: () => {
          return false
        }
      },
      // 出错提示语
      errmessage: {
        type: String
      },
      // 提示语
      placeholder: {
        type: String
      },
      // 是否转大写
      istoUpperCase: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .box {
    height: 50px;
    width: 100vw;
    background: white;
    margin-top: 1px;
  }

  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgb(199, 199, 199);
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(199, 199, 199);
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgb(199, 199, 199);
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgb(199, 199, 199);
  }

  .inputBox {
    height: 50px;
    width: 96vw;
    margin-left: 4vw;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .label {
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    width: 100px;
    line-height: 50px;
    color: rgb(74, 74, 74);
    font-size: 16px;
  }

  .inputContent {
    line-height: 20px;
    /*color: rgb(0, 0, 0) !important;*/
    font-size: 16px;
    border: 0;
    outline: 0;
    flex: 1;
    position: relative;
    margin-left: 5px;
  }

  .inputContent:focus {
    outline: none;
    color: #000;
  }

  .inputRight {
    position: absolute;
    right: 23px;
    top: 0;
    height: 50px;
    /*width: 0.5rem;*/
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .close {
    width: 16px;
    height: 16px;
  }

  .warning {
    width: 22px;
    height: 22px;
    margin-left: 8px;
  }
</style>
