var array_questions = [
    {q: 'Who was Barack obama',
    r1: 'President of usa',
    r2: 'President of Brazil',
    r3: 'Nothing',
    r4: 'Dont know',
    answer: 'r1'},
    {q: 'Whos the current president of usa',
    r1: 'Donald Trump',
    r2: 'Joe Biden',
    r3: 'Hilary Clinton',
    r4: 'God',
    answer: 'r1'},
    {q: 'what is the biggest country in the world',
    r1: 'Brazil',
    r2: 'China',
    r3: 'United states of America',
    r4: 'Russia',
    answer: 'r1'}
]

var all_labels = document.querySelectorAll('label');
var question = document.querySelector('h3');
var div_all = document.querySelector('.quiz-pad')

var Correct_questions = 0;

function Act_current(next_one){
    if(next_one < array_questions.length){
        question.textContent = array_questions[next_one].q;

        all_labels[0].textContent = array_questions[next_one].r1;
        all_labels[1].textContent = array_questions[next_one].r2;
        all_labels[2].textContent = array_questions[next_one].r3;
        all_labels[3].textContent = array_questions[next_one].r4;
    }
}

function Submit_final(next_one){
    if(next_one == array_questions.length - 1){
        document.querySelector('.quiz button').textContent = 'Submit';
    }
}

function Finished(next_one){
    div_all.innerHTML = "Quantidade de acertos: " + parseInt(Correct_questions/next_one * 100) + "%";
    document.querySelector('.quiz').removeChild(document.querySelector('button'));
}

function Submit(Current_question){
    var check = false;
    var remain_i;
    Submit_final(Current_question)
    for(var i=0;i<document.querySelectorAll('input').length;i++){
        if(document.querySelectorAll('input')[i].checked){
            check = true;
            remain_i = i;
        }
    }
    if(check){
        console.log(array_questions[Current_question].answer);
        if(document.querySelectorAll('input')[remain_i].id == array_questions[Current_question].answer){
            Correct_questions++;
        }
        Act_current(Current_question++);
    }
}

var current = 0;

function Add_event(){
    document.querySelector('.botao').addEventListener('click',function(){
        if(current < array_questions.length){
            Submit(current);
            current++;
        }
        else{
            Finished(current);
        }
    })
}

Act_current(current);

Add_event();