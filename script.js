function generateSaveButton () { 
    let saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'save-activity');
    saveButton.style.marginLeft = "5%";   
    saveButton.style.padding = "1 rem"; 
    saveButton.style.fontSize = "1.25rem"; 
    saveButton.style.cursor = "pointer"; 
    saveButton.textContent = 'Save';  
    saveButton.addEventListener('click', ()=> { 
        //TESTING ONLY
        //console.log('save button clicked'); 
        addActivity(); 
    })
    return saveButton; 
}
function generateDeleteButton () { 
    let deleteButton = document.createElement('button'); 
    deleteButton.setAttribute('id', 'delete-activity'); 
    deleteButton.innerText = 'Delete'
    deleteButton.style.cursor = 'pointer'; 
    deleteButton.addEventListener('click', () => { 
        let index = deleteButton.getAttribute('data-index'); 
        const ul = document.getElementById('activities'); 
        let existing = ul.querySelectorAll('#activity')

        //TESTING ONLY
        //console.log(existing); 
        
        let nodeToDelete; 
        //let nodeToDelete = existing.item(index) //the reason why this doesn't work is because i'm getting the index not checking that the data index = the data index that the delete button wants to delete
        existing.forEach((node) => {
            if(node.getAttribute('data-index') == index){ 
                nodeToDelete = node; 
                return; 
            }
        })

        //TESTING ONLY
        //console.log(nodeToDelete)

        ul.removeChild(nodeToDelete)
        //activities.removeChild(this.activity); 
        //in crud, a delete button removes by this id delete by id at its core
        //so think: how would i ensure in javascript that I am deleting the correct id and not everything
    })
    return deleteButton; 
}


function generateEditButton () { 
    let editButton = document.createElement('button'); 
    editButton.setAttribute('id', 'edit-activity'); 
    editButton.style.cursor = 'pointer'; 
    editButton.innerText = 'Edit'; 

    editButton.addEventListener('click', ()=>{ 
        //TESTING ONLY
        // console.log('editButton clicked'); 

        let index = editButton.getAttribute('data-index'); 
        
        //TESTING ONLY
        // console.log(index); 

        let ul = document.getElementById('activities'); 
        let activities = ul.querySelectorAll('#activity'); 
        let prevLabel; 

        activities.forEach(activity => { 
            if(activity.getAttribute('data-index') == index){ 
                prevLabel = activity
            }
        })

        console.log(prevLabel); 
        let newLabelInput = document.createElement("input"); 
        newLabelInput.setAttribute("type", "text"); 
        let prevLabelInput = prevLabel.getElementsByTagName("label")[0]; 
        newLabelInput.setAttribute("value", prevLabelInput.textContent); 
        prevLabelInput.replaceWith(newLabelInput); 
        newLabelInput.addEventListener("keypress", (e)=> { 

            if(e.key == "Enter"){
                prevLabelInput.textContent = newLabelInput.value; 
                newLabelInput.replaceWith(prevLabelInput); 
            }
        }); 
       
        //match.setAttribute('contenteditable', 'true'); //contenteditable allows the user to edit the element
    })
    return editButton; 
}

function addActivity () { 
    const ul = document.getElementById('activities'); 
    let existing = ul.querySelectorAll('#activity') //parentnode.queryselectorall, select all existing activities  
    const li = document.createElement('li'); 

    liAttributes = { 
        "data-index": existing.length, 
        "id": "activity"
    }

    for(const key in liAttributes){ 
        li.setAttribute(key, liAttributes[key]); 
    }

    const saveButton = document.getElementById('save-activity'); 
    const input = document.getElementById('activity-to-add')
    const newActivity = document.createElement('input'); 
    const div = document.createElement('div'); 
    const buttonDiv = document.createElement('div'); 
    buttonDiv.setAttribute('class', 'edit-delete'); 
    div.setAttribute('class', 'card'); 
    activityAttributes = {
        "type": "checkbox",
        "id": "activity",
    }

    for(const key in activityAttributes){ 
        newActivity.setAttribute(key, activityAttributes[key]); 
    }
    const label = document.createElement('label'); 
    label.setAttribute("for", "activity"); 
    label.textContent = input.value; 

    if(!input.value) {
        input.focus(); 
        return alert("please enter a task")}; 
    
    let deleteButton = generateDeleteButton(); 
    deleteButton.setAttribute('data-index', liAttributes['data-index']); 

    let editButton = generateEditButton(); 
    editButton.setAttribute('data-index', liAttributes['data-index']); 
    buttonDiv.append(deleteButton, editButton)
    div.append(newActivity, label, buttonDiv); 
    li.appendChild(div); 
    ul.appendChild(li); 

    ul.removeChild(input); 
    ul.removeChild(saveButton); 
}


function generateTextBox () {
    const ul = document.getElementById('activities'); 
    const input = document.createElement('input'); 

    const saveButton = generateSaveButton(); 

    inputAttributes = {
        "type": "text",
        "id": "activity-to-add"
    }

    for (const key in inputAttributes){ 
        input.setAttribute(key, inputAttributes[key]); 
    }

    input.style.backgroundColor = "white"; 
    input.style.border = "none"; 
    input.style.color = "black"; 

    input.addEventListener('keydown', (e) => {
        if(e.key == 'Enter'){ 
            addActivity(); 
        }
    })

    ul.prepend(input, saveButton); 
    input.focus(); 
}

function displayTimer () {
    let timerDisplay = document.getElementById('timer-display'); 
    let timerInput = document.getElementById('timer').value; 
    let stopButton = document.createElement('button'); 
    stopButton.setAttribute("id", "start-timer"); 
    //need to set setInterval to a variable and then instead of doing input -= 1 do --
    //clear interval so that it does not go on infinitely
    stopButton.textContent = "stop"

    startButton.replaceWith(stopButton)
    timerDisplay.textContent = timerInput;  
    //variable assignment here is important so that setInterval is not running unbound and infinitely
    let timer = setInterval(() =>{ 
        timerInput--; 
        timerDisplay.textContent = timerInput; //order matters, if you have this line before timerInput-- then the number is going to display 2 and skip right to 0 without showing 1
        if(timerInput == 0){
            timerDisplay.textContent = timerInput 
            clearInterval(timer); 
        }
    }, 1000)

    stopButton.addEventListener('click', ()=> {
        
        clearInterval(timer); 
        timerDisplay.textContent = ""; 
        stopButton.replaceWith(startButton); 
    })
    
}

//this continuously calls -1 , 10153 times infinitely 
// function timerCountdown (input){
//     console.log(input)
//     if(input = 0){ 
//         return input; 
//     }else { 
//         newInput = input - 1 
//         return timerCountdown(newInput); 
//     }
// }

function editActivity () { 
  

}
const addButton = document.getElementById('add-activity'); 
const startButton = document.getElementById('start-timer'); 
const quickset = document.getElementsByClassName('quickset'); 
console.log(quickset[0].children); 
for(const button of quickset[0].children){
    button.addEventListener('click', ()=> { 
        let timer = document.getElementById('timer')
        let currentTimerInput = timer.value; 
        console.log(typeof timerInput)
        let val = button.getAttribute('data-value'); 
        console.log(parseInt(val)); 
        let updatedTimerInput = parseInt(currentTimerInput) + parseInt(val)
        timer.value = updatedTimerInput; 
    })
}

addButton.addEventListener('click', ()=>{
    console.log('add button clicked'); 
    generateTextBox(); 
})


startButton.addEventListener('click', () => {
    console.log('start button clicked'); 
    displayTimer(); 
})
