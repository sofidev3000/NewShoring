export const initProcessTheme = () => {
	const themeButton = document.getElementById("themeToggle");
	const element = document.documentElement; // Aplicar el tema almacenado
	const body = document.body;

	// Verificar si hay un tema almacenado en el almacenamiento local
	const savedTheme = localStorage.getItem("theme");

	if (savedTheme) {
		const isDark = element.classList.toggle("dark");
  		localStorage.setItem("theme", isDark ? "dark" : "light");
		
	}else{
		const currentTheme = "light";
		// Guardar el tema seleccionado en el almacenamiento local
		localStorage.setItem("theme", currentTheme);

		// Actualizar el texto y el icono del botón según el tema
		updateThemeButton(currentTheme);

	}

	themeButton.addEventListener("click", () => {
		// Cambiar entre temas
		element.classList.toggle("dark");
  		
		// Obtener el tema actual después del cambio
		
		const currentTheme = element.classList.contains("dark") ? "dark" : "light";
		// Guardar el tema seleccionado en el almacenamiento local
		localStorage.setItem("theme", currentTheme);

		// Actualizar la imagen
		assetsTheme(currentTheme);

	});

}


function assetsTheme(theme) {
	const assets = document.querySelectorAll("[data-theme-mode]");

	Array.from(assets).forEach((item) => {
		const attr = item.getAttribute("data-theme-mode");
		if (item.tagName === "IMG" && attr) {
			let assetTheme = item.getAttribute("src") || "";
			if (assetTheme == "")
				assetTheme =
					(item.getAttribute("data-webp-src") == "" ||
					!item.getAttribute("data-webp-src")
						? item.getAttribute("data-src")
						: item.getAttribute("data-webp-src")) || "";

			let baseTheme = assetTheme;

			try {
				// Parse the data-theme-mode attribute
				const data = JSON.parse(attr.replace(/&quot;/g, '"').replace(/\\/g, ""));

				// Ensure the assetTheme from the parsed data is not undefined or null
				if (data[theme]) {
					assetTheme = data[theme];
					// Find all similar images with the same src attribute
					let assetSimilar = document.querySelectorAll(`[src="${baseTheme}"]`);
					if (assetSimilar.length == 0)
						assetSimilar = document.querySelectorAll(
							`[data-webp-src="${baseTheme}"]`
						);
					if (assetSimilar.length == 0)
						assetSimilar = document.querySelectorAll(`[data-src="${baseTheme}"]`);

					// Update all similar images with the new src
					assetSimilar.forEach((assetsimilar) => {
						if (assetsimilar instanceof HTMLImageElement) {
							if (!assetsimilar.getAttribute("data-no-theme-change")) {
								const src = ["src", "data-wepb-src", "data-src"];
								let resource = "src";
								for (let index = 0; index < src.length; index++) {
									if (assetsimilar.getAttribute(src[index])) {
										if (assetsimilar.getAttribute(src[index]) != "") {
											resource = src[index];
										}
									}
								}
								assetsimilar.setAttribute(resource, assetTheme);
							}
						}
					});

					// Update the original image with the new src
					const src = ["src", "data-wepb-src", "data-src"];
					let resource = "src";
					for (let index = 0; index < src.length; index++) {
						if (item.getAttribute(src[index])) {
							if (item.getAttribute(src[index]) != "") {
								resource = src[index];
							}
						}
					}
					item.setAttribute(resource, assetTheme);
				}
			} catch (e) {
				console.error("Error parsing data-theme-mode JSON", e);
			}
		}
	});
}

