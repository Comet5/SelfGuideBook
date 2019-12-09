var flashSound = "";
chrome.extension.onRequest.addListener(function(o, e, n) {
    "setOptions" === o.type ? 
    flashSound = o.flashSound 
    : 
    "destroy_selected" === o.type && $("#areafon").remove(),
     n({})
}),
function(o) {
    function e() {
        var o = document.body,
            e = document.documentElement,
            n = (Math.max(o.scrollWidth, o.offsetWidth, e.clientWidth, e.scrollWidth, e.offsetWidth), Math.max(o.scrollHeight, o.offsetHeight, e.clientHeight, e.scrollHeight, e.offsetHeight));
        return {
            w: "100%",
            h: n
        }
    }

    function n() {
        {
            var n = e(),
                r = o('<div id="areafon"><div id="drag-cordinates" style="display: none;position: fixed;background: #fff;z-index: 9999;padding: 5px;font-size: 20px;top: 5px;left: 5px;"></div>').appendTo("body");
            o("body").offset()
        }
        r.css({
            width: n.w,
            height: n.h,
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: 999999,
            backgroundColor: "rgba(0,0,0,0.2)"
        });
        var c = o("<div>").appendTo(r);
        c.css({
            opacity: "0.1",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0px",
            top: "0px"
        }), l = o.Jcrop(c, {
            onSelect: i,
            onChange: d,
            onRelease: function() {
                r.css({
                    backgroundColor: "rgba(0,0,0,0.2)"
                })
            }
        }), chrome.extension.sendMessage({
            msg: "getCropScrollPosition"
        }, function(e) {
            "object" == typeof e && e.x2 <= n.w && e.y2 <= n.h && (l.setSelect([e.x, e.y, e.x2, e.y2]), o("html, body").animate({
                scrollTop: e.y
            }, "slow"), r.css({
                backgroundColor: "transparent"
            }))
        }), o(".jcrop-holder").css({
            background: "",
            overflow: "hidden"
        }), o(".jcrop-tracker").bind("mousedown", function() {
            r.css({
                backgroundColor: "transparent"
            })
        }), o("#areafon .jcrop-holder > div.jcrop-tracker").click(function() {
            "0px" == o(".jcrop-hline").parent().parent().css("width") && "0px" == o(".jcrop-hline").parent().parent().css("height") && document.body.addEventListener("mousemove", t, !1)
        })
    }

    function t(e) {
        var n = '<div class="crosshair crosshair-horizontal"></div><div class="crosshair crosshair-vertical"></div>';
        o("#areafon .jcrop-holder > div.jcrop-tracker").html(n).css({
            cursor: "none"
        }), o(".crosshair-horizontal").css({
            top: e.pageY + "px"
        }), o(".crosshair-vertical").css({
            left: e.pageX + "px"
        })
    }

    function r(o) {
        if (0 == u) return !1;
        var e = o.clientY,
            n = o.clientX,
            t = window.innerHeight - e,
            r = window.innerWidth - n;
        20 > e && (document.body.scrollTop -= 8), 40 > n && (document.body.scrollLeft -= 8), 40 > t && (document.body.scrollTop += 40 - t), 40 > r && (document.body.scrollLeft += 40 - r)
    }

    function i(e) {
        if (u = !0, c(e), o(".jcrop-handle, .jcrop-dragbar, .jcrop-hlin, .jcrop-tracker ").mouseup(function() {
                u = !1
            }), o(".jcrop-handle, .jcrop-dragbar, .jcrop-hlin, .jcrop-tracker ").mousedown(function() {
                u = !0, o("#areafon").bind("mousemove", function(o) {
                    r(o)
                })
            }), o("div").is("#screenshotbutton") && o("div").is("#screenshotsize")) return void d(e);
        var n = o("<button/>", {
                html: '<div class="name"></div>',
                id: "screenshotcn",
                "class": "edit_btn cancel",

            }),
            t = o("<div/>", {
                id: "screenshotbutton",
                "class": "voila_screenshot_buttons"
            });
        t.append('<div id="screenshotsize"></div>'), t.append(n), t.append('<a class="edit_btn save" id="imgdownload"  ><div class="name"></div></a>'), t.append('<audio style="display:none;" controls id="capture-flash"><source src="http://d3jbf8nvvpx3fh.cloudfront.net/voila/_resource/web_extension/sound/capture_click.mp3" type="audio/mpeg"></audio>');
        var i = o(".jcrop-dragbar").first();
        i.before(t), n.bind("click", function() {
            s()
            $('#mySidebar').show();
        }), t.bind("click", function() {
            "true" === flashSound ? 
            (p(), o(".jcrop-holder div div .jcrop-tracker").css({
                background: "rgba(255, 255, 255, 0.5)"
            }), setTimeout(function() {
                o(".jcrop-holder div div .jcrop-tracker").animate({
                    background: "rgba(255, 255, 255, 0)"
                }, 200, function() {
                    s(), 
                    setTimeout(function() {
                        chrome.extension.sendRequest({
                            operation: "saveScroll",
                            scrollToCrop: !1
                        }, function() {})
                    }, 200)
                })
            }, 100)) 
            : 
            (o(".jcrop-holder div div .jcrop-tracker").css({ //save 버튼 누르면 여기로 
                background: "rgba(255, 255, 255, 0.5)"
            }), setTimeout(function() {
                o(".jcrop-holder div div .jcrop-tracker").animate({
                    background: "rgba(255, 255, 255, 0)"
                }, 200, function() {
                    s() //캡쳐도구 삭제 
                    ,
                    setTimeout(function() {
                        chrome.extension.sendRequest({
                            operation: "saveScroll",
                            scrollToCrop: !1
                        }, function() {})
                    }, 200)
                })
            }, 100))
        }), d(e)
    }

    function c(o) {
        chrome.extension.sendMessage({
            msg: "saveCropScrollPosition",
            position: o
        }, function() {})
    }

    //alert('aferon 삭제')
    function s() {
        window.voilaChromeOption = !1, window.thisScrollEr = !1, o("#areafon").remove()
        
    }

    function d(e) {
        o(".jcrop-handle.ord-n, .jcrop-handle.ord-e, .jcrop-handle.ord-s, .jcrop-handle.ord-w").show(), e.w > 0 && e.h > 0 && (o("#drag-cordinates").show(), o("#screenshotsize, #drag-cordinates").html("<span>" + e.w + " x " + e.h + "</span>")), o("#screenshotbutton").css(e.h + e.y + 55 > o(window).height() ? {
            bottom: "20px",
            right: "-20px"
        } : {
            bottom: "20px",
            right: "-20px"
        }), (e.h < 70 || e.w < 120) && o("#screenshotbutton").css({
            bottom: "-75px",
            right: "-100px"
        }), e.h < 70 && e.w < 70 && o(".jcrop-handle.ord-n, .jcrop-handle.ord-e, .jcrop-handle.ord-s, .jcrop-handle.ord-w").hide(), a(e)
    }

    function a(o) {
        var e = o.x,
            n = o.y,
            t = o.w,
            r = o.h;
        chrome.extension.sendRequest({
            operation: "cap",
            xs: e,
            ys: n,
            ws: t,
            hs: r
        })
    }

    function p() {
        var o = document.getElementById("capture-flash");
        0 == f && (f = !0, o.play())
    }
    window.voilaChromeOption = !0, window.thisScrollEr = !0;
    var l, u, h = 0,
        f = !1,
        v = !0;
    n(), o("#areafon").bind("mousemove", function(e) {
        o("body").mouseup(function() {
            h = 1e6
        }), o(".bottom").width() > h && r(e)
    }), 
    window.addEventListener("keydown", function(o) {
        o = o || window.event, 27 == o.keyCode && s()
    }, !1), 
    // window.addEventListener("keydown", function(e) {
    //     e = e || window.event, 13 == e.keyCode && v && (v = !1, "true" === flashSound ? (p(), o(".jcrop-holder div div .jcrop-tracker").css({
    //         background: "rgba(255, 255, 255, 0.5)"
    //     }), setTimeout(function() {
    //         o(".jcrop-holder div div .jcrop-tracker").animate({
    //             background: "rgba(255, 255, 255, 0)"
    //         }, 200, function() {
    //             s(), chrome.extension.sendRequest({
    //                 operation: "saveScroll",
    //                 scrollToCrop: !1
    //             }, function() {})
    //         })
    //     }, 100)) : (s(), chrome.extension.sendRequest({
    //         operation: "saveScroll",
    //         scrollToCrop: !1
    //     }, function() {})))
    // }, !1), 
    document.body.addEventListener("mousemove", t, !1), document.body.addEventListener("mouseup", function() {
        "0px" != o(".jcrop-hline").parent().parent().css("width") && "0px" != o(".jcrop-hline").parent().parent().css("height") && (document.body.removeEventListener("mousemove", t, !1), o(".crosshair").remove())
    }, !1), 
    parent.document.onmouseup = function() {
        setTimeout(function() {
            o("#drag-cordinates").hide()
        }, 200)
    }
}(jQuery);