var app = function(){
  var url = "https://api.spotify.com/v1/search?q=rock&type=album";

  
  
 

  // var select = document.querySelector('select');
  // select.addEventListener('change', handleSelectChanged);

  makeRequest(url, requestComplete);

}



var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var albumsObj = JSON.parse(jsonString);
  var albums = albumsObj.albums.items;
  populateList(albums)
}

var createImg = function(imgSrc){
  var itemImg = document.createElement("img");
  itemImg.width = 500;
  itemImg.src = imgSrc;
  return itemImg;
}

var createLink = function(imgLink){
  var link = document.createElement('a')
  link.href = imgLink;
  return link
}

var populateList = function(albums){
  var ul = document.getElementById('albums-list')
  albums.forEach(function(album){

    var liAlbumName = document.createElement('li');
    var liImageHolder = document.createElement('li');
    var imgAlbumCover = createImg(album.images[0].url)
    var link = createLink(album.external_urls.spotify)

    // console.log("FIND SPOTIFY LINK: ", albums[0])

    liAlbumName.innerText = album.name

    ul.appendChild(liAlbumName);
    ul.appendChild(liImageHolder);
    link.appendChild(imgAlbumCover);
    ul.appendChild(link);

    var hideAlbums = function(){
      liAlbumName.hide;
      liImageHolder.hide;
      imgAlbumCover.hide;
    }

    var filterResults = function(){
      var userText = document.getElementById('search-query')
      console.log("THE USER TEXT IS: ", userText.value);
      // console.log("FIND THE ALBUM TITLE: " )
      // console.log("LI ALBUM NAME: ", liAlbumName )
      if(userText.value != liAlbumName){
          hideAlbums()
      }
    }
    var input = document.getElementById("search-query")
    input.addEventListener('keyup', filterResults);
  })
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

window.addEventListener('load', app);