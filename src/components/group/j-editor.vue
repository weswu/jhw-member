<template>
  <div>
    <script :id='id' type='text/plain'></script>
    <JAlbum ref="ablum" :type="imgType" @on-change="insertImg"/>
    <Attachment ref="attachment" @on-change="insertFile"/>
  </div>
</template>
<script>
import JAlbum from '@/components/group/j-album'
import Attachment from '@/components/attachment/at-file'
export default {
  props: {
    content: {},
    eWidth: {},
    eHeight: {}
  },
  components: {
    JAlbum,
    Attachment
  },
  data () {
    return {
      id: '000',
      editor: null,
      imageEdit: false,
      width: '131px',
      imgWidth: '115px',
      imgType: 'many',
      config: {
        toolbars: [
          ['fullscreen', 'source', '|', 'undo', 'redo', '|', 'fontsize', '|', 'blockquote', 'horizontal', '|', 'removeformat', 'formatmatch', 'link', 'unlink'],
          ['bold', 'italic', 'underline', 'forecolor', 'backcolor', '|', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter'],
          ['fontfamily', 'letterspacing', '|', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'autotypeset', 'pasteplain', '|', 'insertimage', 'emotion', 'map', 'insertvideo', '|', 'inserttable', 'searchreplace', 'attachment']
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
        UEDITOR_HOME_URL: './platform/ueditor1_4_3/',
        serverUrl: './platform/ueditor1_4_3/',
        themePath: 'http://www.jihui88.com/manage_v4/platform/ueditor1_4_3/themes/'
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
        ctx.imgType = 'many'
        ctx.$refs.ablum.open()
      })
      // 附件点击
      window.UE.dom.domUtils.on(document.getElementsByClassName('edui-for-attachment')[0], 'click', function (e) {
        ctx.$refs.attachment.open()
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
              ctx.imgType = 'single'
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
      this.editor.setContent(data || '<p><br/></p>')
    },
    insertImg (e) {
      let vm = this
      if (this.imgType === 'single') {
        this.img.src = 'http://img.jihui88.com/' + e.src
      } else {
        e.forEach(item => {
          var pic = 'http://img.jihui88.com/' + item.src
          vm.editor.execCommand('inserthtml', '<img src="' + pic + '" alt="' + item.name + '">', true)
        })
      }
    },
    getFileIcon (url) {
      var ext = url.substr(url.lastIndexOf('.') + 1).toLowerCase()
      let maps = {
        'rar': 'icon_rar.gif',
        'zip': 'icon_rar.gif',
        'tar': 'icon_rar.gif',
        'gz': 'icon_rar.gif',
        'bz2': 'icon_rar.gif',
        'doc': 'icon_doc.gif',
        'docx': 'icon_docx.gif',
        'pdf': 'icon_pdf.gif',
        'mp3': 'icon_mp3.gif',
        'xls': 'icon_xls.gif',
        'xlsx': 'icon_xlsx.gif',
        'chm': 'icon_chm.gif',
        'ppt': 'icon_ppt.gif',
        'pptx': 'icon_pptx.gif',
        'avi': 'icon_mv.gif',
        'rmvb': 'icon_mv.gif',
        'wmv': 'icon_mv.gif',
        'flv': 'icon_mv.gif',
        'swf': 'icon_mv.gif',
        'rm': 'icon_mv.gif',
        'exe': 'icon_exe.gif',
        'psd': 'icon_psd.gif',
        'txt': 'icon_txt.gif',
        'jpg': 'icon_jpg.gif',
        'png': 'icon_jpg.gif',
        'jpeg': 'icon_jpg.gif',
        'gif': 'icon_jpg.gif',
        'ico': 'icon_jpg.gif',
        'bmp': 'icon_jpg.gif',
        'rtf': 'icon_rtf.gif',
        'wps': 'icon_wps.gif',
        'et': 'icon_et.gif',
        'dps': 'icon_dps.gif'
      }
      return maps[ext] ? maps[ext] : maps['txt']
    },
    insertFile (data) {
      let vm = this
      let html = ''
      let icon = ''
      let URL = vm.editor.getOpt('UEDITOR_HOME_URL')
      let iconDir = URL + (URL.substr(URL.length - 1) === '/' ? '' : '/') + 'dialogs/attachment/fileTypeImages/'
      data.forEach(item => {
        icon = 'http://www.jihui88.com/manage_v4/' + iconDir + vm.getFileIcon(item.serverPath)
        html += '<p style="line-height: 16px;">' +
          '<img style="vertical-align: middle; margin-right: 2px;" src="' + icon + '"/>' +
          '<a style="font-size:12px; color:#0066cc;" href="' + item.serverPath + '" target="_blank" title="' + item.filename + '">' + item.filename + '</a>' +
          '</p>'
      })
      vm.editor.execCommand('inserthtml', html)
    }
  },
  destroyed () {
    // this.editor.destroy()
  }
}
</script>
