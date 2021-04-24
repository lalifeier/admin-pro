<template>
  <div>
    <z-tree
    style="width: 350px; height: 700px; margin: 0 auto; overflow: auto;"
      :setting="setting"
      :nodes="nodes"
      @onClick="onClick"
      @onCheck="onCheck"
      @onCreated="handleCreated"
    />
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="update">更新数据</el-button>
    </el-row>
  </div>
</template>

<script>
import zTree from '@/components/zTree'

const bigData = require('./big-tree.json')
const simpleData = [
  { id: 1, pid: 0, name: '随意勾选 1', open: true },
  { id: 11, pid: 1, name: '随意勾选 1-1', open: true },
  { id: 111, pid: 11, name: '随意勾选 1-1-1' },
  { id: 112, pid: 11, name: '随意勾选 1-1-2' },
  { id: 12, pid: 1, name: '随意勾选 1-2', open: true },
  { id: 121, pid: 12, name: '随意勾选 1-2-1' },
  { id: 122, pid: 12, name: '随意勾选 1-2-2' },
  { id: 2, pid: 0, name: '随意勾选 2', checked: true, open: true },
  { id: 21, pid: 2, name: '随意勾选 2-1' },
  { id: 22, pid: 2, name: '随意勾选 2-2', open: true },
  { id: 221, pid: 22, name: '随意勾选 2-2-1', checked: true },
  { id: 222, pid: 22, name: '随意勾选 2-2-2' },
  { id: 23, pid: 2, name: '随意勾选 2-3' }
]
const dataQueue = [bigData.data, simpleData]
export default {
  components: { zTree },
  data () {
    return {
      showIndex: 0,
      ztreeObj: null,
      setting: {
        setting: {
          check: {
            enable: true
          },
          data: {
            key: {
              name: 'name'
            },
            simpleData: {
              enable: true,
              idKey: 'id',
              pIdKey: 'pid'
              // rootPId: 0
            }
          },
          view: {
            showIcon: false,
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom
          }
        }
      }
    }
  },
  computed: {
    nodes: function () {
      return dataQueue[this.showIndex]
    }
  },
  created () {},
  methods: {
    addHoverDom (treeid, treeNode) {
      const item = document.getElementById(`${treeNode.tId}_a`)
      if (item && !item.querySelector('.tree_extra_btn')) {
        const btn = document.createElement('sapn')
        btn.id = `${treeid}_${treeNode.id}_btn`
        btn.classList.add('tree_extra_btn')
        btn.innerText = '删除'
        btn.addEventListener('click', e => {
          e.stopPropagation()
          this.clickRemove(treeNode)
        })
        item.appendChild(btn)
      }
    },
    removeHoverDom (treeid, treeNode) {
      const item = document.getElementById(`${treeNode.tId}_a`)
      if (item) {
        const btn = item.querySelector('.tree_extra_btn')
        if (btn) {
          item.removeChild(btn)
        }
      }
    },
    clickRemove (treeNode) {
      console.log('remove', treeNode)
      this.ztreeObj && this.ztreeObj.removeNode(treeNode)
    },
    onClick: function (evt, treeId, treeNode) {
      // 点击事件
      console.log(evt.type, treeNode)
    },
    onCheck: function (evt, treeId, treeNode) {
      // 选中事件
      console.log(evt.type, treeNode)
    },
    handleCreated: function (ztreeObj) {
      // this.ztreeObj = ztreeObj
      // onCreated 中操作ztreeObj对象展开第一个节点
      // ztreeObj.expandNode(ztreeObj.getNodes()[0], true)
    },
    update: function () {
      // 更新示例数据
      this.showIndex = this.showIndex === 0 ? 1 : 0
    }
  }
}
</script>

<style></style>
