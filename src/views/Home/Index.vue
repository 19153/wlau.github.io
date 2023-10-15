<template>
	<div id="home" class="pb-5">
		<div class="wrap m-auto min-h-200px">
			<div class="title whitespace-nowrap">
				<h1 class="text-xl text-center my-3">vip视频解析</h1>
			</div>
			<div class="container-play m-auto shadow-lg relative">
				<img v-show="!isPlay"
					src="https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/x6/wallhaven-x6ewo3.png?w=1280&h=720&fmt=webp"
					onerror="this.src='https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'"
					class="align-middle w-full h-full" alt="图片加载失败" />
				<iframe ref="iframe" v-show="isPlay" :src="playAddr" id="iframe" seamless allowfullscreen="true"
					class="iframe h-full w-full"></iframe>
				<div class="api-list" v-show="displayList" @click.stop="">
					<div class="item-wrap absolute bg-light-200 bottom-0px left-0 bg-white">
						<div class="item cursor-pointer" v-for="(item, index) in videoParseList" @click="getParseUrl(index)">
							{{ item.name }}
						</div>
					</div>
				</div>
			</div>
			<div class="search-inp w-full flex mt-1">
				<div class="btn" @click="leftBtn">
					<button class="min-w-100px h-full">
						{{ jiexiName }}
					</button>
				</div>
				<div class="inp-box w-full relative">
					<input type="text" class="input" name="videoUrl" id="input" v-model="videoAddr"
						placeholder="请输入需要解析的视频链接,解析失败请更换解析源" />
					<span @click="videoAddr = ''"
						class="cursor-pointer h-25px w-25px text-md over absolute right-2 bottom-0 top-0 my-auto flex items-center justify-center rounded-1/2 bg-red-400 shadow-2xl">
						<img src="@/assets/close.svg" class="w-18px" />
					</span>
				</div>
				<div class="btn" @click="execPlay">
					<button class="min-w-100px h-full">
						解析播放
					</button>
				</div>
			</div>
			<footer class="text-center mt-2 bottom-10 left-0 right-0">
				<p class="text-xs text-left text-red-500">*点击左侧按钮可选解析源</p>
				<div class="explain text-center">
					<h3>关于投屏</h3>
					<p>网页播放器本身没有投屏功能，手机端部分浏览器播放视频会替换网页播放器使用内置播放器播放视频，所以在此类浏览器使用才会有投屏功能</p>
					<p>例如：夸克、小米浏览器、360安全(极速)浏览器等</p>
				</div>
				<h3>相关链接</h3>
				<ul class="origin-links flex justify-center">
					<li><a href="https://v.qq.com/" target="_blank" rel="noopener noreferrer">腾讯视频</a></li>
					<li><a href="https://www.iqiyi.com/" target="_blank" rel="noopener noreferrer">爱奇艺</a></li>
					<li><a href="https://youku.com" target="_blank" rel="noopener noreferrer">优酷</a></li>
					<li><a href="https://www.bilibili.com/" target="_blank" rel="noopener noreferrer">哔哩哔哩</a></li>
					<li><a href="https://www.mgtv.com" target="_blank" rel="noopener noreferrer">芒果TV</a></li>
				</ul>
			</footer>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { randomNum } from "@/utils/math";
const playAddr = ref<string>();

const videoAddr = ref("");
const isPlay = ref<boolean>(false);
const videoParseList = ref([
	{
		name: "综合/B站",
		url: "https://jx.jsonplayer.com/player/?url=",
		mobile: true,
	},
	{
		name: "虾米",
		url: "https://jx.xmflv.com/?url=",
		mobile: false,
	},
	{
		name: "爱豆",
		url: "https://jx.aidouer.net/?url=",
		mobile: true,
	},
	{
		name: "OK",
		url: "https://api.okjx.cc:3389/jx.php?url=",
		mobile: true,
	},
	{ name: "OKJX", type: "1,3", url: "https://okjx.cc/?url=", mobile: false },
	{
		name: "yparse",
		url: "https://jx.yparse.com/index.php?url=",
		mobile: false,
	},
	{
		name: "夜幕",
		url: "https://www.yemu.xyz/?url=",
		mobile: false,
	},
	{
		name: "M3U8TV",
		url: "https://jx.m3u8.tv/jiexi/?url=",
		mobile: true,
	},
	{
		name: "8090",
		url: "https://www.8090g.cn/?url=",
		mobile: false,
	},
	{
		name: "冰豆",
		url: "https://api.qianqi.net/vip/?url=",
		mobile: true,
	},
	{
		name: "playm3u8",
		url: "https://www.playm3u8.cn/jiexi.php?url=",
		mobile: false,
	}
]);
const displayList = ref(false);
watch(videoParseList, (newValue, oldValue) => {
	jiexiName.value = newValue[0].name
	parseUrl.value = newValue[0].url
})
const jiexiName = ref(videoParseList.value[0].name);
const parseUrl = ref(videoParseList.value[0].url);
const getParseUrl = (idx: number) => {
	parseUrl.value = videoParseList.value[idx].url;
	jiexiName.value = videoParseList.value[idx].name;
	displayList.value = false
};

