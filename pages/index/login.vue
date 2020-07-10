<template>
	<view class="content">
		<view class="flex-sub text-center">
			<view class="text-xl padding">
				<text class="text-black text-bold">即时通讯</text>
			</view>
		</view>
		<view class="">
			<view class="cu-form-group margin-top">
				<view class="title">账号</view>
				<input placeholder="" v-model="account" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="" v-model="password" name="input" password></input>
			</view>
		</view>
		<button class="cu-btn bg-blue margin-tb-lg lg btn" @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:"",
				password:""
			}
		},
		methods:{
			login(){
				uni.navigateTo({
					url: '/pages/index/chat?token=' + this.account
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100px 60px;
		
	}
	.btn{
		width: 100%;
	}
</style>
