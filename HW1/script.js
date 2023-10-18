const lessonsData = [ 
    {
        title: "Йога",
        time: "09:30 - 10:30",
        maxParticipants: 20,
        currentParticipants: 15
    },
    {
        title: "Пилатес",
        time: "18:45 - 19:45",
        maxParticipants: 25,
        currentParticipants: 25
    },
    {
        title: "Теннис Корт №2",
        time: "21:00 - 22:00",
        maxParticipants: 4,
        currentParticipants: 2
    },
    {
        title: "Теннис Корт №4",
        time: "21:00 - 22:00",
        maxParticipants: 2,
        currentParticipants: 1
    }
];

function renderLessons() {
    const lessonsContainer = document.getElementById('lessons');
    lessonsContainer.innerHTML = ''; 

    lessonsData.forEach((lesson, index) => {
        const lessonCard = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${lesson.title}</h5>
                    <p class="card-text">${lesson.time}</p>
                    <p class="card-text">Участники: ${lesson.currentParticipants}/${lesson.maxParticipants}</p>
                    <button class="btn btn-primary" onclick="register(${index})" ${lesson.currentParticipants >= lesson.maxParticipants ? 'disabled' : ''}>Записаться</button>
                    <button class="btn btn-danger ml-2" onclick="unregister(${index})">Отменить запись</button>
                </div>
            </div>
        `;

        lessonsContainer.innerHTML += lessonCard;
    });
}

function register(index) {
    if (lessonsData[index].currentParticipants < lessonsData[index].maxParticipants) {
        lessonsData[index].currentParticipants++;
        renderLessons();
    }
}

function unregister(index) {
    if (lessonsData[index].currentParticipants > 0) {
        lessonsData[index].currentParticipants--;
        renderLessons();
    }
}


renderLessons();
