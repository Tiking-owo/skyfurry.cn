document.addEventListener('DOMContentLoaded', function() {
    // 滚动时导航栏变化
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '15px 20px';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.padding = '20px';
        }
    });
    
    // 移动菜单切换
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-times');
            icon.classList.toggle('fa-bars');
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 如果是移动端菜单，点击后关闭菜单
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });
    
    // 图片懒加载
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src; // 触发加载
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // 不支持IntersectionObserver的浏览器直接加载所有图片
            lazyImages.forEach(img => {
                img.src = img.src;
                img.classList.add('loaded');
            });
        }
    };
    
    lazyLoadImages();
    
    // 更新版权年份
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// 图片轮播功能
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    
    // 创建指示点
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // 更新指示点状态
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }
    
    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }
    
    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }
    
    // 事件监听
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // 初始化
    createDots();
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initCarousel);



function updateCopyrightLayout() {
        const footer = document.getElementById('copyright-footer');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            footer.innerHTML = `
                &copy; <span id="current-year">2025</span> SkyFurry 保留所有权利<br>
                <a class="xa" href="https://beian.miit.gov.cn/">浙ICP备2025148805号-1</a><br>
                <img class="beian" src="./images/beian.png">
                <a class="xa" href="https://beian.mps.gov.cn/#/query/webSearch?code=33018302001830" rel="noreferrer" target="_blank">浙公网安备33018302001830号</a><br>
                <a class="xa" href="https://icp.gov.moe/?keyword=20242556">萌ICP备20242556号</a>
            `;
        } else {
            footer.innerHTML = `
                &copy; <span id="current-year">2025</span> SkyFurry 保留所有权利 | 
                <a class="xa" href="https://beian.miit.gov.cn/">浙ICP备2025148805号-1</a> |
                <img class="beian" src="./images/beian.png">
                <a class="xa" href="https://beian.mps.gov.cn/#/query/webSearch?code=33018302001830" rel="noreferrer" target="_blank">浙公网安备33018302001830号</a> |
                <a class="xa" href="https://icp.gov.moe/?keyword=20242556">萌ICP备20242556号</a>
            `;
        }
    }

    // 初始化时执行一次
    updateCopyrightLayout();
    
    // 窗口大小改变时重新检查
    window.addEventListener('resize', updateCopyrightLayout);