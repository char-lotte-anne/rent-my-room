/* ===== QUIZ STATE ===== */
let currentQuestion = 0;
const totalQuestions = 8;
const answers = {};
const quizForm = document.getElementById('quizForm');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const quizSection = document.getElementById('quizSection');
const resultsSection = document.getElementById('resultsSection');
const resultCard = document.getElementById('resultCard');

/* ===== INIT ===== */
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
updateProgress();

function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
    nextBtn.textContent = currentQuestion === totalQuestions - 1 ? 'See My Results! →' : 'Next →';
}

function showQuestion(index) {
    document.querySelectorAll('.question-card').forEach(card => card.style.display = 'none');
    document.getElementById(`question-${index}`).style.display = 'block';
    updateProgress();
    document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth' });
}

function nextQuestion(e) {
    e.preventDefault();
    const qNum = currentQuestion + 1;
    const selected = document.querySelector(`input[name="q${qNum}"]:checked`);
    if (!selected) { alert('Please select an answer before continuing!'); return; }
    
    answers[`q${qNum}`] = selected.value;
    if (currentQuestion === totalQuestions - 1) { showResults(); return; }
    
    currentQuestion++;
    showQuestion(currentQuestion);
}

function prevQuestion(e) {
    e.preventDefault();
    if (currentQuestion > 0) { currentQuestion--; showQuestion(currentQuestion); }
}

/* ===== SCORING ===== */
function calculateScore() {
    const scoreValues = { 'great': 2, 'good': 1, 'okay': -1, 'bad': -2 };
    let score = Object.values(answers).reduce((sum, ans) => sum + (scoreValues[ans] || 0), 0);
    const normalized = Math.max(0, Math.min(100, ((score / (totalQuestions * 2)) * 50) + 50));
    return Math.round(normalized);
}

function getResultType() {
    const score = calculateScore();
    if (score >= 80) return 'perfect';
    if (score >= 65) return 'great';
    if (score >= 50) return 'okay';
    return 'bad';
}

function getAnalysis() {
    const concerns = [], strengths = [];
    
    if (answers.q1 === 'bad') concerns.push('Late sleep schedule might not mesh with the household (10pm-1am, 9-11am wake is the vibe)');
    else if (answers.q1 === 'okay') concerns.push('Night owl schedule could be a slight mismatch');
    else strengths.push('Your sleep schedule aligns perfectly with us');

    if (answers.q2 !== 'great') concerns.push('Partners/guests over frequently could affect shared living');
    else strengths.push('You prioritize personal space—we love that');

    if (answers.q3 === 'bad' || answers.q3 === 'okay') concerns.push('You might have more guests over than we typically do');
    else strengths.push('Your social style matches our low-key vibe');

    if (answers.q4 === 'okay' || answers.q4 === 'bad') concerns.push('Dishes are important—we do them daily in the dishwasher');
    else strengths.push('You\'re committed to keeping the kitchen fresh');

    if (answers.q5 === 'okay' || answers.q5 === 'bad') concerns.push('We use a chore rotation—consistency matters');
    else strengths.push('You\'re reliable with household responsibilities');

    if (answers.q6 !== 'great' && answers.q6 !== 'good') concerns.push('We value direct, honest communication with conflicts');
    else strengths.push('You communicate directly—exactly what we need');

    if (answers.q7 !== 'great') concerns.push('Rent reliability is non-negotiable');
    else strengths.push('You\'re financially reliable—huge plus');

    if (answers.q8 === 'bad') concerns.push('Smoking is a dealbreaker—we need smoke-free');
    else strengths.push('You respect our no-smoking policy');

    return { strengths, concerns };
}

/* ===== RESULTS ===== */
function showResults() {
    const score = calculateScore();
    const resultType = getResultType();
    const { strengths, concerns } = getAnalysis();
    let html = `<div class="result-badge ${resultType}"></div>`;

    if (resultType === 'perfect') {
        html += `<h2 class="result-title">🎉 OMG YES! This Is It!</h2>
            <p class="result-description">Your answers are basically Charlotte's. You get this vibe. This is exactly what we're looking for. Let's make this happen. 💕</p>`;
    } else if (resultType === 'great') {
        html += `<h2 class="result-title">✨ We Think You're a Great Fit!</h2>
            <p class="result-description">You're really aligned with how we live. Small differences, but core values match. Charlotte has a good feeling about you—let's talk!</p>`;
    } else if (resultType === 'okay') {
        html += `<h2 class="result-title">🤔 We Could Make This Work</h2>
            <p class="result-description">Not a perfect match, but not far off. There are differences, but we're open to a conversation. Let's see if we can find common ground.</p>`;
    } else {
        html += `<h2 class="result-title">💭 Probably Not the Best Fit</h2>
            <p class="result-description">We appreciate you taking the quiz! But our living styles are different. Charlotte was intentional about finding someone similar. We want everyone happy. Good luck! 💕</p>`;
    }

    html += `<div class="result-score-label">Compatibility Score</div><div class="result-score">${score}%</div>`;

    if (strengths.length > 0 || concerns.length > 0) {
        html += '<div class="result-details">';
        if (strengths.length > 0) {
            html += '<h3>✓ What We Love:</h3><ul>';
            strengths.forEach(s => html += `<li>${s}</li>`);
            html += '</ul>';
        }
        if (concerns.length > 0) {
            html += '<h3>⚠ Things to Discuss:</h3><ul>';
            concerns.forEach(c => html += `<li class="concern">${c}</li>`);
            html += '</ul>';
        }
        html += '</div>';
    }

    html += `
        <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid var(--border-color);">
            <h3 style="font-size: 1.1rem; margin-bottom: 20px; color: var(--text-dark);">Share Your Results:</h3>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button id="shareTextBtn" class="cta-button cta-secondary" style="background: #4CAF50; border-color: #4CAF50; color: white; border: none; cursor: pointer;">💬 Text Results</button>
                <a href="https://instagram.com/char.lotte.anne" target="_blank" class="cta-button cta-secondary" style="background: #E1306C; border-color: #E1306C; color: white;">📸 DM Results</a>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 12px; text-align: center;">Share your score and tell Charlotte about your results! 🎯</p>
        </div>
        <div style="margin-top: 30px;">
            <a href="index.html" class="cta-button" style="background-color: var(--bg-light); color: var(--primary); border: 2px solid var(--primary); display: inline-block;">← Back to Happy Valley</a>
        </div>
    `;

    resultCard.innerHTML = html;

    // Text share button
    document.getElementById('shareTextBtn').addEventListener('click', () => {
        let msg = '';
        if (resultType === 'perfect') msg = `Hey! I got a ${score}% compatibility score on your roommate quiz! 🎉 We're basically the same person!`;
        else if (resultType === 'great') msg = `Hey! I got a ${score}% compatibility score! ✨ I think we'd be a great fit!`;
        else if (resultType === 'okay') msg = `Hey! I got a ${score}% compatibility score! 🤔 Let's talk!`;
        else msg = `Hey! I got a ${score}% compatibility score! 💭 Check out my results!`;
        
        window.location.href = `sms:206-981-8327?body=${encodeURIComponent(msg)}`;
    });

    quizSection.style.display = 'none';
    resultsSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

showQuestion(0);

