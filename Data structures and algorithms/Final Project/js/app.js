function add() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  transactionList.addTransaction(title, amount, type);
  render();
}

function remove(id) {
  transactionList.deleteTransaction(id);
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  transactionList.getAll().forEach((t) => {
    list.innerHTML += `
        <li>
            ${t.title} - ${t.amount}
            <button onclick="remove(${t.id})">❌</button>
        </li>
        `;
  });
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
