<template>
  <div ref="editor" class="wang-editor-box"></div>
</template>
<script>
import E from 'wangeditor';
export default {
    data(){
        return {
            editor: null
        }
    },
    mounted(){
        let dom = this.$refs.editor;
        this.editor = new E(dom);
        this.editor.config.zIndex = 998
        this.editor.create()
    }
}
</script>
<style lang="less" scoped>
.wang-editor-box {
    z-index: 998;
}
</style>