var bookmarkArray = []
var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var submitBtn = document.getElementById('submitBtn')
var visitBtn = document.getElementById(`visit`)
var storCont = ''
var submitCont = document.getElementById('submitCont')
var submitUpdateBtn = document.getElementById('submitUpdateBtn')
var test = ''
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
var validateSubmit

// ------------------------------------------------------------------------
// ----------------------------Functions-----------------------------------
// ------------------------------------------------------------------------
if (localStorage.getItem('bookmarks') != null) {
    getFromDatabase()
    showSites()
}

function clearInp() {
    siteName.value = ''
    siteUrl.value = ''
}

function submit() {
    if (validateSubmit == true) {
        bookmarkArray.unshift({ name: siteName.value, site: siteUrl.value })
        saveDatabase()
        showSites()
        clearInp()
    } else {
        alert("Enter Valid Name at least 3 characters and Valid url starts with https:// and ends with domain")
    }
}

function saveDatabase() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray))
}

function getFromDatabase() {
    bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'))
}

function showSites() {
    storCont = ''
    for (let i = 0; i < bookmarkArray.length; i++) {
        storCont += `
            <tr>
            <td class="align-items-center"><p class="my-2">${i + 1}</p></td>
            <td><p class="my-2">${bookmarkArray[i].name}</p></td>
            <td><button class="btn btn-success visit" onclick="visitSite(${i})">Visit</button></td>
            <td><button class="btn btn-warning" onclick="updateBookmark(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="delSite(${i})">Delete</button></td>
            </tr>
            `
    }
    document.getElementById('bookmarkTable').innerHTML = storCont
}

function addSite() {
    submit()
}

function visitSite(index) {
    window.location.href = bookmarkArray[index].site
}
function updateBookmark(index) {
    test = index
    siteName.value = bookmarkArray[index].name
    siteUrl.value = bookmarkArray[index].site
    submitCont.innerHTML = `
    <button onclick="submitUpdate()" class="btn btn-warning mt-3">Update</button>
    `
}

function submitUpdate() {
    console.log(test);
    console.log('ok');
    bookmarkArray[test].name = siteName.value
    bookmarkArray[test].site = siteUrl.value
    saveDatabase()
    showSites()
    submitCont.innerHTML = `
    <button id="submitBtn" class="btn btn-dark mt-3">Submit</button>
    `
    clearInp()
}

function delSite(index) {
    bookmarkArray.splice(index, 1)
    saveDatabase()
    showSites()
}

function validate(inputElem, regex) {
    var testRegex = regex;
    if (testRegex.test(inputElem.value)) {
        inputElem.classList.add("is-valid");
        inputElem.classList.remove("is-invalid");
        validateSubmit = true
    } else {
        inputElem.classList.add("is-invalid");
        inputElem.classList.remove("is-valid");
        validateSubmit = false
    }
}

// ------------------------------------------------------------------------
// ----------------------------Events--------------------------------------
// ------------------------------------------------------------------------

submitBtn.addEventListener('click', addSite)

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
    validate(siteUrl, urlRegex);
});
