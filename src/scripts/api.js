const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-3/';
const authorization = '4dd87529-aec4-49cc-9915-e675aead4448';

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function buildFetch(url, { method = 'GET', header = {}, body = null } = {}) {
  
  const defaultHeader = { authorization, ...header };
  return fetch(BASE_URL + url, {
    method,
    headers: defaultHeader,
    body
  }).then(res => handleResponse(res))
};

// buildFetchGet()

function getCards() {
  return buildFetch('cards');
}

function getUser() {
  return buildFetch('users/me');
}

function patchUser(name, about) {
  return buildFetch('users/me', 
    {
      method: "PATCH", 
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        about
      })
    }
  );
}

function postCard(name, link) {

  return buildFetch('cards', 
    {
      method: "POST", 
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        link
      })
    }
  );
}

function putLike(cardId) {

  return buildFetch(`cards/likes/${cardId}`, 
    {
      method: "PUT", 
      header: {'Content-Type': 'application/json'},
    }
  );
}

function deleteLike(cardId) {

  return buildFetch(`cards/likes/${cardId}`, 
  {
    method: "DELETE", 
    header: {'Content-Type': 'application/json'},
  }
  );
}

function deleteCardApi(cardId) {

  return buildFetch(`cards/${cardId}`, 
  {
    method: "DELETE", 
    header: {'Content-Type': 'application/json'},
  }
  );
}

function patchAvatar(avatar) {

  return buildFetch(`users/me/avatar`, 
  {
    method: "PATCH", 
    header: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      avatar
    }),
  }
  );
}

export { getCards, getUser, patchUser, postCard, putLike, deleteLike, deleteCardApi, patchAvatar }