"use strict"

class Countdown extends HTMLElement {

    constructor() {
        super();
        this.alarms = [];

    }

    hide() {
        this.style.display = `none`;
    }

    show() {
        this.style.display = `block`;
    }

    setDuration(timeInSeconds) {
        this.remainingTimeInSeconds = timeInSeconds;
    }

    addAlarm(timeMarkInSeconds) {
        this.alarms.push(timeMarkInSeconds);
    }

    connectedCallback() {
        this.refreshAndOutputRemainingTime();
        //TODO: Figure out what's wrong above
    }

    start() {
        this.startCountDown().then();
    }

    restart(timeInSeconds) {
        clearInterval(this.countDownInterval);
        this.setDuration(timeInSeconds);
        this.refreshAndOutputRemainingTime();
        this.startCountDown().then();
    }


    refreshAndOutputRemainingTime() {
        this.refreshRemainingTimeAsText();
        this.innerHTML = this.remainingTimeAsText;
    }

    refreshRemainingTimeAsText() {
        this.refreshHoursMinutesSeconds();
        this.remainingTimeAsText = ``;
        if (this.remainingHours) this.remainingTimeAsText += `${this.remainingHours}h `;
        if (this.remainingMinutes) this.remainingTimeAsText += `${this.remainingMinutes}m `;
        this.remainingTimeAsText += `${this.remainingSeconds}s`;
    }

    refreshHoursMinutesSeconds() {
        this.remainingHours = Math.floor(this.remainingTimeInSeconds / 3600);
        this.remain = this.remainingTimeInSeconds % 3600;
        this.remainingMinutes = Math.floor(this.remain / 60);
        this.remainingSeconds = this.remain % 60;
    }

    checkAlarms() {
        for (let alarm of this.alarms) {
            if (alarm === this.remainingTimeInSeconds) return true;
        }
    }

    fetchAlarm() {
        for (let alarm of this.alarms) {
            if (alarm === this.remainingTimeInSeconds) return alarm;
        }
    }

    triggerAlarm(timeMark) {
        console.log(`Alarm triggered at ${timeMark}`)
        let alarmEvent = new Event(`alarm`, {
            bubbles: true,
            cancelable: true,
            composed: false
        });
        alarmEvent.alarmTime = timeMark;
        this.dispatchEvent(alarmEvent);
    }

    launchExpiredEvent() {
        let expiredEvent = new Event(`expired`, {
            bubbles: true,
            cancelable: true,
            composed: false
        });
        this.dispatchEvent(expiredEvent);
    }

    async startCountDown() {
        this.countDownInterval = setInterval(() => {
            this.remainingTimeInSeconds -= 1;
            this.refreshAndOutputRemainingTime();
            if (this.checkAlarms()) {
                this.triggerAlarm(this.fetchAlarm());
            }
            if (this.remainingTimeInSeconds === 0) {
                clearInterval(this.countDownInterval);
                this.launchExpiredEvent();
            }
        }, 1000)
    }

}

customElements.define('rea-countdown', Countdown)

class Timer extends HTMLElement {
    constructor() {
        super();
        this.timeInSeconds = 0;
        this.timeAsText = `0s`;
        this.markers = [];
        this.pauseDuration = 0;
        this.pauses = [];
    }

    timerPaused = true;

    connectedCallback() {
        this.startTimer().then();
    }

    pause() {
        this.timerPaused = true;
        this.measurePauseDuration();
    }

    end() {
        clearInterval(this.pauseInterval);
        clearInterval(this.mainInterval);
        if (this.pauseDuration > 1) this.pauses.push(Math.round(this.pauseDuration));
        console.log(this.pauses);
    }

    async measurePauseDuration() {
        this.pauseDuration = -0.1;
        this.pauseInterval = setInterval(() => {
            this.pauseDuration += 0.1;
        }, 100)
    }

    resume() {
        this.timerPaused = false;
        clearInterval(this.pauseInterval);
        if (this.pauseDuration > 1) this.pauses.push(Math.round(this.pauseDuration));
    }

    setMarker(timeMark) {
        this.markers.push(this.timeInSeconds);
    }

    exportTime() {
        return this.timeInSeconds;
    }

    async startTimer() {
        console.log(`Timer started`);
        this.mainInterval = setInterval(() => {
            if (!this.timerPaused) {
                this.timeInSeconds += 0.1;
                this.refreshTimeAsText();
                this.innerHTML = this.timeAsText;
            }
        }, 100)
    }

