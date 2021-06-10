import Vue from "vue";
import LoginDialog from "../components/LoginDialog/LoginDialog.vue";
let LoginConstructor = Vue.extend(LoginDialog); // 返回一个“扩展实例构造器”
let dialog = () => {
  let dialogDom = new LoginConstructor({
    el: document.createElement("div"), //将Alert组件挂载到新创建的div上
  });
  document.body.appendChild(dialogDom.$el); //把Alert组件的dom添加到body里
};
export default dialog;
