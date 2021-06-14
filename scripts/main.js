"use strict"


let versionNumber = '0.55';
let versionNotes = 'Update installiert, Version ' + versionNumber + '!\nWichtigste Neuerungen:\n\n' +
    '- Dosierung bei Niereninsuffizienz und Dialyse bei den meisten Antibiotika ergänzt\n' +
    '- Kleine Änderungen im Entwicklermodus';

let developerVersion = false;
if (window.localStorage.getItem('developer') === '1') developerVersion = true;


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
let antibioticMap = new Map();
let fs = "Folgt in Kürze";
let noOral = "<strong>Keine Oralisation möglich!</strong>"

function Antibiotic(abName, usualDose, oralisation, oralisationReq, kidney, dialysis, liver, monitoring, special) {
    this.abName = abName;
    this.usualDose = usualDose;
    this.oralisation = oralisation;
    this.oralisationReq = oralisationReq;
    this.kidney = kidney;
    this.dialysis = dialysis;
    this.liver = liver;
    this.monitoring = monitoring;
    this.special = special;
}



let amoxicillin = new Antibiotic("Amoxicillin",
    "3 x tgl. 1-2g p.o.",
    false,
    0,
    "<em>GFR 29-10ml/min:<br>2-3 x 0,5g - 3 x 1-2g<br><em>GFR <10ml/min:</em><br>1 x 0,5g - 3 x 1g",
    "<em>Erhaltungsdosis:</em>1 x 0,5g - 3 x 1g tgl.<br>Am Dialysetag nach Dialyse.",
    "Keine Dosisanpassung.<br>Vorsicht Hepatotoxizität!",
    "Therapie >7-10d:<br>Nierenfunktion, Leberfunktion, ggf. INR",
    "MTX-Toxizität steigt, insbesondere bei eingeschränkter Nierenfunktion");
antibioticMap.set("antibiotic amoxicillin", amoxicillin);


let amoxicillinClavulansaeure = new Antibiotic("Amoxicillin/Clavulansäure",
    "2-3x tgl. 1g p.o.",
    false,
    0,
    "<em>GFR <30ml/min:</em><br>Anwendung nicht empfohlen, ggf.: <br>500/125mg 1-0-1",
    "<em>Erhaltungsdosis:</em><br>500/125mg 1x tgl. nach Dialyse",
    "Keine Dosisanpassung.<br>Vorsicht Hepatotoxizität!",
    "Bei Therapie >7-10d<br>Nierenfunktion, Leberfunktion, ggf. INR.",
    "MTX-Toxizität steigt, insbesondere bei eingeschränkter Nierenfunktion");
antibioticMap.set("antibiotic amoxicillinClavulansäure", amoxicillinClavulansaeure);


let ampicillin = new Antibiotic("Ampicillin",
    "3x tgl. 2g i.v.",
    "Eingeschränkt möglich:<br><br>Amoxicillin p.o., 3x 1g (BV 70-90%)<br>p.o./i.v. Serumspiegel 20-25%<br>Gleiche Wirkstoffgruppe und identisches Wirkspektrum.",
    1,
    "<em>GFR 30-20 ml/min:</em> 2-4 x 1-2g<br><em>GFR 20-10ml/min:</em> 1-4 x 1-2g<br><em>GFR <10 ml/min:</em> 1-3 x -2g bis 4x 1g",
    "<em>Erhaltungsdosis:</em><br>1 x 2g bis 4 x 1g<br> + <em>Ersatzdosis nach Dialyse:</em><br>1g",
    "Keine Dosisanpassung",
    "Therapie >7-10d:<br>Nierenfunktion, Blutbild (insb. Thrombozyten), ggf INR",
    "MTX-Toxizität steigt, insbesondere bei eingeschränkter Nierenfunktion");
antibioticMap.set("antibiotic ampicillin", ampicillin);


