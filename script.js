const div = document.querySelector(".grid")
div.innerHTML = "<span>Cell</span>\n".repeat(100)

let cells = document.getElementsByTagName("span")
console.log(cells.length)
