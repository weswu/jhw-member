<template>
  <div>
    <script :id='id' type='text/plain'></script>
    <Modal
        v-model="picModel"
        title="选择图片"
        width="800"
        ok-text="确定"
        @on-ok='insertImg'
        cancel-text="取消">
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    editorWidth: {
      type: String
    }
  },
  data () {
    return {
      id: '000',
      editor: null,
      imageEdit: false,
      width: '131px',
      imgWidth: '115px',
      imgUpdate: '',
      picModel: false,
      imgModel: false, // 点击后为true 只初始化一次
      config: {
        toolbars: [
          ['fullscreen', 'source', '|', 'undo', 'redo', '|', 'fontsize', '|', 'blockquote', 'horizontal', '|', 'removeformat', 'formatmatch', 'link', 'unlink'],
          ['bold', 'italic', 'underline', 'forecolor', 'backcolor', '|', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter'],
          ['fontfamily', 'letterspacing', '|', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'autotypeset', 'pasteplain', '|', 'insertimage', 'emotion', 'map', '|', 'inserttable', 'searchreplace']
        ],
        elementPathEnabled: false,
        wordCount: false,
        initialFrameWidth: 770,
        initialFrameHeight: 600,
        autoHeightEnabled: false,
        saveInterval: 500,
        allowDivTransToP: false,
        catchRemoteImageEnable: false, // 防止远程抓取图片
        enterTag: 'br', // 去掉自动添加的p和br标签
        UEDITOR_HOME_URL: './static/ueditor1_4_3/',
        serverUrl: './static/ueditor1_4_3/'
      }
    }
  },
  created () {
    this.$store.commit('nextUid')
    this.id = this.$store.state.uid.join('')
  },
  mounted () {
    const ctx = this
    if (this.editorWidth) {
      this.config.initialFrameWidth = this.editorWidth
    }
    this.editor = window.UE.getEditor(this.id, this.config) // 初始化UE
    this.editor.addListener('ready', function () {
      ctx.editor.setContent(ctx.content) // 确保UE加载完成后，放入内容。
      window.UE.dom.domUtils.on(document.getElementsByClassName('edui-for-insertimage')[0], 'click', function (e) {
        // e为事件对象，this为被点击元素对戏那个
        ctx.imgUpdate = ''
        ctx.picModel = true
        ctx.imgModel = true
      })
    })
    // 图片替换
    this.editor.addListener('selectionchange', function (editor, causeByUi) {
      if (!causeByUi) return
      ctx.img = ctx.editor.selection.getRange().getClosedNode()
      if (ctx.img && ctx.img.tagName === 'IMG') {
        if (ctx.img.className.indexOf('edui-faked-video') === -1 && ctx.img.className.indexOf('edui-upload-video') === -1 &&
          ctx.img.className.indexOf('edui-faked-webapp') === -1 && ctx.img.src.indexOf('http://api.map.baidu.com') === -1 &&
          ctx.img.className.indexOf('edui-faked-music') === -1 && ctx.img.src.indexOf('http://maps.google.com/maps/api/staticmap') === -1 &&
          !ctx.img.getAttribute('anchorname') && !ctx.img.getAttribute('word_img')) {
          setTimeout(function () {
            window.$('.edui-default .edui-clickable1').click(function () {
              ctx.imgUpdate = 'update'
              ctx.$refs.imgRef.initList()
              ctx.picModel = true
              ctx.imgModel = true
            })
          }, 500)
        }
      }
    })
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
    },
    setUEContent (data) { // 设置内容方法
      this.editor.setContent(data)
    },
    selectImg (data) {
      this.imgList = data
    },
    insertImg () {
      var ctx = this
      if (this.imgUpdate === 'update') {
        this.img.src = 'http://dfwjjingtai.b0.upaiyun.com/' + this.imgList.serverPath
      } else {
        for (var i = 0; i < this.imgList.length; i++) {
          var pic = 'http://dfwjjingtai.b0.upaiyun.com/' + this.imgList[i]['serverPath']
          ctx.editor.execCommand('inserthtml', '<img src="' + pic + '" alt="' + this.imgList[i].filename + '">', true)
        }
      }
    }
  },
  destroyed () {
    // this.editor.destroy()
  }
}
</script>
