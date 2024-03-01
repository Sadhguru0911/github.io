document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("feedbackForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get form values
        var name = document.getElementById("name").value;
        var community = document.getElementById("community").value;
        var mood = document.querySelector('input[name="mood"]:checked').value;
        var feedback = document.getElementById("feedback").value;
        
        // Create feedback item
        var feedbackItem = document.createElement("div");
        feedbackItem.classList.add("feedback-item");
        feedbackItem.innerHTML = "<strong>" + name + "</strong> from <strong>" + community + "</strong> is " + mood + "<br>Feedback: " + feedback;
        
        // Append feedback item to feedback list
        document.getElementById("feedbackList").appendChild(feedbackItem);
        
        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("community").value = "";
        document.getElementById("feedback").value = "";
    });
});