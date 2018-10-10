<template>
  <div class="j_carousel j_panel">
    <Carousel v-model="value1" :height="auto" :radius-dot="radiusDot" :dots="dots" loop>
      <CarouselItem>
        <a href="http://xueyuan.jihui88.com/news-detail-201950.html" target="_blank"><img :src="'platform/img/banner1.jpg'"/></a>
      </CarouselItem>
    </Carousel>
  </div>

</template>

<script>
export default {
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
  .ivu-carousel-track,.ivu-carousel-item{
    width: 100% !important;
  }
  .demo-carousel{
    background: @background-gray-color;
    text-align: center;
    height: 223px;
    line-height: 223px;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .ivu-carousel-dots li button.radius{
    width: 11px;height: 11px;
    background: #f4f3f5;
  }
  .ivu-carousel-dots li.ivu-carousel-active > button.radius{
      width: 11px;height: 11px;
      background: #e7eaef
  }
}
</style>
