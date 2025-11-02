// 미네랄아연 팜플렛 상호작용
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션 초기화
    initScrollAnimations();
    
    // CTA 버튼 클릭 이벤트
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            showConsultationModal();
        });
    }

    // 카드 호버 효과
    const cards = document.querySelectorAll('.benefit-card, .mega-card, .ultimate-card, .usage-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 고객 후기 카드 클릭 효과
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });

    // 섹션별 카운터 애니메이션
    initCounterAnimations();
});

// 스크롤 애니메이션
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll(
        '.ultimate-card, .usage-card, .testimonial-card, .natural-source, .footer'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });
}

// 카운터 애니메이션
function initCounterAnimations() {
    const counters = document.querySelectorAll('.amount');
    
    const countObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        countObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.match(/\d+/));
    
    if (number) {
        let current = 0;
        const increment = number / 20;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = text.replace(/\d+/, Math.floor(current));
        }, 50);
    }
}

// 상담 모달 표시
function showConsultationModal() {
    const modal = document.createElement('div');
    modal.className = 'consultation-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>🌟 전문가 상담 신청</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <p>미네랄아연에 대한 전문적인 상담을 받아보세요.</p>
                <div class="consultation-options">
                    <div class="option-card" data-type="phone">
                        <div class="option-icon">📞</div>
                        <h4>전화 상담</h4>
                        <p>1588-0000</p>
                        <span class="option-time">평일 09:00-18:00</span>
                    </div>
                    <div class="option-card" data-type="online">
                        <div class="option-icon">💬</div>
                        <h4>온라인 상담</h4>
                        <p>실시간 채팅</p>
                        <span class="option-time">24시간 가능</span>
                    </div>
                    <div class="option-card" data-type="visit">
                        <div class="option-icon">🏢</div>
                        <h4>방문 상담</h4>
                        <p>예약 후 방문</p>
                        <span class="option-time">예약 필수</span>
                    </div>
                </div>
                <div class="modal-note">
                    <p>※ 개인의 건강 상태에 따라 적합한 상담 방법을 선택해주세요</p>
                </div>
            </div>
        </div>
    `;

    // 모달 스타일 추가
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .consultation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: white;
                border-radius: 20px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 20px 20px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .modal-body > p {
                text-align: center;
                margin-bottom: 30px;
                color: #495057;
                font-size: 1.1rem;
            }
            
            .consultation-options {
                display: grid;
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .option-card {
                border: 2px solid #e9ecef;
                border-radius: 15px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .option-card:hover {
                border-color: #667eea;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
            }
            
            .option-icon {
                font-size: 2rem;
                margin-bottom: 10px;
            }
            
            .option-card h4 {
                margin: 0 0 5px 0;
                color: #2c3e50;
                font-size: 1.1rem;
            }
            
            .option-card p {
                margin: 0 0 5px 0;
                color: #667eea;
                font-weight: 600;
            }
            
            .option-time {
                font-size: 0.9rem;
                color: #6c757d;
            }
            
            .modal-note {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                border-left: 4px solid #ffd700;
            }
            
            .modal-note p {
                margin: 0;
                font-size: 0.9rem;
                color: #495057;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .modal-body {
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(modal);

    // 모달 이벤트 처리
    const closeBtn = modal.querySelector('.close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    const optionCards = modal.querySelectorAll('.option-card');

    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    overlay.addEventListener('click', () => {
        modal.remove();
    });

    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            handleConsultationType(type);
            modal.remove();
        });
    });
}

// 상담 유형별 처리
function handleConsultationType(type) {
    switch(type) {
        case 'phone':
            alert('📞 전화상담: 1588-0000\n평일 09:00-18:00\n\n지금 전화를 걸어 전문가와 상담받아보세요!');
            break;
        case 'online':
            alert('💬 온라인 상담이 곧 시작됩니다.\n잠시만 기다려주세요...');
            break;
        case 'visit':
            alert('🏢 방문상담 예약을 도와드리겠습니다.\n담당자가 곧 연락드릴 예정입니다.');
            break;
    }
}

// 패럴랙스 스크롤 효과
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // 히어로 섹션 패럴랙스
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.2;
        hero.style.transform = `translateY(${rate}px)`;
    }

    // 내비게이션 바 효과 (필요시 추가)
    if (scrolled > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// CSS 애니메이션 클래스 추가
const additionalStyles = `
    .animate-target {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scrolled .hero {
        filter: brightness(0.8);
    }
`;

// 스타일 추가
if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = additionalStyles;
    document.head.appendChild(style);
} 