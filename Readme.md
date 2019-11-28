# vue-xx-input

> this is a component for input
这是一个用于移动端的input插件，里面包含了删除 校验提示功能


# how to install
npm i vue-xx-input 
 
# how to use 

#demo  
 <Input label='准驾车型'
           v-model='data'
           :validateRule='carClassRule'
           :lineIsShow='true'
           errmessage='准驾车型格式输入有误'
           placeholder='请输入准驾车型'
           :maxlength='10'
           :istoUpperCase='true'
    ></Input>


data 为绑定的input值
validateRule 传入的校验规则
lineIsShow  是否展示下划线
errmessage  校验错误提示内容
placeholder 输入提示
maxlength 最大长度
istoUpperCase 是否自动转大写
label 左边标题
disable 是否禁止改写
