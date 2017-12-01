

function(){
  var map;
  function initMap() {
    var lyon = {lat: 45.76, lng: 4.83};
    var image = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDExOC4xIDExOC4xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMTguMSAxMTguMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik01OSwwQzM0LjQsMCwxNC41LDE5LjksMTQuNSw0NC41YzAsMTIuOCw2LjQsMjQuNCwxMi43LDM1LjFjNy43LDEzLjMwMSwxNi45LDI1LjcsMjcuNiwzNi43YzIuMywyLjM5OSw2LjEwMSwyLjM5OSw4LjUsMCAgIEM3Mi43LDEwNyw4MSw5Ni41LDg4LDg1LjNjNy41LTEyLjEwMSwxNS42LTI2LjEwMSwxNS42LTQwLjhDMTAzLjUsMjAsODMuNiwwLDU5LDB6IE01OSw3MC4zYy0xNC45LDAtMjctMTIuMS0yNy0yN3MxMi4xLTI3LDI3LTI3ICAgYzE0LjksMCwyNywxMiwyNywyN1M3My45LDcwLjMsNTksNzAuM3oiIGZpbGw9IiNiMDMwMTMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: lyon,
    });

    var contentString = '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Lyon</h1><div id="bodyContent"><p>Une ville <b>gastronomique</b></p></div></div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: lyon,
      map: map,
      title: 'Lyon',
      icon: image
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
  window.addEventListener('load',initMap);
}).call(this);
