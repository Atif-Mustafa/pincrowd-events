// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initInteractiveAbout();
  initAchievements();
  initStories();
  initExpert();
  initExpertise();
  initWork();
  initNavigation();
  initModals();
  initContactForm();
});

// Navigation
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu
  mobileToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Scroll Animations
function initScrollAnimations() {
  // Fade in on scroll
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
// hero section
// Hero Video Handling
function initHeroVideo() {
  const hero = document.querySelector('.hero');
  const video = document.getElementById('heroVideo');
  const fallbackImage = document.querySelector('.fallback-image');

  if (video) {
    // Add loading state
    hero.classList.add('loading');

    // When video can play, remove loading state
    video.addEventListener('canplay', () => {
      hero.classList.remove('loading');
      hero.classList.add('loaded');
    });

    // If video fails to load, show fallback image
    video.addEventListener('error', () => {
      hero.classList.remove('loading');
      fallbackImage.style.display = 'block';
      console.warn('Hero video failed to load, using fallback image');
    });

    // Attempt to play video (handles autoplay restrictions)
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented, show fallback
        console.warn('Autoplay prevented:', error);
        fallbackImage.style.display = 'block';
      });
    }
  }
}

// Add to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  // ... your other init functions
});

// Interactive About Section
// function initInteractiveAbout() {
//   const circleButtons = document.querySelectorAll('.circle-button');
//   const dynamicContent = document.querySelector('.dynamic-content');

//   const contentData = {
//     why: {
//       title: 'Why We Do This',
//       text: 'We believe every event tells a story. Our passion lies in creating unforgettable moments that resonate long after the last guest leaves. We\'re driven by the joy of bringing people together and crafting experiences that matter.',
//       cta: 'Discover Our Why'
//     },
//     how: {
//       title: 'How We Create Magic',
//       text: 'Through meticulous planning, creative innovation, and flawless execution. We combine cutting-edge technology with time-tested event management expertise to deliver seamless experiences that exceed expectations.',
//       cta: 'Learn Our Process'
//     },
//     what: {
//       title: 'What We Deliver',
//       text: 'End-to-end event management solutions from concept to completion. Corporate events, product launches, award ceremonies, weddings, and everything in between. We handle every detail so you can enjoy the moment.',
//       cta: 'Explore Our Services'
//     }
//   };

//   function updateContent(key) {
//     const data = contentData[key];
//     const tl = gsap.timeline();

//     tl.to(dynamicContent, {
//       opacity: 0,
//       y: -20,
//       duration: 0.3,
//       ease: 'power2.in',
//       onComplete: () => {
//         dynamicContent.innerHTML = `
//           <h3>${data.title}</h3>
//           <p>${data.text}</p>
//           <a href="about.html" class="btn btn--gold">${data.cta}</a>
//         `;
//       }
//     })
//       .to(dynamicContent, {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         ease: 'power2.out'
//       });
//   }

//   circleButtons.forEach(button => {
//     button.addEventListener('mouseenter', () => {
//       const key = button.dataset.content;
//       updateContent(key);

//       circleButtons.forEach(btn => btn.classList.remove('active'));
//       button.classList.add('active');
//     });
//   });
//   circleButtons[0].classList.add('active');
// }

// Achievements Counter
function initAchievements() {
  const achievementNumbers = document.querySelectorAll('.number');

  achievementNumbers.forEach(number => {
    const finalValue = parseInt(number.dataset.value);

    ScrollTrigger.create({
      trigger: number,
      start: 'top 80%',
      onEnter: () => {
        let current = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
          }
          number.textContent = Math.floor(current) + '+';
        }, 30);
      }
    });
  });
}

