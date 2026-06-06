let chapters = JSON.parse(localStorage.getItem("chapters")) || [];

function addChapter(){

    let subject = document.getElementById("subject").value;
    let chapter = document.getElementById("chapter").value;
    let completionDate = document.getElementById("completionDate").value;
    let selfRevisionDate = document.getElementById("selfRevisionDate").value;

    if(!subject || !chapter || !completionDate || !selfRevisionDate){
        alert("Fill all fields");
        return;
    }

    let revisions = generateRevisionPlan(selfRevisionDate);

    let chapterData = {
        subject,
        chapter,
        completionDate,
        selfRevisionDate,
        revisions
    };

    chapters.push(chapterData);

    localStorage.setItem("chapters", JSON.stringify(chapters));

    displayChapters();
}

function generateRevisionPlan(startDate){

    let revisions = [];

    let date = new Date(startDate);

    let septemberEnd = new Date(date.getFullYear(),8,30);

    while(date <= septemberEnd){

        date.setDate(date.getDate()+14);

        let saturday = getNextSaturday(new Date(date));

        revisions.push(formatDate(saturday));

        date = saturday;
    }

    let current = new Date(septemberEnd);

    while(current.getMonth() < 11){

        current.setMonth(current.getMonth()+2);

        revisions.push(formatDate(current));
    }

    return revisions;
}

function getNextSaturday(date){

    let day = date.getDay();

    let diff = (6 - day + 7) % 7;

    date.setDate(date.getDate() + diff);

    return date;
}

function formatDate(date){

    return date.toISOString().split('T')[0];
}

function displayChapters(){

    let list = document.getElementById("chapterList");

    list.innerHTML = "";

    chapters.forEach(chap=>{

        let revisionsHTML = "";

        chap.revisions.forEach(r=>{

            revisionsHTML +=
            `<li class="revision-date">${r}</li>`;
        });

        list.innerHTML += `

        <div class="chapter-card">

            <h3>${chap.subject}</h3>

            <h4>${chap.chapter}</h4>

            <p>
            Completed: ${chap.completionDate}
            </p>

            <p>
            Self Revision: ${chap.selfRevisionDate}
            </p>

            <strong>Revision Schedule</strong>

            <ul>
                ${revisionsHTML}
            </ul>

        </div>

        `;
    });
}

displayChapters();