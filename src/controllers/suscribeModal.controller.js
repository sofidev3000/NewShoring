const d = document;
const suscribeModalButton = d.getElementById("suscribe-btn");
const subscribeModal = d.getElementById("suscribe-modal");
const closeModal = d.getElementById("close-modal");
suscribeModalButton.addEventListener("click", (e) => {
  subscribeModal.showModal();
});

closeModal.addEventListener("click", (e) => {
  subscribeModal.close();
});



export default suscribeModalButton;
