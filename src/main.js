import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Element from 'element-ui'

import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

// markdown
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// 代码赋值
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
// 代码 vuepress 主题
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
// 代码行数
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createHighlightLinesPlugin()); 
VueMarkdownEditor.use(vuepressTheme);
Vue.use(VueMarkdownEditor); 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')