<template>
  <div>
    <tree-table
      :columns="columns"
      ref="recTree"
      :list.sync="treeDataSource"
      @editRow="editRow"
      @handleCalculation="handleCalculation"
      @deleteFunc="deleteFunc"
      @handlerExpand="handlerExpand"
      @orderByFunc="orderByFunc"
      :editIndex="editIndex"
    ></tree-table>
  </div>
</template>
<script>
  import dataJson from './tree-table/data.json'
  import treeTable from './tree-table/tree-table.vue';
  export default {
    data() {
      return {
        treeDataSource: dataJson.data,
        columns: [
          {title: '职位名称', key: 'ObjectName'},
          {title: '负责人', key: 'ResponsibleName'},
          {title: '创建时间', key: 'CreateTime'},
          {title: '工作经验', key: 'Experience'},
          {title: '发布时间', key: 'BelongTo'},
          {title: '操作', key: 'action'},
        ],
        editIndex: 0,
      }
    },
    components: {treeTable},
    methods: {
      orderByFunc(val) {
        alert(val)
      },
      editRow(m) {
        this.editIndex = m.count;
      },
      handleCalculation(m, planCycle){
//        let amount = 0;
//        // 求和
//        m.planItemTimeDtoList.forEach(item => {
//          amount = amount + Number(item.planAmount)
//        })
//        m.planTotalAmount = amount;

        // todo 根据 m.id 找出上级
//        let iteration = true;
//        let reducePlanDataFunc = (data, id, parent) => {
//          data.map((current, i) => {
//            if (current.planItemDtoList.length > 0 && current.id !== id && iteration) {
//              reducePlanDataFunc(current.planItemDtoList, id, current)
//            }
//
//            if (current.id === id) {
//              console.log(parent);
//              // 计算planItemTimeDtoList每个对象的planAmount值
//              let timeTotal = 0;
//              parent.planItemDtoList.map((childItem) => {
//                childItem.planItemTimeDtoList.map((childTimeItem) => {
//                  if (childTimeItem.planCycle === planCycle) {
//                    timeTotal = timeTotal + childTimeItem.planAmount
//                  }
//                });
//              });
//              console.log(timeTotal)
////              parent.planItemTimeDtoList
//              parent.planItemTimeDtoList.map((timeItem, j) => {
//                if (timeItem.planCycle === planCycle) {
////                  timeItem.planAmount = timeTotal
//
//                }
//              });
//
//
//
//              if (parent.pid !== '-1') {
//                reducePlanDataFunc(this.treeDataSource, parent.id)
//              }
//
//              iteration = false;
//              return false;
//            }
//          })
//        }
//
//        if (m.pid !== '-1') {
//          reducePlanDataFunc(this.treeDataSource, m.id)
//        }




      },
      deleteFunc(m) {
//        console.log('删除')
      },
      handlerExpand(m) {
//        console.log('展开/收缩')
        m.isExpand = !m.isExpand
      }
      // getTreeData() {
      //   // 取父节点
      //   let parentArr = this.list.filter(l => l.parentId === 0)
      //   this.treeDataSource = this.getTreeData(this.list, parentArr)
      // },
      // // 这里处理没有children结构的数据
      // getTreeData(list, dataArr) {
      //   dataArr.map((pNode, i) => {
      //     let childObj = []
      //     list.map((cNode, j) => {
      //       if (pNode.Id === cNode.parentId) {
      //         childObj.push(cNode)
      //       }
      //     })
      //     pNode.children = childObj
      //     if (childObj.length > 0) {
      //       this.getTreeData(list, childObj)
      //     }
      //   })
      //   return dataArr
      // }
    }
  }
</script>

<style>

</style>
