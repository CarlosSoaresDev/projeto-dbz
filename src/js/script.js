document.addEventListener('DOMContentLoaded', () => {
     const typingText = document.querySelector('.typing-text');
      if (typingText) {
          const titles = [
              "Engenheiro de Computação",
              "Desenvolvedor Web Full Stack",
              "Desenvolvedor de Software",
              "Desenvolvedor PHP",
              "Desenvolvedor Python"
          ];
          let titleIndex = 0;
          let charIndex = 0;
          let isDeleting = false;

          // --- Efeito de Glitch para os Títulos na Segunda Seção ---
          const persons = document.querySelectorAll('.person');
          const devWebSection = persons[1]; // A segunda seção (índice 1)
          if (devWebSection) {
              const nameElement = devWebSection.querySelector('.name-person');
              if (nameElement) {
                  const titlesToRotate = [
                      "Desenvolvedor Web Full Stack",
                      "Desenvolvedor de Software",
                      "Desenvolvedor PHP",
                      "Desenvolvedor Python"
                  ];
                  let currentTitleIdx = 0;

                  setInterval(() => {
                      currentTitleIdx = (currentTitleIdx + 1) % titlesToRotate.length;
                      const nextText = titlesToRotate[currentTitleIdx];

                      // Pequena pausa para o efeito de "shaking" visual
                      nameElement.setAttribute('data-text', nextText);
                      setTimeout(() => {
                          nameElement.textContent = nextText;
                      }, 100);
                  }, 4000); // Alterna a cada 4 segundos
              }
          }

          // --- AJUSTE AQUI AS VELOCIDADES (em milissegundos) ---
          const VELOCIDADE_DIGITACAO = 50; // Quanto maior, mais lento para escrever
          const VELOCIDADE_DELETAR = 50;   // Quanto maior, mais lento para apagar
          const TEMPO_ESPERA_FRASE = 1000; // Tempo que a frase fica completa na tela
          const TEMPO_ESPERA_TROCA = 500;  // Pausa antes de começar a próxima frase
          // ----------------------------------------------------

          let typeSpeed = VELOCIDADE_DIGITACAO;

          const cursor = document.createElement('span');
          cursor.className = 'cursor';
          typingText.parentNode.appendChild(cursor);

          function type() {
              const currentTitle = titles[titleIndex];
              const nextIndex = (titleIndex + 1) % titles.length;
              const nextTitle = titles[nextIndex];

              // Encontrar prefixo comum entre título atual e próximo
              let commonPrefixLength = 0;
              if (isDeleting) {
                  const minLength = Math.min(currentTitle.length, nextTitle.length);
                  for (let i = 0; i < minLength; i++) {
                      if (currentTitle[i] === nextTitle[i]) {
                          commonPrefixLength = i + 1;
                      } else {
                          break;
                      }
                  }
              }

              if (isDeleting) {
                  typingText.textContent = currentTitle.substring(0, charIndex - 1);
                  charIndex--;
                  typeSpeed = VELOCIDADE_DELETAR;
              } else {
                  typingText.textContent = currentTitle.substring(0, charIndex + 1);
                  charIndex++;
                  typeSpeed = VELOCIDADE_DIGITACAO;
              }

              if (!isDeleting && charIndex === currentTitle.length) {
                  isDeleting = true;
                  typeSpeed = TEMPO_ESPERA_FRASE;
              } else if (isDeleting && charIndex === commonPrefixLength) {
                  isDeleting = false;
                  titleIndex = nextIndex;
                  typeSpeed = TEMPO_ESPERA_TROCA;
              }

              setTimeout(type, typeSpeed);
          }
          type();
      }
 });

const buttons = document.querySelectorAll('.button');
const persons = document.querySelectorAll('.person');
let currentIndex = 0;
let isScrolling = false; 

function setActiveContent(index) {
    const buttonSelected = document.querySelector('.button.selected');
    const personSelected = document.querySelector('.person.selected');

    if (buttonSelected) buttonSelected.classList.remove('selected');
    if (personSelected) personSelected.classList.remove('selected');

    buttons[index].classList.add('selected');
    persons[index].classList.add('selected');
    
    currentIndex = index;

    // Toggle WhatsApp button visibility in the menu
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        if (index === 0) {
            whatsappBtn.classList.remove('visible');
        } else {
            whatsappBtn.classList.add('visible');
        }
    }
}

buttons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        // Se for o botão de WhatsApp (que está dentro de um <li> com non-person)
        // não chamamos o setActiveContent para não tentar trocar o "person"
        if (button.closest('.non-person')) {
            return;
        }
        setActiveContent(index);
    });
});

window.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 500);

    
    if (event.deltaY > 0) {
        if (currentIndex < buttons.length - 1) {
            setActiveContent(currentIndex + 1);
        }
    } else if (event.deltaY < 0) {
        if (currentIndex > 0) {
            setActiveContent(currentIndex - 1);
        }
    }
});