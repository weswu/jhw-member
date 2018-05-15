<template>
  <div class="j_home_static j_panel">
    <Tabs :value="tabActive">
        <TabPane label="我的网站" name="0">
          <div style="padding: 0 28px 28px 28px;">
            <div class="j_tip">由于互联网信息管理法规，发布网站需要验证你的手机号信息。 <span class="a_underline">立即验证</span></div>
            <Button icon="plus" class="orange">创建新网站</Button> 你有0个网站上线了
            <ul class="static_info">
              <li class="item" v-for="item in list" :key="item.id">
                <p>
                  <span class="name">{{item.name}}</span> <i class="iconfont icon-bianji2"></i>
                  <span v-if="item.lan === '1'">(语言：中文)</span><span v-if="item.lan === '2'">(语言：中文)</span>
                  <span class="type">未上线</span>
                </p>
                <p>
                  http://pc.jihui88.com/rest/site/{{item.id}}/index <span class="time">(到期时间：{{item.endTime}})</span>
                  <Poptip trigger="hover" placement="top" class="j_poptip_ul">
                    <a href="javascript:;" class="buy">续费</a>
                    <ul slot="content">
                      <li> 自选模板 </li>
                      <li> 定制设计 </li>
                    </ul>
                  </Poptip>
                  <Poptip trigger="hover" placement="top" class="j_poptip_ul" v-if="item.type === '2'">
                    <a href="javascript:;" class="buy">升级</a>
                    <ul slot="content">
                      <li> 定制功能 </li>
                      <li> 定制设计 </li>
                    </ul>
                  </Poptip>

                </p>
                <p class="more">
                  <span class="a_underline">进入编辑</span>
                  <Poptip trigger="hover" placement="top" class="j_poptip_ul">
                    <span class="a_underline">更多选项</span>
                    <ul slot="content">
                      <li> 复制网站 </li>
                      <li> 删除网站 </li>
                      <li> 网站上线 </li>
                      <li> 语言设置 </li>
                      <li> 同步数据 </li>
                    </ul>
                  </Poptip>
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
      list: [
        {
          name: '网站名称',
          lan: '1',
          id: 203,
          endTime: '2018-04-09 09：00',
          type: '1'
        },
        {
          name: '网站名称',
          lan: '2',
          id: 204,
          endTime: '2019-04-09 09：00',
          type: '2'
        }
      ],
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
  .j_poptip_ul{
    li{
      text-align: center;
    }
  }
  .j_tip{
    margin-top: 0;
  }
  .static_info{
    margin-top: 20px;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    color: #b9b9b9;
    .item{
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
        margin-right: 3px;
      }
      .more{
        span{
          margin-right: 18px;
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
