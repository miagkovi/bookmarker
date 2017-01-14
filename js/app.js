// listen for form submit

document.getElementById("myForm").addEventListener('submit', saveBookmark);

function saveBookmark(e) {
	// get form value
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	if (!validateForm(siteName, siteUrl)) {
		return false;
	}
	// create bookmark
	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	// bookmarks null ?
	if (localStorage.getItem('bookmarks') === null) {
		var bookmarks = [];
		bookmarks.push(bookmark);
		// convert JSON to string and set bookmark as item in Local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// get bookmarks from Local Storage and convert string to JSON
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark); // add new bookmark to array
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	// clear form after adding new bookmark
	document.getElementById('myForm').reset();
	// stops browser form submitting
	e.preventDefault();
	// add new bookmark to list
	fetchBookmarks();
}

	function deleteBookmark(url) {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		for (var i = 0; i < bookmarks.length; i++) {
			if (bookmarks[i].url === url) {
				// remove item from array
				bookmarks.splice(i, 1);
			}
		}
		// re-set LS
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		// need to call fetchBookmarks
		fetchBookmarks();
	}

	function fetchBookmarks() {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		var bookmarksResults = document.getElementById('bookmarksResults');
		// add '' to div, clean div
		bookmarksResults.innerHTML = '';
		for (var i = 0; i < bookmarks.length; i++) {
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;
			bookmarksResults.innerHTML += 	'<div class="card card-block">' + 
												'<h3>' +
													'<img src="img/Bookmark-02.svg" class="bookmark-icon">' + 
													name + 
													' <a class="btn btn-primary" target="_blank" href="' + url + '">Visit</a> ' + 
													' <a onclick = "deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' + 
												'</h3>' + 
											'</div>';
		}
	}

	function validateForm(siteName, siteUrl) {
		// validation forms from blank
		if (!siteName || !siteUrl) {
			alert('Please fill in the form');
			return false;
		};
		// reg exp for url validation
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);
		// validation url form
		if (!siteUrl.match(regex)) {
			alert("Please use a valid URL");
			return false;
		};
		// if everything is ok
		return true;
	}