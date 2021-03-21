<template>
    <div class="file_list_player_audio">
        <audio :src="src" style="display: none"></audio>
        <control-panel @start="play" @pause="pause" @volumechange="changeVolume"></control-panel>
    </div>
</template>

<script>
import ControlPanel from "./ControlPanel";
export default {
    name: "AudioPlayer",
    props: {
        src: {
            type: String,
            default: ''
        }
    },
    methods:{
        play(){
            console.log(1)
        },
        pause(){
            console.log(2)
        },
        changeVolume(volume){
            console.log(volume)
        }
    },
    components:{
        ControlPanel
    }
}
</script>

<style scoped lang="less">
.file_list_player_audio {
    width: 100%;
    height: 100%;
    position: relative;
}

</style>