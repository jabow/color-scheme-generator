const colorInput = document.getElementById("color-picker");
const modeInput = document.getElementById("mode-selector");
const form = document.getElementById("get-scheme");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const color = colorInput.value.slice(1);
	const mode = modeInput.value;
	console.log(color + " " + mode);

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
		document.getElementById(`color${count}`).style.backgroundColor =
			document.getElementById(`hex${count}`).innerText = color.hex.value;
		count++;
	}
}
