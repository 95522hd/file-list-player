<template>
    <div class="file_list_player_container" ref="container">
        <el-carousel :height="`${height}px`">
            <el-carousel-item v-for="(item,index) in fileList" :key="index">
                <image-player v-if="item.mediaType==='image'" :src="item.src"></image-player>
                <audio-player v-if="item.mediaType==='audio'" :src="item.src"></audio-player>
                <video-player v-if="item.mediaType==='video'" :src="item.src"></video-player>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import ImagePlayer from "./ImagePlayer";
import AudioPlayer from "./AudioPlayer";
import VideoPlayer from "./VideoPlayer";

export default {
    name: "App",
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        },
        fileList: {
            type: Array,
            default() {
                return [
                    {
                        src: 'https://t7.baidu.com/it/u=1026800620,1911560135&fm=193&f=GIF'
                    },
                    {
                        src: 'https://t7.baidu.com/it/u=3691080281,11347921&fm=193&f=GIF'
                    },
                    {

                    }
                ];
            }
        }
    },
    data() {
        return {
            width: 200,
            height: 100,
            list: [],
            extensions: {
                image: /\.(jpg|png|jpeg|bmp|gif)$/,
                audio: /\.(mp3|wav|flac|ogg)$/,
                video: /\.(mp4|flv)$/
            }
        }
    },
    watch: {
        fileList(newVal) {
            this.list = newVal.map(item => {
                if (item.mediaType) {
                    return item;
                }
                let queryIndex = item.src && item.src.indexOf('?');
                let cutSrc = queryIndex > -1 ? item.src.substring(0, queryIndex) : item.src;
                for (let key in this.extensions) {
                    if (this.extensions.hasOwnProperty(key) && cutSrc.test(this.extensions[key])) {
                        return {
                            ...item,
                            mediaType: key
                        }
                    }
                }
                return {
                    ...item
                };
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.calculateSize();
        })
    },
    methods: {
        calculateSize() {
            let {height, width} = this.$refs.container.getBoundingClientRect();
            this.height = height;
            this.width = width;
        }
    },
    components: {
        ImagePlayer,
        AudioPlayer,
        VideoPlayer
    }
}
</script>

<style scoped lang="less">
.file_list_player_container {
    width: 300px;
    height: 180px;
    background: #000;
}

.file_list_player_carousel {
    height: 100%;
    width: 100%;
}
</style>