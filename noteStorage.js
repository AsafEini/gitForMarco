function NoteStorage(){
    this.storage = [];


}

NoteStorage.prototype.addNote = function(note){
    var isNotPushedYet = true;
    var index = 0;
    while(isNotPushedYet && index < this.storage.length){
        if(this.isEarlyDate(note._date, this.storage[index]._date)){
            this.storage.splice(index, 0, note);
            isNotPushedYet = false;
        }
        index++;
    }

    if(isNotPushedYet){
        this.storage.push(note)
    }
};


NoteStorage.prototype.isEarlyDate = function(dateA,dateB){
    dateA = dateA.split('/');
    dateB = dateB.split('/');

    if(dateA[2] > dateB[2]){
        return false;
    } else if(dateA[2] === dateB[2]){
        if(dateA[1] > dateB[1]){
            return false
        } else if (dateA[1] === dateB[1]){
            if(dateA[0] > dateB[0]){
                return false;
            }
        }
    }
    return true;
};

NoteStorage.prototype.getContentOfDay = function(date){
    for(var i = 0; i < this.storage.length; ++i){
        if(this.storage[i]._date === date){
            return this.storage[i]._content;
        }
    }
    return null;
};