'use strict';

const btnAll = document.getElementById('btn-all');
const btnActive = document.getElementById('btn-active');
const btnCompleted = document.getElementById('btn-completed');
const btnClearAll = document.getElementById('btn-clearAll');
const numberTasks = document.getElementById('numberTasks');
const listTaskHTML = document.querySelector('.list-task');
const listButton = document.querySelector('.list-button');
const form = document.getElementById('form-task');

let listTask = [];
const evenJS = new Event('click');

function elementCreation({ id, text, checked: isChecked = false }) {
	const el = document.createElement('li');
	el.classList.add('list-task__item');
	el.innerHTML = `
		<div class="task">
			<input
				class="custom-checkbox"
				id="${id}"
				name="task__checkbox"
				type="checkbox"
				${isChecked ? 'checked' : ''}
			/>
			<label class="task__text" for="${id}">${text}</label>
		</div>
	`;
	el.querySelector('.custom-checkbox').addEventListener('change', checkedTask);
	return el;
}
function renderTask(task, where = 'beforeend') {
	listTaskHTML.insertAdjacentElement(where, task);
}
function renderNumberTasks(int = listTask.length) {
	numberTasks.innerHTML = `${int} items left`;
}
function renderAllListTask() {
	listTaskHTML.innerHTML = '';
	listTask.forEach(el => {
		const html = elementCreation(el);
		renderTask(html);
	});
	renderNumberTasks(listTask.length);
}
function clearAllListTask() {
	listTaskHTML.innerHTML = '';
	listTask = listTask.filter(el => !el.checked);
	listTask.forEach(el => {
		const html = elementCreation(el);
		renderTask(html);
	});
	renderNumberTasks(listTask.length);
}
function sortListTask(is = true) {
	listTaskHTML.innerHTML = '';
	const sortList = listTask.filter(el => (is ? !el.checked : el.checked));
	sortList.forEach(el => {
		const html = elementCreation(el);
		renderTask(html);
	});
	renderNumberTasks(sortList.length);
}
function resetStylesListBtn(btn) {
	for (const child of listButton.children) {
		child.classList.remove('active');
	}
	btn.classList.add('active');
}
function addTask(even) {
	even.preventDefault();
	const data = new FormData(form);

	if (data.get('input-text').length == 0) return;

	let task = {
		id: crypto.randomUUID(),
		text: data.get('input-text'),
		checked: false,
	};
	listTask.push(task);
	task = elementCreation(task);
	renderTask(task);
	renderNumberTasks();
	form.reset();
}
function checkedTask(even) {
	const checkbox = even.target;
	const indexTask = listTask.findIndex(el => el.id == checkbox.id);
	listTask[indexTask].checked = listTask[indexTask].checked ? false : true;
}

form.addEventListener('submit', addTask);
btnActive.addEventListener('click', even => {
	resetStylesListBtn(even.target);
	sortListTask();
});
btnCompleted.addEventListener('click', even => {
	resetStylesListBtn(even.target);
	sortListTask(false);
});
btnAll.addEventListener('click', even => {
	resetStylesListBtn(even.target);
	renderAllListTask();
});
btnClearAll.addEventListener('click', () => {
	clearAllListTask();
	btnAll.dispatchEvent(evenJS);
});
