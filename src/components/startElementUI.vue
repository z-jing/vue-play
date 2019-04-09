<template>
  <div>
    <div>startElementUI</div>
    <ElButton @click="bindClick" type="danger" round>click</ElButton>
  </div>
</template>

<script>
  import ElButton from './elements/button.vue'

  export default {
    name: 'startElementUI',
    components: {
      ElButton
    },
    methods: {
      bindClick: function () {
        console.log('bindClick')
      }
    }
  }
</script>
