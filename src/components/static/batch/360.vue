<template>
  <div class="">
    <Form action="http://info.so.360.cn/index.php?g=Embody&amp;m=Index&amp;a=submit" method="post" name="delcache" target="_blank"
      ref="modalForm" :model="detail" :rules="rules" :label-width="110">
      <FormItem label="网站类型：" prop="websitetype">
        <Select v-model="detail.websitetype" name="websitetype" class="w144 border">
          <Option value="企业官网">企业官网</Option><Option value="购物团购">购物团购</Option>
          <Option value="兼职招聘">兼职招聘</Option><Option value="医疗机构">医疗机构</Option>
          <Option value="博客论坛">博客论坛</Option><Option value="软件应用">软件应用</Option>
          <Option value="影音视频">影音视频</Option><Option value="小说漫画">小说漫画</Option>
          <Option value="旅游户外">旅游户外</Option><Option value="平台分享">平台分享</Option>
          <Option value="学校学院">学校学院</Option><Option value="游戏娱乐">游戏娱乐</Option>
          <Option value="科学技术">科学技术</Option><Option value="网址导航">网址导航</Option>
          <Option value="其他网站">其他网站</Option>
        </Select>
      </FormItem>
      <FormItem label="网站ICP备案：" prop="icp">
        <Input v-model="detail.icp" name="icp"></Input>
        <span class="j_unit" style="color: #999">（此类型网站必须填写网站的ICP备案信息）</span>
      </FormItem>
      <FormItem label="网址：" prop="url">
        <Input v-model="detail.url" name="url"></Input>
      </FormItem>
      <FormItem label="您的邮箱：" prop="email">
        <Input v-model="detail.email" name="email"></Input>
      </FormItem>
      <FormItem label="验证码：" prop="checkcode">
        <Input v-model="detail.checkcode" name="checkcode" style="width: 200px;"></Input>
        <img id="checkcodesrc" src="http://info.so.360.cn/index.php?g=Feed&m=Index&a=checkcode" class="checkcode" style="vertical-align: middle;padding: 0 10px 0 13px;">
        <i class="iconfont icon-shuaxin" onclick="javascript:document.getElementById('checkcodesrc').src += '&amp;?';return false;" style="font-size: 18px;vertical-align: middle;cursor: pointer;"></i>
      </FormItem>
      <FormItem>
        <Button type="primary" html-type="submit">提交</Button>
      </FormItem>
    </Form>
    <a href="http://info.so.360.cn/site_submit.html" target="_blank" class="a_underline">好搜提交入口</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      detail: {
        websitetype: '企业官网'
      },
      rules: {
        websitetype: [
          { required: true, message: '网站类型不能为空', trigger: 'blur' }
        ],
        icp: [
          { required: true, message: 'ICP备案不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '网址不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        checkcode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less">
</style>
