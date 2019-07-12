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
        this.assignee = undefined;
    }
};

class Attendant {
    constructor(name=`Person ${attendants.length + 1}`, color="black") {
        this.name = name;
        this.color = color;
    }
    addAttendant(arr, name, color) {
        const attendant = new Attendant(name, color);
        arr.push(attendant);
        return attendant;
    }
    
};

$(document).ready(function() {
    const attendants = [];
    
    $("#startPrompt form").on("submit", (event) => {
        event.preventDefault();
        
        // Grab topic question and time from start prompt
        const $topic = $("#topic").val();
        let $time = parseInt($("#time").val()) * 60; // in seconds

        // Hide start prompt
        $("#startPrompt").css("display", "none");

        // Display topic question at top
        $("header").removeClass("hidden").append(`<h1>${$topic}</h1>`);

        // use setInterval() to decrease timer in increments of 1 minute (or 60,000 milliseconds)
        let timeLeft = $time;
        const intervalTimer = setInterval(() => {
            // Decrease timeLeft by 1 and convert difference to percentage
            timeLeft--;
            const timeLeftPercent = 100 - (timeLeft / $time * 100);
            console.log(timeLeftPercent);
            // Update width of progress bar
            $("#currentTime").css("width", `${timeLeftPercent}%`);
            // If time hits 0, clearInterval() and update styles
            if (timeLeft === 0) {
                clearInterval(intervalTimer);
                // Show prompt saying meeting is over
            }
        }, 1000);

    });
});