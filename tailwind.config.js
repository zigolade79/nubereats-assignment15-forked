const colors = require('tailwindcss/colors')

module.exports = {
	purge: [
		'./src/**/*.tsx',

	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		
		truncate: {
			lines: {
				3: "3",
				4: "4",
				5: "5",
				8: "8",
			},
		},
		extend: {colors:{
			amber: colors.amber
		},},
	},
	variants: {
		extend: {
			display: ["group-hover"],
		},
	},
	plugins: [require("tailwindcss-truncate-multiline")()],
};
