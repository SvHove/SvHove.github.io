'use strict'

document.write('<header>\n' +
    '    <div id="navMenu" class="headFootButton">\n' +
    '        <img id="menu" src="res/menuButton.svg" alt="Menü">\n' +
    '    </div>\n' +
    '    <div id="titleBox">\n' +
    '        <p id="title">Willkommen!</p>\n' +
    '    </div>\n' +
    '    <div class="headFootButton">\n' +
    '        <img id="search" src="res/searchButton.svg" alt="Search">\n' +
    '    </div>\n' +
    '</header>\n' +
    '<footer>\n' +
    '    <div class="headFootButton" onclick="history.back()">\n' +
    '        <img id="back" src="res/backButton.svg" alt="Zurück">\n' +
    '    </div>\n' +
    '    <div class="headFootButton" onclick="window.location=\'index.html\'">\n' +
    '        <img id="home" src="res/homeButton.svg" alt="Home">\n' +
    '    </div>\n' +
    '    <div id="dayNight" class="headFootButton">\n' +
    '    </div>\n' +
    '</footer>\n' +
    '<nav>\n' +
    '    <button class="menuButton" onclick="window.location=\'index.html\'">Index</button>\n' +
    '    <hr>\n' +
    '    <button class="menuButton" onclick="window.location=\'AB_Guideline/ab_index.html\'">AB-Guideline</button>\n' +
    '    <button class="menuButton" onclick="window.location=\'SOP/sop_index.html\'">SOPs</button>\n' +
    '    <hr>\n' +
    '    <button class="menuButton" onclick="window.location=\'changelog.html\'">Versions Logbuch</button>\n' +
    '</nav>\n' +
    '<div id="cover"></div>');