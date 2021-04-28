<template>
  <div class="container">
    <el-button @click="handleSearch()">查询</el-button>
    <div class="top">
      <button tooltip="上左上左上左上左上左上左上左">上左</button>
      <button tooltip="上边上边上边上边上边上边上边上边上边" placement="top">上边</button>
      <button
        tooltip="上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右上右"
        placement="top-right"
      >
        上右
      </button>
    </div>
    <div class="left">
      <button tooltip="左上左上左上左上左上左上左上左上左上左上" placement="left-top">左上</button>
      <button tooltip="左边" placement="left" effect="light">左边</button>
      <button tooltip="左右" placement="left-bottom">左下</button>
    </div>
    <div class="right">
      <button tooltip="右上右上右上右上右上右上右上右上" placement="right-top">右上</button>
      <button tooltip="右边" placement="right" effect="light">右边</button>
      <button tooltip="右下" placement="right-bottom">右下</button>
    </div>
    <div class="bottom">
      <button tooltip="下左" placement="bottom-left">下左</button>
      <button tooltip="下边" placement="bottom" effect="light">下边</button>
      <button tooltip="下右下右下右下右下右下右下右下右下右" placement="bottom-right">下右</button>
    </div>
  </div>
</template>

<script>
import { test } from '@/api/user'
export default {
  methods: {
    async handleSearch() {
      console.log(await test())
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  box-sizing: border-box;
  padding: 12px 20px;
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: 0.1s;
}

button:hover {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #c6e2ff;
}

.container {
  width: 340px;
  margin: 0 auto;
  text-align: center;
}

.container .right {
  float: right;
  width: 70px;
}

.container .left {
  float: left;
  width: 70px;
}

.container .bottom {
  clear: both;
}

[tooltip] {
  position: relative;
}

[tooltip]::after {
  position: absolute;
  z-index: 100;
  display: none;
  max-width: 200px;
  padding: 8px 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 4px;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4);
  content: attr(tooltip);
}

[tooltip]::before {
  position: absolute;
  z-index: 100;
  display: none;
  border: 5px solid transparent;
  border-bottom-width: 0;
  content: '';
}

[tooltip]:hover::after {
  display: block;
}

[tooltip]:hover::before {
  display: block;
}

[tooltip][placement^='top']::after,
[tooltip][placement^='top']::before {
  animation: anime-top 300ms ease-out forwards;
}

[tooltip][placement^='right']::after,
[tooltip][placement^='right']::before {
  animation: anime-right 300ms ease-out forwards;
}

[tooltip][placement^='bottom']::after,
[tooltip][placement^='bottom']::before {
  animation: anime-bottom 300ms ease-out forwards;
}

[tooltip][placement^='left']::after,
[tooltip][placement^='left']::before {
  animation: anime-left 300ms ease-out forwards;
}

.tooltip-theme-dark,
[tooltip]::after {
  color: #fff;
  background-color: #313131;
}

.tooltip-theme-light,
[tooltip][effect='light']::after {
  color: #313131;
  background-color: #fff;
  border: 1px solid #313131;
}

.tooltip-placement-top,
[tooltip]:not([placement])::after,
[tooltip][placement='']::after,
[tooltip][placement='top']::after {
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 0);
}

.tooltip-placement-top-right,
[tooltip][placement='top-right']::after {
  bottom: calc(100% + 10px);
  left: 100%;
  transform: translate(-100%, 0);
}

.tooltip-placement-top-left,
[tooltip][placement='top-left']::after {
  bottom: calc(100% + 10px);
  left: 0;
  transform: translate(0, 0);
}

.tooltip-placement-right,
[tooltip][placement='right']::after {
  top: 50%;
  left: calc(100% + 10px);
  transform: translate(0, -50%);
}

.tooltip-placement-right-top,
[tooltip][placement='right-top']::after {
  top: 0;
  left: calc(100% + 10px);
  transform: translate(0, 0);
}

.tooltip-placement-right-bottom,
[tooltip][placement='right-bottom']::after {
  top: 100%;
  left: calc(100% + 10px);
  transform: translate(0, -100%);
}

