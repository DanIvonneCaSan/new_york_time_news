const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function (e){
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  console.log(searchedForText);
  getNews();
});

const getNews = () => {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=94be3cf0aead49d785ec7531de81cb60`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
};

const handleError = () => {
  console.log('Se ha presentado un error');
};

function addNews(){
  const data = JSON.parse(this.responseText);
  console.log(data);
  const response = data.response;
  console.log(response);
  const dataLength = data.response.docs.length;
  const dataCont = data.response.docs;

  const searchAndPaint = (item, index, array) =>{
    const article = data.response.docs[index];
    const tilte = article.headline.main;
    const snippet = article.snippet;
    const image = article.multimedia[index].url;
    const artURL= article.web_url;
    const imageURL = `https://www.nytimes.com/${image}`;
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.setAttribute = ('id','element');
    li.innerText = snippet;
    responseContainer.appendChild(li);
    let img1 = document.createElement('img');
    img1.setAttribute('src', imageURL);
    img1.setAttribute('id', 'imageFormat');
    li.appendChild(img1);
    let p1 = document.createElement('a');
    p1.setAttribute('id','more');
    p1.innerText = 'Leer más...';
    p1.setAttribute('href', artURL);
    li.appendChild(p1);
  };

  dataCont.forEach(searchAndPaint);
  //Estructura para obtener e imprimir un articulo
  // const article = data.response.docs[0];
  // const ttilte = article.headline.main;
  // const snippet = article.snippet;
  // let li = document.createElement('li');
  // li.className = 'articleClass';
  // li.innerText = snippet;
  //
  // responseContainer.appendChild(li);
};
