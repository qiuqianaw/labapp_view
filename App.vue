<script>
export default {
  onLaunch: function () {
    // console.warn(
    //   '当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！'
    // )
    console.log("App Launch");
    console.log(
      [
        "     ┌─┐       ┌─┐ + + ",
        "  ┌──┘ ┴───────┘ ┴──┐++ ",
        "  │                 │ ",
        "  │       ───       │++ + + + ",
        "  ███████───███████ │+ ",
        "  │                 │+ ",
        "  │       ─┴─       │ ",
        "  │                 │ ",
        "  └───┐         ┌───┘ ",
        "      │         │ ",
        "      │         │   + + ",
        "      │         │ ",
        "      │         └──────────────┐ ",
        "      │          qiuqianaw     │ ",
        "      │          wilburn       ├─┐ ",
        "      │          xiaojie       ┌─┘ ",
        "      │                        │ ",
        "      └─┐  ┐  ┌───────┬──┐  ┌──┘  + + + + ",
        "        │ ─┤ ─┤       │ ─┤ ─┤ ",
        "        └──┴──┘       └──┴──┘  + + + + ",
        "               神兽保佑 ",
        "               永无BUG~",
        "               嗷呜嗷呜~",
      ].join("\n")
    );
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "colorui/icon.css";
@import "colorui/main.css";
@import "wxcomponents/vant/common/index.wxss";
</style>
