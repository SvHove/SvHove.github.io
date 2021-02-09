"use strict"


let navParents;
let cover = document.getElementById('cover');
let navigation = document.querySelector('nav');
let title = document.getElementById('title');
let localHistory = ['indexSnippet.html'];  // Initializing history with snippet, since a return to index would malfunction.
let currentMain;
let colorSwitch = document.querySelector('#colors');
let colorListGreen = ['#009A9D', '#17B1B4', '#87CCCD', '#D6EBEC', '#000000', '#FFFFFF', '#FFFFFF', 'lightgrey', '#80cdce'];
let colorListBrown = ['#659DBD', '#DAAD86', '#FBEEC1', '#fbe0c1', '#000000', '#FFFFFF', '#fbeec1', '#fbe0c1', '#BC986A'];
let colorListRed = ['#5D001E', '#9A1750', '#EE4C7C', '#E3E2DF', '#000000', '#FFFFFF', '#E3E2DF', '#E3AFBC', '#E3AFBC'];
let colorListBright = ['#AC3B61', '#BAB2B5', '#EDC7B7', '#EEE2DC', '#000000', '#FFFFFF', '#BAB2B5', '#a17a88', '#123C69'];
let colorListNature = ['#116466', '#D9B08C', '#FFCB9A', '#D1E8E2', '#000000', '#FFFFFF', '#d1e8e2', '#d4e8d1', '#123C69'];
let colorListBlue = ['#5680E9', '#84CEEB', '#5AB9EA', '#C1C8E4', '#000000', '#FFFFFF', '#C1C8E4', '#8392CB', '#8860D0'];
let colorListBlue2 = ['#25274D', '#464866', '#AAABB8', '#2E9CCA', '#000000', '#FFFFFF', '#2E9CCA', '#4c93b1', '#29648A'];
let colorListBrown2 = ['#46344E', '#5A5560', '#9D8D8F', '#9B786F', '#000000', '#FFFFFF', '#9B786F', '#825043', '#FAED26'];
let colorListNature2 = ['#687864', '#31708E', '#5085A5', '#8FC1E3', '#000000', '#FFFFFF', '#8FC1E3', '#579cca', '#F7F9FB'];
let colorListSputnik = ['#59253A', '#78244C', '#895061', '#2D4159', '#000000', '#FFFFFF', '#2D4159', '#234773', '#0677A1'];
let colorListRadioactive = ['#1F2605', '#1F6521', '#53900F', '#A4A71E', '#000000', '#FFFFFF', '#A4A71E', '#8c8d36', '#D6CE15'];
let colorListVividBlue = ['#10E7DC', '#0074E1', '#1B9CE5', '#6CDAEE', '#000000', '#FFFFFF', '#6CDAEE', '#8bcad5', '#F79E02'];
let colorListRoseRed = ['#5C2018', '#BC4639', '#D4A59A', '#F3E0DC', '#000000', '#FFFFFF', '#F3E0DC', '#daa59a', '#4285F4'];
let colorListDeepBlue = ['#080F5B', '#0D19A3', '#15DB95', '#F4E4C1', '#000000', '#FFFFFF', '#F4E4C1', '#dbbf82', '#E4C580'];
let colorListClear = ['#00887A', '#FFCCBC', '#FFFFFF', '#D3E3FC', '#000000', '#FFFFFF', '#D3E3FC', '#91b0e3', '#77A6F7'];
let colorListPeace = ['#844D36', '#474853', '#86B3D1', '#AAA0A0', '#000000', '#FFFFFF', '#AAA0A0', '#916b6b', '#8E8268'];
let colorListDark = ['#2D283E', '#564F6F', '#4C495D', '#D1D7E0', '#000000', '#FFFFFF', '#D1D7E0', '#92a7c7', '#802BB1'];
let colorListSerious = ['#022140', '#265077', '#1E4258', '#494B68', '#000000', '#FFFFFF', '#494B68', '#414682', '#2D5F5D'];
let themeList = [colorListGreen, colorListBrown, colorListRed, colorListBright, colorListNature, colorListBlue, colorListBlue2, colorListBrown, colorListBrown2, colorListNature, colorListNature2,
    colorListSputnik, colorListRadioactive, colorListVividBlue, colorListRoseRed, colorListDeepBlue, colorListClear, colorListPeace, colorListDark, colorListSerious];


let currentTheme = parseInt(window.localStorage.getItem('theme'));
if (isNaN(currentTheme)) {
    currentTheme = 0;
    window.localStorage.setItem('theme', '0');
}

switchColor(themeList[currentTheme]);

colorSwitch.addEventListener('click', () => {
    if (currentTheme < (themeList.length - 1)) {
        switchColor(themeList[++currentTheme]);
    } else {
        currentTheme = 0;
        switchColor(themeList[currentTheme]);
    }
    window.localStorage.setItem('theme', currentTheme.toString());
})


function switchColor(colors) {
    document.documentElement.style.setProperty('--theme1', colors[0]);
    document.documentElement.style.setProperty('--theme2', colors[1]);
    document.documentElement.style.setProperty('--theme3', colors[2]);
    document.documentElement.style.setProperty('--theme4', colors[3]);
    document.documentElement.style.setProperty('--textColor1', colors[4]);
    document.documentElement.style.setProperty('--textColor2', colors[5]);
    document.documentElement.style.setProperty('--borderColor1', colors[6]);
    document.documentElement.style.setProperty('--borderColor2', colors[7]);
    document.documentElement.style.setProperty('--buttonColor', colors[8]);
}

function init(element) {
    console.log('Init ' + element);
    setUpNavParents(element);
    setUpLinks(element);
    setUpFragments(element);
}

/*------------------------------*/
/*-------  Snippets Area  ------*/

