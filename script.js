
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Handle page navigation
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Close mobile menu
        navMenu.classList.remove('active');
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Add click event listeners to buttons with data-page attribute
    document.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-page')) {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            showPage(pageId);
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Survey functionality
    let currentQuestion = 1;
    const totalQuestions = 3;
    const surveyData = {};

    // Handle question navigation
    function showQuestion(questionNumber) {
        document.querySelectorAll('.question-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const currentCard = document.getElementById(`question-${questionNumber}`);
        if (currentCard) {
            setTimeout(() => {
                currentCard.classList.add('active');
            }, 100);
        }
    }

    // Enable/disable next buttons based on selection
    function updateNextButton(questionNumber) {
        const currentCard = document.getElementById(`question-${questionNumber}`);
        const nextButton = currentCard.querySelector('.next-question');
        const inputs = currentCard.querySelectorAll('input[type="radio"]');
        
        let hasSelection = false;
        inputs.forEach(input => {
            if (input.checked) {
                hasSelection = true;
            }
        });
        
        if (nextButton) {
            nextButton.disabled = !hasSelection;
        }
    }

    // Handle radio button changes
    document.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const questionNumber = e.target.closest('.question-card').id.split('-')[1];
            updateNextButton(parseInt(questionNumber));
            surveyData[e.target.name] = e.target.value;
        }
        
        if (e.target.type === 'checkbox') {
            const name = e.target.name;
            if (!surveyData[name]) {
                surveyData[name] = [];
            }
            
            if (e.target.checked) {
                surveyData[name].push(e.target.value);
            } else {
                const index = surveyData[name].indexOf(e.target.value);
                if (index > -1) {
                    surveyData[name].splice(index, 1);
                }
            }
        }
    });

    // Handle next question buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('next-question')) {
            currentQuestion++;
            if (currentQuestion <= totalQuestions) {
                showQuestion(currentQuestion);
            }
        }
        
        if (e.target.id === 'finish-survey') {
            finishSurvey();
        }
    });

    function finishSurvey() {
        const visibility = surveyData.visibility;
        const launch = surveyData.launch;
        const improvements = surveyData.improvements || [];
        
        // Generate personalized response
        let response = generateSurveyResponse(visibility, launch, improvements);
        
        // Show result
        const resultText = document.getElementById('result-text');
        const surveyForm = document.querySelector('.survey-form');
        const surveyResult = document.getElementById('survey-result');
        
        resultText.textContent = response;
        surveyForm.style.display = 'none';
        surveyResult.style.display = 'block';
    }

    function generateSurveyResponse(visibility, launch, improvements) {
        let response = 'בהתבסס על התשובות שלכם, ';
        
        if (visibility === 'no') {
            response += 'אני רואה שיש הזדמנות משמעותית לשפר את הנראות התקשורתית שלכם. ';
        } else if (visibility === 'partial') {
            response += 'נפלא שאתם מודעים לצורך בשיפור - זה הצעד הראשון! ';
        } else {
            response += 'זה נהדר שאתם מרוצים מהמצב הנוכחי, תמיד יש מקום להעמקה. ';
        }

        if (launch === 'immediate') {
            response += 'הפרויקט הקרוב שלכם הוא הזדמנות מושלמת לחשיפה תקשורתית אפקטיבית. ';
        } else if (launch === 'future') {
            response += 'התכנון המוקדם לפרויקט העתידי יאפשר לנו לבנות אסטרטגיה מקיפה. ';
        }

        if (improvements && improvements.length > 0) {
            response += 'התחומים שציינתם לשיפור הם בדיוק המומחיות שלי. ';
        }

        response += 'אשמח לפגוש אתכם לשיחה אישית ולהציג איך אני יכולה לעזור לכם להגיע ליעדים שלכם.';

        return response;
    }

    // Smooth scrolling for better UX
    function smoothTransition() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    // Add loading animation to buttons
    function addButtonLoading(button) {
        const originalText = button.textContent;
        button.textContent = 'טוען...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    }

    // Enhanced button interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize the application
    console.log('יפעת יחסי ציבור - האתר נטען בהצלחה');
});
