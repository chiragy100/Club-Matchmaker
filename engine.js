const clubs = [
    { name: "PRHS Computer Science Club", interest: ["A"], engagement: ["A"], commitment: 4, aim: ["A"], cost: 0, why: ["D"], environment: ["B", "D"], responsibility: "B", size: ["A"] },
    { name: "National English Honors Society", interest: ["E"], engagement: ["D"], commitment: 2, aim: ["E"], cost: 0, why: ["A", "C"], environment: ["B", "D"], responsibility: "B", size: ["A"] },
    { name: "Philosophy Club", interest: ["E"], engagement: ["D"], commitment: 3, aim: ["E"], cost: 0, why: ["A", "C"], environment: ["C", "D"], responsibility: "B", size: ["A"] },
    { name: "National Honor Society", interest: ["E"], engagement: ["E"], commitment: 2, aim: ["D"], cost: 60, why: ["B"], environment: ["B"], responsibility: "D", size: ["C"] },
    { name: "Mu Alpha Theta", interest: ["E"], engagement: ["D"], commitment: 4, aim: ["D"], cost: 10, why: ["B"], environment: ["B"], responsibility: "B", size: ["B"] },
    { name: "Yearbook", interest: ["C", "B"], engagement: ["C"], commitment: 5, aim: ["E", "C"], cost: 25, why: ["B", "D"], environment: ["A"], responsibility: "D", size: ["B"] },
    { name: "French Club", interest: ["G"], engagement: ["D"], commitment: 1, aim: ["B"], cost: 0, why: ["A"], environment: ["C"], responsibility: "B", size: ["A"] },
    { name: "Key Club", interest: ["D"], engagement: ["E"], commitment: 2, aim: ["D"], cost: 20, why: ["C"], environment: ["B"], responsibility: "D", size: ["B"] },
    { name: "Disc Golf Club", interest: ["F"], engagement: ["B"], commitment: 3, aim: ["B"], cost: 0, why: ["C"], environment: ["C"], responsibility: "B", size: ["A"] },
    { name: "Robotics Club", interest: ["A"], engagement: ["A"], commitment: 4, aim: ["C"], cost: 35, why: ["D"], environment: ["A"], responsibility: "B", size: ["A"] },
    { name: "Make A Wish", interest: ["D"], engagement: ["D"], commitment: 1, aim: ["D"], cost: 0, why: ["A"], environment: ["C"], responsibility: "B", size: ["B"] }
];

const questions = [
    { text: "Which area most reflects what you genuinely enjoy?", key: "interest", options: [
        { text: "Engineering / Tech", val: "A" }, { text: "Business / Leadership", val: "B" },
        { text: "Creative Arts / Media", val: "C" }, { text: "Service / Community Impact", val: "D" },
        { text: "Academic Excellence", val: "E" }, { text: "Sports / Physical", val: "F" },
        { text: "Culture / Community", val: "G" }
    ]},
    { text: "How do you prefer to engage?", key: "engagement", options: [
        { text: "Build Physical/Technical Things", val: "A" }, { text: "Compete in Structured Events", val: "B" },
        { text: "Create Media or Artistic Work", val: "C" }, { text: "Discuss Ideas & Explore Topics", val: "D" },
        { text: "Organize & Lead Initiatives", val: "E" }
    ]},
    { text: "What level of structured commitment can you handle?", key: "commitment", options: [
        { text: "Level 1 – Very low (Casual)", val: 1 }, { text: "Level 2 – Monthly", val: 2 },
        { text: "Level 3 – Weekly", val: 3 }, { text: "Level 4 – Regular + Prep", val: 4 },
        { text: "Level 5 – Major time investment", val: 5 }
    ]},
    { text: "What do you want most from a club?", key: "aim", options: [
        { text: "Build technical skills", val: "A" }, { text: "Make close friends", val: "B" },
        { text: "Compete and win", val: "C" }, { text: "Serve the community", val: "D" },
        { text: "Express creativity", val: "E" }
    ]},
    { text: "What cost level are you comfortable with?", key: "cost", options: [
        { text: "Free only", val: 0 }, { text: "Up to $29", val: 29 },
        { text: "Up to $49", val: 49 }, { text: "$50 or more", val: 999 },
        { text: "No preference", val: 1000 }
    ]},
    { text: "Why are you joining a club this year?", key: "why", options: [
        { text: "Low stress / Just for fun", val: "A" }, { text: "Challenge myself", val: "B" },
        { text: "Meet new people", val: "C" }, { text: "Build an impressive resume", val: "D" }
    ]},
    { text: "Which environment feels better?", key: "environment", options: [
        { text: "Highly competitive", val: "A" }, { text: "Structured but chill", val: "B" },
        { text: "Fully casual", val: "C" }, { text: "Doesn't matter", val: "D" }
    ]},
    { text: "Are you comfortable with responsibility outside meetings?", key: "responsibility", options: [
        { text: "Just participating", val: "A" }, { text: "Helping when needed", val: "B" },
        { text: "Hope to lead eventually", val: "C" }, { text: "Want to lead right now", val: "D" }
    ]},
    { text: "What size group do you prefer?", key: "size", options: [
        { text: "Small / Tight-knit (1-10)", val: "A" }, { text: "Medium (11-30)", val: "B" },
        { text: "Large / High-energy (31+)", val: "C" }, { text: "Doesn't matter", val: "D" }
    ]}
];

