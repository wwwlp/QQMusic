(function(window) {
	function Progress($progressBar, $progressLine, $progressDot) {
		return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
	}
	Progress.prototype = {
		constructor: Progress,
		init: function($progressBar, $progressLine, $progressDot) {
			this.$progressBar = $progressBar;
			this.$progressLine = $progressLine;
			this.$progressDot = $progressDot;
		},
		isMove:false,
		progressClick: function(callBack) {
			var $this = this; //此时this是progress
			//监听背景的点击
			this.$progressBar.click(function(event) { //此时this是$progressBar
				//获取背景距离窗口默认的位置
				var normalLeft = $(this).offset().left;
				//获取点击处距离窗口的位置
				var eventLeft = event.pageX;
				//设置前景的宽度
				//				$(".music_progress_line").css("width", eventLeft - normalLeft);
				//				$(".music_progress_dot").css("left", eventLeft - normalLeft);     这两句也可以执行
				$this.$progressLine.css("width", eventLeft - normalLeft);
				$this.$progressDot.css("left", eventLeft - normalLeft); //如果不好理解，可以将$progressDot换成neme，age之类的理解。
				//计算进度条的比例
				var value = (eventLeft - normalLeft) / $(this).width();
				callBack(value);
			});
		},
		progressMove: function(callBack) {
			//1.监听鼠标的按下事件
			var $this = this; //此时this是progress
			var normalLeft = this.$progressBar.offset().left;
			var barWidth = this.$progressBar.width();
			this.$progressBar.mousedown(function() {
				$this.isMove = true;
				//2.监听鼠标的移动事件
				$(document).mousemove(function(event) {
					var eventLeft = event.pageX;
                    var offset = eventLeft - normalLeft;
					if( eventLeft - normalLeft >= barWidth ) {
						$this.$progressLine.css("width", barWidth+"px");
						$this.$progressDot.css("left", barWidth+"px");
					} else if(eventLeft - normalLeft <= 0) {
						$this.$progressLine.css("width", "0px");
						$this.$progressDot.css("left", "0px");
					} else {
						$this.$progressLine.css("width", eventLeft - normalLeft);
						$this.$progressDot.css("left", eventLeft - normalLeft);
					};
				});
			});
			//3.监听鼠标的抬起事件
			$(document).mouseup(function(event) {
				var eventLeft = event.pageX;
				$this.isMove = false;
				$(document).off("mousemove");
				//计算进度条的宽度
					var value = (eventLeft - normalLeft) / $this.$progressBar.width();
					//要在抬起时设置currentTime,如果在move中设置的话，则拖拽是音乐一直切换。
					callBack(value);
			});
		},
		setProgress: function(value) {
			if(this.isMove)return;
			if(value > 100 || value < 0) return;
			this.$progressLine.css({
				width: value + "%"
			});
			this.$progressDot.css({
				left: value + "%"
			});
		}
	}
	Progress.prototype.init.prototype = Progress.prototype;
	//为了外界也能使用，所以要加上window	
	window.Progress = Progress;
})(window);