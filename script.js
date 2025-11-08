(function () {
	'use strict';

	const STORAGE_KEY = 'finalproject.tasks.v1';
	const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Weekend'];
	let tasks = [];

	// Tiny DOM helper
	const $ = (selector) => document.querySelector(selector);

	const form = $('#task-form');
	const input = $('#task-input');
	const daySelect = $('#task-day');

	// Persistence
	function saveTasks() {
		try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (e) { console.error(e); }
	}

	function loadTasks() {
		try { const raw = localStorage.getItem(STORAGE_KEY); tasks = raw ? JSON.parse(raw) : []; } catch (e) { tasks = []; }
	}

	function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

	// Build a task list item UI
	function createTaskElement(task) {
		const li = document.createElement('li');
		li.dataset.id = task.id;

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = !!task.completed;
		checkbox.addEventListener('change', () => toggleTask(task.id));

		const label = document.createElement('span');
		label.className = 'task-label';
		label.textContent = task.text;
		if(task.completed) label.style.textDecoration = 'line-through';

		const del = document.createElement('button');
		del.type = 'button';
		del.className = 'btn-icon btn-delete';
		del.textContent = '✕';
		del.setAttribute('aria-label', 'Delete task');
		del.addEventListener('click', () => deleteTask(task.id));

		li.appendChild(checkbox);
		li.appendChild(label);
		li.appendChild(del);
		return li;
	}

	// Render tasks into each day column
	function renderWeek() {
		DAYS.forEach(day => {
			const ul = document.getElementById('tasks-' + day);
			if(!ul) return;
			ul.innerHTML = '';
			const dayTasks = tasks.filter(t => t.day === day);
			if(dayTasks.length === 0){
				const ph = document.createElement('li');
				ph.className = 'task-placeholder';
				ph.textContent = 'No tasks yet';
				ul.appendChild(ph);
				return;
			}
			dayTasks.forEach(t => ul.appendChild(createTaskElement(t)));
		});
	}

	// Actions
	function addTask(text, day){
		const trimmed = (text || '').trim(); if(!trimmed) return;
		const task = { id: uid(), text: trimmed, day: day || 'Monday', completed:false, createdAt: Date.now() };
		tasks.unshift(task);
		saveTasks();
		renderWeek();
	}

	function deleteTask(id){ tasks = tasks.filter(t => t.id !== id); saveTasks(); renderWeek(); }
	function toggleTask(id){ tasks = tasks.map(t => t.id===id ? Object.assign({},t,{completed:!t.completed}) : t); saveTasks(); renderWeek(); }

	// Form handling
	if(form){
		form.addEventListener('submit', function(e){
			e.preventDefault();
			const val = input.value.trim();
			const day = daySelect ? daySelect.value : 'Monday';
			if(!val) return;
			addTask(val, day);
			form.reset();
			input.focus();
		});
	}

	// Init
	document.addEventListener('DOMContentLoaded', function(){ loadTasks(); renderWeek(); });

})();

/**
 * Simple Todo App — script.js
 *
 * Contract:
 * - Inputs: user adds text via #task-form input
 * - Outputs: task list DOM updates and tasks persisted in localStorage under key `finalproject.tasks.v1`
 * - Error modes: localStorage failures are caught and logged; malformed stored JSON resets tasks to []
 *
 * Success criteria:
 * - addTask(text) adds a task and updates UI
 * - deleteTask(id) removes task and updates UI
 * - toggleTask(id) toggles completed state and updates UI
 *
 * Edge cases considered: empty input prevented, storage failures handled, duplicate IDs unlikely (timestamp + random)
 */

