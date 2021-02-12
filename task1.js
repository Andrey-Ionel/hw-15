// Интерфейс разделен на две части. В левой части пользователь видит список альбомов, его берем из https://jsonplaceholder.typicode.com/albums

// Когда пользователь нажмет на какой-то альбом в правой части он увидит фотографии из этого альбома. 
// Их берем из https://jsonplaceholder.typicode.com/photos?albumId=ID где вместо ID подставляем id нужного альбома.

// Сразу при загрузке приложения и получения списка альбомов, в правой части нужно показать фотографии из первого альбома в списке

// Не забываем кидать ссылку на git hub pages.

const albumList = document.querySelector('.js-album-list');
const albumPhotoForList = document.querySelector('.js-photo-container');

init();
createPhotoEventListener();

function init() {
    const promiseAlbumList = sendGetAlbumListRequest();
    promiseAlbumList
        .then((albumLists) => {
            renderAlbumlist(albumLists);
            return sendGetAlbumPhotoRequest(1);
        })

        .then((albumInitPhoto) => renderAlbumPhoto(albumInitPhoto));
}

function createPhotoEventListener() {
    albumList.addEventListener("click", (event) => {

        if (event.target.classList.contains('album-list-item')) {
            const albumListItemId = event.target.dataset.id;

            const promiseAlbumPhoto = sendGetAlbumPhotoRequest(albumListItemId);
            promiseAlbumPhoto
                .then((albumEventPhoto) => renderAlbumPhoto(albumEventPhoto));
        }

    });
}

function sendGetAlbumPhotoRequest(albumListItemId) {
    return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumListItemId}`).then((response) => response.json());
}

function sendGetAlbumListRequest() {
    return fetch('https://jsonplaceholder.typicode.com/albums').then((response) => response.json());
}

function renderAlbumlist(albumLists) {
    albumLists.map((list) => {
        const albumListItem = document.createElement('li');
        albumListItem.className = 'album-list-item';
        albumListItem.append(document.createTextNode(list.title));
        albumListItem.dataset.id = list.id;
        albumList.append(albumListItem);
    });
}

function renderAlbumPhoto(albumPhoto) {
    albumPhotoForList.innerHTML = '';

    albumPhoto.map((photo) => {
        const albumPhotoImg = document.createElement('img');
        albumPhotoImg.className = 'album-photo';
        albumPhotoImg.src = photo.thumbnailUrl;
        albumPhotoForList.append(albumPhotoImg);
    });
}