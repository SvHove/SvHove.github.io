"use strict"


/*------------------------------*/
/*------  NavParent Area  ------*/
/*------------------------------*/

let navParentButtons = document.querySelectorAll('.navParentJS');

for (let i = 0; i < navParentButtons.length; i++) {
    navParentButtons[i].addEventListener("click", (ev) => {
        ev.preventDefault();
        let currentButton = navParentButtons[i];
        if(!(currentButton.classList.contains('navException'))) currentButton.nextElementSibling.classList.add('byGroupSection');
        for (let n = 0; n < navParentButtons.length; n++) {
            if (n !== i && !(currentButton.classList.contains('navException'))) {
                let divEx = navParentButtons[n].nextElementSibling;
                divEx.style.display = 'none';
            }
        }
        let div = currentButton.nextElementSibling;
        if (window.getComputedStyle(div).display === 'none') {
            div.style.display = 'block';
            currentButton.scrollIntoView({behavior:'smooth'});
        } else {
            div.style.display = 'none';
        }


    })
    let sibling = navParentButtons[i].nextElementSibling;
    sibling.style.display = 'none';
}


/*------------------------------*/
/*------  Fragment Area  -------*/
/*------------------------------*/

let fragments = document.querySelectorAll('.fragmentWrapper');
for (let i = 0; i < fragments.length; i++) {
    let currentFragment = fragments[i];
    let paragraphList = currentFragment.querySelectorAll('.fragmentParagraph');
    let leftButton = document.createElement('div');
    let rightButton = document.createElement('div');
    console.log('Buttons created');
    leftButton.classList.add('fragmentSwitcherLeft');
    rightButton.classList.add('fragmentSwitcherRight');
    console.log('Buttons added');
    leftButton.innerHTML = '<-';
    rightButton.innerText = '->';
    console.log('Text set');
    currentFragment.insertBefore(leftButton, currentFragment.querySelector('.fragmentDiv'));
    console.log('Inserted left');
    currentFragment.appendChild(rightButton);
    console.log('Buttons right');
    if (paragraphList.length === 1) {
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
    } else {
        let currentParagraph = 0;
        for (let n = 1; n < paragraphList.length; n++) {
            paragraphList[n].style.display = 'none';
        }
        rightButton.addEventListener('click', () => {
            paragraphList[currentParagraph].style.display = 'none';
            paragraphList[++currentParagraph].style.display = 'block';
            if (currentParagraph === paragraphList.length - 1) {
                rightButton.style.display = 'none';
            }
            leftButton.style.display = 'block';
        })
        leftButton.addEventListener(('click'), () => {
            paragraphList[currentParagraph].style.display = 'none';
            paragraphList[--currentParagraph].style.display = 'block';
            if (currentParagraph === 0) {
                leftButton.style.display = 'none'
            }
            rightButton.style.display = 'block';
        })
    }
}

/*------------------------------*/
/*--------  Navigation  --------*/
/*------------------------------*/

let menu = document.querySelector('#navMenu');
let cover = document.querySelector('#cover');
let navigation = document.querySelector('nav');

menu.addEventListener('click', () => {
    if(window.getComputedStyle(navigation).display === 'none') {
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

/*------------------------------*/
/*------  Day and Night  -------*/
/*------------------------------*/
/*
let day = true;

let timeSwitch = document.querySelector('#dayNight');

timeSwitch.addEventListener('click', () => {
    if(day) {
        document.documentElement.style.setProperty('--green1', '#000000');
        document.documentElement.style.setProperty('--green2', '#000000');
        document.documentElement.style.setProperty('--green3', '#000000');
        document.documentElement.style.setProperty('--green4', '#000000');
        day = false;
    } else {
        document.documentElement.style.setProperty('--green1', '#009A9D');
        document.documentElement.style.setProperty('--green2', '#17B1B4');
        document.documentElement.style.setProperty('--green3', '#87CCCD');
        document.documentElement.style.setProperty('--green4', '#D6EBEC');
        day = true;
    }
})
*/