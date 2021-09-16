import fetchFollowers from './fetchFollowers.js'
import displayFollowers from './displayFollowers.js'
import paginate from './paginate.js'
import displayButtons from './displayButtons.js'

const title = document.querySelector('.section-title h1');
const btnContainer = document.querySelector('.btn-container');

let index = 0;
let pages = []

const setupUI = () => {
    displayFollowers(pages[index]);
    displayButtons(btnContainer, pages, index);
}

btnContainer.addEventListener('click', function(e) {
    // don't reload interface when only clicking on button container
    if(e.target.classList.contains('btn-container')) return;

    // iterate over buttons, updating the index and reloading the UI accordingly
    if (e.target.classList.contains('page-btn')) {
      index = parseInt(e.target.dataset.index)
    }

    if (e.target.classList.contains('next-btn')) {
        index++;
        if (index > pages.length - 1) {
            index = 0;
        }
    }

    if (e.target.classList.contains('prev-btn')) {
        index--;
        if (index < 0) {
            index = pages.length - 1;
        }
    }

    setupUI();
});

const init = async() => {
    const followers = await fetchFollowers();
    displayFollowers(paginate(followers)[0]);
    title.textContent = "John Smilga's Github Followers"

    pages = paginate(followers);

    setupUI();
}

window.addEventListener('load', init);