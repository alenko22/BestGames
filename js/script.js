const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu__close');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav__link');

if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
        mobileMenu.classList.add('mobile-menu--active');
        document.body.style.overflow = 'hidden';
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('mobile-menu--active');
            document.body.style.overflow = '';
        });
    }

    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('mobile-menu--active');
                document.body.style.overflow = '';
            });
        });
    }
}


const slides = document.querySelectorAll('.slider__slide');
if (slides.length > 0) {
    const indicators = document.querySelectorAll('.slider__indicator');
    const prevBtn = document.querySelector('.slider__arrow--prev');
    const nextBtn = document.querySelector('.slider__arrow--next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('slider__slide--active');
        });
        
        if (indicators.length > 0) {
            indicators.forEach(indicator => {
                indicator.classList.remove('slider__indicator--active');
            });
        }
        
        slides[index].classList.add('slider__slide--active');
        if (indicators.length > index) {
            indicators[index].classList.add('slider__indicator--active');
        }
        currentSlide = index;
    }
    
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                resetSlideInterval();
            });
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
            resetSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
            resetSlideInterval();
        });
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        }, 5000);
    }
    
    startSlideInterval();
    
    const slider = document.querySelector('.slider__container');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
}

const searchInput = document.querySelector('.search__input');
const searchSuggestions = document.querySelector('.search__suggestions');
const suggestionItems = document.querySelectorAll('.search__suggestion');

if (searchInput && searchSuggestions) {
    searchInput.addEventListener('focus', () => {
        searchSuggestions.style.display = 'block';
    });
    
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchSuggestions.style.display = 'none';
        }, 200);
    });
    
    if (suggestionItems.length > 0) {
        suggestionItems.forEach(item => {
            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                searchInput.value = item.textContent;
                searchSuggestions.style.display = 'none';
                console.log(`Поиск по жанру: ${item.textContent}`);
            });
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '#!' && !href.includes('javascript')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 70;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

const animateOnScroll = function() {
    const elements = document.querySelectorAll('.advantage-card, .game-card, .partner-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

const animatedElements = document.querySelectorAll('.advantage-card, .game-card, .partner-card');
if (animatedElements.length > 0) {
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    setTimeout(animateOnScroll, 100);
}

if (window.location.pathname.includes('index_light.html')) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.href = 'index.html';
        themeToggle.setAttribute('aria-label', 'Переключить на темную тему');
    }
}

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    if (!form.id || !form.id.includes('catalog')) {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff3860';
                    
                    let errorElement = field.nextElementSibling;
                    while (errorElement && !errorElement.classList.contains('form-error')) {
                        errorElement = errorElement.nextElementSibling;
                    }
                    
                    if (errorElement && errorElement.classList.contains('form-error')) {
                        errorElement.textContent = 'Это поле обязательно для заполнения';
                    }
                } else {
                    field.style.borderColor = '';
                    
                    let errorElement = field.nextElementSibling;
                    while (errorElement && !errorElement.classList.contains('form-error')) {
                        errorElement = errorElement.nextElementSibling;
                    }
                    
                    if (errorElement && errorElement.classList.contains('form-error')) {
                        errorElement.textContent = '';
                    }
                }
            });
            
            const passwordField = this.querySelector('#password');
            const confirmPasswordField = this.querySelector('#confirm-password');
            
            if (passwordField && confirmPasswordField && passwordField.value && confirmPasswordField.value) {
                if (passwordField.value !== confirmPasswordField.value) {
                    isValid = false;
                    confirmPasswordField.style.borderColor = '#ff3860';
                    
                    let errorElement = confirmPasswordField.nextElementSibling;
                    while (errorElement && !errorElement.classList.contains('form-error')) {
                        errorElement = errorElement.nextElementSibling;
                    }
                    
                    if (errorElement && errorElement.classList.contains('form-error')) {
                        errorElement.textContent = 'Пароли не совпадают';
                    }
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля корректно');
            }
        });
    }
});

const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        this.style.borderColor = '';
        
        let errorElement = this.nextElementSibling;
        while (errorElement && !errorElement.classList.contains('form-error')) {
            errorElement = errorElement.nextElementSibling;
        }
        
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.textContent = '';
        }
    });
});
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

const tabs = document.querySelectorAll('.admin-tab');
const tabPanes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('admin-tab--active'));
        tabPanes.forEach(p => p.classList.remove('tab-pane--active'));
        
        this.classList.add('admin-tab--active');
        
        document.getElementById(tabId).classList.add('tab-pane--active');
    });
});

