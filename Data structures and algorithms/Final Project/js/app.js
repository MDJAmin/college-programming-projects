// Auto Active Navbar Link
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("transactions")) || [];
  transactionList.loadFromArray(data);
}

loadFromLocalStorage();

document.addEventListener("DOMContentLoaded", function () {
  render();
});

function add() {
  const titleInput = document.getElementById("title");
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");

  const title = titleInput.value.trim();
  const amount = amountInput.value.replace(/,/g, "");
  const type = typeSelect.value;

  if (!title || !amount) return;

  transactionList.addTransaction(title, Number(amount), type);

  saveToLocalStorage();

  render();

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

let currentTab = "income";

function switchTab(type) {
  currentTab = type;

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");

  const tabsContainer = document.querySelector(".tabs");

  if (type === "expense") {
    tabsContainer.classList.add("expense-active");
  } else {
    tabsContainer.classList.remove("expense-active");
  }

  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  transactionList.getAll().forEach((t) => {
    if (t.type !== currentTab) return;

    const formattedAmount = Number(t.amount).toLocaleString();

    list.innerHTML += `
            <li>
                <span>${t.title} - ${formattedAmount}</span>
                <button onclick="remove(${t.id})">❌</button>
            </li>
        `;
  });
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactionList.toArray()));
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log("📩 New Contact Message:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  alert("پیام شما با موفقیت ثبت شد ✅");

  this.reset();
});
