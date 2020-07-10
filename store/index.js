import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { //要设置的全局访问的state对象
	//数据
	imData: {
		messageList:[]
	}
	
	
};
const getters = { //实时监听state值的变化(最新状态)
	getImData() {
		return state.imData
	}
};
const mutations = {
	setImData(state,imData) {
		state.imData = imData
	}
};
const actions = {
	//调用方法 this.store.dispatch('login',userInfo)
	setImData(context, imData) { //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
		context.commit('setImData', imData);
	}
}

const store = new Vuex.Store({
	getters,
	state,
	mutations,
	actions
})

export default store
