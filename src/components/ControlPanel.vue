<template>
    <div class="player_control_panel" @mousewheel="scroll($event)">
        <div class="panel_btn_group">
            <div class="panel_btn start_btn" v-show="showStart" @click="onStart"><i class="el-icon-caret-right"></i>
            </div>
            <div class="panel_btn pause_btn" v-show="!showStart" @click="onPause"></div>
        </div>
        <div class="panel_progress">
            <div class="panel_progress_btn"></div>
        </div>
        <div class="panel_volume">
            <i class="panel_volume_btn iconfont icon-volume" v-show="volume!==0" @click="changeMute('on')"></i>
            <i class="panel_volume_btn iconfont icon-mute" v-show="volume===0" @click="changeMute('off')"></i>
            <div class="volume_bar_container">
                <div class="volume_bar_inner" :style="{'background': volumeHeight}" @click="clickVolume($event)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ControlPanel",
    data() {
        return {
            showStart: true,
            volume: 1,
            lastVolume: 1
        }
    },
    computed: {
        volumeHeight() {
            return `linear-gradient(to top, #007bff 0, #007bff ${this.volume * 100}%, #fff ${this.volume * 100 + 1}%, #fff)`
        }
    },
    methods: {
        onStart() {
            this.showStart = false;
            this.$emit('start');
        },
        onPause() {
            this.showStart = true;
            this.$emit('pause');
        },
        changeMute(status) {
            switch (status) {
                case 'on':
                    this.lastVolume = this.volume;
                    this.volume = 0;
                    break;
                case 'off':
                    this.volume = this.lastVolume;
                    break;
                default:
                    break;
            }
        },
        clickVolume(e) {
            let y = e.offsetY;
            this.changeVolume(Math.round((40 - y) / 40 * 100) / 100);
        },
        changeVolume(volume) {
            this.volume = volume;
            this.$emit('volumechange', volume);
        },
        scroll(e) {
            let dir = e.deltaY;
            if (dir < 0) {
                this.changeVolume((this.volume + 0.1) > 1 ? 1 : (this.volume + 0.1));
            } else if (dir > 0) {
                this.changeVolume((this.volume - 0.1) < 0 ? 0 : (this.volume - 0.1));
            }
        }
    }
}
</script>

<style scoped lang="less">
.player_control_panel {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #efefef;

    .panel_btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translateY(-50%);
        background: #007bff;
        color: #fff;
        text-align: center;
        line-height: 32px;
        font-size: 24px;
        cursor: pointer;
    }

    .start_btn {

    }

    .pause_btn {

        &::before, &::after {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: block;
            content: '';
            height: 14px;
            width: 4px;
            background: #fff;
        }

        &::before {
            left: 10px;
        }

        &::after {
            right: 10px;
        }
    }

    .panel_progress {
        width: 50%;
        height: 4px;
        border-radius: 2px;
        background: #cacaca;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        cursor: pointer;

        @progress_btn_size: 8px;

        .panel_progress_btn {
            height: @progress_btn_size;
            width: @progress_btn_size;
            border-radius: 50%;
            background: #eaeaea;
            box-shadow: 0 0 3px #9a9a9a;
            left: -@progress_btn_size / 2;
            top: calc(50% - @progress_btn_size / 2);
            position: absolute;
        }
    }

    .panel_volume {
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;

        .panel_volume_btn {
            font-size: 22px;
            color: #7a7a7a;
        }

        .volume_bar_container {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            height: 50px;
            width: 16px;
            background: #ddd;
            box-shadow: 0 0 2px #777;
            display: flex;
            justify-content: center;
            align-items: center;

            .volume_bar_inner {
                width: 6px;
                height: 40px;
                background: #fff;
                position: relative;
                background: linear-gradient(to top, #007bff 0, #007bff 50%, #fff 51%, #fff);
            }

            .volume_bar_current {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 6px;
                background: #007bff;
            }
        }
    }
}
</style>