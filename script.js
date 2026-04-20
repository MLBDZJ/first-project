// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // 切换图标
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // 点击导航链接后关闭菜单（移动端）
        const navAnchors = navLinks.querySelectorAll('a');
        navAnchors.forEach(anchor => {
            anchor.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 滚动时高亮当前导航项
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // 滚动时更新导航样式
    window.addEventListener('scroll', function() {
        highlightNavOnScroll();
        toggleBackToTopButton();
    });

    // 统计数字动画
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('+') ? '+' : '';
            let current = 0;
            const increment = target / 50; // 控制动画速度

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    stat.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCount, 20);
                }
            };

            // 使用Intersection Observer触发动画
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(stat);
        });
    }

    // 返回顶部按钮
    const backToTopBtn = document.getElementById('backToTop');

    function toggleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 代码语法高亮（简单版）
    function highlightCode() {
        const codeBlocks = document.querySelectorAll('pre code');

        codeBlocks.forEach(block => {
            const code = block.textContent;
            // 简单的Python关键字高亮
            const highlighted = code
                .replace(/(def|return|while|True|import|from|as|if|else|elif|for|in|try|except|with)(?=\s|$)/g, '<span class="keyword">$1</span>')
                .replace(/(".*?"|'.*?')/g, '<span class="string">$1</span>')
                .replace(/(\d+)/g, '<span class="number">$1</span>')
                .replace(/(#.*$)/gm, '<span class="comment">$1</span>');

            block.innerHTML = highlighted;
        });
    }

    // 为代码块添加CSS类
    const style = document.createElement('style');
    style.textContent = `
        .keyword { color: #00d4ff; }
        .string { color: #00ff9d; }
        .number { color: #ffcc00; }
        .comment { color: #8888a0; font-style: italic; }
    `;
    document.head.appendChild(style);

    // 初始化所有功能
    highlightNavOnScroll();
    animateStats();
    highlightCode();

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.tech-category, .philosophy-card, .focus-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // 页面加载动画
    function pageLoadAnimation() {
        const heroContent = document.querySelector('.hero-content');
        const heroCode = document.querySelector('.hero-code');

        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';

            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }

        if (heroCode) {
            heroCode.style.opacity = '0';
            heroCode.style.transform = 'translateY(20px)';

            setTimeout(() => {
                heroCode.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
                heroCode.style.opacity = '1';
                heroCode.style.transform = 'translateY(0)';
            }, 600);
        }
    }

    // 执行页面加载动画
    setTimeout(pageLoadAnimation, 100);

    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Alt + H 跳转到首页
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Alt + T 跳转到技术栈
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            const techSection = document.getElementById('tech');
            if (techSection) {
                window.scrollTo({
                    top: techSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });

    // 控制台欢迎信息
    console.log('%c👋 你好！欢迎来到我的个人网站！', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
    console.log('%c💻 这是一个用HTML、CSS和JavaScript构建的响应式个人网站。', 'color: #6c63ff;');
    console.log('%c🚀 享受浏览吧！如果有任何建议，欢迎联系我。', 'color: #00ff9d;');
});