// Stories Grid
function initStories() {
  const storyCards = document.querySelectorAll('.story-card');

  storyCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// Expertise Cards
// function initExpertise() {
//   const cards = document.querySelectorAll('.expertise-card');

//   cards.forEach((card, index) => {
//     ScrollTrigger.create({
//       trigger: card,
//       start: 'top 50%',
//       end: 'bottom 50%',
//       onEnter: () => {
//         gsap.to(card, { opacity: 1, duration: 0.5 });
//         gsap.from(card.querySelector('.content'), {
//           x: -50,
//           opacity: 0,
//           duration: 0.8,
//           delay: 0.2
//         });
//         gsap.from(card.querySelector('.image'), {
//           x: 50,
//           opacity: 0,
//           duration: 0.8,
//           delay: 0.2
//         });
//       },
//       onLeaveBack: () => {
//         gsap.to(card, { opacity: 0, duration: 0.5 });
//       }
//     });
//   });
// }
function initExpert() {
  const cards = document.querySelectorAll('.expo-card');

  cards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        gsap.to(card, { opacity: 1, duration: 0.5 });

        gsap.from(card.querySelector('.expo-content'), {
          x: -50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2
        });

        gsap.from(card.querySelector('.expo-image'), {
          x: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2
        });
      },
      onLeaveBack: () => {
        gsap.to(card, { opacity: 0, duration: 0.5 });
      }
    });
  });
}

