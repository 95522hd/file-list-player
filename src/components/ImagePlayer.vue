<template>
    <div class="file_list_player_image">
         <el-image style="height: 100%;width: 100%;" :src="src" fit="contain"></el-image>
    </div>
</template>

<script>
export default {
    name: "ImagePlayer",
    props: {
        src: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
    .file_list_player_image{
        width: 100%;
        height: 100%;
    }
</style>