let ampicillinSulbactam = new Antibiotic("Ampicillin/Sulbactam",
    " 3 x 1-2 g tgl. i.v.",
    "Eingeschränkt möglich:<br><br>Amoxicillin/Clavulansäure 2-3x 875mg/125mg (BV 70-90%)<br>p.o./i.v. Serumspiegel 20-25%<br>Gleiche Wirkstoffgruppe und identisches Wirkspektrum",
    1,
    "<em>GFR 29-15 ml/min:</em><br>2 x 2/1g tgl.<br><em>GFR 14-5 ml/min:</em><br> 1 x 2/1g tgl.<br><em>GFR <10ml/min:</em><br>2/1g alle 1-2 Tage",
    "<em>Erhaltungsdosis:</em><br>1 x 2/1g tgl.<br> <em>+ Ersatzdosis nach Dialyse:</em><br>1 x 2/1g.",
    "Keine Dosisanpassung",
    "Therapie >7-10 Tage:<br>Nierenfunktion, Blutbild (insb. Thrombozyten), ggf. INR",
    "MTX-Toxizität steigt, insbesondere bei eingeschränkter Nierenfunktion");
antibioticMap.set("antibiotic ampicillinSulbactam", ampicillinSulbactam);


let cefaclor = new Antibiotic("Cefaclor",
    "3 x 500mg p.o.",
    false,
    0,
    "Keine Dosisanpassung.",
    "<em>Erhaltungsdosis:</em><br> 3 x 500mg<br> + <em>vor!</em> Dialyse:<br>0,25-1g",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic cefaclor", cefaclor);


let cefazolin = new Antibiotic("Cefazolin",
    "3 x 2g i.v.",
    fs,
    0,
    "<em>GFR 34-10ml/min:</em><br>2 x 1g<br><em>GFR <10ml/min:</em><br>1 x 1g",
    "<em>Erhaltungsdosis:</em><br>1 x 1(-2)g<br>Am Dialysetag nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic cefazolin", cefazolin);


let ceftazidim = new Antibiotic("Ceftazidim",
    "3 x 2g i.v.",
    fs,
    0,
    "<em>GFR 50-31ml/min:</em><br>2 x 1g<br><em>GFR 30-16ml/min:</em><br>1 x 1g<br><em>GFR 15-6ml/min:</em><br>1 x 0,5g<br><em>GFR <5ml/min:</em><br>Alle 24-48h 0,5g",
    "<em>Erhaltungsdosis:</em><br>1 x 500mg tgl.<br> <em>+ Ersatzdosis</em><br>500mg nach Dialyse",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic ceftazidim", ceftazidim);


let ceftriaxon = new Antibiotic("Ceftriaxon",
    "1 x 2g i.v.",
    fs,
    0,
    "<em>GFR <10ml/min:</em><br>Max. 2g tgl.",
    "<em>Erhaltungsdosis:</em><br>1 x 2g<br>Am Dialysetag nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic ceftriaxon", ceftriaxon);


let cefuroxim = new Antibiotic("Cefuroxim",
    "3 x 1,5g i.v.",
    "<strong>Keine adäquate Oralisierung möglich!</strong><br><br>Cefuroxim-axetil p.o., 2x 250-500mg (BV 30-40%)<br>p.o./i.v. Serumspiegel 10-25%",
    2,
    "<em>GFR 20-10ml/min:</em><br>2 x 750mg<br><em>GFR < 10ml/min:</em><br>1 x 750mg",
    "<em>Erhaltungsdosis:</em><br>1 x 750mg<br> <em>+ Ersatzdosis nach Dialyse:</em><br>750mg",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic cefuroxim", cefuroxim);


let ciprofloxacin = new Antibiotic("Ciprofloxacin",
    "2 x 250-500mg p.o.",
    false,
    0,
    "<em>GFR <30ml/min:</em><br>1 x 500mg tgl.",
    "<em>Erhaltungsdosis:</em><br>1 x 0,4-0,2g tgl.<br><em>Am Dialysetag nach Dialyse</em>",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic ciprofloxacin", ciprofloxacin);


let clarithromycinPO = new Antibiotic("Clarithromycin",
    "2 x 500mg p.o.",
    false,
    0,
    "<em>GFR <30ml/min:</em><br>2 x 250mg",
    "<em>Erhaltungsdosis:</em><br>2 x 250mg<br>Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic clarithromycinPO", clarithromycinPO);


let clindamycinIV = new Antibiotic("Clindamycin",
    "3 x 600mg i.v.",
    "Uneingeschränkt möglich:<br><br>Clindamycin p.o., 4-6x 300mg (BV 90%)<br><br>p.o./i.v. Serumspiegel (70-)80%)",
    1,
    "<em>GFR <30ml/min:</em><br>2-3 x 600mg tgl.",
    "Unverändert, keine Ersatzdosis erforderlich.",
    "Bei schwerer Leberinsuffizienz maximal alle 8h und max. 1,8g/d",
    "Therapie >10 Tage:<br>Nierenfunktion, Leberfunktion, Blutbild",
    "Kann Wirkung von Muskelrelaxantien verstärken");
antibioticMap.set("antibiotic clindamycinIV", clindamycinIV);


let clindamycinPO = new Antibiotic("Clindamycin",
    "4 x 450mg tgl. p.o.<br>oder: 3 x 600mg p.o. tgl.",
    false,
    0,
    "<em>GFR <30ml/min</em><br>2-3 x 600mg",
    "Unverändert, keine Ersatzdosis erforderlich.",
    "Bei schwerer Leberinsuffizienz maximal alle 8h und max. 1,8g/d",
    "Therapie >10 Tage:<br>Nierenfunktion, Leberfunktion, Blutbild",
    "Kann Wirkung von Muskelrelaxantien verstärken.");
antibioticMap.set("antibiotic clindamycinPO", clindamycinPO);


let cotrimoxazol = new Antibiotic("Cotrimoxazol",
    "2(-3) x 960mg p.o.",
    false,
    0,
    "<em>GFR 30-15ml/min:</em><br>2 x 480mg tgl.<br><em>GFR <15ml/min:</em><br>Kontraindiziert!",
    "Bei Dialyse kontraindiziert.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic cotrimoxazol", cotrimoxazol);


let doxycyclin = new Antibiotic("Doxycyclin",
    "Einmalig 200mg,<br>dann 1 x 100mg tgl. p.o.",
    false,
    0,
    "Unverändert, keine Dosisanpassung erforderlich",
    "Unverändert keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic doxycyclin", doxycyclin);


let erythromycin = new Antibiotic("Erythromycin",
    "4 x 500mg - 1g tgl. i.v.",
    fs,
    0,
    "<em>GFR <30-20ml/min:</em><br>2 x 1g<br>Bei <em>Anurie</em> max. 2g/d",
    "<em>Erhaltungdosis:</em><br>2 x 1g<br>Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic erythromycin", erythromycin);


let flucloxacillin = new Antibiotic("Flucloxacillin",
    "4-6 x 2g tgl. i.v.",
    "<strong>Keine adäquate Oralisierung möglich!</strong><br><br>Flucloxacillin p.o., 3x 1g (BV 50-70%)<br>p.o./i.v. Serumspiegel <10%",
    2,
    "<em>GFR <18ml/min:</em><br>4 x 1,5g<br><em>GFR <8ml/min:</em><br>3 x 1,5g<br><em>GFR <2ml/min:</em><br>3 x ,0g<br><em>GFR <0,5ml/min:</em><br>1 x 2,0g",
    "<em>Erhaltungsdosis:</em><br>2 x 2g<br>Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic flucloxacillin", flucloxacillin);


let fosfomycin = new Antibiotic("Fosfomycin",
    "3 x <strong>5g</strong>; 3g; 2g i.v.",
    "<strong>Keine adäquate Oralisierung möglich!</strong><br><br>Fosfomycin p.o., 1x 3g Einmaldosis<br>Keine ausreichende p.o. Resorption!<br>Oral nur bei ambulant erworbenem, unkompliziertem Harnwegsinfekt der Frau.",
    3,
    "<em>GFR <45ml/min:</em><br><strong>4x3g</strong>; 2x3g; 2x2g<br><em>GFR <18ml/min:</em><br><strong>3x3g</strong>; 3x1,5g; 3x1g<br><em>GFR <8ml/min:</em><br><strong>2x3g</strong>; 2x1,5g; 2x1g<br><em>GFR <2ml/min:</em><br><strong>1x3g</strong>; 1x1,5g; 1x1g<br>GFR <0,5ml/min:<br><strong>1,5g/24h</strong>; 1g/24h; 1g/36h<br>",
    "<em>Erhaltungsdosis:</em><br>2(-4)g nach Dialyse<br>Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic fosfomycin", fosfomycin);


let gentamicin = new Antibiotic("Gentamicin",
    "1 x 4,5 mgkgKG tgl. i.v.",
    fs,
    0,
    "Individuell dosieren, z.B.:<br><em>GFR 72-30ml/min:</em><br>2 x 80mg<br><em>GFR 30-12ml/min:</em><br>1 x 80mg<br><em>GFR 12-6ml/min:</em><br>1 x 125mg",
    "<em>Ersatzdosis:</em><br>Ca. 1-1,7mg/kgKG nach Dialyse.<br>Individuell nachjustieren, TDM empfohlen.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic gentamicin", gentamicin);


let levofloxacinIV = new Antibiotic("Levofloxacin",
    "1-2 x 500mg i.v.",
    "Uneingeschränkt möglich:<br><br>Levofloxacin p.o., 1-2x 500mg (BV 100%)<br>p.o./i.v. Serumspiegel 90-100%<br>1-2h vor oder 4h nach Ca, Mg, Fe bei gleichzeitiger p.o.-Therapie",
    1 ,
    "Startdosis:<br>1 x 500-750mg<br>Erhaltungsdosis:<br><em>GFR 50-20ml/min:</em><br>1 x 250mg<br><em>GFR <20ml/min:</em><br>1 x 125mg",
    "<em>Erhaltungsdosis:</em><br>1 x 125mg nach Dialyse<br>Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic levofloxacinIV", levofloxacinIV);


let levofloxacinPO = new Antibiotic("Levofloxacin",
    "1-2 x 500mg p.o.",
    false,
    0,
    "Startdosis:<br>1 x 500-750mg<br>Erhaltungsdosis:<br><em>GFR 50-20ml/min:</em><br>1 x 250mg<br><em>GFR <20ml/min:</em><br>1 x 125mg",
    "<em>Erhaltungsdosis:</em><br>1 x 125mg nach Dialyse<br>Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic levofloxacinPO", levofloxacinPO);


let linezolidIV = new Antibiotic("Linezolid",
    "2 x 600mg i.v.",
    "Uneingeschränkt möglich:<br><br>Linezolid p.o., 2x 600mg (BV 100%)<br>p.o./i.v. Serumspiegel 100%",
    1,
    "Unverändert, keine Dosisanpassung erforderlich",
    "Unverändert.<br>Am Dialysetag nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic linezolidIV", linezolidIV);


let linezolidPO = new Antibiotic("Linezolid",
    "2 x 600mg p.o.",
false,
    0,
    "Unverändert, keine Dosisanpassung erforderlich",
    "Unverändert.<br>Am Dialysetag nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic linezolidPO", linezolidPO);


let meropenem = new Antibiotic("Meropenem",
    "3 x 0,5g tgl. i.v.",
    noOral,
    0,
    "<em>GFR 50-26ml/min:</em><br>2 x 1 Dosis<br><em>GFR 25-10ml/min:</em><br>2 x 1/2 Dosis<br><em>GFR <10ml/min:</em><br>1 x 1/2 Dosis.",
    "<em>Erhaltungsdosis:</em><br>1 x 500mg-1g<br>Am Dialysetag nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic meropenem", meropenem);


let metronidazolIV = new Antibiotic("Metronidazol",
    "3 x 0,5g i.v.",
    "Uneingeschränkt möglich:<br><br>Metronidazol p.o., 3x (400mg-)500mg (BV 100%)<br>p.o./i.v. Serumspiegel (80-)100%",
    1,
    "Unverändert, keine Dosisanpassung erforderlich.",
    "Unverändert.<br>Am Dialysetag nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic metronidazolIV", metronidazolIV);


let metronidazolPO = new Antibiotic("Metronidazol",
    "3 x 0,5g p.o.",
    false,
    0,
    "Unverändert, keine Dosisanpassung erforderlich.",
    "Unverändert.<br>Am Dialysetag nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic metronidazolPO", metronidazolPO);


let nitrofurantoin = new Antibiotic("Nitrofurantoin",
    "2-3 x 100mg tgl. p.o.",
    false,
    0,
    "Kontraindiziert.",
    "Kontraindiziert.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic nitrofurantoin", nitrofurantoin);


let penicillinG = new Antibiotic("Penicillin G",
    "4 x 1-10Mio IE tgl. i.v.",
    "<strong>Keine adäquate Oralisierung möglich!</strong><br><br>Penicillin V, 3-4x 1,5 Mega (BV 10%)<br>p.o./i.v. Serumspiegel <10%<br>Gleiche Wirkstoffgruppe und identisches Wirkspektrum",
    2,
    "<em>GFR 120-45ml/min:</em><br>4 x 5 Mio IE<br><em>GFR 45-18ml/min:</em><br>3 x 5 Mio IE<br><em>GFR 18-8ml/min:</em><br>3 x 4 Mio IE<br><em>GFR 8-2ml/min:</em><br>2 x 5 Mio IE",
    "<em>Erhaltungsdosis:</em><br>2-3 x 5 Mio IE<br>Am Dialysetag idealerweise nach Dialyse<br>Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic penicillinG", penicillinG);


let penicillinV = new Antibiotic("Penicillin V",
    "3 x 1,5 Mio tgl. p.o.",
    false,
    0,
    "<em>Bei Anurie (GFR <15ml/min)</em>:<br>Dosierintervall 12h",
    "Keine Angaben.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic penicillinV", penicillinV);


let piperacillinTazobactam = new Antibiotic("Piperacillin/Tazobactam",
    "3 x 4,5g tgl. i.v.",
    noOral,
    0,
    "<em>GFR <20ml/min:</em><br>2 x 4,5g",
    "<em>Erhaltungsdosis:</em><br>2 x 4,5g<br> <em>+ Ersatzdosis:</em><br>2,25g nach Dialyse.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic piperacillinTazobactam", piperacillinTazobactam);


let pivmecillinam = new Antibiotic("Pivmecillinam",
    "3 x 400mg tgl. p.o.",
    false,
    0,
    "Unverändert. Keine Dosisanpassung erforderlich.",
    "Unverändert. Keine Ersatzdosis erforderlich",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic pivmecillinam", pivmecillinam);


let rifampicinIV = new Antibiotic("Rifampicin",
    "1-2 x 600mg tgl. i.v.",
    "Uneingeschränkt möglich:<br><br>Rifampicin p.o., 450-600mg (initial BV >90%)<br>p.o./i.v. Serumspiegel <90%<br>Absenkung auf 68% nach drei Wochen p.o. Therapie.",
    1,
    "Unverändert. Keine Dosisanpassung erforderlich.",
    "Unverändert. Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic rifampicinIV", rifampicinIV);


let rifampicinPO = new Antibiotic("Rifampicin",
    "1-2 x 600mg tgl. p.o.",
    false,
    0,
    "Unverändert. Keine Dosisanpassung erforderlich.",
    "Unverändert. Keine Ersatzdosis erforderlich.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic rifampicinPO", rifampicinPO);


let tobramycin = new Antibiotic("Tobramycin",
    "1 x 3,5mg/kgKG tgl. i.v.",
    noOral,
    0,
    "Verschiedene Möglichkeiten, siehe Fachinfo.",
    "<em>Ersatzdosis</em> nach Dialyse,<br>üblicherweise 1/2 der Startdosis<br>Individuell nachjustieren, TDM empfohlen.",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic tobramycin", tobramycin);


let vancomycin = new Antibiotic("Vancomycin",
    "2 x 1g tgl. i.v.",
    "<strong>Keine adäquate Oralisierung möglich!<br><br>Vancomycin p.o., 4x 125mg<br>Keine ausreichende p.o. Resorption!<br>Oral nur bei C. difficile Infektion.",
    3,
    "s. Nomogramm (Fachinfo),<br>individuelle Erhaltungsdosen von 250mg-1g alle paar Tage.<br>TDM empfohlen.<br><em>Bei Anurie:</em><br> 1g alle 7-10 Tage.",
    "<em>Initial:</em><br>15mg/kgKG<br><em>Erhaltungsdosis:</em><br>1,9mg/kgKG/24h",
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic vancomycin", vancomycin);


/*=================================================*/
/*=========Ab hier fehlt Niereninsuff Dosis========*/
/*=================================================*/

let trimethoprimSulfamethoxazol = new Antibiotic("Trimethoprim/Sulfamethoxazol",
    fs,
    "Uneingeschränkt möglich:<br><br>Trimethoprim/Sulfamethoxazol p.o., 2x 960mg (BV 80-100%)<br>p.o./i.v. Serumspiegel 80-100%",
    1,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic trimethoprimSulfamethoxazol", trimethoprimSulfamethoxazol);


let ganciclovir = new Antibiotic("Ganciclovir",
    fs,
    fs,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic ganciclovir", ganciclovir);


let aciclovir = new Antibiotic("Aciclovir",
    fs,
    fs,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic aciclovir", aciclovir);


let fluconazol = new Antibiotic("Fluconazol (Diflucan)",
    fs,
    fs,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic fluconazol", fluconazol);


let voriconazol = new Antibiotic("Voriconazol",
    fs,
    "Uneingeschränkt möglich:<br><br>Voriconazol p.o., 2x 400mg(d1)-200mg (BV 96%)<br>p.o./i.v. Serumspiegel (70-)90%, berechnet auf 70kgKG",
    1,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic voriconazol", voriconazol);


let amphotericinB = new Antibiotic("Amphotericin B (Liposomal)",
    fs,
    fs,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic amphotericinB", amphotericinB);


let caspofungin = new Antibiotic("Caspofungin",
    fs,
    fs,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic caspofungin", caspofungin);


let ethambutol = new Antibiotic("Ethambutol",
    fs,
    false,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic ethambutol", ethambutol);


let rifabutin = new Antibiotic("Rifabutin",
    fs,
    false,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic rifabutin", rifabutin);


let azithromycin = new Antibiotic("Azithromycin",
    fs,
    false,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic azithromycin", azithromycin);

let tigecyclin = new Antibiotic("Tigecyclin",
    fs,
    fs,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic tigecyclin", tigecyclin);

let gernebcin = new Antibiotic("Gernebcin",
    fs,
    fs,
    0,
    fs,
    fs,
    fs,
    fs,
    fs);
antibioticMap.set("antibiotic gernebcin", gernebcin);

/*============================*/





let oralisationMap = new Map();
oralisationMap.set(1, "<ul><li><strong>Klinische Besserung, hämodynamische Stabilität</strong></li><li><strong>Keine Kontraindikation wie z.B. gastrointestinale Resorptionsstörung</strong> (Diarrhoe, Erbrechen, Kurzdarmsyndrom), <strong>Schluckbeschwerden</strong></li><li><strong>Keine schwere Infektion</strong> wie z.B. Endokarditis, Meningitis, S. aureus Bakteriämie</li><li><strong>Adäquate initiale i.v. Therapie bei bestimmten Infektionen</strong> wie z.B. Fremdkörper- und Implantatassoziierte Infektionen, Osteomyelitis</li></ul>");
oralisationMap.set(2, "<ul><li><strong>Umstellung auf andere Substanzgruppe mit höherem p.o./i.v. Serumspiegel</strong> (ggf. Rücksprache Stabsstelle ABS/Apotheke/Mikrobiologie</li><li><strong>Nur in Ausnahmefällen nach sorgfältiger Nutzen-Risiko-Abwägung!</strong></li>");
oralisationMap.set(3, "<ul><li><strong>Angabe nicht sinnvoll!</strong></li><li>Keine systemische Wirksamkeit wegen nicht ausreichender Resorption nach p.o.-Gabe</li><li>Abweichende Indikation i.v. und p.o.</li>");
oralisationMap.set(0, "Ausarbeitung folgt.")

let infoButtonXML = "<div class=\"infoButton\"><svg height=\"100%\" viewBox=\"0 0 26.458 26.458\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(0 -270.54)\"><ellipse class=\"buttonFill\" cx=\"13.229\" cy=\"283.83\" rx=\"11.906\" ry=\"11.848\" fill=\"#80cdce\" stroke=\"#000\" stroke-width=\".755\"/><rect x=\"11.255\" y=\"280.33\" width=\"4.0908\" height=\"11.642\" rx=\".40908\" ry=\".5174\" stroke-width=\"0\"/><rect x=\"11.377\" y=\"275.57\" width=\"3.7041\" height=\"3.7041\" rx=\"1.8521\" ry=\"1.8521\" stroke-width=\"0\"/></g></svg></div>";

function setUpInfoButtons(element) {
    let antibioticSpans = element.querySelectorAll(".antibiotic");
    if (antibioticSpans.length !== 0) {

        /*
        for(let i=0;i++;i<antibioticSpans.length) {
            infoContents.push([]);
            let currentAntibiotic = antibioticMap.get(antibioticSpans.get(i).className);
            antibioticSpans.get(i).innerHTML = "<strong>" + currentAntibiotic.abName + "</strong><br>" + infoButtonXML;

            infoContents[i].push(document.createElement("p"));
            infoContents[i][infoContents[i].length-1].innerHTML("<strong>" + currentAntibiotic.abName + "</strong><br>");
            infoContents[i].push(document.createElement("p"));
            infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Dosierung:</strong>" + currentAntibiotic.usualDose + "<br>");
            if(currentAntibiotic.oralisation) {
                infoContents[i].push(document.createElement("p"));
                infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Oralisierung:</strong><br>(Bedingungen s.u.)" + currentAntibiotic.oralisation + "<br>");
            }
            infoContents[i].push(document.createElement("p"));
            infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Niereninsuffizienz:</strong>" + currentAntibiotic.kidney + "<br>");
            infoContents[i].push(document.createElement("p"));
            infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Dialyse:</strong>" + currentAntibiotic.dialysis + "<br>");
            infoContents[i].push(document.createElement("p"));
            infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Leberinsuffizienz:</strong>" + currentAntibiotic.liver + "<br>");
            if(currentAntibiotic.monitoring) {
                infoContents[i].push(document.createElement("p"));
                infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Monitoring:</strong>" + currentAntibiotic.monitoring + "<br>");
            }
            if(currentAntibiotic.special) {
                infoContents[i].push(document.createElement("p"));
                infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Besonderheiten:</strong>" + currentAntibiotic.special + "<br>");
            }
            if(currentAntibiotic.oralisation) {
                infoContents[i].push(document.createElement("p"));
                infoContents[i][infoContents[i].length-1].innerHTML("<br><strong>Bedingungen Oralisierung:</strong>" + currentAntibiotic.oralisation + "<br>");
            }
            antibioticSpans.get(i).addEventListener('click', () => {
                infoBoxContent.textContent ="";
                infoContents[i].forEach((infoContent) => {
                    infoBoxContent.appendChild(infoContent);
                })
                infoBox.style.display = 'block';
                cover.style.display = 'block';
                    })
        }*/
        antibioticSpans.forEach((antibioticSpan) => {
            let currentAntibiotic = antibioticMap.get(antibioticSpan.className);

            antibioticSpan.innerHTML = "<strong>" + currentAntibiotic.abName + "</strong><br>" + infoButtonXML;
            antibioticSpan.addEventListener('click', () => {
                let text;
                if (developerVersion === true) {
                    text = "<p><strong>" + currentAntibiotic.abName + "</strong><br><br><strong>Dosierung:</strong><br>" + currentAntibiotic.usualDose + "<br><br>";
                    if(currentAntibiotic.oralisation) {
                        text += "<strong>Oralisierung:</strong><br>(Bedingungen s.u.)<br>" + currentAntibiotic.oralisation + "<br><br>";
                    }
                    text += "<strong>Niereninsuffizienz:</strong><br>" + currentAntibiotic.kidney + "<br><br>";
                    text += "<strong>Dialyse:</strong><br>" + currentAntibiotic.dialysis + "<br><br>";
                    text += "<strong>Leberinsuffizienz:</strong><br>" + currentAntibiotic.liver + "<br><br>";
                    text += "<strong>Monitoring:</strong><br>" + currentAntibiotic.monitoring + "<br><br>";
                    text += "<strong>Besonderheiten:</strong><br>" + currentAntibiotic.special + "<br><br>";
                    text += "<strong>Bedingungen Oralisierung:</strong><br>" + oralisationMap.get(currentAntibiotic.oralisationReq) + "<br><br>";
                    infoBoxContent.innerHTML = text;
                } else {
                    text = "<p><strong>" + currentAntibiotic.abName + "</strong><br><br><strong>Dosierung:</strong><br>" + currentAntibiotic.usualDose + "<br><br>";
                    text += "<strong>Niereninsuffizienz:</strong><br>" + currentAntibiotic.kidney + "<br><br>";
                    text += "<strong>Dialyse:</strong><br>" + currentAntibiotic.dialysis + "<br><br>";
                    text += "Informationen zu Leberinsuffizienz, Monitoring, Oralisierung und Besonderheiten folgen in Kürze."
                    infoBoxContent.innerHTML = text;
                }
                infoBox.style.display = 'block';
                cover.style.display = 'block';
            })
        })

        /* Original:
antibioticSpans.forEach((antibioticSpan) => {
let currentAntibiotic = antibioticMap.get(antibioticSpan.className);

antibioticSpan.innerHTML = "<strong>" + currentAntibiotic.abName + "</strong><br>" + infoButtonXML;
antibioticSpan.addEventListener('click', () => {
    if (developerVersion === true) {
        if (currentAntibiotic.oralisation != null) {
            infoBoxContent.innerHTML = "<p><strong>" + currentAntibiotic.abName + "</strong><br><br>" + "<strong>Dosierung bei Niereninsuffizienz:</strong><br>" + currentAntibiotic.kidney + "<br><br><strong>Dosierung bei Leberinsuffizienz:</strong><br>" + currentAntibiotic.liver + "<br><br><strong>Oralisierung:</strong><br>" + currentAntibiotic.oralisation + "<br><br><strong>Bedingungen Oralisierung:</strong>" + oralisationMap.get(currentAntibiotic.oralisationReq);
        } else {
            infoBoxContent.innerHTML = "<p><strong>" + currentAntibiotic.abName + "</strong><br><br><strong>Dosierung bei Niereninsuffizienz:</strong><br>" + currentAntibiotic.kidney + "<br><br><strong>Dosierung bei Leberinsuffizienz:</strong><br>" + currentAntibiotic.liver;
        }
    } else {
        infoBoxContent.innerHTML = "<p><strong>" + currentAntibiotic.abName + "</strong><br><br>  Hier folgen in Kürze weitere Informationen zu Dosisanpassung bei Leber- und Niereninsuffizienz, Besonderheiten etc.";
    }
    infoBox.style.display = 'block';
    cover.style.display = 'block';
})
        })

         */
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