(function () {
	'use strict';

	const STORAGE_KEY = 'finalproject.tasks.v1';
	let tasks = [];

	// Tiny DOM helper
	const $ = (selector) => document.querySelector(selector);

	const taskListEl = $('#task-list');
	const form = $('#task-form');
	const input = $('#task-input');

	// Persistence helpers
	function saveTasks() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
		} catch (err) {
			// Non-fatal: log and continue
			console.error('Failed to save tasks', err);
		}
	}

	function loadTasks() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			tasks = raw ? JSON.parse(raw) : [];
		} catch (err) {
			console.error('Failed to load tasks, resetting to empty', err);
			tasks = [];
		}
	}

	// Utilities
	function uid() {
		return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
	}

	// Build a single task <li>
	function createTaskElement(task) {
		const li = document.createElement('li');
		li.dataset.id = task.id;
		if (task.completed) li.classList.add('completed');

		const left = document.createElement('div');
		left.className = 'task-left';

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = !!task.completed;
		checkbox.addEventListener('change', () => toggleTask(task.id));

		const label = document.createElement('span');
		label.className = 'task-label';
		label.textContent = task.text;

		left.appendChild(checkbox);
		left.appendChild(label);

		const actions = document.createElement('div');
		actions.className = 'task-actions';

		const del = document.createElement('button');
		del.type = 'button';
		del.className = 'btn-icon btn-delete';
		del.textContent = 'Delete';
		del.addEventListener('click', () => deleteTask(task.id));

		actions.appendChild(del);

		li.appendChild(left);
		li.appendChild(actions);
		return li;
	}

	// Render current tasks array into the DOM
	function renderTasks() {
		taskListEl.innerHTML = '';
		if (tasks.length === 0) {
			const p = document.createElement('p');
			p.className = 'muted';
			p.textContent = 'No tasks yet — add one above.';
			taskListEl.appendChild(p);
			return;
		}

		tasks.forEach((t) => taskListEl.appendChild(createTaskElement(t)));
	}

	// Actions (pure-ish transforms + persistence + render)
	function addTask(text) {
		const trimmed = (text || '').trim();
		if (!trimmed) return;
		const task = { id: uid(), text: trimmed, completed: false, createdAt: Date.now() };
		tasks.unshift(task); // newest first
		saveTasks();
		renderTasks();
	}

	function deleteTask(id) {
		tasks = tasks.filter((t) => t.id !== id);
		saveTasks();
		renderTasks();
	}

	function toggleTask(id) {
		tasks = tasks.map((t) => (t.id === id ? Object.assign({}, t, { completed: !t.completed }) : t));
		saveTasks();
		renderTasks();
	}

	// Form handling
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const value = input.value.trim();
		if (!value) return;
		addTask(value);
		form.reset();
		input.focus();
	});

	// Keyboard helper: press "n" to focus new task input (small convenience)
	document.addEventListener('keydown', function (e) {
		if (e.key === 'n' && document.activeElement !== input) {
			input.focus();
			e.preventDefault();
		}
	});

	// Initialize on DOM ready
	document.addEventListener('DOMContentLoaded', function () {
		loadTasks();
		renderTasks();
	});
})();

	// Theme toggle: keep this separate and simple
	(function(){
		const THEME_KEY = 'finalproject.theme.v1';
		const toggleBtn = document.getElementById('theme-toggle');
		if(!toggleBtn) return;

		function applyTheme(theme){
			const root = document.documentElement;
			if(theme === 'dark'){
				root.classList.add('theme-dark');
				toggleBtn.textContent = '☀️';
				toggleBtn.setAttribute('aria-pressed','true');
			} else {
				root.classList.remove('theme-dark');
				toggleBtn.textContent = '🌙';
				toggleBtn.setAttribute('aria-pressed','false');
			}
		}

		function saveTheme(theme){
			try{ localStorage.setItem(THEME_KEY, theme); }catch(e){/* ignore */}
		}

		function loadTheme(){
			try{ return localStorage.getItem(THEME_KEY); }catch(e){ return null; }
		}

		// Start with saved theme or system preference
		const saved = loadTheme();
		if(saved) applyTheme(saved);
		else {
			const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			applyTheme(prefersDark ? 'dark' : 'light');
		}

		toggleBtn.addEventListener('click', function(){
			const isDark = document.documentElement.classList.contains('theme-dark');
			const next = isDark ? 'light' : 'dark';
			applyTheme(next);
			saveTheme(next);
		});
	})();

