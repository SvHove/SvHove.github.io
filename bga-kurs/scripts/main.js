let debug = true;
let cases;
let teachings;
let body = document.querySelector(`body`);
let main = document.querySelector(`main`);

log(`        Debugging mode\n\n`);




async function run() {
    await readDataFiles();
    setUpCasesPage();

    test()
}

function setUpCasesPage() {
    main.innerHTML = "";
    let description = document.createElement(`div`);
    description.id = "description";
    main.appendChild(description);
    let values = document.createElement(`div`);
    values.id = "values";
    main.appendChild(values)
    let questions = document.createElement(`questions`);
    questions.id = "questions";
    main.appendChild(questions)

    switchCase(1)
}

function switchCase(id) {
    let currentCase = cases[id-1];
    fillDescription(currentCase);
    //fillValues(currentCase);
    //fillQuestions(currentCase);
}

function fillDescription(currentCase) {
    let html = "";
    currentCase.description.forEach((item) => {
        html += `<h6 class="description">${item[0]}</h6><p class="description">${item[1]}</p>`
    })
    html += `</p>`
    document.getElementById(`description`).innerHTML = html;
}




async function readDataFiles() {
    return new Promise((resolve, reject) => {
        let promise1 = readCases();
        let promise2 = readTeachings();
        Promise.all([promise1, promise2])
            .then(() => {
                if (promise1 && promise2) {
                    log(`... Data files read`);
                    resolve(1);
                }
                else {
                    reject(0);
                }
            })
    })
}

async function readCases() {
    cases = await fetchJsonFile(`ressources/cases.json`)
}

async function readTeachings() {
    teachings = await fetchJsonFile(`ressources/teachings.json`)
}

async function fetchFile(fileName) {
    return await fetch(fileName);
}

async function fetchJsonFile(fileName) {
    return await fetchFile(fileName)
        .then((file) => file.json());
}




function log(text) {
    if (debug) {console.log(text)}
}

function test() {
    log("\n\n\n\nTests:");
    log("Testing cases for being read: ");
    log(cases[0]);
}

run();