.tooltip-placement-bottom,
[tooltip][placement='bottom']::after {
  top: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 0);
}

.tooltip-placement-bottom-right,
[tooltip][placement='bottom-right']::after {
  top: calc(100% + 10px);
  left: 100%;
  transform: translate(-100%, 0);
}

.tooltip-placement-bottom-left,
[tooltip][placement='bottom-left']::after {
  top: calc(100% + 10px);
  left: 0;
  transform: translate(0, 0);
}

.tooltip-placement-left,
[tooltip][placement='left']::after {
  top: 50%;
  right: calc(100% + 10px);
  transform: translate(0, -50%);
}

.tooltip-placement-left-top,
[tooltip][placement='left-top']::after {
  top: 0;
  right: calc(100% + 10px);
  transform: translate(0, 0);
}

.tooltip-placement-left-bottom,
[tooltip][placement='left-bottom']::after {
  top: 100%;
  right: calc(100% + 10px);
  transform: translate(0, -100%);
}

.triangle-theme-dark,
[tooltip]::before {
  border-top-color: #313131;
}

.triangle-theme-light,
[tooltip][effect='light']::before {
  border-top-color: #313131;
}

.triangle-placement-top,
[tooltip]:not([placement])::before,
[tooltip][placement='']::before,
[tooltip][placement='top']::before {
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translate(-50%, 0);
}

.triangle-placement-top-left,
[tooltip][placement='top-left']::before {
  bottom: calc(100% + 5px);
  left: 10px;
}

.triangle-placement-top-right,
[tooltip][placement='top-right']::before {
  right: 10px;
  bottom: calc(100% + 5px);
}

.triangle-placement-right,
[tooltip][placement='right']::before,
.triangle-placement-right-top,
[tooltip][placement='right-top']::before,
.triangle-placement-right-bottom,
[tooltip][placement='right-bottom']::before {
  top: 50%;
  left: calc(100% + 3px);
  transform: translate(0, -50%) rotateZ(90deg);
}

.triangle-placement-right-top,
[tooltip][placement='right-top']::before {
  top: 10px;
}

.triangle-placement-right-bottom,
[tooltip][placement='right-bottom']::before {
  top: auto;
  bottom: 10px;
  transform: translate(0, 0) rotateZ(90deg);
}

.triangle-placement-bottom,
[tooltip][placement='bottom']::before,
.triangle-placement-bottom-left,
[tooltip][placement='bottom-left']::before,
.triangle-placement-bottom-right,
[tooltip][placement='bottom-right']::before {
  top: calc(100% + 5px);
  left: 50%;
  transform: translate(-50%, 0) rotateZ(180deg);
}

.triangle-placement-bottom-left,
[tooltip][placement='bottom-left']::before {
  left: 10px;
  transform: translate(0, 0) rotateZ(180deg);
}

.triangle-placement-bottom-right,
[tooltip][placement='bottom-right']::before {
  right: 10px;
  left: auto;
}

.triangle-placement-left,
[tooltip][placement='left']::before,
.triangle-placement-left-top,
[tooltip][placement='left-top']::before,
.triangle-placement-left-bottom,
[tooltip][placement='left-bottom']::before {
  top: 50%;
  right: calc(100% + 3px);
  transform: translate(0, -50%) rotateZ(270deg);
}

.triangle-placement-left-top,
[tooltip][placement='left-top']::before {
  top: 10px;
}

.triangle-placement-left-bottom,
[tooltip][placement='left-bottom']::before {
  top: auto;
  bottom: 10px;
  transform: translate(0, 0) rotateZ(270deg);
}

@keyframes anime-top {
  from {
    bottom: 150%;
    opacity: 0.5;
  }
}

@keyframes anime-bottom {
  from {
    top: 150%;
    opacity: 0.5;
  }
}

@keyframes anime-left {
  from {
    right: 150%;
    opacity: 0.5;
  }
}

@keyframes anime-right {
  from {
    left: 150%;
    opacity: 0.5;
  }
}
</style>
