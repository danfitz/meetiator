/* ========== CLASSES ========== */

class Content {
    constructor(id, type, text, dueDate=undefined, attendantId=undefined) {
        this.id = id;
        this.type = type;
        this.text = text;
        this.dueDate = dueDate;
        this.attendantId = attendantId;
    }
};

class Attendant {
    constructor(id, name, color, tasks=[]) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.tasks = tasks;
    }
};



/* ========== DATA RESOURCES ========== */

// Variables for assigning unique IDs to new attendants or content (will be incremented by 1 every time it's used) 
let attendantIdCount = 1000;
let taskIdCount = 2000;
let questionIdCount = 3000;

// Empty arrays to store objects created using above classes
const attendants = [];
const tasks = [];
const questions = [];

// Populated array of unique colors & function for grabbing random color in array
let colors = ["green", "yellow", "orange", "pink", "purple", "lilac", "black", "brown", "grey", "cyan", "maroon", "darkslategray", "deeppink"];

const randColor = function() {
    const randIndex = Math.floor(Math.random() * colors.length);
    return colors.splice(randIndex, 1)[0]; // 0 index required because splice returns an array of 1 item
}



/* ========== CUSTOM FUNCTIONS ========== */

const addAttendant = function(name) {
    // Create new attendant with ID counter and randColor() function
    const attendant = new Attendant(attendantIdCount, name, randColor());
    // Add to array
    attendants.push(attendant);
    // Increment ID counter
    attendantIdCount++;

    return attendant;
}

const addTask = function(type, text) {
    // Create new task with ID counter
    const task = new Content(taskIdCount, type, text);
    // Add to array
    tasks.push(task);
    // Increment ID counter
    taskIdCount++;
    
    return task; 
}

const addQuestion = function(type, text) {
    // Create new question with ID counter
    const question = new Content(questionIdCount, type, text);
    // Add to array
    questions.push(question);
    // Increment ID counter
    questionIdCount++;

    return question; 
}



/* ========== JQUERY ========== */

$(document).ready(function() {

    // Starts user at topic question prompt
    $("#topic").focus();
        
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

        const progressBar = setInterval(() => {
            // Decrease timeLeft by 0.1 seconds (100 milliseconds)
            timeLeft -= 0.1;
            // Convert difference between $time and timeLeft to percentage
            const timeLeftPercent = 100 - (timeLeft / $time * 100);
            // Update width of progress bar
            $("#currentTime").css("width", `${timeLeftPercent}%`);
            // If time hits 0, clearInterval() and do ????????
            if (timeLeft <= 0) {
                clearInterval(progressBar);
                // ** ACTIONS TO PERFORM WHEN TIMER ENDS **
            }
        }, 100);
    });

    // ** FLAG PROMPT **
    $("#addFlag").on("click", function() {
        // HTML For flag (max character count is 200 for textarea)
        const flagHtml = `
            <div class="content flag">
                <i class="fas fa-flag"></i>
                <textarea class="editable" rows="1" maxLength="200" placeholder="Something to flag..."></textarea>
                <div class="contentControls hidden printHidden">
                    <span class="edit">Edit</span>
                    <span class="delete">Delete</span>
                </div>
            </div>
        `;

        // Add HTML into flags section
        const $newFlag = $("#flags").append(flagHtml);

        // Set focus on input box inside newly added flag
        $newFlag.find("textarea").focus();
    });

    // ** FLAG SUBMISSION **
    $("#flags").on("keydown", ".flag textarea", function(event) {
        // If user presses enter...
        if (event.which == 13) {
            // Lock flag text submission
            $(this).toggleClass("editable locked").prop("disabled", true);
            // Display edit button
            $(this).siblings(".contentControls").toggleClass("hidden");
        }

        // For every other keypress, always update height of textarea box to match height of scroll bar
        // This basically just increases height of textarea in case of line breaks
        else {
            console.log($(this).prop("scrollHeight"));
            $(this).css("height", `${$(this).prop("scrollHeight")}px`)
        }
    });

    // ** FLAG EDIT **
    $("#flags").on("click", ".edit", function() {
        // Hide content controls
        $(this).parent().toggleClass("hidden");
        // Traverse up DOM to find textarea, then make it editable and focus on it
        $(this).parent().siblings("textarea").toggleClass("editable locked").prop("disabled", false).focus();
    });

    // ** FLAG DELETE **
    $("#flags").on("click", ".delete", function() {
        if (confirm("This will delete your content permanently.\nProceed?")) {
            $(this).parents(".flag").remove();
        };
    });

    // ** TASK PROMPT **

    // ** TASK SUBMISSION **

    // ** TASK EDIT **

    // Question creation

    // People creation
});