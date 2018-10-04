const src = './gulp';
const dest = './build';

module.exports = {
	src,
	dest,
	css: {
		src: `${src}/css/*.css`,
		dest: `${dest}/assets/css`,
	},
	images: {
		src: `${src}/images/**`,
		dest: `${dest}/assets/images`,
	},
	templates: {
		src: `${src}/templates/*.twig`,
		dest: `${dest}`,
	},
	html: {
		src: `${dest}/*.html`,
		dest: `${dest}`,
	},
};
