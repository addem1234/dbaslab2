var recitations = document.querySelector('#recitations');
var recitationsTemplate = nunjucks.compile(recitations.innerHTML);
recitations.innerHTML = recitationsTemplate.render({rids: []});

var checkboxes = document.querySelector('#checkboxes');
var checkboxesTemplate = nunjucks.compile(checkboxes.innerHTML);
checkboxes.innerHTML = recitationsTemplate.render({});

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
		console.log(json);
		el.innerHTML = '<option>Select recitation</option>';
		for(row in json) {
			console.log(row);
			var newOption = document.createElement('option');
			var textnode = document.createTextNode(json[row].rid);
			newOption.appendChild(textnode);
			newOption.setAttribute('value', json[row].rid)
			el.appendChild(newOption);
		}
		el.disabled = false;
	})
}

function createCheckboxes(u, number, el) {
	var alfabet = "abcdefghijklmnopqrstuvxyz"
	for(var letter in alfabet.substring(0,number)) {
		var newLabel
		var newCheckbox = document.createElement('input');
		var textnode = document.createTextNode(u + letter);
		newCheckbox.appendChild(textnode);
		newCheckbox.setAttribute('value', u);
		newCheckbox.setAttribute('type', 'checkbox');
		el.appendChild(newCheckbox);
	}
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
		el.innerHTML = '';
		createCheckboxes('1', json.u1, el);
		createCheckboxes('2', json.u2, el);
		createCheckboxes('3', json.u3, el);
	})
}

function solve(e) {
	console.log(e.target.value);
	var el = document.querySelector('div[id="checkboxes"]');

	fetch('/assignments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			rid: e.target.rid,
			name: e.target.name,
			track: e.target.track,
			u1: document.querySelectorAll('input[type="checkbox"][value="1"]:checked').length,
			u2: document.querySelectorAll('input[type="checkbox"][value="2"]:checked').length,
			u3: document.querySelectorAll('input[type="checkbox"][value="3"]:checked').length,
		})
	}).then(result => result.json())
	.then(json => {
		alert(json.result)
	})
}
