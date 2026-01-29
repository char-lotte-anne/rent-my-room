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
    
    let imageSrc = 'images/quiz-images/bad-quiz-result.jpg';
    if (resultType === 'perfect' || resultType === 'great') {
        imageSrc = 'images/quiz-images/good-quiz-result.jpg';
    } else if (resultType === 'okay') {
        imageSrc = 'images/quiz-images/okay-quiz-result.jpg';
    }

    // Clear result card
    resultCard.innerHTML = '';

    // Create image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Quiz result';
    img.className = `result-badge ${resultType}`;
    console.log('Creating image with src:', imageSrc);
    img.onerror = function() { console.error('Image failed to load:', imageSrc); };
    img.onload = function() { console.log('Image loaded successfully:', imageSrc); };
    resultCard.appendChild(img);

    // Create title and description
    let titleText = '', descText = '';
    if (resultType === 'perfect') {
        titleText = '🎉 OMG YES! This Is It!';
        descText = 'Your answers are basically Charlotte\'s. You get this vibe. This is exactly what we\'re looking for. Let\'s make this happen. 💕';
    } else if (resultType === 'great') {
        titleText = '✨ We Think You\'re a Great Fit!';
        descText = 'You\'re really aligned with how we live. Small differences, but core values match. We have a good feeling about you—let\'s talk!';
    } else if (resultType === 'okay') {
        titleText = '🤔 We Could Make This Work';
        descText = 'Not a perfect match, but not far off. There are differences, but we\'re open to a conversation. Let\'s see if we can find common ground.';
    } else {
        titleText = '💭 Probably Not the Best Fit';
        descText = 'We appreciate you taking the quiz! But our living styles are different. We are intentional about finding someone similar. We want everyone happy. Good luck! 💕';
    }

    const title = document.createElement('h2');
    title.className = 'result-title';
    title.textContent = titleText;
    resultCard.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'result-description';
    desc.textContent = descText;
    resultCard.appendChild(desc);

    // Score
    const scoreLabel = document.createElement('div');
    scoreLabel.className = 'result-score-label';
    scoreLabel.textContent = 'Compatibility Score';
    resultCard.appendChild(scoreLabel);

    const scoreValue = document.createElement('div');
    scoreValue.className = 'result-score';
    scoreValue.textContent = score + '%';
    resultCard.appendChild(scoreValue);

    // Details
    if (strengths.length > 0 || concerns.length > 0) {
        const details = document.createElement('div');
        details.className = 'result-details';

        if (strengths.length > 0) {
            const strengthsHeader = document.createElement('h3');
            strengthsHeader.textContent = '✓ What We Love:';
            details.appendChild(strengthsHeader);

            const strengthsList = document.createElement('ul');
            strengths.forEach(s => {
                const li = document.createElement('li');
                li.textContent = s;
                strengthsList.appendChild(li);
            });
            details.appendChild(strengthsList);
        }

        if (concerns.length > 0) {
            const concernsHeader = document.createElement('h3');
            concernsHeader.textContent = '⚠ Things to Discuss:';
            details.appendChild(concernsHeader);

            const concernsList = document.createElement('ul');
            const topConcerns = concerns.slice(0, 3);
            topConcerns.forEach(c => {
                const li = document.createElement('li');
                li.className = 'concern';
                li.textContent = c;
                concernsList.appendChild(li);
            });
            details.appendChild(concernsList);
        }

        resultCard.appendChild(details);
    }

    // Share section
    const shareDiv = document.createElement('div');
    shareDiv.style.marginTop = '40px';
    shareDiv.style.paddingTop = '30px';
    shareDiv.style.borderTop = '2px solid var(--border-color)';

    const shareTitle = document.createElement('h3');
    shareTitle.style.fontSize = '1.1rem';
    shareTitle.style.marginBottom = '20px';
    shareTitle.style.color = 'var(--text-dark)';
    shareTitle.textContent = 'Share Your Results:';
    shareDiv.appendChild(shareTitle);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '15px';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.flexWrap = 'wrap';

    const textBtn = document.createElement('button');
    textBtn.id = 'shareTextBtn';
    textBtn.className = 'cta-button cta-secondary';
    textBtn.style.background = '#4CAF50';
    textBtn.style.borderColor = '#4CAF50';
    textBtn.style.color = 'white';
    textBtn.style.border = 'none';
    textBtn.style.cursor = 'pointer';
    textBtn.textContent = '💬 Text Results';

    const dmLink = document.createElement('a');
    dmLink.href = 'https://instagram.com/char.lotte.anne';
    dmLink.target = '_blank';
    dmLink.className = 'cta-button cta-secondary';
    dmLink.style.background = '#E1306C';
    dmLink.style.borderColor = '#E1306C';
    dmLink.style.color = 'white';
    dmLink.textContent = '📸 DM Results';

    buttonContainer.appendChild(textBtn);
    buttonContainer.appendChild(dmLink);
    shareDiv.appendChild(buttonContainer);

    const shareNote = document.createElement('p');
    shareNote.style.fontSize = '0.85rem';
    shareNote.style.color = 'var(--text-light)';
    shareNote.style.marginTop = '12px';
    shareNote.style.textAlign = 'center';
    shareNote.textContent = 'Share your score and tell Charlotte about your results! 🎯';
    shareDiv.appendChild(shareNote);

    resultCard.appendChild(shareDiv);

    // Back button
    const backDiv = document.createElement('div');
    backDiv.style.marginTop = '30px';

    const backLink = document.createElement('a');
    backLink.href = 'index.html';
    backLink.className = 'cta-button';
    backLink.style.backgroundColor = 'var(--bg-light)';
    backLink.style.color = 'var(--primary)';
    backLink.style.border = '2px solid var(--primary)';
    backLink.style.display = 'inline-block';
    backLink.textContent = '← Back to Happy Valley';

    backDiv.appendChild(backLink);
    resultCard.appendChild(backDiv);

    // Text share button event
    textBtn.addEventListener('click', () => {
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

//public