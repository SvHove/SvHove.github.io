"use strict"


let versionNumber = '0.6';
let versionNotes = 'Update installiert, Version ' + versionNumber + '!\nWichtigste Neuerungen:\n\n' +
    '- Vollständige Ausarbeitung der Antibiotika-Infoboxen.\n' +
    '- Kleinere Fehlerkorrekturen.';

let developerVersion = false;
if (window.localStorage.getItem('developer') === '1') developerVersion = true;

let antibioticList;

let antibioticRequest = new XMLHttpRequest();
antibioticRequest.onload = () => {
    let antibioticListString = antibioticRequest.responseText;
    if (antibioticRequest.status === 200) {
        antibioticList = JSON.parse(antibioticListString);
        console.log("Antibioticlist loaded.")
    } else {
        console.log("Requesting antibioticlist failed.")
    }
}
antibioticRequest.open('GET', "res/antibiotics.json");
antibioticRequest.responseType = '';
antibioticRequest.setRequestHeader('Accept', 'text/html');
antibioticRequest.send();


let navParents;
let cover = document.getElementById('cover');
let navigation = document.querySelector('nav');
let title = document.getElementById('title');
let localHistory = ['indexSnippet.html'];  // Initializing history with snippet, since a return to index would malfunction.
let currentMain;
let colorSwitch = document.querySelector('#colors');
let colorListGreen = ['#009A9D', '#17B1B4', '#87CCCD', '#D6EBEC', '#000000', '#FFFFFF', '#FFFFFF', 'lightgrey', '#80cdce', '#4cb3b5'];
let colorListBrown = ['#659DBD', '#DAAD86', '#FBEEC1', '#fbe0c1', '#000000', '#FFFFFF', '#fbeec1', '#fbe0c1', '#BC986A', '#a2753b'];
let colorListRed = ['#5D001E', '#9A1750', '#EE4C7C', '#E3E2DF', '#000000', '#FFFFFF', '#E3E2DF', '#E3AFBC', '#E3AFBC', '#ca7489'];
let colorListBright = ['#AC3B61', '#BAB2B5', '#EDC7B7', '#EEE2DC', '#000000', '#FFFFFF', '#BAB2B5', '#a17a88', '#123C69', '#315983'];
let colorListNature = ['#116466', '#D9B08C', '#FFCB9A', '#D1E8E2', '#000000', '#FFFFFF', '#d1e8e2', '#d4e8d1', '#123C69', '#315983'];
let colorListBlue = ['#5680E9', '#84CEEB', '#5AB9EA', '#C1C8E4', '#000000', '#FFFFFF', '#C1C8E4', '#8392CB', '#8860D0', '#8f79b7'];
let colorListBlue2 = ['#25274D', '#464866', '#AAABB8', '#2E9CCA', '#000000', '#FFFFFF', '#2E9CCA', '#4c93b1', '#29648A', '#385a71'];
let colorListBrown2 = ['#46344E', '#5A5560', '#9D8D8F', '#9B786F', '#000000', '#FFFFFF', '#9B786F', '#825043', '#FAED26', '#e0d64f'];
let colorListNature2 = ['#687864', '#31708E', '#5085A5', '#8FC1E3', '#000000', '#FFFFFF', '#8FC1E3', '#579cca', '#F7F9FB', '#b1cae2'];
let colorListSputnik = ['#59253A', '#78244C', '#895061', '#2D4159', '#000000', '#FFFFFF', '#2D4159', '#234773', '#0677A1', '#206c87'];
let colorListRadioactive = ['#1F2605', '#1F6521', '#53900F', '#A4A71E', '#000000', '#FFFFFF', '#A4A71E', '#8c8d36', '#D6CE15', '#bdb938'];
let colorListVividBlue = ['#10E7DC', '#0074E1', '#1B9CE5', '#6CDAEE', '#000000', '#FFFFFF', '#6CDAEE', '#8bcad5', '#F79E02', '#de9e2e'];
let colorListRoseRed = ['#5C2018', '#BC4639', '#D4A59A', '#F3E0DC', '#000000', '#FFFFFF', '#F3E0DC', '#daa59a', '#4285F4', '#6794db'];
let colorListDeepBlue = ['#080F5B', '#0D19A3', '#15DB95', '#F4E4C1', '#000000', '#FFFFFF', '#F4E4C1', '#dbbf82', '#E4C580', '#cba249'];
let colorListClear = ['#00887A', '#FFCCBC', '#FFFFFF', '#D3E3FC', '#000000', '#FFFFFF', '#D3E3FC', '#91b0e3', '#77A6F7', '#97b1de'];
let colorListPeace = ['#844D36', '#474853', '#86B3D1', '#AAA0A0', '#000000', '#FFFFFF', '#AAA0A0', '#916b6b', '#8E8268', '#75643e'];
let colorListDark = ['#2D283E', '#564F6F', '#4C495D', '#D1D7E0', '#000000', '#FFFFFF', '#D1D7E0', '#92a7c7', '#802BB1', '#784397'];
let colorListSerious = ['#022140', '#265077', '#1E4258', '#494B68', '#000000', '#FFFFFF', '#494B68', '#414682', '#2D5F5D', '#527978'];
let themeList = [colorListGreen, colorListBrown, colorListRed, colorListBright, colorListNature, colorListBlue, colorListBlue2, colorListBrown, colorListBrown2, colorListNature, colorListNature2,
    colorListSputnik, colorListRadioactive, colorListVividBlue, colorListRoseRed, colorListDeepBlue, colorListClear, colorListPeace, colorListDark, colorListSerious];


