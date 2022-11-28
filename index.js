const colorInput = document.getElementById("color-picker");
const modeInput = document.getElementById("mode-selector");
const form = document.getElementById("get-scheme");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const color = colorInput.value.slice(1);
	const mode = modeInput.value;

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	fetch(
		`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`,
		options
	)
		.then((res) => res.json())
		.then((data) => {
			renderColors(data.colors);
		});
});

function renderColors(colorArray) {
	let count = 1;
	for (color of colorArray) {
		let hexValue = color.hex.value;
		document.getElementById(`color${count}`).style.backgroundColor =
			hexValue;
		document.getElementById(`hex${count}`).innerText = hexValue;
		count++;
	}
}

//Toggle between dark and light themes
const btn = document.querySelector(".btn-toggle");
btn.addEventListener("click", function () {
	toggleDarkLightMode();
});

function toggleDarkLightMode() {
	document.body.classList.toggle("dark-theme");
	document.getElementById("theme").classList.toggle("fa-sun");
	document.getElementById("theme").classList.toggle("fa-moon");
}

//Copy hex values when clicked
function copy(hexValue) {
	navigator.clipboard.writeText(hexValue.innerText);
}

getTheme();
//Get users system theme setting

function getTheme() {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		// dark mode
		toggleDarkLightMode();
	}
}

//check for changes in users system theme setting
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", (event) => {
		//Check the current setting and only change if it doesnt match
		if (event.matches && !document.body.classList.contains("dark-theme")) {
			//dark
			toggleDarkLightMode();
		} else if (
			!event.matches &&
			document.body.classList.contains("dark-theme")
		) {
			//light
			toggleDarkLightMode();
		}
	});
