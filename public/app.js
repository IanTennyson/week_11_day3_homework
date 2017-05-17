var app = function(){
  var url = "https://api.spotify.com/v1/search?q=rock&type=album"
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
  })
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

window.addEventListener('load', app);