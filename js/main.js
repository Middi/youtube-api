var channelId = 'UCX-b8pihLF-Q9mOhpTILfjw';
var key = 'AIzaSyDcwEYXvmlat_s2gYCTUjOPJlZywkIwu10';
var playlistId = "PL7Mh8U8DxyOG0zVj_5cpXYgFxGZ57CcJk";
var token = null;
var firstVid;

$(document).ready(function () {

    // Load Videos On Load
    loadVids(token);

    //Load More Videos On Click
    $('.load-more').on("click", function (e) {
        e.preventDefault();
        var next = $(this).attr('data-key');

        if (next !== "") {
            loadVids(next);
        }
    });


    //Get Request
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
                var nextPage = data.nextPageToken;
                resultsLeft(nextPage);
                resultsLoop(data);
            }
        );
    }

    //Check if there are any results left
    function resultsLeft(nextPage) {
        if (nextPage === undefined) {
            $('.load-more').attr("data-key", "").html('No More Result').addClass('disabled');
        }
        else {$('.load-more').attr("data-key", nextPage);}
    }

    //Loop through results and display them on the dom.
    function resultsLoop(data){
        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            $('#results').append(`
            <article id="item${i + 1}" class="item">
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


    $('#item1').children('.thumb-container').children('.thumb').attr('data-key');

    console.log(firstVid);

    $('#video').html(`<iframe class="video" src="https://www.youtube.com/embed/STwoa-9jxi0?rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=0" frameborder="0" allowfullscreen></iframe>`);


    // Aspect ratio for video 
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





    // GET TITLE FROM YOUTUBE PLAYLIST
    // $.get(
    //     'https://www.googleapis.com/youtube/v3/playlists', {
    //         part: 'snippet',
    //         key: key,
    //         maxResults: 10,
    //         channelId: channelId
    //     },
    //     function (data) {
    //         console.log(data);
    //         $.each(data.items, function (i, item) {
    //                 var playlistTitle = item.snippet.title;
    //                 document.getElementById("playlist-title").textContent = playlistTitle;
    //         });
    //     }
    // )