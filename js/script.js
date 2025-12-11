// Мобильное меню (общее для всех страниц)
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu__close');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav__link');

if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
        mobileMenu.classList.add('mobile-menu--active');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('mobile-menu--active');
        document.body.style.overflow = '';
    });
}

if (mobileMenuLinks.length > 0) {
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('mobile-menu--active');
            document.body.style.overflow = '';
        });
    });
}

// Закрытие меню при клике вне области
if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('mobile-menu--active');
            document.body.style.overflow = '';
        }
    });
}

// Слайдер (только для главной страницы)
const slides = document.querySelectorAll('.slider__slide');
if (slides.length > 0) {
    const indicators = document.querySelectorAll('.slider__indicator');
    const prevBtn = document.querySelector('.slider__arrow--prev');
    const nextBtn = document.querySelector('.slider__arrow--next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Скрыть все слайды
        slides.forEach(slide => {
            slide.classList.remove('slider__slide--active');
        });
        
        // Убрать активный класс со всех индикаторов
        if (indicators.length > 0) {
            indicators.forEach(indicator => {
                indicator.classList.remove('slider__indicator--active');
            });
        }
        
        // Показать текущий слайд
        slides[index].classList.add('slider__slide--active');
        if (indicators.length > index) {
            indicators[index].classList.add('slider__indicator--active');
        }
        currentSlide = index;
    }
    
    // Инициализация индикаторов
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                resetSlideInterval();
            });
        });
    }
    
    // Навигация стрелками
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
    
    // Функция для сброса интервала автопрокрутки
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Функция для запуска автопрокрутки
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        }, 5000);
    }
    
    // Автоматическое переключение слайдов
    startSlideInterval();
    
    // Остановка автопрокрутки при наведении
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

// Поиск с подсказками (только для главной страницы)
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
    
    // Обработка выбора подсказки
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

// Плавная прокрутка для якорных ссылок (общее для всех страниц)
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

// Анимация при скролле (только для главной страницы)
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

// Инициализация анимации только если есть анимируемые элементы
const animatedElements = document.querySelectorAll('.advantage-card, .game-card, .partner-card');
if (animatedElements.length > 0) {
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Запуск анимации для видимых элементов при загрузке
    setTimeout(animateOnScroll, 100);
}

// Тема для index_light.html
if (window.location.pathname.includes('index_light.html')) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.href = 'index.html';
        themeToggle.setAttribute('aria-label', 'Переключить на темную тему');
    }
}

// Валидация форм (общее для всех страниц с формами)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    // Пропускаем форму каталога, если она есть
    if (!form.id || !form.id.includes('catalog')) {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff3860';
                    
                    // Находим ближайший элемент с ошибкой
                    let errorElement = field.nextElementSibling;
                    while (errorElement && !errorElement.classList.contains('form-error')) {
                        errorElement = errorElement.nextElementSibling;
                    }
                    
                    if (errorElement && errorElement.classList.contains('form-error')) {
                        errorElement.textContent = 'Это поле обязательно для заполнения';
                    }
                } else {
                    field.style.borderColor = '';
                    
                    // Находим ближайший элемент с ошибкой
                    let errorElement = field.nextElementSibling;
                    while (errorElement && !errorElement.classList.contains('form-error')) {
                        errorElement = errorElement.nextElementSibling;
                    }
                    
                    if (errorElement && errorElement.classList.contains('form-error')) {
                        errorElement.textContent = '';
                    }
                }
            });
            
            // Проверка паролей на странице регистрации
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

// Сброс ошибок при вводе в поля форм
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
// Функция для форматирования цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Функция для отображения рейтинга в звездах
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