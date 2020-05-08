const correctAnswered = document.querySelector(".correct-answer");
const totalAnswered = document.querySelector(".total-answered");
const percentage = document.querySelector(".percentage");
const options = document.querySelector(".options").children;
const answerTrackerContain = document.querySelector(".answers-tracker");
const questionNumbSpan = document.querySelector(".question-num-value");
const totalQuestSpan = document.querySelector(".total-question");
const question = document.querySelector(".question");
const submitFile = document.querySelector(".quiz-over");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

//set questions to display

const questions = [
    {
        quest: "Who invented JavaScript?",
        options: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich", "John Doe"],
        answer: 2
    },

    {
        quest: "Which one of these is a JavaScript package manager?",
        options: ["Node.js", "TypeScript", "npm", "pip"],
        answer: 2
    },

    {
        quest: "Which tag should be use for JavaScript in an HTML page?",
        options: ["link", "source", "Script", "script"],
        answer: 3
    },
    
    {
        quest: 'How to write an IF statement in JavaScript?',
        options: ['if i == 5 then', 'if (i == 5)', 'if i = 5', 'all the above'],
        answer: 0
    },

    {
        quest: 'Which attribute to link external css file to HTML?',
        options: ['link', 'src', 'div', 'href'],
        answer: 3
    }
    ]

//Allocate answers to each question

    totalQuestSpan.innerHTML = questions.length;
    function load(){
        questionNumbSpan.innerHTML = index + 1;
        question.innerHTML = questions[questionIndex].quest;
        op1.innerHTML = questions[questionIndex].options[0];
        op2.innerHTML = questions[questionIndex].options[1];
        op3.innerHTML = questions[questionIndex].options[2];
        op4.innerHTML = questions[questionIndex].options[3];
        index++;
    }

//Validate answer

    function check(element){
        if(element.id == questions[questionIndex].answer){
            element.classList.add("correct");
            updateAnswerTracker("correct");
            score++;
            console.log("score: " +score)

        }
        else{
            element.classList.add("wrong");
            updateAnswerTracker("wrong")
        }
        disabledOptions()
    }

//Disable user from reselecting

    function disabledOptions(){
        for(let i=0; i<options.length; i++){
            options[i].classList.add("disabled");
            if(options[i].id == questions[questionIndex].answer){
                options[i].classList.add("correct");
            }
        }
    }


    function enabledOptions(){
        for(let i=0; i<options.length; i++){
            options[i].classList.remove("disabled", "correct", "wrong");
        }
    }


    function validate(){
        if(!options[0].classList.contains("disabled")){
            alert("Please Select an Option")
        }
        else{
            enabledOptions();
            randomQuestion();
        }
    }


function next(){
    validate();
}

//prompt random question and break from displaying loop of duplicate questions

function randomQuestion(){
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDuplicate = 0;
        if(index==questions.length){
            quizOver();
        }
        else{
            if(myArray.length>0){
                for(let i=0; i<myArray.length; i++){
                    if(myArray[i]==randomNumber){
                        hitDuplicate=1;
                        break;
                    }
                }
                if(hitDuplicate==1){
                    randomQuestion();
                }
                else{
                    questionIndex = randomNumber;
                    load();
                    myArr.push(questionIndex);
                }
            }
            if(myArray.length==0){
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex);
            }
        
        myArray.push(randomNumber);       
        
        }
    }

function answerTracker(){
    for(let i=0; i < questions.length; i++){
        const div = document.createElement("div")
            answerTrackerContain.appendChild(div);
    }
}

function updateAnswerTracker(classNam){
    answerTrackerContain.children[index-1].classList.add(classNam);
}



function quizOver(){
    submitFile.classList.add("show");
    correctAnswered.innerHTML = score;
    totalAnswered.innerHTML = questions.length;
    percentage.innerHTML = (score/questions.length)*100 + "%";
}

function tryAgain(){
    window.location.reload();
}

window.onload = function(){
    randomQuestion();
    answerTracker()
}