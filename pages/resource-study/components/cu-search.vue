<template>
  <view class="content">
    <view class="cu-bar bg-white search">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input
          type="text"
          :placeholder="defaultKeyword"
          confirm-type="search"
          @search="doSearch(false)"
          @input="inputChange"
          @confirm="doSearch(false)"
          v-model="keyword"
        />
      </view>
      <view class="action">
        <button class="cu-btn bg-gradual-blue shadow-blur round">搜索</button>
      </view>
    </view>
    <view class="search-keyword">
      <scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
        <block v-for="(row, index) in keywordList" :key="index">
          <view class="keyword-entry" hover-class="keyword-entry-tap">
            <view
              class="keyword-text"
              @tap.stop="doSearch(keywordList[index].keyword)"
            >
              <rich-text :nodes="row.htmlStr"></rich-text>
            </view>
            <view
              class="keyword-img"
              @tap.stop="setKeyword(keywordList[index].keyword)"
            >
              <image src="/static/HM-search/back.png"></image>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      defaultKeyword: '',
      keyword: '',
      keywordList: [],
      isShowKeywordList: false,
    }
  },
  onLoad() {
    this.init()
  },
  methods: {
    init() {
      this.loadDefaultKeyword()
    },
    blur() {
      uni.hideKeyboard()
    },
    //加载默认搜索关键字
    loadDefaultKeyword() {
      //定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
      this.defaultKeyword = '默认关键字'
    },
    inputChange(event) {
      //兼容引入组件时传入参数情况
      // console.log(event)
      var keyword = event.detail ? event.detail.value : event
      if (!keyword) {
        this.keywordList = []
        this.isShowKeywordList = false
        return
      }
      this.isShowKeywordList = true
      uni.request({
        // url: 'https://192.168.2.173:8081/search/' + keyword, //仅为示例
        url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
        success: (res) => {
          this.keywordList = []
          this.keywordList = this.drawCorrelativeKeyword(
            res.data.result,
            keyword
          )
        },
      })
    },
    //高亮关键字
    drawCorrelativeKeyword(keywords, keyword) {
      var len = keywords.length,
        keywordArr = []
      for (var i = 0; i < len; i++) {
        var row = keywords[i]
        //定义高亮#9f9f9f
        var html = row[0].replace(
          keyword,
          "<span style='color: #9f9f9f;'>" + keyword + '</span>'
        )
        html = '<div>' + html + '</div>'
        var tmpObj = {
          keyword: row[0],
          htmlStr: html,
        }
        keywordArr.push(tmpObj)
      }
      return keywordArr
    },
    // 顶置关键字
    setKeyword(index) {
      this.keyword = this.keywordList[index].keyword
    },
    //执行搜索
    doSearch(keyword) {
      keyword = keyword === false ? this.keyword : keyword
      this.keyword = keyword
      uni.showToast({
        title: keyword,
        icon: 'none',
        duration: 2000,
      })
    },
  },
}
</script>

<style>
view {
  display: block;
}
.placeholder-class {
  color: #9e9e9e;
}

.search-keyword {
  width: 100%;
  background-color: rgb(242, 242, 242);
}

.keyword-list-box {
  height: calc(100vh - 110upx);
  padding-top: 10upx;
  border-radius: 20upx 20upx 0 0;
  background-color: #fff;
}

.keyword-entry-tap {
  background-color: #eee;
}

.keyword-entry {
  width: 94%;
  height: 80upx;
  margin: 0 3%;
  font-size: 30upx;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1upx #e7e7e7;
}

.keyword-entry image {
  width: 60upx;
  height: 60upx;
}

.keyword-entry .keyword-text,
.keyword-entry .keyword-img {
  height: 80upx;
  display: flex;
  align-items: center;
}

.keyword-entry .keyword-text {
  width: 90%;
}

.keyword-entry .keyword-img {
  width: 10%;
  justify-content: center;
}

.keyword-box {
  height: calc(100vh - 110upx);
  border-radius: 20upx 20upx 0 0;
  background-color: #fff;
}

.keyword-box .keyword-block {
  padding: 10upx 0;
}

.keyword-box .keyword-block .keyword-list-header {
  width: 94%;
  padding: 10upx 3%;
  font-size: 27upx;
  color: #333;
  display: flex;
  justify-content: space-between;
}

.keyword-box .keyword-block .keyword-list-header image {
  width: 40upx;
  height: 40upx;
}

.keyword-box .keyword-block .keyword {
  width: 94%;
  padding: 3px 3%;
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
}

.keyword-box .keyword-block .hide-hot-tis {
  display: flex;
  justify-content: center;
  font-size: 28upx;
  color: #6b6b6b;
}

.keyword-box .keyword-block .keyword > view {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60upx;
  padding: 0 20upx;
  margin: 10upx 20upx 10upx 0;
  height: 60upx;
  font-size: 28upx;
  background-color: rgb(242, 242, 242);
  color: #6b6b6b;
}
</style>
