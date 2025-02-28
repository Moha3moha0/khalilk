const challengesItems = document.querySelectorAll(".challenges-item")
console.log(challengesItems)
challengesItems.forEach((item) =>{
    console.log(item)
    const content = item.querySelector(".content");
    const header = item.querySelector(".header");
    const toggle = item.querySelector(".toggle-icon");

    header.addEventListener("click",()=>{
        content.classList.toggle("active");
    });
})

document.addEventListener("DOMContentLoaded", function() {
    let inputTask = document.getElementById("input-task");
    let addButton = document.getElementById("todobth");
    let taskList = document.getElementById("task");
    
    // جلب تاريخ اليوم بصيغة YYYY-MM-DD
    function getTodayDate() {
        let today = new Date();
        return today.toISOString().split('T')[0];
    }
    
    // حفظ المهام في Local Storage
    function saveTasks() {
        localStorage.setItem("tasks", taskList.innerHTML);
        localStorage.setItem("taskDate", getTodayDate());
    }
    
    // تحميل المهام عند فتح الصفحة
    function loadTasks() {
        let savedTasks = localStorage.getItem("tasks");
        let savedDate = localStorage.getItem("taskDate");
        let today = getTodayDate();
        
        if (savedDate === today && savedTasks) {
            taskList.innerHTML = savedTasks;
        } else {
            localStorage.removeItem("tasks"); // مسح المهام القديمة
            localStorage.setItem("taskDate", today); // تحديث التاريخ
        }
    }
    
    // إضافة مهمة جديدة
    addButton.addEventListener("click", function() {
        let taskText = inputTask.value.trim();
        
        if (taskText === "") {
            alert("يجب كتابة مهمة قبل الإضافة!"); // رسالة تنبيه
            return;
        }
        
        let li = document.createElement("li");
        li.textContent = taskText;
        
        let span = document.createElement("span");
        span.innerHTML = "&times;";
        li.appendChild(span);
        
        taskList.appendChild(li);
        inputTask.value = "";
        saveTasks();
    });
    
    // وضع علامة على المهمة أو حذفها
    taskList.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }
        saveTasks();
    });
    
    loadTasks();
});