    refreshHoursMinutesSeconds() {
        this.remainingHours = Math.floor(this.timeInSeconds / 3600);
        this.remain = this.timeInSeconds % 3600;
        this.remainingMinutes = Math.floor(this.remain / 60);
        this.remainingSeconds = Math.floor(this.remain % 60);
    }

    refreshTimeAsText() {
        this.refreshHoursMinutesSeconds();
        this.timeAsText = ``;
        if (this.remainingHours) this.timeAsText += `${this.remainingHours}h `;
        if (this.remainingMinutes) this.timeAsText += `${this.remainingMinutes}m `;
        this.timeAsText += `${this.remainingSeconds}s`;
    }
}

function convertTime(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / 3600);
    let remain = timeInSeconds % 3600;
    let minutes = Math.floor(remain / 60);
    let seconds = Math.floor(remain % 60);
    return `${hours}h ${minutes}m ${seconds}s`
}

customElements.define(`rea-timer`, Timer);

let reanimationStarted = false;

/** Change!! **/
let body = document.querySelector(`body`);

let header = document.querySelector('.header');
let time = document.querySelector(`.time`);
let docDuration = document.querySelector(`.docDuration`);
let docShock = document.querySelector(`.docShock`);
let docAdrenaline = document.querySelector(`.docAdrenaline`);
let docAmiodarone = document.querySelector(`.docAmiodarone`);
let docCompression = document.querySelector(`.docCompression`);
let ccf;
let end = document.querySelector(`.end`);

let shock = document.querySelector(`.shock`);
let shockCountdown = document.createElement(`rea-countdown`);
shockCountdown.setDuration(120);
shockCountdown.addAlarm(30);
//shockCountdown.hide();
shock.appendChild(shockCountdown);
let numberOfShocks = 0;
let numberOfShocksSinceAmiodarone = 0;

let rhythm = document.querySelector(`.rhythm`);

let adrenaline = document.querySelector(`.adrenaline`);
let adrenalineCountdown = document.createElement('rea-countdown');
adrenalineCountdown.setDuration(180);
adrenalineCountdown.addAlarm(30);
//adrenalineCountdown.hide();
adrenaline.appendChild(adrenalineCountdown);
let numberOfAdrenaline = 0;

let amiodarone = document.querySelector(`.amiodarone`);
let numberOfAmiodarone = 0;
let numberOfShocksUntilAmiodaron = 3;

let hlw = document.querySelector(`.hlw`);


let reaTimer = document.createElement(`rea-timer`);
docDuration.appendChild(reaTimer);

let currentDate = new Date();
let log = {
    Datum: `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`,
    Adrenalin: {
        Anzahl: 0,
        Zeiten: []
    },
    Schocks: {
        Anzahl: 0,
        Zeiten: []
    },
    Amiodaron: {
        Anzahl: 0,
        Zeiten: []
    }
}


let hlwButton = document.querySelector(`.hlwButton`);
hlwButton.active = false;
hlwButton.innerHTML = "Thoraxkompressionen\nPAUSIERT!";
hlwButton.style.backgroundColor = `red`;

let hlwTimer = document.createElement(`rea-timer`);
hlwTimer.style.display = 'none';
hlw.appendChild(hlwButton);
hlw.appendChild(hlwTimer);

hlwButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hlwButton.active) {
        if (!reanimationStarted) startReanimation();
        hlwTimer.resume();
        hlwButton.innerHTML = "Thoraxkompressionen\nLAUFEN";
        hlwButton.style.backgroundColor = `green`;
        hlwButton.active = true;
    } else {
        hlwTimer.pause();
        hlwButton.innerHTML = "Thoraxkompressionen\nPAUSIERT!";
        hlwButton.style.backgroundColor = `red`;
        hlwButton.active = false;
    }
})

adrenaline.addEventListener(`click`, () => {
    //TODO: DO!
    adrenalineCountdown.restart(180);
    adrenaline.style.backgroundColor = `red`;
    numberOfAdrenaline += 1;
    docAdrenaline.innerHTML = `Adrenalingaben: ${numberOfAdrenaline}`;
    log.Adrenalin.Zeiten.push(convertTime(reaTimer.timeInSeconds));
    //TODO: Add date variant of adrenaline times
});

