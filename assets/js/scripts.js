class Content {
    constructor(text="", assignee=undefined, dueDate=undefined) {
        this.text = text;
        this.assignee = assignee;
        this.dueDate = dueDate;
    }
};

class Task {
    constructor() {
        this.dueDate = "";
        this.asignee = undefined;

    }
};

class Attendant {
    constructor(name=`Person ${attendants.length + 1}`, color="black") {
        this.name = name;
        this.color = color;
    }
};

const attendants = [];

const addAttendant = (name, color) => {
    const person = new Attendant(name, color);
    attendants.push(person);
    return person;
}

$(document).ready(function() {
    //     
});