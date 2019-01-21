const moment = require('../../assets/plugins/moment.min.js')
var pickerDatetime = function(obj) {
  //初始化参数
  var _this = this;
  this.page = obj.page;
  this.height = obj.height != undefined ? obj.height : 600;
  this.success = obj.success != undefined ? obj.success : function() {};
  var pickerToolHeight = 100;
  this.page.setData({
    pickerViewHeight: this.height - pickerToolHeight
  });
  //是否有动画效果，设置属性，按钮
  this.pickerTimeout = null;
  if (obj.animation == 'slide' || obj.animation == 'fade') {
    this.animationType = 'slide';
    this.duration = obj.duration != undefined ? obj.duration : 500;
    this.TimingFunction = obj.timingFunction != undefined ? obj.timingFunction : 'linear';
    this.thisDelay = obj.delay != undefined ? obj.delay : 0;
    this.animation = obj.animation;
    this.page.pickerClear = function() {
      var newObj = {};
      newObj[_this.pickerName] = _this.page.data.bk;
      newObj['pickerAnimation'] = _this.pickerHideAnimation.export();
      clearTimeout(_this.pickerTimeout);
      _this.pickerTimeout = setTimeout(function() {
        _this.page.setData({
          pickerViewShow: false
        });
      }, _this.duration);
      this.setData(newObj);
    };
    this.page.pickerOk = function() {
      if (!this.data[_this.pickerName]) {
        var newObj = {};
        newObj[_this.pickerName] = _this.pickerDateValueArr[this.data.pickDatetimeValue[0]] + ' ' + _this.pickerHourTextArr[this.data.pickDatetimeValue[1]] + ':' + _this.pickerMinuteTextArr[this.data.pickDatetimeValue[2]]
        this.setData(newObj);
      }
      var newObj = {};
      newObj['pickerAnimation'] = _this.pickerHideAnimation.export();
      this.setData(newObj);
      clearTimeout(_this.pickerTimeout);
      _this.pickerTimeout = setTimeout(function() {
        _this.page.setData({
          pickerViewShow: false
        });
      }, _this.duration);
      _this.success();
    };
  } else {
    this.animation = '';
    this.page.pickerClear = function() {
      var newObj = {};
      newObj[_this.pickerName] = _this.page.data.bk;
      newObj['pickerViewShow'] = false;
      this.setData(newObj);
    };
    this.page.pickerOk = function() {
      this.page.pickerClear()
      this.setData({
        pickerViewShow: false
      });
      _this.success();
    };
  }

};
//启用时间选择器的方法
pickerDatetime.prototype.setPicker = function(pickerName) {
  var _this = this;
  if (this.page.data[pickerName] == undefined || this.page.data[pickerName] == '') {
    console.log('setPicker')
    //未有原先值，不处理
    var date = new Date();
    var pickerPreYear = date.getFullYear();
    var pickerPreMonth = date.getMonth() + 1;
    var pickerPreDay = date.getDate();
    var pickerPreHour = date.getHours();
    var pickerPreMinute = date.getMinutes();
    let pickDatetimeValue = [0, 0, 0]
    let date = new Date()
    let min = Math.ceil(date.getMinutes() / 10.0)
    let hour = date.getHours()
    let day = 0
    if (min === 6) {
      min = 0
        ++hour
      if (hour === 24) {
        hour = 0
          ++day
      }
    }
    pickDatetimeValue = [day, hour, min]
    var obj = new Object();
    let initDate = pickerPreYear + '-' + addDatetimeZero(pickerPreMonth) + '-' + pickerPreDay + ' ' + addDatetimeZero(hour) + ':' + addDatetimeZero(min * 10);
    obj[pickerName] = initDate
    obj.pickDatetimeValue = pickDatetimeValue
    this.page.setData(obj);
  } else {
    var pickerPreDate = new Date(Date.parse(this.page.data[pickerName].replace('-', '-').replace('-', '-').replace('-', '-')));
    let day = moment(this.page.data[pickerName], 'YYYY-MM-DD').diff(moment().format(
      'YYYY-MM-DD'
    ), 'days')
    var pickerPreYear = pickerPreDate.getFullYear();
    var pickerPreMonth = pickerPreDate.getMonth() + 1;
    var pickerPreDay = pickerPreDate.getDate();
    var pickerPreHour = pickerPreDate.getHours();
    var pickerPreMinute = pickerPreDate.getMinutes();
    let pickDatetimeValue = [0, 0, 0]
    let min = Math.ceil(pickerPreMinute / 10.0)
    var obj = new Object();
    pickDatetimeValue = [day, pickerPreHour, min]
    obj.pickDatetimeValue = pickDatetimeValue
    this.page.setData(obj);
  }
  this.pickerName = pickerName;
  this.pickerDateTextArr = [];
  this.pickerDateValueArr = [];
  this.pickerHourTextArr = [];
  this.pickerHourValueArr = [];
  this.pickerMinuteTextArr = [];
  this.pickerMinuteValueArr = [];
  var pickerNowDate = new Date();
  var pickerNowYear = pickerNowDate.getFullYear();
  var pickerNowHour = pickerNowDate.getHours();
  var pickerNowMinute = pickerNowDate.getMinutes();
  var pickerOldYearDate = new Date(pickerNowYear - 1, 2, 0);
  var pickerOldYearDayNum = 365;
  if (pickerOldYearDate.getDate() == 29) pickerOldYearDayNum = 366;
  var pickerNowMonth = pickerNowDate.getMonth() + 1;
  var pickerNowDay = pickerNowDate.getDate();
  var pickerWeekArr = ["日", "一", "二", "三", "四", "五", "六"];
  var pickerDateIndex = 0;
  var pickerHourIndex = 0;
  var pickerMinuteIndex = 0;
  //获取年月日选择数组
  for (let y = pickerNowYear - 1; y <= pickerNowYear + 1; y++) {
    for (let m = 1; m <= 12; m++) {
      let newDate = new Date(y, m, 0);
      let m_days = newDate.getDate();
      for (let d = 1; d <= m_days; d++) {
        let newDate = new Date(y, m - 1, d);
        let w = pickerWeekArr[newDate.getDay()];
        pickerDateIndex = parseInt(new Date(y + '/' + m + '/' + d) - new Date());
        let month = m
        if (d < 10) {
          d = '0' + d
        }
        if (m < 10) {
          month = '0' + m
        }
        if (d == pickerNowDay && m == pickerNowMonth && y == pickerNowYear) {
          this.pickerDateTextArr.push('今日');
          this.pickerDateValueArr.push(y + '-' + month + '-' + d);
        } else if (pickerDateIndex > 0) {
          this.pickerDateTextArr.push(m + '月' + d + '日 周' + w);
          this.pickerDateValueArr.push(y + '-' + month + '-' + d);
        }
      }
    }
  }
  //获取小时和分钟的数组，设置默认值
  if (this.page.data.pickerPreFlag) {
    for (let i = 0; i < 24; i++) {
      this.pickerHourValueArr.push(i);
      // if (i < 10) {
      //   this.pickerHourTextArr.push('0' + i);
      // } else {
      //   this.pickerHourTextArr.push(i + '');
      // }
      this.pickerHourTextArr.push(addDatetimeZero(i));
    }
    // for (let i = 0; i < 60; i++) {
    //   this.pickerMinuteValueArr.push(i);
    //   this.pickerMinuteTextArr.push(addDatetimeZero(i));
    // }
    let i = 0
    while (i < 60) {
      this.pickerMinuteValueArr.push(i);
      if (i === 0) {
        this.pickerMinuteTextArr.push(addDatetimeZero(i));
      } else {
        this.pickerMinuteTextArr.push(i);
      }
      i = i + 10
    }
  } else {
    for (let i = 0; i < 24; i++) {
      this.pickerHourValueArr.push(i);
      this.pickerHourTextArr.push(addDatetimeZero(i));
    }
    let i = 0
    while (i < 60) {
      this.pickerMinuteValueArr.push(i);
      if (i === 0) {
        this.pickerMinuteTextArr.push(addDatetimeZero(i));
      } else {
        this.pickerMinuteTextArr.push(i);
      }
      i = i + 10
    }
    // for (let i = 0; i < 60; i++) {
    //   this.pickerMinuteValueArr.push(i);
    //   this.pickerMinuteTextArr.push(addDatetimeZero(i));
    // }
  }
  //setData调用页面的选择器值、默认值
  var newObj = {};
  newObj['pickerDateTextArr'] = this.pickerDateTextArr;
  newObj['pickerHourTextArr'] = this.pickerHourTextArr;
  newObj['pickerMinuteTextArr'] = this.pickerMinuteTextArr;
  this.page.setData(newObj);
  if (this.animation == '') {
    //无动画
    this.page.setData({
      pickerViewShow: true
    });
  } else {
    //创建动画（由于只创建一个调用测试有问题，这里创建两个各自使用）
    var pickerShowAnimationType = wx.createAnimation({
      duration: _this.duration,
      timingFunction: _this.thisTimingFunction,
      delay: _this.thisDelay,
      transformOrigin: '50% 50% 0',
      success: function(res) {}
    });

    var pickerHideAnimationType = wx.createAnimation({
      duration: _this.duration,
      timingFunction: _this.TimingFunction,
      delay: _this.Delay,
      transformOrigin: '50% 50% 0',
      success: function(res) {

      }
    });
    clearTimeout(this.pickerTimeout);
    if (this.animation == 'slide') {
      this.pickerShowAnimation = pickerShowAnimationType.height(this.height + 'rpx').step();
      this.pickerHideAnimation = pickerHideAnimationType.height(0).step();
      this.page.setData({
        pickerViewShow: true,
        pickerViewStyle: 'height:0;'
      });
    } else {
      this.pickerShowAnimation = pickerShowAnimationType.opacity(1).step();
      this.pickerHideAnimation = pickerHideAnimationType.opacity(0).step();
      this.page.setData({
        pickerViewShow: true,
        pickerViewStyle: 'opacity:0;'
      });


    }
    this.page.setData({
      pickerAnimation: _this.pickerShowAnimation.export()
    })
  }

  //设置bindChange事件
  this.page.bindChange = function(e) {
    var val = e.detail.value
    var newObj = {};
    newObj[pickerName] = _this.pickerDateValueArr[val[0]] + ' ' + _this.pickerHourTextArr[val[1]] + ':' + _this.pickerMinuteTextArr[val[2]];
    this.setData(newObj);
    this.setData({
      pickDatetimeValue: val
    })
  };

};
module.exports = {
  pickerDatetime: pickerDatetime
}

function addDatetimeZero(num) {
  return new Array(2 - num.toString().length + 1).join("0") + num;
}