// BY ME
function initExpertise() {
  const cards = document.querySelectorAll('.expertise-card');
  const progressDots = document.querySelectorAll('.progress-dot');
  const cardCounter = document.querySelector('.card-counter');
  const cardsSection = document.querySelector('.cards-section');

  // Function to check if cards section is in view
  function checkCardsSectionInView() {
    const rect = cardsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if section is in viewport
    const isInView = rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;

    if (isInView) {
      cardsSection.classList.add('in-view');
    } else {
      cardsSection.classList.remove('in-view');
    }
  }

  // Function to update active card
  function updateActiveCard() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate which card should be active based on scroll position
    let activeIndex = 0;

    // For each card, check if it's in the viewport
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();

      // If the card is in the viewport, set it as active
      if (cardRect.top < windowHeight / 2 && cardRect.bottom > windowHeight / 2) {
        activeIndex = index;
      }
    });

    // Update active classes
    cards.forEach((card, index) => {
      if (index === activeIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update progress dots
    progressDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update card counter
    cardCounter.textContent = `0${activeIndex + 1}`;
  }

  // Set up scroll event listeners
  window.addEventListener('scroll', function () {
    checkCardsSectionInView();
    updateActiveCard();
  });

  // Initial calls
  checkCardsSectionInView();
  updateActiveCard();

  // Add click event to progress dots for navigation
  // progressDots.forEach(dot => {
  //   dot.addEventListener('click', function () {
  //     const cardIndex = parseInt(this.getAttribute('data-card')) - 1;
  //     const card = cards[cardIndex];

  //     window.scrollTo({
  //       top: card.offsetTop,
  //       behavior: 'smooth'
  //     });
  //   });
  // });
}
// 6:36
// function initExpertise() {
//   const cards = document.querySelectorAll('.expertise-card');
//   const progressDots = document.querySelectorAll('.progress-dot');
//   const cardCounter = document.querySelector('.card-counter');
//   const cardsSection = document.querySelector('.cards-section');

//   // Function to check if cards section is in view
//   function checkCardsSectionInView() {
//     const rect = cardsSection.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     const isInView = rect.top <= windowHeight && rect.bottom >= 0;

//     if (isInView) {
//       cardsSection.classList.add('in-view');
//     } else {
//       cardsSection.classList.remove('in-view');
//     }
//   }

//   // Improved function to update active card
//   function updateActiveCard() {
//     const windowHeight = window.innerHeight;
//     let activeIndex = 0;
//     let minDistance = Infinity;

//     cards.forEach((card, index) => {
//       const cardRect = card.getBoundingClientRect();
//       const cardCenter = cardRect.top + cardRect.height / 2;
//       const viewportCenter = windowHeight / 2;
//       const distanceFromCenter = Math.abs(cardCenter - viewportCenter);

//       // Find the card closest to the center of the viewport
//       if (distanceFromCenter < minDistance) {
//         minDistance = distanceFromCenter;
//         activeIndex = index;
//       }
//     });

//     // Update active classes
//     cards.forEach((card, index) => {
//       card.classList.toggle('active', index === activeIndex);
//     });

//     // Update progress dots
//     progressDots.forEach((dot, index) => {
//       dot.classList.toggle('active', index === activeIndex);
//     });

//     // Update card counter
//     cardCounter.textContent = `0${activeIndex + 1}`;
//   }

//   // Throttle scroll events for better performance
//   let scrollTimer;
//   function throttledUpdate() {
//     if (!scrollTimer) {
//       scrollTimer = setTimeout(() => {
//         checkCardsSectionInView();
//         updateActiveCard();
//         scrollTimer = null;
//       }, 100);
//     }
//   }

//   // Set up scroll event listeners
//   window.addEventListener('scroll', throttledUpdate);

//   // Add click event to progress dots for navigation
//   progressDots.forEach(dot => {
//     dot.addEventListener('click', function () {
//       const cardIndex = parseInt(this.getAttribute('data-card')) - 1;
//       const card = cards[cardIndex];
      
//       if (card) {
//         const offsetTop = card.offsetTop - 100; // Offset for header
//         window.scrollTo({
//           top: offsetTop,
//           behavior: 'smooth'
//         });
//       }
//     });
//   });

//   // Initial calls
//   checkCardsSectionInView();
//   updateActiveCard();
  
//   // Also update on resize
//   window.addEventListener('resize', updateActiveCard);
// }
// 6:47
// function initExpertise() {
//   const cards = document.querySelectorAll('.expertise-card');
//   const progressDots = document.querySelectorAll('.progress-dot');
//   const cardCounter = document.querySelector('.card-counter');
//   const cardsSection = document.querySelector('.cards-section');

//   // Function to check if cards section is in view
//   function checkCardsSectionInView() {
//     const rect = cardsSection.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     const isInView = rect.top <= windowHeight && rect.bottom >= 0;

//     if (isInView) {
//       cardsSection.classList.add('in-view');
//     } else {
//       cardsSection.classList.remove('in-view');
//     }
//   }

//   // Improved function to update active card
//   function updateActiveCard() {
//     const windowHeight = window.innerHeight;
//     let activeIndex = 0;
//     let minDistance = Infinity;

//     cards.forEach((card, index) => {
//       const cardRect = card.getBoundingClientRect();
//       const cardCenter = cardRect.top + cardRect.height / 2;
//       const viewportCenter = windowHeight / 2;
//       const distanceFromCenter = Math.abs(cardCenter - viewportCenter);

//       // Find the card closest to the center of the viewport
//       if (distanceFromCenter < minDistance) {
//         minDistance = distanceFromCenter;
//         activeIndex = index;
//       }
//     });

//     // Update active classes
//     cards.forEach((card, index) => {
//       card.classList.toggle('active', index === activeIndex);
//     });

//     // Update progress dots
//     progressDots.forEach((dot, index) => {
//       dot.classList.toggle('active', index === activeIndex);
//     });

//     // Update card counter
//     cardCounter.textContent = `0${activeIndex + 1}`;
//   }

//   // Throttle scroll events for better performance
//   let scrollTimer;
//   function throttledUpdate() {
//     if (!scrollTimer) {
//       scrollTimer = setTimeout(() => {
//         checkCardsSectionInView();
//         updateActiveCard();
//         scrollTimer = null;
//       }, 100);
//     }
//   }

//   // Set up scroll event listeners
//   window.addEventListener('scroll', throttledUpdate);

//   // FIXED: Progress dot click handler
//   // progressDots.forEach(dot => {
//   //   dot.addEventListener('click', function () {
//   //     const cardIndex = parseInt(this.getAttribute('data-card')) - 1;
//   //     const card = cards[cardIndex];
      
//   //     if (card) {
//   //       // Get the position of the cards section
//   //       const cardsSection = document.querySelector('.cards-section');
//   //       const sectionTop = cardsSection.offsetTop;
        
//   //       // Calculate the scroll position relative to the cards section
//   //       const cardOffsetInSection = card.offsetTop - sectionTop;
        
//   //       // Final scroll position: section top + card offset - header height
//   //       const headerHeight = 80; // Adjust this based on your header height
//   //       const scrollPosition = sectionTop + cardOffsetInSection - headerHeight;
        
//   //       window.scrollTo({
//   //         top: scrollPosition,
//   //         behavior: 'smooth'
//   //       });
//   //     }
//   //   });
//   // });
//   function initExpertise() {
//   const cards = document.querySelectorAll('.expertise-card');
//   const progressDots = document.querySelectorAll('.progress-dot');
//   const cardCounter = document.querySelector('.card-counter');
//   const cardsSection = document.querySelector('.cards-section');

//   // Function to check if cards section is in view
//   function checkCardsSectionInView() {
//     const rect = cardsSection.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     const isInView = rect.top <= windowHeight && rect.bottom >= 0;

//     if (isInView) {
//       cardsSection.classList.add('in-view');
//     } else {
//       cardsSection.classList.remove('in-view');
//     }
//   }

//   // Improved function to update active card
//   function updateActiveCard() {
//     const windowHeight = window.innerHeight;
//     let activeIndex = 0;
//     let minDistance = Infinity;

//     cards.forEach((card, index) => {
//       const cardRect = card.getBoundingClientRect();
//       const cardCenter = cardRect.top + cardRect.height / 2;
//       const viewportCenter = windowHeight / 2;
//       const distanceFromCenter = Math.abs(cardCenter - viewportCenter);

//       // Find the card closest to the center of the viewport
//       if (distanceFromCenter < minDistance) {
//         minDistance = distanceFromCenter;
//         activeIndex = index;
//       }
//     });

//     // Update active classes
//     cards.forEach((card, index) => {
//       card.classList.toggle('active', index === activeIndex);
//     });

//     // Update progress dots
//     progressDots.forEach((dot, index) => {
//       dot.classList.toggle('active', index === activeIndex);
//     });

//     // Update card counter
//     cardCounter.textContent = `0${activeIndex + 1}`;
//   }

//   // Throttle scroll events for better performance
//   let scrollTimer;
//   function throttledUpdate() {
//     if (!scrollTimer) {
//       scrollTimer = setTimeout(() => {
//         checkCardsSectionInView();
//         updateActiveCard();
//         scrollTimer = null;
//       }, 100);
//     }
//   }

//   // Set up scroll event listeners
//   window.addEventListener('scroll', throttledUpdate);

//   // FIXED: Progress dot click handler
//   progressDots.forEach(dot => {
//     dot.addEventListener('click', function () {
//       const cardIndex = parseInt(this.getAttribute('data-card')) - 1;
//       const card = cards[cardIndex];
      
//       if (card) {
//         // Get the position of the cards section
//         const cardsSection = document.querySelector('.cards-section');
//         const sectionTop = cardsSection.offsetTop;
        
//         // Calculate the scroll position relative to the cards section
//         const cardOffsetInSection = card.offsetTop - sectionTop;
        
//         // Final scroll position: section top + card offset - header height
//         const headerHeight = 80; // Adjust this based on your header height
//         const scrollPosition = sectionTop + cardOffsetInSection - headerHeight;
        
//         window.scrollTo({
//           top: scrollPosition,
//           behavior: 'smooth'
//         });
//       }
//     });
//   });

//   // Initial calls
//   checkCardsSectionInView();
//   updateActiveCard();
  
//   // Also update on resize
//   window.addEventListener('resize', updateActiveCard);
// }

//   // Initial calls
//   checkCardsSectionInView();
//   updateActiveCard();
  
//   // Also update on resize
//   window.addEventListener('resize', updateActiveCard);
// }

// Work Section
function initWork() {
  const workItems = document.querySelectorAll('.work-item');
  const filterTags = document.querySelectorAll('.filter-tag');

  // Filter functionality
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const filter = tag.dataset.filter;

      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      workItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          gsap.to(item, { opacity: 1, scale: 1, duration: 0.5 });
          item.style.display = 'block';
        } else {
          gsap.to(item, {
            opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// Modals
function initModals() {
  console.log("initModals");
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  console.log(modalTriggers);
  console.log(modals);

  modalTriggers.forEach(trigger => {
    console.log("trigger")
    trigger.addEventListener('click', (e) => {
      console.log("trigger eventlisterner")
      e.preventDefault();
      const modalId = trigger.dataset.modal;
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate modal content
        const content = modal.querySelector('.modal-content');
        setTimeout(() => {
          content.classList.add('animate-in');
        }, 50);
      }
    });
  });

  // Close modal
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.close-modal');
    const modalContent = modal.querySelector('.modal-content');

    closeBtn.addEventListener('click', () => {
      modalContent.classList.remove('animate-in');
      setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }, 300);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modalContent.classList.remove('animate-in');
        setTimeout(() => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }, 300);
      }
    });
  });
}

