<template>
  <div class="j_carousel j_panel">
    <Carousel v-model="value1" :height="223" :radius-dot="radiusDot" :dots="dots" loop>
        <CarouselItem>
            <div class="demo-carousel">广告位</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">广告位</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">广告位</div>
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
  .demo-carousel{
    background: @background-gray-color;
    text-align: center;
    height: 223px;
    line-height: 223px;
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
