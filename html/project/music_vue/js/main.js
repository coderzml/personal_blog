/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

let app = new Vue({
  el: "#player",
  data: {
    // 搜索内容
    music: "",
    // 音乐搜索
    sings: [],
    // 音乐地址
    singUrl: "",
    // 歌曲图片地址
    SongCover: "",
    // 歌曲详细信息地址（评论区）
    comments: [],
    // mv地址
    mvUrl: "",
    // MV 不显示
    isMvShow: false,
    isAnimate: false,
    click_play: true,
  },
  methods: {
    // 1. 搜索歌曲的时候
    search() {
      axios.get('https://autumnfish.cn/search?keywords=' + this.music).then(result => {
        // console.log(result);
        this.sings = result.data.result.songs;
        // console.log(this.sings);
      }, err => {
        console.log('请求歌曲名错误');
      })
    },
    // 2.设置歌曲的url
    loadSingUrl(id) {
      // console.log(id);
      axios.get('https://autumnfish.cn/song/url?id=' + id).then(result => {
        // console.log(result);
        this.singUrl = result.data.data[0].url;
        // console.log(this.singUrl);
      }, err => {
        console.log(err);
        console.log('请求歌曲url失败');
      })
      // 3. 获取封面信息
      axios.get('https://autumnfish.cn/song/detail?ids=' + id).then(result => {
        // console.log(result);
        this.SongCover = result.data.songs[0].al.picUrl;
        // console.log(this.SongCover);

      }, err => {
        console.log(err);
        console.log('获取歌曲信息失败');
      })
      // 4.获取热门评论
      axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + id).then(result => {
        // console.log(result);
        this.comments = result.data.hotComments;
        // console.log(this.comments);
      }, err => {
        console.log(err);
        console.log('获取热门评论失败');
      })
    },
    // 加载MV
    loadMV(vid) {
      // 5.歌曲MV 
      // console.log(vid);
      this.isMvShow = true;
      axios.get('https://autumnfish.cn/mv/url?id=' + vid).then(result => {
        // console.log(result);
        // 播放MV的时候 展厅歌曲
        this.$refs.audio.pause()
        this.mvUrl = result.data.data.url;
        // console.log(this.mvUrl);
      }, err => {
        console.log(err);
        console.log('歌曲MV获取失败');
      })
    },
    // 点击关闭MV
    offMv() {
      this.isMvShow = false;
      // 关闭MV的时候暂停播放
      this.$refs.video.pause();
    },
    // audio的播放事件
    play() {
      this.isAnimate = true;
      // 播放的时候清空MV信息
      this.mvUrl = '';
    },
    pause() {
      this.isAnimate = false;
    },
    // 点击光盘播放
    play2() {
      if (this.singUrl != '') {
        if (this.click_play) {
          this.$refs.audio.pause()
        } else {
          this.$refs.audio.play()
        }
        this.click_play = !this.click_play;
      }

    }
  },
  // 利用生命周期函数自动加载第一页歌曲内容，不要用户打开的时候就是空白的。而且便于调试不用老输入。
  created: function () {
    this.music = '胡歌';
    this.search();
  },
})