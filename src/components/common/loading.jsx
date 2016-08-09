export default class LoadingBar {
    constructor() {
        this.count = 0;
    }

    loadingStart() {
        $("#loading").removeAttr("style");
        $("#bar").removeAttr("style");
        var that = this;
        var timer = setInterval(function () {

            if (that.count == 100) {
                if (timer) { 
                    clearInterval(timer);
                }
                that.count = 0;
                return;
            }
            that.count++;
            if (that.count > 80) {
                clearInterval(timer);
            }
            $('#loading').progress({
                percent: that.count
            })
        }, 100);
    }

    loadingEnd() {
        this.count = 100;
        var that = this;
        $('#loading').progress({
            percent: that.count
        })
        setTimeout(function () {
            $('#loading').removeClass('success  progress');         
        }, 200)
    }
}