// Contact Form
function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const button = form.querySelector('.btn');
      const originalText = button.textContent;

      button.textContent = 'Sending...';
      button.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = 'var(--accent-gold)';

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          button.style.background = '';
          form.reset();
        }, 2000);
      }, 1500);
    });
  }
}

// Page transitions
function initPageTransitions() {
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      if (href !== currentPage) {
        e.preventDefault();
        const overlay = document.querySelector('.page-transition');

        gsap.to(overlay, {
          translateY: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            window.location.href = href;
          }
        });
      }
    });
  });

  // Animate out on page load
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    gsap.to(overlay, {
      translateY: '-100%',
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.2
    });
  }
}

// Initialize page transitions after DOM load
document.addEventListener('DOMContentLoaded', initPageTransitions);


// video script




// ****************By ME**********

// Interactive About Section
function initInteractiveAbout() {
  const circles = document.querySelectorAll('.circle');
  const sectionContent = document.querySelector('.section-content');
  const contentSections = {
    why: document.querySelector('.content-why'),
    how: document.querySelector('.content-how'),
    what: document.querySelector('.content-what')
  };

  // Default content (Why)
  let defaultContent = 'why';

  // Hover events for each circle
  circles.forEach(circle => {
    // Mouse enter event
    circle.addEventListener('mouseenter', function (e) {
      e.stopPropagation();

      const contentType = this.getAttribute('data-content');

      // Hide all content
      Object.values(contentSections).forEach(section => {
        section.classList.remove('active', 'default');
      });

      // Show hovered content
      contentSections[contentType].classList.add('active');

      // Update background
      sectionContent.setAttribute('data-hover', contentType);
    });

    // Mouse leave event for individual circle
    circle.addEventListener('mouseleave', function (e) {
      e.stopPropagation();

      // Check if mouse is still inside any circle
      const isInsideAnyCircle = Array.from(circles).some(circle => {
        return circle.matches(':hover');
      });

      // If not inside any circle, revert to default
      if (!isInsideAnyCircle) {
        Object.values(contentSections).forEach(section => {
          section.classList.remove('active');
        });
        contentSections[defaultContent].classList.add('default');
        sectionContent.setAttribute('data-hover', defaultContent);
      }
    });
  });

  // Mouse leave event for the entire nested circle container
  document.querySelector('.nested-circle').addEventListener('mouseleave', function () {
    Object.values(contentSections).forEach(section => {
      section.classList.remove('active');
    });
    contentSections[defaultContent].classList.add('default');
    sectionContent.setAttribute('data-hover', defaultContent);
  });

  // Button click handlers
  document.querySelectorAll('.content-btn').forEach(button => {
    button.addEventListener('click', function () {
      const parentContent = this.closest('.content-why, .content-how, .content-what');
      if (parentContent.classList.contains('content-why')) {
        alert('Redirecting to Why page');
      } else if (parentContent.classList.contains('content-how')) {
        alert('Redirecting to How page');
      } else if (parentContent.classList.contains('content-what')) {
        alert('Redirecting to What page');
      }
    });
  });
}

