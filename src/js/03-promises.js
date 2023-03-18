 import Notiflix from 'notiflix';

const refs = {
  formEL: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]')
}

refs.formEL.addEventListener('submit', hendlePromisSubmit);

function hendlePromisSubmit(e) {
  e.preventDefault(); 
  const quantityPromis = Number(refs.amountEl.value);
  const stepPromis = Number(refs.stepEl.value);
  const firstDelayPromis = Number(refs.delayEl.value);

  for (let i = 0; i < quantityPromis; i += 1){
    delay = firstDelayPromis + stepPromis * i;
    position = i + 1

     createPromise(position, delay)
       .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
       .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
    resolve({position, delay})
  } else {
   reject({position, delay})
  }
  }, delay)
    })
};