// Quiz state
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

// Initialize
function init() {
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    updateProgress();
}

// Update progress bar and text
function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;

    // Show/hide prev button
    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';

    // Update next button text
    if (currentQuestion === totalQuestions - 1) {
        nextBtn.textContent = 'See My Results! →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Show specific question
function showQuestion(index) {
    // Hide all questions
    document.querySelectorAll('.question-card').forEach(card => {
        card.style.display = 'none';
    });

    // Show current question
    document.getElementById(`question-${index}`).style.display = 'block';
    updateProgress();

    // Scroll to top
    document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth' });
}

// Next question
function nextQuestion(e) {
    e.preventDefault();

    // Get selected answer
    const questionNumber = currentQuestion + 1;
    const selectedAnswer = document.querySelector(`input[name="q${questionNumber}"]:checked`);

    if (!selectedAnswer) {
        alert('Please select an answer before continuing!');
        return;
    }

    // Store answer
    answers[`q${questionNumber}`] = selectedAnswer.value;

    // If last question, show results
    if (currentQuestion === totalQuestions - 1) {
        showResults();
        return;
    }

    // Move to next question
    currentQuestion++;
    showQuestion(currentQuestion);
}

// Previous question
function prevQuestion(e) {
    e.preventDefault();

    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// Calculate compatibility score
function calculateScore() {
    const scoreValues = {
        'great': 2,
        'good': 1,
        'okay': -1,
        'bad': -2
    };

    let score = 0;
    let maxScore = totalQuestions * 2;

    Object.values(answers).forEach(answer => {
        score += scoreValues[answer] || 0;
    });

    // Normalize score to 0-100
    const normalizedScore = Math.max(0, Math.min(100, ((score / maxScore) * 50) + 50));
    return Math.round(normalizedScore);
}

// Determine result type
function getResultType() {
    const score = calculateScore();

    if (score >= 80) return 'perfect';
    if (score >= 65) return 'great';
    if (score >= 50) return 'okay';
    return 'bad';
}

// Get concerns or warnings
function getAnalysis() {
    const concerns = [];
    const strengths = [];

    // Check for red flags
    if (answers.q1 === 'bad') {
        concerns.push('Late sleep schedule might not mesh with the household (10pm-1am, 9-11am wake is the vibe)');
    } else if (answers.q1 === 'okay') {
        concerns.push('Night owl schedule could be a slight mismatch, but we can work with it');
    } else {
        strengths.push('Your sleep schedule aligns perfectly with the household');
    }

    if (answers.q2 !== 'great') {
        concerns.push('Partners/guests over frequently could affect shared living dynamics');
    } else {
        strengths.push('You prioritize personal space in the shared apartment—we love that');
    }

    if (answers.q3 === 'bad' || answers.q3 === 'okay') {
        concerns.push('You might have more guests over than we typically do');
    } else {
        strengths.push('Your social style matches our low-key vibe perfectly');
    }

    if (answers.q4 === 'okay' || answers.q4 === 'bad') {
        concerns.push('Dishes are important to us—we do them daily in the dishwasher');
    } else {
        strengths.push('You\'re committed to keeping the kitchen fresh daily');
    }

    if (answers.q5 === 'okay' || answers.q5 === 'bad') {
        concerns.push('We use a chore rotation system—consistency matters to us');
    } else {
        strengths.push('You\'re reliable with household responsibilities');
    }

    if (answers.q6 !== 'great' && answers.q6 !== 'good') {
        concerns.push('We value direct, honest communication when conflicts happen');
    } else {
        strengths.push('You communicate directly & honestly—exactly what we need');
    }

    if (answers.q7 !== 'great') {
        concerns.push('Rent reliability is non-negotiable in our household');
    } else {
        strengths.push('You\'re financially reliable—huge plus');
    }

    if (answers.q8 === 'bad') {
        concerns.push('Smoking is a dealbreaker for us—we need smoke-free');
    } else {
        strengths.push('You respect our no-smoking policy');
    }

    return { strengths, concerns };
}

// Show results
function showResults() {
    const score = calculateScore();
    const resultType = getResultType();
    const { strengths, concerns } = getAnalysis();

    let resultHTML = '';

    // Header
    resultHTML += `<div class="result-badge ${resultType}"></div>`;

    if (resultType === 'perfect') {
        resultHTML += `
            <h2 class="result-title">🎉 OMG YES! This Is It!</h2>
            <p class="result-description">Your answers are basically Charlotte's answers. You get this vibe. You value the same things. This is exactly what we're looking for—someone who will actually love living here the way she did. Let's make this happen immediately. 💕</p>
        `;
    } else if (resultType === 'great') {
        resultHTML += `
            <h2 class="result-title">✨ We Think You're a Great Fit!</h2>
            <p class="result-description">You're really aligned with how we live. Sure, there are a few small differences, but the core values match. That's what matters. Charlotte has a good feeling about you—let's talk!</p>
        `;
    } else if (resultType === 'okay') {
        resultHTML += `
            <h2 class="result-title">🤔 We Could Make This Work</h2>
            <p class="result-description">You're not a perfect match, but you're not far off either. There are some things about how we live that might be different from your style, but we're open to a conversation. Let's see if we can find common ground.</p>
        `;
    } else {
        resultHTML += `
            <h2 class="result-title">💭 Probably Not the Best Fit</h2>
            <p class="result-description">We appreciate you taking the quiz! But it looks like our living styles are pretty different. Charlotte was really intentional about finding someone similar to her, and from your answers, you might be happier in a different living situation. We want everyone to be genuinely happy, so being honest is more respectful. Good luck with your search! 💕</p>
        `;
    }

    // Score
    resultHTML += `
        <div class="result-score-label">Compatibility Score</div>
        <div class="result-score">${score}%</div>
    `;

    // Analysis
    if (strengths.length > 0 || concerns.length > 0) {
        resultHTML += '<div class="result-details">';

        if (strengths.length > 0) {
            resultHTML += '<h3>✓ What We Love:</h3><ul>';
            strengths.forEach(strength => {
                resultHTML += `<li>${strength}</li>`;
            });
            resultHTML += '</ul>';
        }

        if (concerns.length > 0) {
            resultHTML += '<h3>⚠ Things to Discuss:</h3><ul>';
            concerns.forEach(concern => {
                resultHTML += `<li class="concern">${concern}</li>`;
            });
            resultHTML += '</ul>';
        }

        resultHTML += '</div>';
    }

    // CTA
    if (resultType === 'perfect' || resultType === 'great' || resultType === 'okay') {
        resultHTML += `
            <div class="result-cta">
                <p style="font-size: 1rem; color: var(--text-dark); margin-bottom: 10px;">Great news—we think you could be a fit! Let's chat and see if the vibe is as good as we think. 💬</p>
                <a href="tel:206-981-8327" class="cta-button cta-primary">📱 Text/Call: 206-981-8327</a>
                <a href="https://instagram.com/char.lotte.anne" target="_blank" class="cta-button cta-secondary">📸 DM: @char.lotte.anne</a>
                <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 15px;">👈 Texting is fastest! Just say hi and tell us a little about yourself.</p>
            </div>
        `;
    } else {
        resultHTML += `
            <div class="result-cta">
                <p style="font-size: 1rem; color: var(--text-dark); margin-bottom: 20px;">If you have questions or want to chat anyway, we're totally open to it. But we want to be honest about compatibility.</p>
                <a href="tel:206-981-8327" class="cta-button cta-secondary">📱 Reach Out: 206-981-8327</a>
            </div>
        `;
    }

    resultHTML += `
        <div style="margin-top: 40px;">
            <a href="index.html" class="cta-button" style="background-color: var(--bg-light); color: var(--primary); border: 2px solid var(--primary); display: inline-block;">← Back to Happy Valley</a>
        </div>
    `;

    resultCard.innerHTML = resultHTML;

    // Show results, hide quiz
    quizSection.style.display = 'none';
    resultsSection.style.display = 'block';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Start
init();
showQuestion(0);