const leftBtn = (e: Event) => {
	e.stopPropagation()
	displayList.value === false ? displayList.value = true : displayList.value = false
}

document.addEventListener("click", (e: Event) => {
	displayList.value = false
});

const iframe = ref();
const execPlay = () => {
	if (!videoAddr.value) {
		return;
	}
	playAddr.value = parseUrl.value + videoAddr.value;
	iframe.value.src = playAddr.value;
	isPlay.value = true;
};

const checkDevice = () => {
	function checkMobile() {
		return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	if (!checkMobile()) return
	if (checkMobile()) {
		videoParseList.value = videoParseList.value.filter((item, i, arr) => {
			return item.mobile
		})
	}
	videoParseList.value.splice(0, 0, ...videoParseList.value.splice(1, 1))
}
// const getrandomImg = () => {
// 	const n = [7, 8, 9, 15, 30, 32, 38, 39, 40, 41]
// 	const imgNum = n[randomNum(0, n.length - 1)]
// 	return 'https://cdn.seovx.com//d//img/momcn-2D%20(' + imgNum + ').jpg'
// }
onBeforeMount(() => {
	checkDevice()
});
</script>

<style lang="less" scoped>
.wrap {
	width: 70vw;
}

.container-play {
	border: 1px solid silver;
	aspect-ratio: 16/9;
}

.title h1 {
	background: rgba(134, 127, 127, 0.1);
	box-shadow: 0px 3px 5px rgb(186, 186, 186);
	color: rgb(47, 114, 173);
	text-shadow: 0px 3px 5px rgba(126, 137, 177, 0.529);
	padding: 3px 0;
}

.input {
	width: 100%;
	outline: none;
	background: rgb(251, 251, 251);
	border: 2px solid rgb(151, 186, 216);
	border-radius: 5px;

}

.api-list {
	transition: all 0.3s;
	animation: list-ani 0.2s;
}

@keyframes list-ani {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

.item-wrap {
	background: rgb(242, 242, 242);
	// border-radius: 15px;
	padding: 10px;
	display: flex;
	flex-flow: wrap row;
	justify-content: space-between;
	align-items: flex-start;
	align-content: flex-start;
	width: 360px;
	height: auto;
	overflow-y: auto;
	overflow-x: hidden;

	.item {
		border-radius: 15px;
		padding: 5px 0px;
		width: 47%;
		margin: 5px 3px;
		text-align: center;
		background: rgba(215, 215, 215, 0.23);
		box-shadow: inset 0 -4px 8px rgba(148, 185, 222, 0.4);
		transition: all 0.2s;

		&:hover {
			background: rgba(203, 203, 203, 0.4);
			transform: translate(0, -1px);
		}
	}
}

.btn {
	outline: none;
	border: 1px solid rgba(147, 112, 216, 0.204);
	border-radius: 5px;
	// width: 70px;
	// height: 30px;
	box-shadow: 0px 3px 3px 1px rgba(0, 0, 10, 0.1);
	cursor: pointer;
	margin: 0 3px;
	transition: all ease-in-out 0.2s;

	&:hover {
		transform: translatey(-1px);
		background: rgba(50, 80, 200, 0.1);
	}
}

.origin-links {
	li {
		margin: 0 10px;

		a {
			background: rgba(134, 127, 127, 0.1);
			color: rgb(47, 114, 173);
			text-decoration: underline;
		}
	}
}

// footer {
.explain {
	p {
		transform: scale(0.9);
		// text-shadow: 0px 3px 5px rgba(182, 182, 182, 0.529);
	}

}

// }

@media screen and (max-width: 920px) {
	.wrap {
		height: auto;
		width: 100%;
	}

	.item-wrap {
		width: 60%;
		max-width: 200px;
	}
}

@media screen and (max-width: 576px) {
	.search-inp {
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.item-wrap {
		height: 100%;
		flex-direction: column;
		flex-wrap: nowrap;

		.item {
			width: 100%;
		}
	}

	.input {
		display: block;
		width: 100%;
	}

	.btn:first-of-type {
		order: 1;
	}

	.btn:last-of-type {
		order: 2;
	}

	.input {
		border: none;
		border-bottom: 2px solid rgb(168, 179, 202);
		border-radius: 0;
		outline: none;

		&:focus {
			outline: none;
		}
	}

	.btn {
		margin-top: 5px;
		width: 48%;
		height: 2.2rem;
		text-align: center;
	}
}
</style>
