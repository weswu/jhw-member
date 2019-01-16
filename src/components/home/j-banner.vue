<template>
  <div class="j_carousel j_panel">
    <Carousel v-model="value1" :height="'auto'" :radius-dot="radiusDot" :dots="dots" loop>
      <CarouselItem v-for="item in list" :key="item.attId">
        <a :href="item.linkUrl" target="_blank"><img :src="item.serverPath"/></a>
      </CarouselItem>
    </Carousel>
  </div>

</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      value1: 0,
      radiusDot: true,
      dots: 'outside'
    }
  }
}
</script>

<style lang="less">
@import '../../assets/variables.less';
.j_carousel{
  padding: 25px;
  margin-bottom: 26px;
  .demo-carousel{
    background: @background-gray-color;
    text-align: center;
    height: 223px;
    line-height: 223px;
  }
  img{
    width: 100%;
  }
  .ivu-carousel-dots li button.radius{
    width: 11px;height: 11px;
    background: #f0f0f0;
  }
  .ivu-carousel-dots li.ivu-carousel-active > button.radius{
    width: 11px;height: 11px;
    background: #e8e8e8
  }
}
</style>
