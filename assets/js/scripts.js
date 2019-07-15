/* ========== CLASSES ========== */

class Content {
    constructor(id, text, dueDate=undefined, attendantId=undefined) {
        this.id = id;
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
let colors = ["yellow", "lemonchiffon", "khaki", "red", "lightcoral", "firebrick", "aqua", "paleturquoise", "cadetblue", "gray", "gainsboro", "lightslategray"];

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

const addTask = function(text) {
    // Create new task with ID counter
    const task = new Content(taskIdCount, text);
    // Add to array
    tasks.push(task);
    // Increment ID counter
    taskIdCount++;
    
    return task; 
}

const addQuestion = function(text) {
    // Create new question with ID counter
    const question = new Content(questionIdCount, text);
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



        // Grab attendants' names and create object instances
        const $namesOfAttendants = $("#namesOfAttendants").val().split(",") // splits string into array by commas
            .map((attendantName) => {
                return attendantName.trim(); // removes trailing whitespaces in case there are any
            })
            .forEach(function(attendantName) {
                addAttendant(attendantName); // creates object instances of them
            });
        // Display attendants on page
        attendants.forEach(function(attendant) {
            const attendantHtml = `
                <div class="attendant">
                    <i class="fas fa-user" style="color: ${attendant.color}"></i>
                    <input type="text" class="editable" value="${attendant.name}">
                </div>
            `;
            $("#attendants").append(attendantHtml);
        });



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
                    <i class="fas fa-edit edit" title="Edit"></i>
                    <i class="fas fa-trash-alt delete" title="Edit"></i>
                </div>
            </div>
        `;

        // Add HTML into flags section
        const $newFlag = $("#flags").append(flagHtml);

        // Set focus on input box inside newly added flag
        $newFlag.find("textarea").focus();
    });


    // ** TASK PROMPT **
    $("#addTask").on("click", function() {
        // HTML For task (max character count is 200 for textarea)
        const taskHtml = `
            <div class="content task" taskId="">
                <i class="fas fa-tasks"></i>
                <textarea class="editable" rows="1" maxLength="200" placeholder="Something to do..."></textarea>
                <div class="contentControls hidden printHidden">
                    <div class="addAttendantPrompt hidden"></div>
                    <i class="fas fa-user-plus addAttendant title="Add Attendant"></i>
                    <i class="fas fa-edit edit" title="Edit"></i>
                    <i class="fas fa-trash-alt delete" title="Edit"></i>
                </div>
                <div class="assignedAttendants"></div>
            </div>
        `;

        // Add HTML into tasks section
        const $newTask = $("#tasks").append(taskHtml);

        // Set focus on input box inside newly added task
        $newTask.find("textarea").focus();
    });

    // ** ASSIGN TO USER **
    $("section .addAttendant").hover(function() {
        const $addAttendantPrompt = $(this).siblings(".addAttendantPrompt");
        $addAttendantPrompt.toggleClass("hidden");
        console.log("IN");

        attendants.forEach(function(attendant) {
            $addAttendantPrompt.append(`<span>${attendant.name}</span>`);
        });
    }, function() {
        const $addAttendantPrompt = $(this).siblings(".addAttendantPrompt");
        $addAttendantPrompt.empty().toggleClass("hidden");
        console.log("OUT")
    });


    // ** CONTENT SUBMISSION **
    $("section").on("keydown", "textarea", function(event) {
        // If user presses enter or ESC...
        if (event.which === 13 || event.which === 27) {
            // Lock text submission
            $(this).toggleClass("editable locked").prop("disabled", true);
            // Display edit button
            $(this).siblings(".contentControls").toggleClass("hidden");
        }
        // Clear text specifically for ESC
        if (event.which === 27) {
            $(this).val("");
        }
        // Object creation specifically for tasks and questions
        if (event.which === 13) {

            // Grabs div for content
            const $content = $(this).parent();
            
            // Task object edit IF task already exists
            if ($content.prop("taskId") !== undefined) {
                const existingTask = tasks.filter(task => task.id == $content.prop("taskId"))[0];
                existingTask.text = $(this).val();

            // Task object creation IF content is a task and doesn't already exist
            } else if ($content.hasClass("task")) {
                $content.prop("taskId", taskIdCount);
                addTask($(this).val());
            }
        }

        // For every other keypress, always update height of textarea box to match height of scroll bar
        // This basically just increases height of textarea in case of line breaks
        else {
            $(this).css("height", `${$(this).prop("scrollHeight")}px`)
        }
    });

    // ** CONTENT EDIT **
    $("section").on("click", ".edit", function() {
        // Hide content controls
        $(this).parents(".contentControls").toggleClass("hidden");
        // Select textarea, then make it editable and focus on it
        $(this).parents(".contentControls").siblings("textarea").toggleClass("editable locked").prop("disabled", false).focus();
    });

    // ** CONTENT DELETE **
    $("section").on("click", ".delete", function() {
        if (confirm("This will delete your content permanently.\nProceed?")) {
            $(this).parent().parent().remove();
        };
    });

    // Question creation

    // People creation
});