adrenaline.addEventListener(`alarm`, () => {
    adrenaline.style.backgroundColor = `yellow`;
    adrenalineCountdown.show();
});

adrenaline.addEventListener(`expired`, () => {
    adrenaline.style.backgroundColor = `green`;
})

shock.addEventListener(`click`, () => {
    shockCountdown.restart(120);
    shock.style.backgroundColor = `red`;
    numberOfShocks += 1;
    numberOfShocksSinceAmiodarone += 1;
    if (numberOfShocksSinceAmiodarone === numberOfShocksUntilAmiodaron) {
        activateAmiodaron();
    }
    docShock.innerHTML = `Schockabgaben: ${numberOfShocks}`;
    log.Schocks.Zeiten.push(convertTime(reaTimer.timeInSeconds));
    //TODO: Add date variant of shock times
});

shock.addEventListener(`alarm`, () => {
    shock.style.backgroundColor = `yellow`;
    shockCountdown.show();
})

shock.addEventListener(`expired`, () => {
    shock.style.backgroundColor = `green`;
})

function activateAmiodaron() {
    amiodarone.style.backgroundColor = `green`;
    amiodarone.addEventListener(`click`, () => {
        if(numberOfAmiodarone === 0) {
            numberOfShocksUntilAmiodaron = 2;
            numberOfShocksSinceAmiodarone = 0;
            numberOfAmiodarone += 1;
            amiodarone.style.backgroundColor = `red`;
            docAmiodarone.innerHTML = `Amiodarongaben: ${numberOfAmiodarone}`;
            log.Amiodaron.Zeiten.push(reaTimer.timeInSeconds);
        } else if (numberOfAmiodarone === 1) {
            numberOfShocksUntilAmiodaron = -1;
            numberOfAmiodarone += 1
            amiodarone.style.backgroundColor = `lightgrey`;
            docAmiodarone.innerHTML = `Amiodarongaben: ${numberOfAmiodarone}`;
            log.Amiodaron.Zeiten.push(Math.round(reaTimer.timeInSeconds));
        }
    });

}

end.addEventListener(`click`, (e) => {
    e.preventDefault();
    e.stopPropagation();
    hlwTimer.end();
    reaTimer.end();
    reaTimer.timeInSeconds = reaTimer.timeInSeconds - hlwTimer.pauses.pop();
    if (!hlwTimer.pauses) log.Kompressionspausen = "Keine.";
    console.log(hlwTimer.pauses);
    for (let pause of hlwTimer.pauses) {
        log.Kompressionspausen += ` ${pause}s`;
    }
    log.Dauer = convertTime(reaTimer.timeInSeconds)
    log.Schocks.Anzahl = numberOfShocks;
    log.Adrenalin.Anzahl = numberOfAdrenaline;
    log.Amiodaron.Anzahl = numberOfAmiodarone;

    //TODO: Complete!
    let auswertung = document.createElement(`p`);

    auswertung.innerHTML = `Auswertung\n
    Start der Reanimation: ${log.Datum} um ${log.Beginn}\n\n
    Dauer: ${log.Dauer}\n
    Kompressionspausen: ${log.Kompressionspausen}\n
    CCF: ${Math.round((hlwTimer.timeInSeconds / reaTimer.timeInSeconds) * 100)}%\n\n
    
    Schocks: ${log.Schocks.Anzahl}\n
    Schock-Zeiten: ${log.Schocks.Zeiten}\n\n
    
    Adrenalin: ${log.Adrenalin.Anzahl} Gaben\n
    Adrenalin-Zeiten: ${log.Adrenalin.Zeiten}\n
    
    Amiodaron: ${log.Amiodaron.Anzahl} Gaben\n
    Amiodaron-Zeiten: ${log.Amiodaron.Zeiten}
    `;
    auswertung.style.width = `100%`;
    body.innerHTML = "";
    body.appendChild(auswertung)
})

function startReanimation() {
    reanimationStarted = true;
    hlwTimer.resume();
    reaTimer.resume();
    let date = new Date();
    log.Beginn = `${date.getHours()}:${date.getMinutes()}`
    calcCCF().then();
}

async function calcCCF() {
    setInterval(() => {
        ccf = (hlwTimer.exportTime() / reaTimer.exportTime()) * 100;
        docCompression.innerHTML = `CCF: ${Math.floor(ccf)}%`
    }, 1000)
}
