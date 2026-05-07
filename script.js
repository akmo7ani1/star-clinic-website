// === السلايدر المتحرك ===
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentSlide = 0;
let slideInterval;

// إنشاء النقاط
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = index;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  resetInterval();
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

function prevSlide() {
  let prev = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(prev);
}

// أزرار التنقل
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener('click', () => {  prevSlide();
  resetInterval();
});

function startInterval() {
  slideInterval = setInterval(nextSlide, 5000); // تغيير كل 5 ثواني
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// بدء السلايدر
startInterval();

// === القائمة في الجوال ===
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
  });
});

// === معالجة نموذج الحجز ===
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();
    // تحقق من البيانات
  if (!name || !phone || !service) {
    alert('⚠️ يرجى ملء جميع الحقول المطلوبة');
    return;
  }
  
  // تحقق من رقم الهاتف اليمني
  if (!/^967\d{9}$/.test(phone)) {
    alert('⚠️ رقم الهاتف يجب أن يكون بالصيغة: 967771234567');
    return;
  }
  
  // إنشاء رسالة واتساب
  let whatsappMessage = `مرحباً عيادة النجم \nأريد حجز موعد:\n\n`;
  whatsappMessage += `👤 الاسم: ${name}\n`;
  whatsappMessage += `📱 الهاتف: ${phone}\n`;
  whatsappMessage += `🦷 الخدمة: ${service}\n`;
  if (message) {
    whatsappMessage += `📝 ملاحظات: ${message}\n`;
  }
  
  const whatsappURL = `https://wa.me/967774645494?text=${encodeURIComponent(whatsappMessage)}`;
  
  // تأكيد وإرسال
  if (confirm('✅ تم استلام طلبك بنجاح!\n\nهل ترغب في إرسال التفاصيل عبر واتساب للتأكيد الفوري؟')) {
    window.open(whatsappURL, '_blank');
  }
  
  // إعادة تعيين النموذج
  this.reset();
  alert('🎉 شكرًا لك! سيتم التواصل معك قريباً لتأكيد الموعد');
});

// === تأثير التمرير السلس ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }  });
});

// === تأثير الظهور عند التمرير ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// مراقبة العناصر
document.querySelectorAll('.service-card, .feature-item, .gallery-item, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// === تغيير شكل الهيدر عند التمرير ===
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// === تكبير الصور في المعرض ===
document.querySelectorAll('.gallery-item').forEach(item => {  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    const src = img.getAttribute('src');
    
    // إنشاء نافذة منبثقة
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    modal.innerHTML = `
      <div class="modal-content">
        <img src="${src}" alt="صورة مكبرة"/>
        <button class="modal-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // إغلاق النافذة
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.remove();
      }
    });
    
    // إضافة CSS للنافذة المنبثقة
    if (!document.getElementById('modal-style')) {
      const style = document.createElement('style');
      style.id = 'modal-style';
      style.textContent = `
        .image-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s;
        }
        .modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        .modal-content img {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 12px;
        }
        .modal-close {
          position: absolute;          top: -40px;
          left: 0;
          background: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .modal-close:hover {
          transform: rotate(90deg);
        }
      `;
      document.head.appendChild(style);
    }
  });
});