const gamesData = [
    {
        id: 1,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        developer: "CD Projekt Red",
        price: 1299,
        rating: 4.5,
        imageUrl: "img/witcher.jpeg"
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        genre: "RPG",
        developer: "CD Projekt Red",
        price: 1999,
        rating: 4,
        imageUrl: "img/cyberpunk.jpeg"
    },
    {
        id: 3,
        title: "Baldur's Gate 3",
        genre: "RPG",
        developer: "Larian Studios",
        price: 3599,
        rating: 5,
        imageUrl: "img/bg3.jpeg"
    },
    {
        id: 4,
        title: "Call of Duty: Modern Warfare III",
        genre: "Шутер",
        developer: "Infinity Ward",
        price: 3999,
        rating: 4,
        imageUrl: "img/COD.jpeg"
    },
    {
        id: 5,
        title: "EA Sports FC 24",
        genre: "Спорт",
        developer: "EA Sports",
        price: 4499,
        rating: 3.5,
        imageUrl: "img/FC_24.jpeg"
    },
    {
        id: 6,
        title: "Diablo IV",
        genre: "RPG",
        developer: "Blizzard",
        price: 5299,
        rating: 4,
        imageUrl: "img/diablo.jpeg"
    },
    {
        id: 7,
        title: "Resident Evil 4 Remake",
        genre: "Хоррор",
        developer: "Capcom",
        price: 3799,
        rating: 5,
        imageUrl: "img/RE_4.jpeg"
    },
    {
        id: 8,
        title: "Starfield",
        genre: "RPG",
        developer: "Bethesda",
        price: 4299,
        rating: 4,
        imageUrl: "img/starfield.jpeg"
    },
    {
        id: 9,
        title: "Hogwarts Legacy",
        genre: "Приключение",
        developer: "Avalanche Software",
        price: 3499,
        rating: 4.5,
        imageUrl: "img/hogleg.jpeg"
    },
    {
        id: 10,
        title: "Minecraft",
        genre: "Песочница",
        developer: "Mojang",
        price: 1999,
        rating: 4.5,
        imageUrl: "img/minecraft.jpeg"
    },
    {
        id: 11,
        title: "Grand Theft Auto V",
        genre: "Приключение",
        developer: "Rockstar Games",
        price: 1499,
        rating: 5,
        imageUrl: "img/gta_v.jpeg"
    },
    {
        id: 12,
        title: "Red Dead Redemption 2",
        genre: "Приключение",
        developer: "Rockstar Games",
        price: 2499,
        rating: 5,
        imageUrl: "img/rdr_2.jpeg"
    }
];

const gamesGrid = document.getElementById('games-grid');

function renderGames(games, viewMode = 'grid') {
    gamesGrid.innerHTML = '';
    gamesGrid.className = `games-grid ${viewMode}-view`;
    
    games.forEach(game => {
        const ratingStars = getRatingStars(game.rating);
        
        const gameCard = document.createElement('a');
        gameCard.href = '#';
        gameCard.className = 'game-card';
        
        gameCard.innerHTML = `
            <div class="game-card__image">
                <img src="${game.imageUrl}" alt="Ведьмак 3" class="game-card__picture">
            </div>
            <div class="game-card__content">
                <h3 class="game-card__title">${game.title}</h3>
                <div class="game-card__info">
                    <span class="game-card__genre">${game.genre}</span>
                    <span class="game-card__developer">${game.developer}</span>
                </div>
                <div class="game-card__rating">
                    ${ratingStars}
                </div>
                <div class="game-card__footer">
                    <div class="game-card__price">${game.price.toLocaleString('ru-RU')} ₽</div>
                    <span class="game-card__link">Подробнее</span>
                </div>
            </div>
        `;
        
        gamesGrid.appendChild(gameCard);
    });
}

function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

renderGames(gamesData, 'grid');

const viewButtons = document.querySelectorAll('.catalog-view__btn');
viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        viewButtons.forEach(btn => btn.classList.remove('catalog-view__btn--active'));
        this.classList.add('catalog-view__btn--active');
        
        const viewMode = this.getAttribute('data-view');
        renderGames(gamesData, viewMode);
    });
});

const filterToggle = document.getElementById('filter-toggle');
const sidebar = document.getElementById('catalog-sidebar');
const sidebarClose = document.getElementById('sidebar-close');

if (filterToggle) {
    filterToggle.addEventListener('click', function() {
        sidebar.classList.add('catalog-sidebar--active');
        document.body.style.overflow = 'hidden';
    });
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('catalog-sidebar--active');
        document.body.style.overflow = '';
    });
}

sidebar.addEventListener('click', function(e) {
    if (e.target === sidebar) {
        sidebar.classList.remove('catalog-sidebar--active');
        document.body.style.overflow = '';
    }
});

const searchToggle = document.getElementById('mobile-search-toggle');
const mobileSearch = document.getElementById('mobile-search');

if (searchToggle && mobileSearch) {
    let searchVisible = false;
    
    searchToggle.addEventListener('click', function() {
        searchVisible = !searchVisible;
        mobileSearch.style.display = searchVisible ? 'flex' : 'none';
    });
}

const paginationNumbers = document.querySelectorAll('.pagination-number');
const prevBtn = document.querySelector('.pagination-btn--prev');
const nextBtn = document.querySelector('.pagination-btn--next');

paginationNumbers.forEach(number => {
    number.addEventListener('click', function() {
        paginationNumbers.forEach(n => n.classList.remove('pagination-number--active'));
        this.classList.add('pagination-number--active');
        
        const pageNum = this.textContent;
        console.log(`Загрузка страницы ${pageNum}`);
    });
});