let currentTheme = parseInt(window.localStorage.getItem('theme'));
if (isNaN(currentTheme)) {
    currentTheme = 0;
    window.localStorage.setItem('theme', '0');
}

function checkVersion() {
    console.log('Checking version...');
    if (window.localStorage.getItem('version') !== versionNumber) {
        alert(versionNotes);
        window.localStorage.setItem('version', versionNumber);
    }
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
    document.documentElement.style.setProperty('--fragmentColor', colors[9]);
}

function init(element) {
    console.log('Init ' + element);
    checkVersion();
    setUpNavParents(element);
    setUpLinks(element);
    setUpFragments(element);
    setUpInfoButtons(element);
    /*+
    let discoButton =  document.getElementById('disco');
    if (typeof(discoButton) != 'undefined' && element != null)
    {
        discoButton.addEventListener('click', () => {
            disco();
        })
    }
    */
}

/*------------------------------*/
/*-------  Snippets Area  ------*/

/*------------------------------*/

function loadContent(dest, preventHistory = false) {
    let request = new XMLHttpRequest();
    request.onload = () => {
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
            if (!link.className.includes("directlink")) {

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    loadContent(link.getAttribute('href'));
                })
            }
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
            leftButton.innerHTML = '<svg width="100%" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"><rect class="buttonFill" x="95.25" y="95.25" width="63.5" height="105.83" ry="1.4174"/><path class="buttonFill" transform="matrix(-.39229 0 0 1.2509 58.532 -37.179)" d="m95.25 148.17-190.5 109.99v-109.99-109.99l95.25 54.993z"/></g></svg>';
            let rightButton = document.createElement('div');
            rightButton.classList.add('fragmentSwitcherRight');
            rightButton.innerHTML = '<svg width="100%" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"><rect class="buttonFill" x="52.917" y="95.25" width="63.5" height="105.83" ry="1.4174"/><path class="buttonFill" transform="matrix(.39229 0 0 1.2509 153.13 -37.179)" d="m95.25 148.17-190.5 109.99v-109.99-109.99l95.25 54.993z"/></g></svg>';
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
                    leftButton.style.display = 'flex';
                })
                leftButton.addEventListener('click', () => {
                    paragraphList[currentParagraph].style.display = 'none';
                    paragraphList[--currentParagraph].style.display = 'block';
                    // Hide left button if first element is reached
                    if (currentParagraph === 0) {
                        leftButton.style.display = 'none'
                    }
                    // Make sure right button appears if hidden.
                    rightButton.style.display = 'flex';
                })
            }
        })
    }
}

