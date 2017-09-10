var channelId = 'UCZGRMfmMo7FduF7qoloUqwg';
var key = 'AIzaSyDcwEYXvmlat_s2gYCTUjOPJlZywkIwu10';
var playlistId = "PLE1s7sjYTvsDKM_0xycnw0EzpgkBgT3ar";
var token = null;

$(document).ready(function () {

    // GET TITLE FROM YOUTUBE PLAYLIST
    // $.get(
    //     'https://www.googleapis.com/youtube/v3/playlists', {
    //         part: 'snippet',
    //         key: key,
    //         maxResults: 10,
    //         channelId: channelId
    //     },
    //     function (data) {
    //         $.each(data.items, function (i, item) {
    //             if (item.snippet.title === "Happy Tunes") {
    //                 var playlistTitle = item.snippet.title;
    //                 document.getElementById("playlist-title").textContent = playlistTitle;
    //             }
    //         });
    //     }
    // )

    loadVids(token);


    $('.load-more').on("click", function (e) {
        e.preventDefault();
        var next = $(this).attr('data-key');

        if (next === "") {
        }
        else {
            token = next;
            console.log(token);
            loadVids(token);
        }
    });


    function loadVids(token) {

        $.get(
            'https://www.googleapis.com/youtube/v3/playlistItems', {
                part: 'snippet',
                key: key,
                maxResults: 10,
                playlistId: playlistId,
                pageToken: token
            },
            function (data) {
                console.log(data);
                var nextPage = data.nextPageToken;
                if (nextPage === undefined) {

                    $('.load-more').attr("data-key", "");
                    $('.load-more').html('No More Result').addClass('disabled');
                }
                else {
                    $('.load-more').attr("data-key", nextPage);
                }

                $.each(data.items, function (i, item) {
                    var thumb = item.snippet.thumbnails.medium.url;

                    var title = item.snippet.title;
                    var desc = item.snippet.description.substring(0, 100);
                    var vid = item.snippet.resourceId.videoId;

                    $('main').append(`<article class="item">
                <div class="thumb-container">
                    <img src="${thumb}" class="thumb" data-key="${vid}">
                </div>
                <div class="vid-details">
                    <h3>${title}</h3>
                    <p class="description">${desc}</p>
                </div>
            </article>`);


                });
            }
        );
    }



    var $allVideos = $("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com'], object, embed"),
        $fluidEl = $("figure");

    $allVideos.each(function () {

        $(this)
            // jQuery .data does not work on object/embed elements
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');

    });

    $(window).resize(function () {

        var newWidth = $fluidEl.width();
        $allVideos.each(function () {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.attr('data-aspectRatio'));

        });

    }).resize();

});