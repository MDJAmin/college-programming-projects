/* =========================
   NAV ACTIVE LINK
========================= */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  render();
  setupContactForm();
});

/* =========================
   LOCAL STORAGE
========================= */

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("transactions")) || [];
  transactionList.loadFromArray(data);
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactionList.toArray()));
}

/* =========================
   TRANSACTION ACTIONS
========================= */

function add() {
  const titleInput = document.querySelector("#title");
  const amountInput = document.querySelector("#amount");
  const typeSelect = document.querySelector("#type");

  const title = titleInput.value.trim();
  const amount = amountInput.value.replace(/,/g, "");
  const type = typeSelect.value;

  if (!title || !amount) return;

  transactionList.addTransaction(title, Number(amount), type);

  saveToLocalStorage();
  render();

  // Reset form
  titleInput.value = "";
  amountInput.value = "";
  typeSelect.value = "income";
  titleInput.focus();
}

function remove(id) {
  transactionList.deleteTransaction(id);
  saveToLocalStorage();
  render();
}

/* =========================
   TABS
========================= */

let currentTab = "income";

function switchTab(type, element) {
  currentTab = type;

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  element.classList.add("active");

  const tabsContainer = document.querySelector(".tabs");
  tabsContainer.classList.toggle("expense-active", type === "expense");

  render();
}

/* =========================
   RENDER
========================= */

function render() {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  transactionList.getAll().forEach((t) => {
    if (t.type !== currentTab) return;

    const formattedAmount = Number(t.amount).toLocaleString();

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${t.title} - ${formattedAmount}</span>
      <button onclick="remove(${t.id})">×</button>
    `;

    list.appendChild(li);
  });
}

/* =========================
   CONTACT FORM
========================= */

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    console.log("📩 New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    alert("پیام شما با موفقیت ثبت شد ✅");

    form.reset();
  });
}
