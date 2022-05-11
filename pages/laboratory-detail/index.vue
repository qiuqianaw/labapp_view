<template>
  <view id="index-outer">
    <lab-name></lab-name>
    <lab-tags></lab-tags>
    <lab-content></lab-content>
  </view>
</template>

<script>
import labName from './components/lab-name.vue'
import labTags from './components/lab-tags.vue'
import labContent from './components/lab-content.vue'
export default {
  components: {
    'lab-name': labName,
    'lab-tags': labTags,
    'lab-content': labContent,
  },
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>
