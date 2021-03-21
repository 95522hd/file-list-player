import Vue from 'vue';
import App from "./components/App";
import 'element-ui/lib/theme-chalk/index.css'
import './static/icon/iconfont/iconfont.css'

import {
	Carousel,
	CarouselItem,
	Image
} from "element-ui";

Vue.use(Image);
Vue.use(Carousel);
Vue.use(CarouselItem);

export default new Vue({
	el: '#app',
	render: (h) => h(App)
})