(function(window) {
	function Player($audio) {
		return new Player.prototype.init($audio);
	}
	Player.prototype = {
		constructor: Player,
		musicList: [],
		init: function($audio) {
			//查找到的jQ元素
			this.$audio = $audio;
			//返回的是DOM对象，实际的DOM元素并且对他直接操作，而不是通过 jQuery 函数
			this.audio = $audio.get(0);
		},
		currentIndex: -1,
		playMusic: function(index, music) {
			//判断是否是同一首音乐
			if(this.currentIndex == index) {
				//同一首音乐
				if(this.audio.paused) {
					this.audio.play();
				} else {
					this.audio.pause();
				}
			} else {
				this.$audio.attr("src", music.link_url);
				this.audio.play();
				this.currentIndex = index;
			}
		},
		preIndex: function() {
			var index = this.currentIndex - 1;
			if(index < 0) {
				index = this.musicList.length - 1;
			}
			return index;
		},
		nextIndex: function() {
			var index = this.currentIndex + 1;
			if(index == this.musicList.length) {
				index = 0;
			}
			return index;
		},
		changeMusic: function(index) {
			//删除对应的数据
			this.musicList.splice(index, 1);
			//判断当前删除的是否是正在播放音乐的前面的音乐
			if(index < this.currentIndex) {
				this.currentIndex = this.currentIndex - 1;
			}
		},
		musicTimeUpdate: function(callBack) {
			var $this = this;
			this.$audio.on("timeupdate", function() {
				var duration = $this.audio.duration;
				var currentTime = $this.audio.currentTime;
				var timeStr = $this.formatDate(currentTime, duration);
				//不传回调函数，直接写这句代码也是一样的效果。
//				$(".music_progress_time").text(timeStr);   
				callBack(currentTime , duration , timeStr);
			});
		},
		//定义一个格式化时间的方法
		formatDate: function(currentTime , duration) {
				var endMin = parseInt(duration / 60);
				var endSec = parseInt(duration % 60);
				if (endMin < 10) {
					endMin = "0" + endMin;
				};
				if (endSec < 10) {
					endSec = "0" + endSec;
				};
				var startMin = parseInt(currentTime / 60);
				var startSec = parseInt(currentTime % 60);
				if (startMin < 10) {
					startMin = "0" + startMin;
				};
				if (startSec < 10) {
					startSec = "0" + startSec;
				};
				return startMin + ":" + startSec + " / " + endMin + ":" + endSec;
			}
       /* musicSeekTo: function(value){
        	if(isNaN(value)) return;
        	this.audio.currentTime = this.audio.duration * value;
        }*/
       /*musicVideoSeekTo: function(value){
        	* if(isNaN(value)) return;
        	* if(value < 0 || value > 1) return;
       	//volume取值范围是0-1.
       	this.audio.volume = value;
       },*/
	}
	Player.prototype.init.prototype = Player.prototype;
	//为了外界也能使用，所以要加上window	
	window.Player = Player;
})(window);