(function ($) {

    //Handles Menu Drop Down
    $.fn.dropdown = function (start, finish) {
        this.find("li").click(function () {
            var pos = $(this).find(".menu-sub-item").css("top");
            if (pos == "-325px") {
                $(this).find(".menu-sub-item").stop().animate({ top: finish }, 200); //"51px"
            } else {
                $(this).find(".menu-sub-item").stop().animate({ top: start }, 400);//"-325px"
            }
        });
        $(document).click(function () {
            $(".menu-sub-item").each(
				function () {
				    var pos = $(this).css("top");
				    if (pos == finish) { //"51px"
				        $(this).stop().animate({ top: start }, 400);//"-325"
				    }
				});
        });
    };

    //Handles Page Scroll
    $.fn.pageScroll = function (speed, easing) {
        speed = speed || '250';
        easing = easing || 'swing';

        $(this).click(function () {
            var rel = $(this).attr('rel');
            if ($(rel).css('display') != 'none') {
                return false;
            }
            $(rel).css("display", "block");

            $('.page').each(function () {
                $(this).stop(true, true).animate({ left: '-=100%' }, speed, easing,
					function () {
					    if ('#' + $(this).attr('id') != rel) {
					        var hideID = '#' + $(this).attr('id');
					        $(hideID).css({ 'left': '100%', 'display': 'none' });
					    }
					});
            });
        });

    };

    //Handles modal image popup
    $.fn.modalImagePopup = function () {
        $(this).click(function () {
            $(".close, .modalImageBackground").remove();

            $(".modalImagePopup").each(function () {
                $(this).stop(true, true).hide();
            });

            var rel = $(this).attr("rel");
            var w = $(rel).width();
            var h = $(rel).height();
            var top = (parseInt(h) / 2) * -1;
            var left = (parseInt(w) / 2) * -1;
            $(rel).before("<div class='modalImageBackground' style='position: fixed; left: 0px; top: 0px; z-index: 10000; width: 100%; height: 100%; display: none;'></div>");
            $(rel).css({ 'position': 'fixed', 'z-index': '10001', 'top': '50%', 'left': '50%', 'margin-top': top, 'margin-left': left });
            $(rel).append("<div class='close' style='position:absolute;'></div>");

            $(".close").on('click', function () {
                $(rel).fadeOut();
                $(".modalImageBackground").fadeOut();
            });

            $(rel).stop(true, true).fadeIn();
            $(".modalImageBackground").fadeIn();

            return false;
        });
    };

    //Handles modal popup
    $.fn.modalPopup = function () {
        $(this).click(function () {
            $(".close, .modal-background").remove();

            var rel = $(this).attr("rel");
            var container = $(rel).children(".modal-container");
            var w = $(container).outerWidth();
            var h = $(container).outerHeight();

            var top = (parseInt(h) / 2) * -1;
            var left = (parseInt(w) / 2) * -1;

            $(container).before("<div class='modal-background' style='position: fixed; left: 0px; top: 0px; z-index: 10000; width: 100%; height: 100%;'></div>");
            $(container).css({ 'position': 'fixed', 'z-index': '10001', 'top': '45%', 'left': '50%', 'margin-top': top, 'margin-left': left });
            $(container).append("<div class='close'></div>");

            $(".close").on('click', function () {
                $(rel).fadeOut();
            });

            $(rel).stop(true, true).fadeIn();

            return false;
        });
    };

    displayTumblrBlog = function (tumblrDomain, blogCount, displayID) {
        var jsonURL;

        //check if http:// was included in tumblrDomain
        if (tumblrDomain.split(":")[0] != "http") {
            tumblrDomain = "http://" + tumblrDomain;
        }

        jsonURL = tumblrDomain + "/api/read/json?num=" + blogCount + "&callback=?";
        //Show loading image load.show()
        $.getJSON(jsonURL, function (data) {
            $.each(data.posts, function (i, posts) {
                if (posts.type == 'video') {
                    displayVideoPost(posts);
                } else if (posts.type == 'link') {
                    displayLinkPost(posts);
                } else if (posts.type == 'regular') {
                    $(displayID).append(displayTextPost(posts));
                }
            });

            $(".copy-code").copyText("pre");
        });


        function displayTextPost(posts) {
            if (posts == null) return;
            var tumblrPostID = "<span class='tumblr-post-id' id='" + posts['id'] + "'></span>";

            var tumblrPostTitle = "<h1 class='tumblr-post-title'> \
                                    <span class= 'tumblr-link'><a href='" + tumblrDomain + "' target='_blank' data-toggle='tooltip' title='" + tumblrDomain + "'><i class='fa fa-tumblr'></i></a></span> \
                                    <a href='" + posts['url'] + "' target='_blank'>" + posts['regular-title'] + "</a> \
                                   </h1>"
            tumblrPostTitle = tumblrPostTitle.replace("...", "... <span style='text-transform: lowercase; font-size:.8em;'>");

            var tumblrPostDate = new Date(posts['date']);
            tumblrPostDate = getWeekdayAsString(tumblrPostDate.getDay()) + " " + getMonthAsString(tumblrPostDate.getMonth()) + " " + tumblrPostDate.getDate() + ", " + tumblrPostDate.getFullYear();
            tumblrPostDate = "<div class='tumblr-post-date'>" + tumblrPostDate + "</div>";

            var tumblrPostBody = "<div class='tumblr-post-body'>" + posts['regular-body'] + "</div><br /><hr />";

            //Replacing Tumblr feed <blockquote> with <pre> for prettyprint code display
            //splits the text and eliminates text used to parse it
            var bodyArray = tumblrPostBody.split("</p></blockquote>");
            tumblrPostBody = "";

            //replace tumblr <blockquote><p> with <pre class="prettyprint">
            for (i = 0; i < bodyArray.length; i++) {
                tumblrPostBody = tumblrPostBody + bodyArray[i].replace("<blockquote><p>", "<a href='#' class='copy-code'>Copy</a><pre class='prettyprint lang-js'>") + "</pre>";
                tumblrPostBody = tumblrPostBody.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
            }

            displayString = tumblrPostID + tumblrPostTitle + tumblrPostDate + tumblrPostBody;

            return displayString;
        }

        function displayLinkPost(posts) { }
        function displayVideoPost(posts) { }
    }

    getMonthAsString = function (num) {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        return month[num];
    }

    getWeekdayAsString = function (num) {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[num];
    }

    $.fn.scrollToID = function (speed) {
        $(this).on("click", function () {
            var myID = this.href;
            myID = '#' + myID.split("#")[1];
            $("html, body").stop().animate({ scrollTop: $(myID).position().top - 10 }, speed);
        });
    };

    $.fn.copyText = function (nextTag) {
        $(this).on("click", function (e) {
            e.preventDefault();
            window.prompt('Copy to Clipboard: Ctrl+C then Enter', $(this).next(nextTag).text());
        })
    };

    getQueryVariable = function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }
}(jQuery));