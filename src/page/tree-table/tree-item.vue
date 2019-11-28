<template>
  <div :class="tdClass">
    <!--<span class="before-line" v-if="root !== 0 && nodes !== 1" :style="{'left':model.bLeft + 'px'}"></span>-->
    <table>
      <tr>
        <td :colspan="colSpan">
          <table>
            <tr class="leve" :class="levelClass" @click="editRow(model)">
              <td class="td1">
                <div class="td-title">
                  <span v-if="model.planItemDtoList.length > 0" class="tree-close" :class="{'tree-open':model.isExpand}" @click="handlerExpand(model)"></span>
                  <!--<a class="ellipsis">-->
                    <!--<span :title="model.proName">{{model.proName}}</span>-->
                  <!--</a>-->
                  <Input type="text" v-model="model.proName" v-if="editIndex === model.count" />
                  <span v-else>{{ model.proName }}</span>
                </div>
              </td>
              <td class="td2">{{model.subjectNature}}</td>
              <!--合计-->
              <td class="td3">{{number_format(model.planTotalAmount, 2, ".", ",")}}</td>
              <!--金额输入-->
              <td class="td4" v-for="(timeItem, index) in model.planItemTimeDtoList">
                <InputNumber
                  type="text"
                  v-model="timeItem.planAmount"
                  v-if="editIndex === model.count"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  @on-change="handleCalculation(model)"
                ></InputNumber>
                <span v-else>{{number_format(timeItem.planAmount, 2, ".", ",")}}</span>
              </td>

              <!--<td class="td5">-->
                <!--<div v-if="editIndex === model.count">-->
                  <!--<Button @click="saveRow(model)" size="small" >保存</Button>-->
                <!--</div>-->
                <!--<div v-else>-->
                  <!--<Button type="primary" size="small" @click="editRow(model)">编辑</Button>-->
                <!--</div>-->
              <!--</td>-->
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div v-show="model.isExpand" class="other-node" :class="otherNodeClass">
      <tree-item
        v-for="(m, i) in model.planItemDtoList"
        :key="String('child_node'+i)"
        :num='i'
        :root="1"
        @editRow="editRow"
        @handleCalculation="handleCalculation"
        @deleteFunc="deleteFunc"
        @handlerExpand="handlerExpand"
        :nodes.sync='model.planItemDtoList.length'
        :trees.sync='trees'
        :columns="columns"
        :editIndex="editIndex"
        :model.sync="m">
      </tree-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'treeItem',
    props: ['model', 'num', 'nodes', 'root', 'trees','columns','editIndex'],
    data() {
      return {
        parentNodeModel: null,
        currentData: JSON.parse(JSON.stringify(this.model)),
      }
    },
    computed: {
      colSpan() {
        return this.root === 0 ? '' : 6
      },
      tdClass() {
        return this.root === 0 ? 'td-border' : 'not-border'
      },
      levelClass() {
        return `${(this.model ? 'leve-' + this.model.level : '')}`+' '+`${(this.editIndex === this.model.count ? 'activeRow' : '')}`
      },
      childNodeClass() {
        return this.root === 0 ? '' : 'child-node'
      },
      otherNodeClass() {
        return this.model ? 'other-node-' + this.model.level : ''
      },
    },
    watch: {
      // 'model': {
      // 	handler() {
      // 		console.log('对象变化', this.model.isExpand)
      // 	},
      // 	deep: true
      // }
    },
    methods: {
      // 筛选出
      simplifyModel(data){
        let tempArr = [];
        for(let prop in data){
          this.columns.forEach(item => {
            if (prop === item.key) {
              tempArr.push({[prop]: data[prop]})
            }
          })
        }
        return tempArr;
      },
      getParentNode(m) {
        // 查找点击的子节点
        var recurFunc = (data, list) => {
          data.forEach((l) => {
            if (l.id === m.id) this.parentNodeModel = list
            if (l.planItemDtoList) {
              recurFunc(l.planItemDtoList, l)
            }
          })
        }
        recurFunc(this.trees, this.trees)
      },
      handlerExpand(m) {
        this.$emit('handlerExpand', m)
      },
      deleteFunc(m) {
        this.$emit('deleteFunc', m)
        // this.getParentNode(m)
        // console.log(this.parentNodeModel)
        // if (this.parentNodeModel.hasOwnProperty('planItemDtoList')) {
        // 	console.log('父级是跟节点', this.parentNodeModel)
        // 	this.parentNodeModel.planItemDtoList.splice(this.parentNodeModel.planItemDtoList.indexOf(m), 1)
        // } else if (this.parentNodeModel instanceof Array) {
        // 	console.log('跟节点', this.parentNodeModel)
        // 	this.parentNodeModel.splice(this.parentNodeModel.indexOf(m), 1)
        // }
      },
      editRow(m) {
        this.$emit('editRow', m)
      },
      handleCalculation(m){
        console.log('1111', m)
        this.$emit('handleCalculation', m)
      },
      number_format(number, decimals, dec_point, thousands_sep) {
        /*
        * 参数说明：
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
              var k = Math.pow(10, prec);
              return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
          s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
      }
    },
    filters: {
      formatDate: function(date) {
        // 后期自己格式化
        return date //Utility.formatDate(date, 'yyyy/MM/dd')
      }
    },
  }
</script>
