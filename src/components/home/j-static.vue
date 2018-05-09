<template>
  <div class="j_home_static j_panel">
    <Tabs :value="tabActive">
        <TabPane label="我的网站" name="0">
          <div style="padding: 0 28px 28px 28px;">
            <div class="j_tip">由于互联网信息管理法规，发布网站需要验证你的手机号信息。 <a href="javascript:;" class="">立即验证</a> </div>
            <Button icon="plus" class="btn-add">创建新网站</Button> 你有0个网站上线了
            <ul class="static_info">
              <li>
                <p>
                  <span class="name">网站名称</span> <i class="iconfont icon-bianji2"></i> <span>(语言：中文)</span> <span class="type">未上线</span>
                </p>
                <p>
                  http://pc.jihui88.com/rest/site/203/index <span class="time">(到期时间：2018-04-09 09：00)</span>  <a href="javascript:;" class="buy">购买</a>
                </p>
                <p class="more">
                  <a href="javascript:;">进入编辑</a><a href="javascript:;">更多选项</a>
                </p>
              </li>
            </ul>
            <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="pageChange"></JPagination>
          </div>
        </TabPane>
        <TabPane label="我的小程序" name="1">
          <div style="padding: 0 28px 28px 28px;">
            我的小程序
          </div>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JPagination
  },
  data () {
    return {
      tabActive: '0',
      list: [],
      searchData: {
        page: 1,
        pageSize: 2
      },
      total: 0
    }
  },
  methods: {
    get () {

    },
    handleTabRemove (name) {
      this['tabActive'] = name
    },
    // 分页
    pageChange (page) {
      this.searchData.page = page
      this.get()
    }
  }
}
</script>

<style lang="less">
.j_home_static{
  .j_tip{
    margin-top: 0;
  }
  .btn-add{
    background-color: #ff6700;
    border-color: #ff6700;
    color: #fff;
    &:hover{
      background-color: #ff6700;
      border-color: #ff6700;
      color: #fff;
    }
  }
  .static_info{
    margin-top: 20px;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    color: #b9b9b9;
    li{
      border-top: 1px solid #e9e9e9;
      padding: 0 18px;
      &:hover{
        background: #f9f9fa;
      }
      .name{
        color: #595959;
      }
      i{
        font-size: 12px;
        color: #9dabb5;
        margin-right: 18px;
        cursor: pointer;
      }
      .type{
        background: #d3d3d3;
        color: #fff;
        padding: 3px 5px;
        margin-left: 10px;
      }
      .time{
        margin: 0 8px 0 14px;
      }
      .buy{
        color: #939393;
        text-decoration: underline;
      }
      .more{
        a{
          color: #186dc6;
          margin-right: 18px;
          text-decoration: underline;
        }
      }
      p{
        border-bottom: 1px solid #e9e9e9;
        height: 60px;
        line-height: 60px;
        &:last-child{
          border-bottom: none;
        }
      }
    }
  }
}
</style>
