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
        // Grab values
        const $topic = $("#topic").val();
        let $time = parseInt($("#time").val());
        // Hide start prompt
        $("#startPrompt").css("display", "none");
        // Display topic question at top
        $("header").removeClass("hidden").html(`<h1>${$topic}</h1>`);
        // Display timer at bottom
        $("#timer").removeClass("hidden").html(`<h2>Time left: ${$time} min</h2>`)
        const timer = setInterval(() => {
            $time--;
            $("#timer").empty().html(`<h2>Time left: ${$time} min</h2>`);

            if ($time === 0) {
                clearInterval(timer);
                $("#timer").css("color", "red");
            }
        }, 1000);

    });
});