/*------------------------------*/

function loadContent(dest, preventHistory = false) {
    let request = new XMLHttpRequest();
    request.onload = (e) => {
        let htmlSnippet = request.responseText;
        if (request.status === 200) {
            document.body.removeChild(document.body.firstElementChild);
            document.body.insertAdjacentHTML("afterbegin", htmlSnippet);
            currentMain = document.body.firstElementChild;
            console.log(currentMain.firstElementChild);
            console.log(currentMain.querySelector('#title'));
            if (currentMain.querySelector('#title') !== null) {
                title.innerText = currentMain.querySelector('#title').innerHTML;
            }
            if (!preventHistory && dest !== localHistory[localHistory.length - 1]) {
                localHistory.push(dest);
                history.pushState(htmlSnippet, 'title', '');
            }
        }
        init(currentMain);
    }
    request.open('GET', dest);
    request.responseType = '';
    request.setRequestHeader('Accept', 'text/html');
    request.send();
}

function setUpLinks(element) {
    let links = element.querySelectorAll('a');
    if (links.length !== 0) {
        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadContent(link.getAttribute('href'));
            })
        })
    }
}

window.addEventListener('popstate', (e) => {
    e.preventDefault();
    if (window.getComputedStyle(navigation).display !== 'none') {
        navigation.style.display = 'none';
        cover.style.display = 'none';
    } else if (!(localHistory.length === 1)) {
        loadContent(localHistory[(localHistory.length - 2)], true);
        localHistory.pop();
    }
})
/*------------------------------*/
/*------  NavParent Area  ------*/

/*------------------------------*/

function setUpNavParents(element) {

    navParents = element.querySelectorAll('.navParentJS');
    if (navParents.length === 0) return false;
    for (let i = 0; i < navParents.length; i++) {
        navParents[i].addEventListener("click", (ev) => {
            ev.preventDefault();
            let currentButton = navParents[i];
            if (!(currentButton.classList.contains('navException'))) currentButton.nextElementSibling.classList.add('byGroupSection');
            for (let n = 0; n < navParents.length; n++) {
                if (n !== i && !(currentButton.classList.contains('navException'))) {
                    let divEx = navParents[n].nextElementSibling;
                    divEx.style.display = 'none';
                }
            }
            let div = currentButton.nextElementSibling;
            if (window.getComputedStyle(div).display === 'none') {
                div.style.display = 'block';
                currentButton.scrollIntoView({behavior: 'smooth'});
            } else {
                div.style.display = 'none';
            }
        });
        let sibling = navParents[i].nextElementSibling;
        sibling.style.display = 'none';
    }
}

/*------------------------------*/
/*------  Fragment Area  -------*/

/*------------------------------*/

function setUpFragments(element) {
    let fragments = element.querySelectorAll('.fragmentWrapper');
    if (fragments.length !== 0) {

        fragments.forEach((fragment) => {
            // Creating left and right button
            let leftButton = document.createElement('div');
            leftButton.classList.add('fragmentSwitcherLeft');
            leftButton.innerHTML = '<-';
            let rightButton = document.createElement('div');
            rightButton.classList.add('fragmentSwitcherRight');
            rightButton.innerText = '->';
            fragment.insertBefore(leftButton, fragment.querySelector('.fragmentDiv'));
            fragment.appendChild(rightButton);

            // Collect all paragraphs in wrapper
            let paragraphList = fragment.querySelectorAll('.fragmentParagraph');

            // If there is only one paragraph: Hide the buttons.
            if (paragraphList.length === 1) {
                leftButton.style.display = 'none';
                rightButton.style.display = 'none';
            } else {
                // If there is more than one, hide all but the first
                let currentParagraph = 0;
                for (let n = 1; n < paragraphList.length; n++) {
                    paragraphList[n].style.display = 'none';
                }

                // Adding button functions
                rightButton.addEventListener('click', () => {
                    paragraphList[currentParagraph].style.display = 'none';
                    paragraphList[++currentParagraph].style.display = 'block';
                    // Hide right button if the last element is reached.
                    if (currentParagraph === paragraphList.length - 1) {
                        rightButton.style.display = 'none';
                    }
                    // Make sure left button appears
                    leftButton.style.display = 'block';
                })
                leftButton.addEventListener(('click'), () => {
                    paragraphList[currentParagraph].style.display = 'none';
                    paragraphList[--currentParagraph].style.display = 'block';
                    // Hide left button if first element is reached
                    if (currentParagraph === 0) {
                        leftButton.style.display = 'none'
                    }
                    // Make sure right button appears if hidden.
                    rightButton.style.display = 'block';
                })
            }
        })
    }
}

/*------------------------------*/
/*--------  Navigation  --------*/
/*------------------------------*/

document.getElementById('navButton').addEventListener('click', () => {
    if (window.getComputedStyle(navigation).display === 'none') {
        navigation.style.display = 'block';
        cover.style.display = 'block';
    } else {
        navigation.style.display = 'none';
        cover.style.display = 'none';
    }
})

cover.addEventListener('click', () => {
    navigation.style.display = 'none';
    cover.style.display = 'none';
})

navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navigation.style.display = 'none';
        cover.style.display = 'none';
    })
})

document.getElementById('backButton').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.getComputedStyle(navigation).display !== 'none') {
        navigation.style.display = 'none';
        cover.style.display = 'none';
    } else if (!(localHistory.length === 1)) {
        loadContent(localHistory[(localHistory.length - 2)], true);
        localHistory.pop();
    }
});

document.getElementById('homeButton').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.getComputedStyle(navigation).display !== 'none') {
        navigation.style.display = 'none';
        cover.style.display = 'none';
    }
    loadContent('indexSnippet.html');
})


init(document.body);