var  hebMonth = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר"
];

var currentMonth;
var currentYear;
var calender = $('#calender');
var container = calender.find('.container');
var monthTitle = calender.find('.title');
var templateDay = calender.find('.template').clone();
var todayDate = new Date();
var noteWindow = $('#note_window');
var addNoteButton = noteWindow.find('.add_note');
var targetDay = 0;
var notes = new NoteStorage();



$(document).ready(function(){
    initCalender();
    initNoteWindow();
    drawCalender();
});


function initCalender(){
    calender.find('.template').remove();
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();

}

function initNoteWindow(){
    noteWindow.find(".close").click(function(){
        $(noteWindow).fadeOut(200);
    });

    noteWindow.find(".add_note").click(function(){
        var date = noteWindow.find('.title').text();
        var content = noteWindow.find(".note").val();
        notes.addNote(new Note(date,content));
        date = date.split('/');
        var note = container.find('#day_'+date[0]).find(".note");
        note.append('<img class = "img_note">');
        noteWindow.fadeOut(200);


    })
}

function drawCalender(){
    container.empty();
    monthTitle.text(currentYear+" "+hebMonth[currentMonth]);
    var numberOfDays = getNumberOfDaysInMonth(currentYear,currentMonth+1);

    for(var i = 1; i <= numberOfDays; i++){
        if(isTodayOfToday(currentYear,currentMonth,i)){
            createCurrentDay(i);
        } else {
            createNewEmptyDay(i);}

    }
}


function getNumberOfDaysInMonth(year,month){

    return new Date(year, month,0).getDate();
}

function createNewEmptyDay(i){
    var newDay = createNewDay(i);
    newDay.attr('class','empty_day');


}

function createCurrentDay(i){
    var newDay = createNewDay(i);
    newDay.attr('class','current_day');
}

function createNewDay(i){
    var newDay = templateDay.clone();
    newDay.find('.day').text(i);
    newDay.find('.note').text('');
    newDay.attr('day',i);
    newDay.attr('id', 'day_'+i);
    addListenerToDay(newDay);
    container.append(newDay);
    return newDay;
}

function isTodayOfToday(year,month,day){

    if(todayDate.getFullYear() !== year){
        return false;
    }

    if(todayDate.getMonth() !== month){
        return false;
    }

    if(todayDate.getDate() !== day){
        return false;
    }
    return true;
}

function addListenerToDay(day){
    day.click(function(){
        targetDay = $(this).attr('day');
        var noteImg = container.find('#day_'+targetDay).find(".img_note");
        if(noteImg.html() === undefined){
            addNoteButton.show();
            noteWindow.find(".note").val('');
            noteWindow.find('.title').text(targetDay+"/"+parseInt(currentMonth+1)+"/"+currentYear);
            noteWindow.fadeIn(200);
        } else {
            //addNoteButton.hide();
            noteWindow.find(".note").val(notes.getContentOfDay(targetDay+"/"+parseInt(currentMonth+1)+"/"+currentYear));
            noteWindow.find('.title').text(targetDay+"/"+parseInt(currentMonth+1)+"/"+currentYear);
            noteWindow.fadeIn(200);
        }


    })
}