<template>
	<view class="content">
		<view class="cu-chat">
			<block v-for="(item,index) in messageList" :key="index">
				<block v-if="item.type == 'system'">
					<view class="cu-info round" v-if="item.msg.type=='text'">{{item.msg.content.text}}</view>
					<view class="cu-info" v-if="item.msg.type=='noFriendTips'">
						对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
						<text class="text-blue">发送好友验证</text>
					</view>
					<view class="cu-info" v-if="item.msg.type=='iconAndText'">
						<text :class="item.msg.content.icon" class="text-red"></text> {{item.msg.content.text}}
					</view>
				</block>
				<block v-if="item.type == 'user'">
					<view class="date text-center margin-top-sm text-gray">
						{{new Date().toLocaleString()}}
					</view>
					<view class="cu-item self" v-if="item.msg.flow=='out'">
						<view class="main">
							<view class="content shadow bg-blue" v-if="item.msg.type=='text'">
								<text>{{item.msg.content.text}}</text>
							</view>
							<view class="content shadow bg-blue" v-if="item.msg.type=='img'">
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
							</view>
						</view>
						<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
					</view>
					<view class="cu-item" v-if="item.msg.flow=='in'">
						<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
						<view class="main">
							<view class="content shadow" v-if="item.msg.type=='text'">
								<text>{{item.msg.content.text}}</text>
							</view>
							<view class="content shadow" v-if="item.msg.type=='img'">
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</block>
			</block>
		</view>

		<view class="padding-lr cu-bar foot input">
			<textarea auto-height class="solid-bottom" style="width: 80%;" :adjust-position="false" :focus="false" maxlength="100"
			 cursor-spacing="10" v-model="text" />
			<button class="cu-btn bg-green shadow" @click="sendMsg">发送</button>
		</view>
	</view>
</template>

<script>
	import yuanIm from  "../../common/yuanIm.js"
	export default {
		data() {
			return {
				text: "",
				messageList: [{
						type: "user",
						msg: {
							id: 1,
							type: "text",
							time: "1594188719",	
							fromUserId:1,
							toUserId:10,
							flow: "out",
							userinfo: {
								uid: 0,
								nickname: "大黑哥",
								avatar: "/static/img/face.jpg"
							},
							content: {
								text: "为什么温度会相差那么大？"
							}
						}
					},
					{
						type: "system",
						msg: {
							id: 0,
							type: "text",
							content: {
								text: "对方撤回一条消息!"
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 1,
							type: "text",
							time: "1594188719",
							fromUserId:1,
							toUserId:10,
							flow: "in",
							userinfo: {
								uid: 0,
								nickname: "客服",
								avatar: "/static/img/face.jpg"
							},
							content: {
								text: "我怎么知道？"
							}
						}
					},
					{
						type: "system",
						msg: {
							id: 0,
							type: "iconAndText",
							content: {
								icon: "cuIcon-roundclosefill",
								text: "对方拒绝了你的消息"
							}
						}
					},
					{
						type: "system",
						msg: {
							id: 0,
							type: "noFriendTips"
						}
					},
					{
						type: "user",
						msg: {
							id: 5,
							type: "img",
							time: "13:05",
							fromUserId:1,
							toUserId:10,
							flow: "in",
							userinfo: {
								uid: 0,
								nickname: "大黑哥",
								avatar: "/static/img/face.jpg"
							},
							content: {
								url: "/static/img/p10.jpg",
								w: 200,
								h: 200
							}
						}
					},
					{
						type: "user",
						msg: {
							id: 5,
							type: "img",
							time: "13:05",
							fromUserId:1,
							toUserId:10,
							flow: "out",
							userinfo: {
								uid: 0,
								nickname: "大黑哥",
								avatar: "/static/img/face.jpg"
							},
							content: {
								url: "/static/img/p10.jpg",
								w: 200,
								h: 200
							}
						}
					}
				]
			}
		},
		onLoad(option) {
			let token=option.token
			yuanIm.IM.getInstance(token);
		},
		// beforeDestroy() {
		// 	// 页面离开时断开连接,清除定时器
		// 	console.log("页面离开时断开连接,清除定时器");
		// 	this.im.close
		// },
		methods: {
			sendMsg() {
				let message = {
					type: "user",
					msg: {
						id: 1,
						type: "text",
						time: new Date().valueOf(),
						flow: "out",
						userinfo: {
							uid: 0,
							nickname: "大黑哥",
							avatar: "/static/img/face.jpg"
						},
						content: {
							text: this.text
						}
					}
				}
				this.messageList.push(message)
				
				yuanIm.IM.sendMsg(message)
				
				window.scrollTo(0,50000);
				
				this.text = ""
			}
		}
	}
</script>

<style>
	.content {
		padding: 20px 0 60px;
	}

	.cu-chat .cu-item {
		padding: 12px 14px;
	}
</style>