/*------------------------------*/
/*--------  Info Button  -------*/
/*------------------------------*/

let infoBox = document.getElementById('infoBox');
let infoBoxContent = document.getElementById('infoBoxContent');
let infoBoxButton = document.getElementById('infoBoxButton');

let oralisationMap = new Map();
oralisationMap.set("1", "<ul><li><strong>Klinische Besserung, hämodynamische Stabilität</strong></li><li><strong>Keine Kontraindikation wie z.B. gastrointestinale Resorptionsstörung</strong> (Diarrhoe, Erbrechen, Kurzdarmsyndrom), <strong>Schluckbeschwerden</strong></li><li><strong>Keine schwere Infektion</strong> wie z.B. Endokarditis, Meningitis, S. aureus Bakteriämie</li><li><strong>Adäquate initiale i.v. Therapie bei bestimmten Infektionen</strong> wie z.B. Fremdkörper- und Implantatassoziierte Infektionen, Osteomyelitis</li></ul>");
oralisationMap.set("2", "<ul><li><strong>Umstellung auf andere Substanzgruppe mit höherem p.o./i.v. Serumspiegel</strong> (ggf. Rücksprache Stabsstelle ABS/Apotheke/Mikrobiologie</li><li><strong>Nur in Ausnahmefällen nach sorgfältiger Nutzen-Risiko-Abwägung!</strong></li>");
oralisationMap.set("3", "<ul><li><strong>Angabe nicht sinnvoll!</strong></li><li>Keine systemische Wirksamkeit wegen nicht ausreichender Resorption nach p.o.-Gabe</li><li>Abweichende Indikation i.v. und p.o.</li>");
oralisationMap.set("0", "Ausarbeitung folgt.")

let infoButtonXML = "<div class=\"infoButton\"><svg height=\"100%\" viewBox=\"0 0 26.458 26.458\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(0 -270.54)\"><ellipse class=\"buttonFill\" cx=\"13.229\" cy=\"283.83\" rx=\"11.906\" ry=\"11.848\" fill=\"#80cdce\" stroke=\"#000\" stroke-width=\".755\"/><rect x=\"11.255\" y=\"280.33\" width=\"4.0908\" height=\"11.642\" rx=\".40908\" ry=\".5174\" stroke-width=\"0\"/><rect x=\"11.377\" y=\"275.57\" width=\"3.7041\" height=\"3.7041\" rx=\"1.8521\" ry=\"1.8521\" stroke-width=\"0\"/></g></svg></div>";

