<template>
  <Spin fix style="background: none" class="w-loading" v-if="$store.state.loading">
    <div class="loader">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
      </svg>
    </div>
  </Spin>
</template>
<style media="screen">
.w-loading .loader{
  width: 50px;
  height: 50px;
}
.w-loading svg {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 50px;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  width: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.w-loading .path{
  -webkit-animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite !important;
    animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
}
@-webkit-keyframes rotate {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes rotate {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@-webkit-keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35
    }

    to {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0
    }

    50% {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -35
    }

    to {
        stroke-dasharray: 89,200;
        stroke-dashoffset: -124
    }
}

@-webkit-keyframes color {
    0%,to {
        stroke: #d62d20
    }

    40% {
        stroke: #0057e7
    }

    66% {
        stroke: #008744
    }

    80%,90% {
        stroke: #ffa700
    }
}

@keyframes color {
    0%,to {
        stroke: #d62d20
    }

    40% {
        stroke: #0057e7
    }

    66% {
        stroke: #008744
    }

    80%,90% {
        stroke: #ffa700
    }
}
</style>
