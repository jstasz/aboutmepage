import aboutMePage from "../images/aboutMePage.png";
// import guessMyNumber from "../images/guessMyNumber.png";
import sweetWebsitePage from "../images/sweetWebsitePage.png";
// import diceGame from "../images/diceGame.png";
// import bankistApp from "../images/bankistApp.png";
import restaurantsApp from "../images/restaurantsApp.jpg";
import weatherApp from "../images/weatherApp.png";
import recipesApp from '../images/recipesApp.png'

const projectsContainer = document.querySelector(".project__container");
const watchProjects = document.querySelector(".project__watch-projects");
const watchGit = document.querySelector(".project__watch-more");
const projectsArray = [];

class Project {
	constructor(title, description, technologies, img, www = "", prepair = false) {
		this.title = title;
		this.description = description;
		this.technologies = technologies;
		this.img = img;
		this.www = www;
		this.prepair = prepair;
		this._addTotable();
	}

	_addTotable() {
		projectsArray.push(this);
	}

	_projectMarkup() {
		const boxSide = projectsArray.length % 2 === 0 ? `left` : `right`;
		const markUp = `
			<div class="project__box project__box--${boxSide}">
				<img class="project__picture" src="${this.img}" alt="zdjęcie projektu ${this.title
			}"/>
				<div class="project__content">
					<div class="project__icons">
						<a class="project__icons-gitlink" href="https://github.com/jstasz/${this.title.replaceAll(
				" ",
				"-"
			)}" target="_blank"><i class="fa-brands fa-github-square"></i></a>
						${this.www === ""
				? ""
				: `<a class="project__icons-livelink" href="${this.www}" target="_blank"><i class="fa-regular fa-images"></i></a>`
			}
					</div>
					<div class="project__text">
						<h3 class="project__title section-title">${this.prepair === true ? this.title + " (w trakcie)" : this.title
			}</h3>
						<p class="project__description">${this.description}</p>
						<p class="project__technologies"> ${this.technologies}</p>
					</div>
				</div>
			</div>`;

		projectsContainer.insertAdjacentHTML("beforeend", markUp);
	}
}

const projectSweetWebsiteShop = new Project(
	`sweet website shop`,
	`Sklep internetowy, służący do składania zamówienia na troty artystyczne. Użytkownik może wybrać smak, wygląd i wielkość tortu. Zamówienie może złożyć on-line lub wysyłając wiadomość poprzez formularz kontaktowy.`,
	`Angular Typescript.`,
	sweetWebsitePage,
	"https://sweet-website-shop.netlify.app/"
);

const projectRecipesApp = new Project(
	`recipes app react`,
	`Aplikacja umozliwiająca przeglądanie przepisów (korzysta z tasty API). Dla zalogowanych uzytkowników dodatkowo posiada funkcję dodawania własnych przepisów oraz tworzenie listy zakupów. Lista przepisów oraz zakupów przechowywana na koncie uzytkownika - firebase.`,
	`React Typescript`,
	recipesApp,
	"https://react-hosting-ad9af.firebaseapp.com/"
);

const projectWeatherApp = new Project(
	`weather app`,
	`Aplikacja pobierająca pogodę na podstawie lokalizacji użytkownika. Dostęp do danych z obecnego dnia (także kolejne godziny), dnia wcześniejszego oraz 5 kolejnych dni. Informacje na temat temperatury, przewidywanych opadów. Zmiana tła aplikacji w zależności od pogody.`,
	`Angular(ngRx) Typescript.`,
	weatherApp
);

const projectRestaurantsApp = new Project(
	`restaurants app`,
	`Aplikacja umożliwiająca użytkownikowi dodawanie na mapie restauracji, które odwiedził. Aplikacja tworzy listę restauracji z oceną użytkownika (jedzenie, serwis, cena i ogólne wrażenie). Dla każdej restauracji obliczana jest średnia ocena. Mapa wchodzi w interakcję z listą restauracji. Dane zapisywane w local storage.`,
	`HTML CSS JavaScript`,
	restaurantsApp,
	"https://jsta-restaurants-app.netlify.app/"
);

// const projectBankistApp = new Project(
// 	`bankist app`,
// 	`Aplikacja banku umożliwiająca (po zalogowaniu danego użytkownika) przesyłanie pieniędzy, wnioskowanie o kredyt, zamykanie konta. Użytkownik widzi aktualny stan konta, historię operacji(z możliwością sortowania) oraz sumę wpłat i wypłat. Automatyczne wylogowanie wyloguje użytkownika po 5 minutach bezczynności. HTML, CSS, JavaScript`,
// 	bankistApp
// );

const projectAboutmePage = new Project(
	"about me page",
	`Responsywna strona z projektami. Zawiera podstawowe informacje na temat autora,  portfolio oraz formularz kontaktowy. Projekt zakłada łatwe dodawanie kolejnych projektów poprzez dołączenie ich nazwy i opisu do specjalnego pliku js. Ikona GitHub zajadująca się przy każdym projekcie działa jako odsyłacz do kodu dostępnego na gitHubie.`,
	`HTML CSS JavaScript`,
	aboutMePage,
	"https://jsta18.netlify.app/"
);

// const projectGuessMyNumber = new Project(
// 	`guess my number`,
// 	`Gra dla jednej osoby polegająca na odnalezieniu prawidłowego numeru od 0 do 20. Prawidłowa liczba jest przypisywana losowo. Użytkownik na start dosteje 20 pkt. Przy każdej nieudanej próbie wskazania numeru, dostaje informację czy liczba jest za mała czy za duża oraz otrzymuje -1 punkt. Najwyższy zdobyty wynik jest przechowywany dla użytkownika.`,
// 	guessMyNumber
// );

// const projectDiceGame = new Project(
// 	`dice game`,
// 	`Gra dla 2 użytkowników polegająca na rzucaniu kostką. Użytkownik rzuca kostką i zdobywa punkty dopóki nie wyrzuci 1 oczka lub nie odda kolejki drugiej osobie. W momecie wyrzucenia 1 oczka, użytkownik traci swoją kolejkę oraz zerują mu się zdobyte w danej rundzie punkty. Wygrywa osoba, która szybciej osiągnie wynik 100 punktów.`,
// 	diceGame
// );

class App {
	#part = 1;
	#projectsPart = 3;

	constructor() {
		this._showProjects()
		watchProjects.addEventListener("click", this._changePart.bind(this));
	}

	_divideProjects(part) {
		const start = (this.#part - 1) * this.#projectsPart;
		const end = this.#part * this.#projectsPart;
		return projectsArray.slice(start, end);
	}

	_renderProjects() {
		this._divideProjects(this.part).forEach((project) => {
			project._projectMarkup();
		});
	}

	_changePart() {
		this.#part++;
		this._renderProjects(this.#part);
		this._changeButton();
	}

	_showProjects() {
		this._renderProjects(1);
		watchProjects.style.visibility = "visible";
	}

	_changeButton() {
		const partsCount = Math.ceil(projectsArray.length / this.#projectsPart);

		if (this.#part === partsCount) {
			watchGit.classList.remove("hidden");
			watchProjects.classList.add("hidden");
		}
	}
}

const projectsApp = new App();
