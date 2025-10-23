// Sidebar toggle
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const sidebar = document.querySelector('[data-sidebar]');

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Navegación entre pestañas
document.querySelectorAll('[data-nav-link]').forEach(navBtn => {
  navBtn.addEventListener('click', function() {
    const targetPage = this.textContent.trim().toLowerCase();
    
    // Remover active de todos los botones y páginas
    document.querySelectorAll('[data-nav-link]').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('article[data-page]').forEach(page => page.classList.remove('active'));
    
    // Activar botón clickeado
    this.classList.add('active');
    
    // Activar página correspondiente
    const targetArticle = document.querySelector(`article[data-page="${targetPage}"]`);
    if (targetArticle) {
      targetArticle.classList.add('active');
    }
  });
});

// Filtrado de proyectos
document.querySelectorAll('[data-filter-btn]').forEach(btn => {
  btn.addEventListener('click', function() {
    // Actualizar botones de filtro
    document.querySelectorAll('[data-filter-btn]').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const filterValue = this.textContent.trim().toLowerCase();
    filterProjects(filterValue);
  });
});

// Filtrado con select (para móviles)
const filterSelect = document.querySelector('[data-select]');
const selectList = document.querySelector('.select-list');
const selectValue = document.querySelector('[data-selecct-value]');

if (filterSelect) {
  filterSelect.addEventListener('click', () => {
    filterSelect.classList.toggle('active');
    selectList.classList.toggle('active');
  });

  // Cerrar select al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!filterSelect.contains(e.target)) {
      filterSelect.classList.remove('active');
      selectList.classList.remove('active');
    }
  });

  // Seleccionar opción del select
  document.querySelectorAll('[data-select-item]').forEach(item => {
    item.addEventListener('click', function() {
      const filterValue = this.textContent.trim().toLowerCase();
      selectValue.textContent = this.textContent;
      filterSelect.classList.remove('active');
      selectList.classList.remove('active');
      
      // Actualizar botones de filtro
      document.querySelectorAll('[data-filter-btn]').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === filterValue);
      });
      
      filterProjects(filterValue);
    });
  });
}

// Función para filtrar proyectos
function filterProjects(filterValue) {
  const projectItems = document.querySelectorAll('[data-filter-item]');
  
  projectItems.forEach(item => {
    if (filterValue === 'todos') {
      item.classList.add('active');
    } else {
      const category = item.getAttribute('data-category');
      if (category.includes(filterValue)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }
  });
}

// Modales de proyectos
document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const modalId = this.getAttribute('data-open-modal');
    const modal = document.getElementById(`modal-${modalId}`);
    
    if (modal) {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Inicializar carrusel para este modal
      setupCarousel(modalId);
    }
  });
});

// Cerrar modales
document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', function() {
    const modal = this.closest('.modal-overlay');
    closeModal(modal);
  });
});

// Cerrar modal al hacer click fuera
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      if (modal.style.display === 'flex') {
        closeModal(modal);
      }
    });
  }
});

function closeModal(modal) {
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Configurar carrusel para cada proyecto
function setupCarousel(projectId) {
  const carousel = document.querySelector(`[data-carousel="${projectId}"]`);
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('[data-slide-index]');
  const thumbs = document.querySelectorAll(`[data-thumbs="${projectId}"] img`);
  const prevBtn = carousel.querySelector('[data-prev]');
  const nextBtn = carousel.querySelector('[data-next]');
  
  let currentSlide = 0;
  
  function showSlide(index) {
    // Ocultar todas las slides
    slides.forEach(slide => {
      slide.style.display = 'none';
    });
    
    // Mostrar slide actual
    slides[index].style.display = 'block';
    
    // Actualizar thumbs
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
  }
  
  // Mostrar primera slide
  showSlide(0);
  
  // Event listeners para controles
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    });
  }
  
  // Event listeners para thumbs
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      showSlide(index);
    });
  });
}

// Formulario de contacto
const contactForm = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (contactForm && formBtn) {
  // Habilitar/deshabilitar botón según campos completos
  function checkForm() {
    let allFilled = true;
    formInputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });
    
    formBtn.disabled = !allFilled;
  }
  
  // Verificar formulario al escribir
  formInputs.forEach(input => {
    input.addEventListener('input', checkForm);
  });
  
  // Enviar formulario
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envío
    formBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Enviado</span>';
    formBtn.style.background = 'var(--bg-gradient-yellow1)';
    
    setTimeout(() => {
      contactForm.reset();
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Enviar mensaje</span>';
      formBtn.style.background = '';
      formBtn.disabled = true;
      
      // Mostrar mensaje de éxito
      alert('¡Mensaje enviado! Gracias por contactarme.');
    }, 1500);
  });
  
  // Verificar estado inicial del formulario
  checkForm();
}

// Inicializar carruseles al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const projectIds = ['eliteble', 'sqlapp', 'flowday', 'flowpay', 'ventrix', 'mantenimiento', 'presupuesto'];
  projectIds.forEach(id => {
    // Solo inicializar los controles, las slides se mostrarán cuando se abra el modal
    const carousel = document.querySelector(`[data-carousel="${id}"]`);
    if (carousel) {
      // Asegurarse de que solo la primera slide sea visible
      const slides = carousel.querySelectorAll('[data-slide-index]');
      slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
      });
    }
  });
});