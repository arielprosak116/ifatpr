
import React, { useState, useEffect } from 'react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [surveyData, setSurveyData] = useState<any>({});
  const [showSurveyResult, setShowSurveyResult] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showPage = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  const showQuestion = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
  };

  const updateNextButton = (questionNumber: number) => {
    // This will be handled by React state
  };

  const handleRadioChange = (name: string, value: string) => {
    setSurveyData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setSurveyData(prev => {
      const current = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...current, value] };
      } else {
        return { ...prev, [name]: current.filter((item: string) => item !== value) };
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const finishSurvey = () => {
    setShowSurveyResult(true);
  };

  const generateSurveyResponse = (visibility: string, launch: string, improvements: string[]) => {
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
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'Heebo, sans-serif' }}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <div>
            <h2 className="text-xl font-semibold text-blue-700">יפעת יחסי ציבור</h2>
          </div>
          <ul className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 right-0 left-0 bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 gap-4 md:gap-8`}>
            <li>
              <button 
                onClick={() => showPage('home')} 
                className={`${currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'} px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors`}
              >
                בית
              </button>
            </li>
            <li>
              <button 
                onClick={() => showPage('contact')} 
                className={`${currentPage === 'contact' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'} px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors`}
              >
                יצירת קשר
              </button>
            </li>
            <li>
              <button 
                onClick={() => showPage('articles')} 
                className={`${currentPage === 'articles' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'} px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors`}
              >
                מאמרים ולקוחות
              </button>
            </li>
            <li>
              <button 
                onClick={() => showPage('survey')} 
                className={`${currentPage === 'survey' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'} px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors`}
              >
                סקר ללקוחות
              </button>
            </li>
          </ul>
          <button 
            className="md:hidden flex flex-col gap-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-blue-700"></span>
            <span className="w-6 h-0.5 bg-blue-700"></span>
            <span className="w-6 h-0.5 bg-blue-700"></span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Home Page */}
        {currentPage === 'home' && (
          <section>
            <div className="grid md:grid-cols-2 items-center min-h-[80vh] px-4 md:px-8 bg-gradient-to-br from-blue-50 to-green-50">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
                  יחסי ציבור לחברות, לאדריכלים ולמעצבים
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  מתמחה בשירותי יחסי ציבור עבור אדריכלים, מעצבים ויוצרים. 
                  עם שנות נסיון רבות ובגישה אישית ובוטיק, אני עוזרת לכם לבנות נוכחות תקשורתית חזקה ומשמעותית.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button 
                    onClick={() => showPage('contact')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    בואו נתחיל
                  </button>
                  <button 
                    onClick={() => showPage('survey')}
                    className="bg-white text-blue-600 border-2 border-blue-100 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    סקר מהיר
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative w-72 h-72">
                  <img 
                    src="/lovable-uploads/1e7bf383-376a-4457-8cb0-5a458e6bcb96.png" 
                    alt="יפעת - מומחית יחסי ציבור" 
                    className="w-48 h-48 rounded-full object-cover absolute top-12 left-12 z-10 shadow-xl border-4 border-white"
                  />
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl animate-pulse"></div>
                  <div className="absolute bottom-12 left-12 w-24 h-24 bg-gradient-to-br from-green-200 to-green-300 rounded-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-24 left-0 w-20 h-20 bg-gradient-to-br from-pink-200 to-pink-300 rounded-3xl animate-pulse delay-2000"></div>
                </div>
              </div>
            </div>

            <section className="py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-slate-800 mb-12">מה אני מציעה</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-blue-500 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">יחסי ציבור לאדריכלים</h3>
                    <p className="text-gray-600">בניית תדמית מקצועית, קידום פרויקטים וחשיפה תקשורתית יעילה</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-green-500 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">יחסי ציבור למעצבים</h3>
                    <p className="text-gray-600">הצגת עבודות, בניית מותג אישי וקשרים עם תקשורת מתמחה</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-purple-500 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">ייעוץ אסטרטגי</h3>
                    <p className="text-gray-600">תכנון מסרים, זיהוי קהלי יעד וחשיבה אסטרטגית לטווח ארוך</p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">יצירת קשר</h1>
              <p className="text-xl text-gray-600 mb-12">אשמח לשמוע מכם ולעזור לכם לקדם את העסק שלכם</p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl">
                  <span className="text-3xl">📱</span>
                  <div className="text-right">
                    <h3 className="font-semibold text-slate-800 mb-1">טלפון</h3>
                    <p className="text-blue-600 font-medium text-lg">054-3116641</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl">
                  <span className="text-3xl">✉️</span>
                  <div className="text-right">
                    <h3 className="font-semibold text-slate-800 mb-1">אימייל</h3>
                    <p className="text-blue-600 font-medium text-lg">ifatpr@zahav.net.il</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles & Clients Page */}
        {currentPage === 'articles' && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl font-bold text-center text-slate-800 mb-16">מאמרים ולקוחות</h1>
              
              <section className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">מאמרים נבחרים</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <article className="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-green-600 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 leading-tight">איך לבנות נוכחות תקשורתית יעילה לסטודיו אדריכלות</h3>
                    <p className="text-gray-600 mb-3">מדריך מקיף לאדריכלים על בניית תדמית מקצועית ברשתות החברתיות ובתקשורת</p>
                    <span className="text-green-600 font-medium text-sm">מרץ 2024</span>
                  </article>
                  <article className="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-green-600 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 leading-tight">עיצוב פנים בעידן הדיגיטלי - הזדמנויות תקשורתיות</h3>
                    <p className="text-gray-600 mb-3">כיצד מעצבי פנים יכולים לנצל את הפלטפורמות הדיגיטליות לחשיפה מקצועית</p>
                    <span className="text-green-600 font-medium text-sm">פברואר 2024</span>
                  </article>
                  <article className="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-green-600 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 leading-tight">מהמחשב למגזין - סיפור הצלחה של פרויקט אדריכלות</h3>
                    <p className="text-gray-600 mb-3">תהליך השיווק התקשורתי של פרויקט אדריכלות מובל ועד לפרסום במגזינים מקצועיים</p>
                    <span className="text-green-600 font-medium text-sm">ינואר 2024</span>
                  </article>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">לקוחות שעבדתי איתם</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🏢</div>
                    <h3 className="font-semibold text-slate-800 mb-1">סמל מטבחים</h3>
                    <p className="text-gray-600 text-sm">חברת מטבחים מובילה</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🏗️</div>
                    <h3 className="font-semibold text-slate-800 mb-1">יפתח בן צבי</h3>
                    <p className="text-gray-600 text-sm">אדריכל ומעצב</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🏛️</div>
                    <h3 className="font-semibold text-slate-800 mb-1">סטודיו ארן אדריכלות</h3>
                    <p className="text-gray-600 text-sm">פרויקטים מגורים יוקרתיים</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🎨</div>
                    <h3 className="font-semibold text-slate-800 mb-1">מורן עיצובים</h3>
                    <p className="text-gray-600 text-sm">עיצוב פנים ומסחרי</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🏢</div>
                    <h3 className="font-semibold text-slate-800 mb-1">גולדשטיין ושות' אדריכלים</h3>
                    <p className="text-gray-600 text-sm">פרויקטים ציבוריים ומשרדיים</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🌿</div>
                    <h3 className="font-semibold text-slate-800 mb-1">סטודיו נוף</h3>
                    <p className="text-gray-600 text-sm">אדריכלות נוף וגינון</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🎯</div>
                    <h3 className="font-semibold text-slate-800 mb-1">כהן דיזיין</h3>
                    <p className="text-gray-600 text-sm">עיצוב גרפי ומיתוג</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl text-center border-2 border-dashed border-orange-300 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">📦</div>
                    <h3 className="font-semibold text-slate-800 mb-1">ועוד הרבה אחרות</h3>
                    <p className="text-gray-600 text-sm">לקוחות נוספים רבים</p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}

        {/* Survey Page */}
        {currentPage === 'survey' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl font-bold text-center text-slate-800 mb-4">סקר ללקוחות עתידיים</h1>
              <p className="text-xl text-gray-600 text-center mb-12">הסקר הקצר הזה יעזור לנו להבין את הצרכים התקשורתיים שלכם</p>
              
              {!showSurveyResult && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  {/* Question 1 */}
                  {currentQuestion === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-6">האם אתם מרגישים שיש לעסק שלכם נראות תקשורתית מספקת?</h3>
                      <div className="space-y-4">
                        {[
                          { value: 'yes', label: 'כן, אני מרוצה מהנראות הנוכחית' },
                          { value: 'partial', label: 'חלקית, יש מקום לשיפור' },
                          { value: 'no', label: 'לא, אני צריך עזרה בתחום הזה' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <input
                              type="radio"
                              name="visibility"
                              value={option.value}
                              onChange={(e) => handleRadioChange('visibility', e.target.value)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <button
                        onClick={nextQuestion}
                        disabled={!surveyData.visibility}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                      >
                        הבא
                      </button>
                    </div>
                  )}

                  {/* Question 2 */}
                  {currentQuestion === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-6">האם יש לכם צורך ביחסי ציבור לקראת השקה או פרויקט חדש?</h3>
                      <div className="space-y-4">
                        {[
                          { value: 'immediate', label: 'כן, יש לי פרויקט קרוב' },
                          { value: 'future', label: 'כן, בתכנון לעתיד הקרוב' },
                          { value: 'no', label: 'לא בשלב הזה' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <input
                              type="radio"
                              name="launch"
                              value={option.value}
                              onChange={(e) => handleRadioChange('launch', e.target.value)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <button
                        onClick={nextQuestion}
                        disabled={!surveyData.launch}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                      >
                        הבא
                      </button>
                    </div>
                  )}

                  {/* Question 3 */}
                  {currentQuestion === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-6">מה הייתם הכי רוצים לשפר בתדמית שלכם?</h3>
                      <div className="space-y-4">
                        {[
                          { value: 'social', label: 'נוכחות ברשתות חברתיות' },
                          { value: 'media', label: 'חשיפה תקשורתית' },
                          { value: 'professional', label: 'מיצוב מקצועי' },
                          { value: 'clients', label: 'המשכת לקוחות חדשים' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <input
                              type="checkbox"
                              name="improvements"
                              value={option.value}
                              onChange={(e) => handleCheckboxChange('improvements', e.target.value, e.target.checked)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      <button
                        onClick={finishSurvey}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        סיים סקר
                      </button>
                    </div>
                  )}
                </div>
              )}

              {showSurveyResult && (
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">תודה על המענה!</h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {generateSurveyResponse(surveyData.visibility, surveyData.launch, surveyData.improvements)}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                      <span className="text-2xl">📱</span>
                      <div className="text-right">
                        <h3 className="font-semibold text-slate-800 mb-1">טלפון</h3>
                        <p className="text-blue-600 font-medium">054-3116641</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                      <span className="text-2xl">✉️</span>
                      <div className="text-right">
                        <h3 className="font-semibold text-slate-800 mb-1">אימייל</h3>
                        <p className="text-blue-600 font-medium">ifatpr@zahav.net.il</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white text-center py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-2">&copy; 2024 יפעת יחסי ציבור. כל הזכויות שמורות.</p>
          <p className="text-gray-300">שירותי יחסי ציבור מקצועיים לחברות, אדריכלים ומעצבים</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