let currentStep = 0;
let userAnswers = {};

function showQuestion() {
    const q = questions[currentStep];
    const progress = ((currentStep) / questions.length) * 100;
    
    document.getElementById("progressBar").style.width = `${progress}%`;
    document.getElementById("q-number").innerText = `Question ${currentStep + 1} of ${questions.length}`;
    document.getElementById("q-percent").innerText = `${Math.round(progress)}%`;
    document.getElementById("q-text").innerText = q.text;

    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt.text;
        btn.onclick = () => handleAnswer(opt.val);
        container.appendChild(btn);
    });
}

function handleAnswer(val) {
    userAnswers[questions[currentStep].key] = val;
    currentStep++;
    if (currentStep < questions.length) {
        showQuestion();
    } else {
        calculateResults();
    }
}

function calculateResults() {
    clubs.forEach(club => {
        club.score = 0;
        if (club.interest.includes(userAnswers.interest)) club.score += 100;
        if (club.engagement.includes(userAnswers.engagement)) club.score += 100;
        if (club.commitment <= userAnswers.commitment) club.score += 100;
        if (club.aim.includes(userAnswers.aim)) club.score += 100;
        if (club.cost <= userAnswers.cost) club.score += 100;
        if (club.why.includes(userAnswers.why)) club.score += 100;
        if (userAnswers.environment === "D" || club.environment.includes(userAnswers.environment)) club.score += 100;
        
        // Responsibility Weight Logic
        if (userAnswers.responsibility === "D" && club.responsibility === "D") club.score += 50;
        else if (userAnswers.responsibility !== "D" && club.responsibility === "B") club.score += 50;

        if (userAnswers.size === "D" || club.size.includes(userAnswers.size)) club.score += 50;
    });

    clubs.sort((a, b) => b.score - a.score);
    displayResults();
}

function displayResults() {
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("q-number").classList.add("hidden");
    document.getElementById("progressBar").style.width = "100%";
    
    const resultsScreen = document.getElementById("results-screen");
    resultsScreen.classList.remove("hidden");
    
    const list = document.getElementById("rankings-list");
    list.innerHTML = ""; // Clear list

    clubs.slice(0, 3).forEach((club, index) => {
        const div = document.createElement("div");
        div.className = "match-card";
        div.innerHTML = `
            <div class="match-info">
                <small>Match #${index + 1}</small>
                <div class="match-name">${club.name}</div>
            </div>
            <div class="match-score">${club.score}</div>
        `;
        list.appendChild(div);
    });
}

showQuestion();