function setUpInfoButtons(element) {
    let antibioticSpans = element.querySelectorAll(".antibiotic");
    if (antibioticSpans.length !== 0) {

        function getAntibiotic(name) {
            console.log("Trying to find antibiotic " + name);
            for (let o = 0; o < antibioticList.antibiotics.length; o++) {
                let testString = antibioticList.antibiotics[o].ID;
                console.log(testString);
                if (name.includes(testString)) {
                    console.log("Found antibiotic!");
                    return antibioticList.antibiotics[o];
                }
            }
        }

        antibioticSpans.forEach((antibioticSpan) => {
            let currentAntibiotic = getAntibiotic(antibioticSpan.className);
            antibioticSpan.innerHTML = "<strong>" + currentAntibiotic.Name + "</strong><br>" + infoButtonXML;
            antibioticSpan.addEventListener('click', () => {
                let text;
                text = "<p><strong>" + currentAntibiotic.Name + "</strong><br><br><strong>Dosierung:</strong><br>" + currentAntibiotic.Standarddosis + "<br><br>";
                if (currentAntibiotic.Sequenztherapie) text += "<strong>Sequenztherapie:</strong><br>(Bedingungen s.u.)<br>" + currentAntibiotic.Sequenztherapie + "<br><br>";
                if (currentAntibiotic.Dosisanpassung_Niereninsuffizienz) text += "<strong>Niereninsuffizienz:</strong><br>" + currentAntibiotic.Dosisanpassung_Niereninsuffizienz + "<br><br>";
                if (currentAntibiotic.Dosisanpassung_Haemodialyse) text += "<strong>Hämodialyse:</strong><br>Startdosis in der Regel<br>nicht reduzieren.<br><br>" + currentAntibiotic.Dosisanpassung_Haemodialyse + "<br><br>Weitere Dialyseformen siehe <a class='directlink' href='https://www.klinikum.uni-heidelberg.de/fileadmin/medizinische_klinik/Klinische_Pharmakologie/Downloads/Heidelberger_Tabelle_2021.pdf'>Heidelberger Liste (externer Link)</a>.<br><br>";
                if (currentAntibiotic.Dosisanpassung_Leberinsuffizienz) text += "<strong>Leberinsuffizienz:</strong><br>" + currentAntibiotic.Dosisanpassung_Leberinsuffizienz + "<br><br>";
                if (currentAntibiotic.Monitoring) text += "<strong>Monitoring:</strong><br>" + currentAntibiotic.Monitoring + "<br><br>";
                if (currentAntibiotic.Besonderheiten) text += "<strong>Besonderheiten:</strong><br>" + currentAntibiotic.Besonderheiten + "<br><br>";
                if (currentAntibiotic.Sequenztherapie_Voraussetzungen) text += "<strong>Bedingungen Sequenztherapie:</strong><br>" + oralisationMap.get(currentAntibiotic.Sequenztherapie_Voraussetzungen) + "<br><br>";
                infoBoxContent.innerHTML = text;
                infoBox.style.display = 'block';
                cover.style.display = 'block';
            })
        })
    }
}


/*------------------------------*/
/*--------  Navigation  --------*/

/*------------------------------*/

function resetDisplay() {
    navigation.style.display = 'none';
    cover.style.display = 'none';
    infoBox.style.display = 'none';
}

document.getElementById('navButton').addEventListener('click', () => {
    if (window.getComputedStyle(navigation).display === 'none') {
        navigation.style.display = 'block';
        cover.style.display = 'block';
    } else {
        resetDisplay();
    }
})

cover.addEventListener('click', () => {
    resetDisplay();
})

infoBoxButton.addEventListener('click', () => {
    resetDisplay();
})

navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        resetDisplay();
    })
})

document.getElementById('backButton').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.getComputedStyle(navigation).display !== 'none' || window.getComputedStyle(infoBox).display !== 'none') {
        resetDisplay();
    } else if (!(localHistory.length === 1)) {
        loadContent(localHistory[(localHistory.length - 2)], true);
        localHistory.pop();
    }
});

document.getElementById('homeButton').addEventListener('click', (e) => {
    e.preventDefault();
    resetDisplay();
    loadContent('indexSnippet.html');
})

let developerVersionCheck = 0;
document.getElementById('developerVersion').addEventListener('click', () => {
    developerVersionCheck += 1;
    if (developerVersionCheck === 3) {
        if (window.localStorage.getItem('developer') === '1') {
            alert('Entwicklungsversion wird deaktiviert, zum Aktivieren erneut drei Mal antippen');
            window.localStorage.setItem('developer', '0');
            developerVersion = false;
        } else {
            alert('Entwicklungsversion aktiviert, zum Deaktivieren erneut drei Mal antippen');
            window.localStorage.setItem('developer', '1');
            developerVersion = true;
        }
        developerVersionCheck = 0;
    }
})
/*
let wannaDisco = true;
const delay = ms => new Promise(res => setTimeout(res, ms));
const disco = async() => {
    while(wannaDisco) {
        await delay(200);
        if(currentTheme === 17) currentTheme = 0;
            switchColor(themeList[++currentTheme]);
        console.log('Current Theme: ' + currentTheme);
    }
}
*/


init(document.body);