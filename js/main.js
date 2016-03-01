var courses = document.querySelector('#courses');
var coursesTemplate = nunjucks.compile(courses.innerHTML);
courses.innerHTML = coursesTemplate.render({rows: []});

var recitations = document.querySelector('#recitations');
var recitationsTemplate = nunjucks.compile(recitations.innerHTML);
recitations.innerHTML = recitationsTemplate.render({rids: []});

var checkboxes = document.querySelector('#checkboxes');
var checkboxesTemplate = nunjucks.compile(checkboxes.innerHTML);
checkboxes.innerHTML = recitationsTemplate.render({});

var alfabet = "abcdefghijklmnopqrstuvxyz";

getCourses();
function getCourses() {
	var el = document.querySelector('#courses');

	fetch('/course', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(result => result.json())
	.then(json => {
		var output = coursesTemplate.render({rows: json});
		el.innerHTML = output;
	})
}

function getRecitations(e) {
	console.log(e.target.value);
	var el = document.querySelector('form select[name="recitation"]');

	fetch('/recitation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			cid: e.target.value
		})
	}).then(result => result.json())
	.then(json => {
		el.innerHTML = recitationsTemplate.render({rids: json.map(row => row.rid)});
		el.disabled = false;
	})
}

function getAssignments(e) {
	console.log(e.target.value);
	var el = document.querySelector('div[id="checkboxes"]');

	fetch('/assignments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			rid: e.target.value
		})
	}).then(result => result.json())
	.then(json => {
		console.log(json);
		var assignments = {};
		for(var row in json) {
			row = json[row];
			assignments[row.assign] = alfabet.substr(0, row.max)
		}

		console.log(assignments);
		el.innerHTML = checkboxesTemplate.render({assignments});
	})
}

function solve(e) {
	e.preventDefault();
	var el = document.querySelector('div[id="checkboxes"]');

	var solved = [].map.call(
		document.querySelectorAll('input[type="checkbox"]:checked'),
		item => item.value
	);

	var solved_object = {};

	for(var i in solved) {
		var index = solved[i];
		if(solved_object[index])
			solved_object[index] += 1
		else
			solved_object[index] = 1
	}

	fetch('/assignments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.assign({
			rid: e.target.recitation.value,
			name: e.target.name.value,
			track: e.target.track.value
		}, solved_object))
	}).then(result => result.json())
	.then(json => {
		alert(json.result)
	})
}
