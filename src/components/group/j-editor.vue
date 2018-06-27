<template>
  <div>
    <script :id='id' type='text/plain'></script>
    <JAlbum ref="ablum" :type="imgUpdate" @on-change="insertImg"/>
  </div>
</template>
<script>
import JAlbum from '@/components/group/j-album'
export default {
  props: {
    content: {},
    eWidth: {},
    eHeight: {}
  },
  components: {
    JAlbum
  },
  data () {
    return {
      id: '000',
      editor: null,
      imageEdit: false,
      width: '131px',
      imgWidth: '115px',
      imgUpdate: 'multiple',
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
    if (this.eWidth) {
      this.config.initialFrameWidth = this.eWidth
    }
    if (this.eHeight) {
      this.config.initialFrameHeight = this.eHeight
    }
    this.editor = window.UE.getEditor(this.id, this.config) // 初始化UE
    this.editor.addListener('ready', function () {
      ctx.editor.setContent(ctx.content || '<p><br/></p>') // 确保UE加载完成后，放入内容。
      window.UE.dom.domUtils.on(document.getElementsByClassName('edui-for-insertimage')[0], 'click', function (e) {
        // e为事件对象，this为被点击元素对戏那个
        ctx.imgUpdate = 'multiple'
        ctx.$refs.ablum.open()
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
            window.document.getElementsByClassName('edui-clickable1')[0].addEventListener('click', function (e) {
              ctx.imgUpdate = 'update'
              ctx.$refs.ablum.open()
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
    insertImg (e) {
      var ctx = this
      if (this.imgUpdate === 'update') {
        this.img.src = 'http://img.jihui88.com/' + e.src
      } else {
        let imgList = e
        for (var i = 0; i < imgList.length; i++) {
          var pic = 'http://img.jihui88.com/' + imgList[i]['serverPath']
          ctx.editor.execCommand('inserthtml', '<img src="' + pic + '" alt="' + imgList[i].filename + '">', true)
        }
      }
    }
  },
  destroyed () {
    // this.editor.destroy()
  }
}
</script>
