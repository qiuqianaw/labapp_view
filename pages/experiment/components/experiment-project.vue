<template>
  <view>
    <view v-if="loading == true" class="margin">
      <van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
    </view>
    <view v-else class="cu-card">
      <view
        class="cu-item shadow padding-top-sm"
        v-if="LabcourseExpassignVOS.length == 0"
      >
        <van-empty description="暂无实验课程" />
      </view>
      <view
        class="cu-item shadow padding-top-sm"
        v-for="(item, index) in LabcourseExpassignVOS"
        :key="index"
      >
        <view>
          <van-cell
            :label="item.classno + ' | ' + item.expclassname"
            icon="label-o"
            is-link
            :url="
              '/pages/experiment-detail/index?academicyearno=' +
              item.academicyearno +
              '&termno=' +
              item.termno +
              '&courseno=' +
              item.courseno +
              '&expclassno=' +
              item.expclassno
            "
          >
            <template #title>
              <span class="custom-title">{{ item.coursename }}</span>
              <span v-if="item.categoryno === '1'">
                <van-tag type="danger">{{ item.categoryname }}</van-tag>
              </span>
              <span v-else>
                <van-tag type="primary">{{ item.categoryname }}</van-tag>
              </span>
              <view class="text-sm">
                <text class="text-grey"
                  >{{ item.academicyearno }}年第{{ item.termno }}学期</text
                >
              </view>
            </template>
          </van-cell>
        </view>
        <view class="margin-left-xl">
          <view v-if="item.prjs.length == 0">
            <van-cell label="暂无实验项目" :border="false"></van-cell>
          </view>
          <view v-else>
            <view v-for="(item2, index2) in item.prjs" :key="index2">
              <van-cell
                :label="item2.prjname"
                :border="false"
                is-link
                :url="
                  '/pages/experiment-online/index?academicyearno=' +
                  item.academicyearno +
                  '&termno=' +
                  item.termno +
                  '&courseno=' +
                  item.courseno +
                  '&prjno=' +
                  item2.prjno +
                  '&expclassno=' +
                  item.expclassno
                "
              ></van-cell>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["loading", "LabcourseExpassignVOS"],
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "./style/experiment-project.scss";
</style>
