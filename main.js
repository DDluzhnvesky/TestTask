
var snapShotArray = new Array();
var step = -1;

var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;

var currColor = "black",
    currWidth = 3,
    key = localStorage.key(1);

module.exports = {
    init: function () {
        var _this = this;
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;

        canvas.addEventListener("mousemove", function (e) {
            _this.findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            _this.findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            _this.findxy('up', e);
            _this.pushSsArray();
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            _this.findxy('out', e)
        }, false);
    },

    draw: function () {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = currColor;
        ctx.lineWidth = currWidth;
        ctx.stroke();
        ctx.closePath();
    },

    findxy: function (res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = currColor;
                ctx.fillRect(currX, currY, 3, 3);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                this.draw();
            }
        }
    },

    color: function (elem) {
        switch (elem.id) {
            case "red":
                currColor = "red";
                break;
            case "orange":
                currColor = "orange";
                break;
            case "yellow":
                currColor = "yellow";
                break;
            case "green":
                currColor = "green";
                break;
            case "blue":
                currColor = "blue";
                break;
            case "black":
                currColor = "black";
                break;
        }
    },

    width: function (elem) {
        switch (elem.id) {
            case "width-3":
                currWidth = "3";
                break;
            case "width-4":
                currWidth = "4";
                break;
            case "width-5":
                currWidth = "5";
                break;
            case "width-6":
                currWidth = "6";
                break;
            case "width-7":
                currWidth = "7";
                break;
            case "width-8":
                currWidth = "8";
                break;
        }
    },

    setImgSize: function () {
        let width = document.getElementById("imgWidth").value;
        let height = document.getElementById("imgHeight").value;
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
    },

    resetImgSize: function () {
        canvas.setAttribute("width", "400");
        canvas.setAttribute("height", "400");
    },

    clean: function () {
        let m = confirm("Do you want to clean canvas ?");
        if (m) {
            ctx.clearRect(0, 0, w, h);
        }
    },

    save: function () {
        ++key;
        var dataURL = canvas.toDataURL();
        localStorage.setItem(key, dataURL);
    },

    showStorObj: function () {
        let showKey = document.getElementById("show");
        let key = document.getElementById("inputKey").value;
        showKey.setAttribute("src", localStorage.getItem(key));
    },

    pushSsArray: function () {
        step = step + 1;
        if (step < snapShotArray.length) { snapShotArray.length = step; }
        snapShotArray.push(document.getElementById('canvas').toDataURL());
    },

    undo: function () {
        if (step >= 0) {
            ctx.clearRect(0, 0, w, h);
            step--;
            var canvasPic = new Image();
            canvasPic.src = snapShotArray[step];
            canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        }
    },

    redo: function () {
        if (step < snapShotArray.length - 1) {
            step++;
            var canvasPic = new Image();
            canvasPic.src = snapShotArray[step];
            canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        }
    },

    avKeys: function () {
        var elem = document.getElementById("a-keys");
        var keys = "";

        for (var i = 0; i < localStorage.length; i++) {
            keys += '"' + localStorage.key(i) + '"' + " ";
        }
        elem.innerHTML = keys;
    }

}


