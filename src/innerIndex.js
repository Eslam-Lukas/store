export default function index() {
	const theme = localStorage.getItem('theme')
		? JSON.parse(localStorage.getItem('theme'))
		: { background: '#777', variant: 'primary' };
	let variantColor;
	switch (theme.variant) {
		case 'Secondary':
			variantColor = '#697179';
			break;
		case 'Success':
			variantColor = '#188351';
			break;
		case 'pills':
			variantColor = '#ffffff';
			break;
		case 'Danger':
			variantColor = '#d53343';
			break;
		case 'Warning':
			variantColor = '#ffc107';
			break;
		case 'Info':
			variantColor = '#0dcaf0';
			break;
		case 'Light':
			variantColor = '#f8f9fa';
			break;
		case 'Dark':
			variantColor = '#212529';
			break;
		default:
			variantColor = '#0d6efd';
			break;
	}

	//order
	let saveCheck = document.getElementById('save-check'),
		adressTitle = document.getElementById('adress-title');
	if (saveCheck) {
		saveCheck.addEventListener('change', (e) => {
			if (e.target.checked) {
				adressTitle.classList.remove('close-save');
				adressTitle.classList.add('open');
			} else {
				adressTitle.classList.add('close-save');
				adressTitle.classList.remove('open');
			}
		});
	}

	//// control panel
	let spanColor = document.querySelectorAll('.color-bick'),
		spanVariant = document.querySelectorAll('.variant-bick');

	const themeControol = () => {
		if (theme) {
			spanColor.forEach((e) =>
				e.getAttribute('data-color') === theme.background
					? e.classList.add('active')
					: e.classList.remove('active'),
			);
			spanVariant.forEach((e) =>
				e.getAttribute('data-variant') === theme.variant
					? e.classList.add('active')
					: e.classList.remove('active'),
			);
		}
		spanColor.forEach((e) =>
			e.addEventListener('click', () => {
				spanColor.forEach((e) => e.classList.remove('active'));
				theme.background = e.getAttribute('data-color');
				localStorage.setItem('theme', JSON.stringify(theme));
				document.body.style.setProperty('--background-main', theme.background);
				return e.classList.add('active');
			}),
		);
		spanVariant.forEach((e) =>
			e.addEventListener('click', () => {
				spanVariant.forEach((e) => e.classList.remove('active'));
				theme.variant = e.getAttribute('data-variant');
				localStorage.setItem('theme', JSON.stringify(theme));
				document.body.style.setProperty(
					'--variant-color',
					e.getAttribute('data-color'),
				);
				return e.classList.add('active');
			}),
		);
	};
	document.body.style.setProperty('--background-main', theme.background);
	document.body.style.setProperty('--variant-color', variantColor);
	themeControol();
}
//nav bar
export const navControol = () => {
	let windowLocation = window.location.href.split('/')[3];
	let navLinks = document.querySelectorAll('a.nav-link-css');
	function clickCheck() {
		navLinks.forEach((e, i) => {
			if (i !== navLinks.length - 1) {
				e.addEventListener('click', (ele) => {
					navLinks.forEach((e) => {
						e.classList.remove('active');
					});
					ele.currentTarget.classList.add('active');
				});
			}
		});
	}
	function activeOnLoad() {
		if (!windowLocation || windowLocation === '') {
			navLinks.forEach((e) => {
				e.classList.remove('active');
			});
			navLinks[0].classList.add('active');
		} else {
			navLinks.forEach((ele) => {
				if (`/${windowLocation}` === ele.getAttribute('href')) {
					navLinks.forEach((e) => {
						e.classList.remove('active');
					});
					ele.classList.add('active');
				}
			});
		}
	}
	activeOnLoad();
	clickCheck();
};

export const handelExtend = () => {
	let btnExtend = document.querySelectorAll('.btn-order-extend');
	let left = 85 / (btnExtend.length - 1);
	btnExtend.forEach((e, i) => {
		e.style.left = `${i * left + 3}%`;
	});
};
