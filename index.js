var firebaseConfig = {
    apiKey: "AIzaSyDhhFvDex5v3-ue8ORL3bCM9wUmw57RFMo",
    authDomain: "my-firebase-acec5.firebaseapp.com",
    databaseURL: "https://my-firebase-acec5.firebaseio.com",
    projectId: "my-firebase-acec5",
    storageBucket: "my-firebase-acec5.appspot.com",
    messagingSenderId: "646739444821",
    appId: "1:646739444821:web:6dd3f7e6f12f00aefb80dc",
    measurementId: "G-YV15XLQLX6"
};

firebase.initializeApp(firebaseConfig);

// readTask()

var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    createTask(task, description);
    form.reset()
})

function createTask(taskName, description) {
    counter += 1;
    // console.log(counter)
    var task = {
        id: counter,
        task: taskName,
        description: description
    };
    let db = firebase.database().ref("tasks/" + counter);
    db.set(task);

    document.getElementById("cardSection").innerHTML = '';
    readTask()
}

function readTask() {
    var task = firebase.database().ref("tasks/");
    task.on("child_added", function(data) {
        var taskValue = data.val();
        console.log(taskValue)
        document.getElementById("cardSection").innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${taskValue.task}</h5>
                    <p class="card-text">${taskValue.description}</p>
                    <button type="submit" style="color: white" class="btn btn-warning" onClick="updateTask(${taskValue.id},'${taskValue.task}', '${taskValue.description}')">Edit Task</button>
                    <button type="submit" class="btn btn-danger" onClick="deleteTask(${taskValue.id},'${taskValue.task}', '${taskValue.description}')">Delete Task</button>
                </div>
                <div></div>
            </div>
        `
    })
}

function reset() {
    document.getElementById("firstSection").innerHTML = `
        <form action="" class="border p-4 mb-4" id="form">
            <div class="form-group">
                <label>Task</label>
                <input type="text" class="form-control" id="task" placeholder="Enter task">
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" id="description" placeholder="Description">
            </div>
            <button type="submit" id="button1" class="btn btn-primary">ADD TASK</button>
            <button style="display: none" id="button2" class="btn btn-success">Update Task</button>
            <button style="display: none" id="button3" class="btn btn-danger">Cancel</button>
        </form>
    `
}

function updateTask(id, name, description) {
    document.getElementById("firstSection").innerHTML=`
        <form action="" class="border p-4 mb-4" id="form2">
            <div class="form-group">
                <label>Task</label>
                <input type="text" class="form-control" id="task" placeholder="Enter task">
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" id="description" placeholder="Description">
            </div>
            <button style="display: none" type="submit" id="button1" class="btn btn-primary">ADD TASK</button>
            <button type="submit" style="display: inline-block" id="button2" class="btn btn-success">Update Task</button>
            <button type="button" style="display: inline-block" id="button3" class="btn btn-danger">Cancel</button>
        </form>
    `
    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault()
    })
    document.getElementById("button3").addEventListener("click", (e) => {
        reset();
    })
    document.getElementById("button2").addEventListener("click", (e) => {
        updateTask2(id, document.getElementById("task").value, document.getElementById("description").value)
    })
    document.getElementById("task").value = name;
    document.getElementById("description").value=description;
}

function updateTask2(id, name, description) {
    var taskUpdated = {
        task: name,
        id: id,
        description: description
    }
    let db = firebase.database().ref("tasks/" + id)
    db.set(taskUpdated)

    document.getElementById("cardSection").innerHTML = "";
    readTask();
    // reset();
}

function deleteTask(id) {
    var task = firebase.database().ref("tasks/" + id);
    task.remove();
    reset();
    document.getElementById("cardSection").innerHTML = '';
    readTask();
    reset();
}
