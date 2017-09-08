var channelId = 'UCZGRMfmMo7FduF7qoloUqwg';
var key = 'AIzaSyDcwEYXvmlat_s2gYCTUjOPJlZywkIwu10';
var playlistId = "PLE1s7sjYTvsDKM_0xycnw0EzpgkBgT3ar";

$(document).ready(function () {


    $.get(
        'https://www.googleapis.com/youtube/v3/playlists', {
            part: 'snippet',
            key: key,
            maxResults: 10,
            channelId: channelId
        },
        function (data) {
            $.each(data.items, function (i, item) {
                if (item.snippet.title === "Happy Tunes") {
                    var playlistTitle = item.snippet.title;
                    document.getElementById("playlist-title").textContent = playlistTitle;
                }
            });
        }
    )




    $.get(
        'https://www.googleapis.com/youtube/v3/playlistItems', {
            part: 'snippet',
            key: key,
            maxResults: 10,
            playlistId: playlistId
        },
        function (data) {
            console.log(data);
            var ul = document.getElementById('results');
            $.each(data.items, function (i, item) {
                var myObj = item.snippet.thumbnails;

                var topRes = myObj[ Object.keys(myObj).pop() ];
                var thumb = topRes.url;
                
                var title = item.snippet.title;
                var vid = item.snippet.resourceId.videoId;
                var el = document.createElement('li');
                el.innerHTML = `<h3>${title}</h3><img src="${thumb}" class="thumb" data-key="${vid}">`;
                ul.appendChild(el);
            });
        }
    );

    // `<h3>${title}</h3><iframe width="560" height="315" src="https://www.youtube.com/embed/${vid}?list=PLE1s7sjYTvsDKM_0xycnw0EzpgkBgT3ar" frameborder="0" allowfullscreen></iframe>`
});