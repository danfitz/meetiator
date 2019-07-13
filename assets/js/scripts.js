class Content {
    constructor(text=undefined, assignee=undefined, dueDate=undefined) {
        this.text = text;
        this.assignee = assignee;
        this.dueDate = dueDate;
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

    // Starts user at topic question prompt
    $("#topic").focus();
    
    // ** ARRAY FOR ATTENDANT OBJECTS **
    const attendants = [];
    
    // ** START PROMPT SUBMISSION **
    $("#startPrompt form").on("submit", (event) => {
        event.preventDefault();
        
        // Grab topic question and time from start prompt
        const $topic = $("#topic").val();
        let $time = parseInt($("#time").val()) * 60; // in seconds

        // Hide start prompt
        $("#startPrompt").css("display", "none");
        // Display topic question at top
        $("header").removeClass("hidden")
        $("header h1").text(`${$topic}`);
        // Display system options
        $("#sysOptions").removeClass("hidden");

        // use setInterval() to advance progress bar in increments of 100 milliseconds
        let timeLeft = $time;
        const intervalTimer = setInterval(() => {
            // Decrease timeLeft by 0.1 seconds (100 milliseconds)
            timeLeft -= 0.1;
            // Convert difference to percentage
            const timeLeftPercent = 100 - (timeLeft / $time * 100);
            // Update width of progress bar
            $("#currentTime").css("width", `${timeLeftPercent}%`);
            // If time hits 0, clearInterval() and send to endPrompt
            if (timeLeft <= 0) {
                clearInterval(intervalTimer);
                // ** ACTIONS TO PERFORM WHEN TIMER ENDS **
            }
        }, 100);
    });

    // ** FLAG CREATION **
    $("#addFlag").on("click", function() {
        // HTML For flag
        const flagHtml = `
            <div class="content flag">
                <i class="fas fa-flag"></i>
                <input class="editable" type="text" placeholder="Something to flag...">
                <span class="hidden">Edit</span>
            </div>
        `;

        // Adds HTML into flags section
        const $newFlag = $("#flags").append(flagHtml);

        // Sets focus on input box inside newly added flag
        $newFlag.find("input").focus();
    });

    // function resizeInput() {
    //     $(this).attr('size', $(this).val().length);
    // }
    
    // $('input[type="text"]')
    //     // event handler
    //     .keyup(resizeInput)
    //     // resize on page load
    //     .each(resizeInput);

    // ** FLAG SUBMISSION **
    $("#flags").on("keypress", ".flag input", function(event) {
        if (event.which == 13) {
            $(this).toggleClass("editable locked").prop("disabled", true);
            $(this).siblings("span").toggleClass("hidden");
        } else {
            $(this).attr("size", $(this).val().length);
        }
    });

    // ** FLAG EDIT **
    $("#flags").on("click", "span", function() {
        $(this).toggleClass("hidden");
        $(this).siblings("input").toggleClass("editable locked").prop("disabled", false).focus();
    });

    // Task creation

    // Question creation

    // People creation
});