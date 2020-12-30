document.addEventListener('DOMContentLoaded', function() {

// Setting variables:
	const fullList = document.querySelector('ul');

// Loads current tasks when page is beinig opened:

	loadLists(); 

// Calls function for inserting value to HTML and clears input field:

	document.querySelector('#submit-btn').addEventListener("click", function() {
		if (document.querySelector('#task').value.length) {
			saveItemInStorage();
			loadLists();
			resetDate();
			resetTask();
			resetTime();
		} else {
			alert ("The field is empty. Please insert the new task");
		}
	});

// Loading new list of tasks: 

	function loadLists() {
		listItems();
		addCheckButtonEvents();
		addDeleteButtonEvents();
	};

// Save list in Storage: gets existing items or pushes new tasks in object:	

	function saveItemInStorage() {
		const items = getItems();
		items.push({
			'id': items.length,
			'task': getTask(),
			'date': getDate(),
			'time': getTime(),
			'completed': false
		});
		sessionStorage.setItem('items', JSON.stringify(items)); // gives a string
	};

// Updates status  with a new list - if checked task has the same index,
// it will be not added to the new list

	function updateCompleteStatus(itemIndex) {
		const items = [];
		getItems().forEach((list, index) => {
			if (index === parseInt(itemIndex)) {
				list.completed = true;
			}
			items.push(list)
		});
		sessionStorage.setItem('items', JSON.stringify(items));
	}

// Deletes task completely from the storage.
// Pushes to the new array and skipes clicked task as deleted:

	function deleteItemFromStorage(itemIndex) {
		const items = [];
		let id = 0;
		getItems().forEach((list, index) => {
			if (index !== parseInt(itemIndex)) {
				list.id = id
				items.push(list)
				id += 1;
			}
		});
		sessionStorage.setItem('items', JSON.stringify(items));
	};

// Gets all current tasks:

	function getItems() {
		if (sessionStorage.items) {
			return JSON.parse(sessionStorage.items);
		}
		return [];
	};

// Functions for getting and reseting deadline date value:

	function getDate(){ // Gets data from HTML
		if (document.querySelector('#task-date').value.length) {
			return document.querySelector('#task-date').value;
		} else {
			return "";
		}
	};

	function resetDate() { // Reset value from HTML to empty string
		document.querySelector('#task-date').value = '';
 
	};

// Functions for getting and reseting task value:

	function getTask(){ // gets task value from HTML
		return document.querySelector('#task').value;
	};

	function resetTask() { //reset task value from HTML
		document.querySelector('#task').value = '';
 
	};

// Functions for getting and reseting deadline time value:

	function getTime(){ // gets time from HTML
		return document.querySelector('#task-time').value;
	};

	function resetTime() { // clears time from HTML
		document.querySelector('#task-time').value = '';
 
	};

// Function for inserting value to HTML:

	function listItems(){
		fullList.innerHTML = '';
		sortListsByDate().forEach((item, index) => {
			fullList.insertAdjacentHTML( 'beforeend', listHTMLString(item, index) );
		});

	};

// Creates HTML structure for the tasks and takes dynamic value:

	function listHTMLString(item, index) {
		return `<li class='list-content'> \
			<div> \
				<p class='task-to-do'><span class=${item.completed ? 'completed' : ''}>TASK: </span>
					<span class=${item.completed ? 'completed' : ''}>${item.task}</span> \
				</p> \
				<p>DEADLINE: <span class='deadline'>${item.date} ${item.time}</span></p> \
			</div> \
			<div data-list-index='${item.id}'> \
				<i class='fas fa-check ${item.completed ? 'checked' : ''}'></i> \
				<i class='fas fa-trash'></i> \
			</div> \
		</li>`
	}

// Deleting task button:

	function addDeleteButtonEvents() {
		document.querySelectorAll(".fa-trash").forEach(function(deleting) {
		    deleting.addEventListener('click', function() {
		    	const ifConfirmed = confirm ("Do you really want to remove this task?");
		    	if (ifConfirmed) { // Deletes task if confirmed:
		      		deleteItemFromStorage(this.parentElement.dataset.listIndex);
		      		loadLists();
		      	}
		    });
		});
	};

// Marking task as done button:

	function addCheckButtonEvents () {
		document.querySelectorAll(".fa-check").forEach(function(checking) {
			checking.addEventListener('click', function () {
				this.classList.add('checked');
				updateCompleteStatus(this.parentElement.dataset.listIndex) // update status function
				loadLists(); // reloads tasks list
			});
		});
	};

	//Sorting tasks by date:

	function sortListsByDate() {
		return getItems().sort(function(a,b){
 			return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
		});
	};


});




