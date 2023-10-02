'use strict';

const shortened = document.querySelector('.shortened');
const btnShorten = document.querySelector('.shortit');
const inputLink = document.querySelector('.shorten__input');
const errMessage = document.querySelector('.err__message');
const errContainer = document.querySelector('.err');
const toggler = document.querySelector('.bar');
const dropDown = document.querySelector('.navigation__dropdown');

const shortener = async function (link = '') {
  try {
    if (!link) throw new Error('Please add a link');

    inputLink.classList.remove('error');
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${link}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    renderError(err.message);
  }
};

const renderError = function (err) {
  if (!inputLink.value) {
    errMessage.textContent = 'Please add a link';
  } else {
    errMessage.textContent = err;
  }

  inputLink.classList.add('error');
  errContainer.style.opacity = 1;
};

const renderShortLink = async function (link) {
  const { result: data } = await shortener(link);
  console.log(data);

  const markup = `
    <div class="shortened__link">
        <a href="#" class="shortened__link--full">${
          shortened.style.width <= '80vw'
            ? data.original_link
            : data.original_link
        }</a>
        <a href="#" class="shortened__link--short">${data.full_short_link}</a>
        <a href="#" class="btn btn-square--sm copy">Copy</a>
    </div>`;

  // text-overflow: ellipsis;
  shortened.insertAdjacentHTML('afterbegin', markup);
  const btnCopy = document.querySelector('.copy');
  const linkToCopy = document.querySelector('.shortened__link--short');

  btnCopy.addEventListener('click', function (e) {
    e.preventDefault();
    const textToCopy = linkToCopy.textContent;
    e.target.textContent = 'Copied!';
    console.log(e.target.classList);
    e.target.classList.add('copied');

    navigator.clipboard.writeText(textToCopy);
    console.log(textToCopy);
  });
};

btnShorten.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(shortened);
  console.log(inputLink.value);

  renderError();
  renderShortLink(inputLink.value);
});

toggler.addEventListener('click', function () {
  console.log('clicked');
  dropDown.classList.toggle('hide');
});
