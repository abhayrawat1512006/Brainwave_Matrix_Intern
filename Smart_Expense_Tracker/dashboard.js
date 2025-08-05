// DOM Elements
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const incomeAmount = document.getElementById("incomeAmount");
const expenseAmount = document.getElementById("expenseAmount");
const totalBalance = document.getElementById("totalBalance");
const filterType = document.getElementById("filterType");
const search = document.getElementById("search");
const popupMessage = document.getElementById("popupMessage");
const themeToggle = document.getElementById("themeToggle");

let transactions = [];
let pieChart = null;
let monthlyChart = null;

// Add Transaction
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value.trim();

  if (!title || isNaN(amount) || !date || !category) {
    showPopup("Please fill all fields properly");
    return;
  }

  const transaction = { type, title, amount, currency, date, category };
  transactions.push(transaction);

  transactionForm.reset();
  updateUI();
});

// Update UI
function updateUI() {
  transactionList.innerHTML = "";

  const filtered = filterTransactions();
  let income = 0;
  let expense = 0;

  filtered.forEach(tx => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <strong>${tx.title}</strong> <br />
        <small>${tx.category} • ${tx.date}</small>
      </div>
      <span class="badge bg-${tx.type === 'income' ? 'success' : 'danger'} rounded-pill">
        ${tx.currency}${tx.amount}
      </span>
    `;

    transactionList.appendChild(li);

    if (tx.type === "income") income += tx.amount;
    else expense += tx.amount;
  });

  incomeAmount.textContent = `₹${income}`;
  expenseAmount.textContent = `₹${expense}`;
  totalBalance.textContent = `₹${income - expense}`;

  updatePieChart(filtered);
  updateMonthlyChart(filtered);
  checkPopupCondition(income, expense);
}

// Filter Transactions (by type + search)
function filterTransactions() {
  const type = filterType.value;
  const keyword = search.value.toLowerCase();
  return transactions.filter(tx =>
    (type === "all" || tx.type === type) &&
    tx.title.toLowerCase().includes(keyword)
  );
}

// Filter listeners
filterType.addEventListener("change", updateUI);
search.addEventListener("input", updateUI);

// Popup Message
function showPopup(message) {
  popupMessage.textContent = message;
  popupMessage.style.display = "block";
  setTimeout(() => (popupMessage.style.display = "none"), 3000);
}

// Show congratulations or warning
function checkPopupCondition(income, expense) {
  if (income > expense) {
    showPopup("🎉 Congratulations! You saved ₹" + (income - expense));
  } else if (expense > income) {
    const over = expense - income;
    const percent = ((over / income) * 100).toFixed(1);
    showPopup("⚠ You overspent ₹" + over + " (" + percent + "%)! Try reducing some categories.");
  }
}

// Toggle Light/Dark Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Chart.js - Category Breakdown
function updatePieChart(data) {
  const categoryMap = {};
  data.forEach(tx => {
    if (tx.type === "expense") {
      categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
    }
  });

  const labels = Object.keys(categoryMap);
  const values = Object.values(categoryMap);

  if (pieChart) pieChart.destroy();
  pieChart = new Chart(document.getElementById("categoryChart"), {
    type: "pie",
    data: {
      labels,
      datasets: [{
        label: "Category Breakdown",
        data: values,
        backgroundColor: [
          "#c084fc", "#a78bfa", "#f472b6", "#f87171", "#60a5fa", "#34d399"
        ]
      }]
    }
  });
}

// Chart.js - Monthly Overview
function updateMonthlyChart(data) {
  const monthMap = {};

  data.forEach(tx => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short" });
    if (!monthMap[month]) monthMap[month] = { income: 0, expense: 0 };

    monthMap[month][tx.type] += tx.amount;
  });

  const labels = Object.keys(monthMap);
  const incomeData = labels.map(month => monthMap[month].income);
  const expenseData = labels.map(month => monthMap[month].expense);

  if (monthlyChart) monthlyChart.destroy();
  monthlyChart = new Chart(document.getElementById("monthlyChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Income",
          backgroundColor: "#34d399",
          data: incomeData
        },
        {
          label: "Expense",
          backgroundColor: "#f87171",
          data: expenseData
        }
      ]
    }
  });
}

// Toggle View (income / expense / both)
function toggleOverview(view) {
  const filtered = filterTransactions();

  if (monthlyChart) monthlyChart.destroy();
  const monthMap = {};

  filtered.forEach(tx => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short" });
    if (!monthMap[month]) monthMap[month] = { income: 0, expense: 0 };

    monthMap[month][tx.type] += tx.amount;
  });

  const labels = Object.keys(monthMap);
  const incomeData = labels.map(m => monthMap[m].income);
  const expenseData = labels.map(m => monthMap[m].expense);

  const datasets = [];
  if (view === "income" || view === "both") {
    datasets.push({
      label: "Income",
      backgroundColor: "#34d399",
      data: incomeData
    });
  }
  if (view === "expense" || view === "both") {
    datasets.push({
      label: "Expense",
      backgroundColor: "#f87171",
      data: expenseData
    });
  }

  monthlyChart = new Chart(document.getElementById("monthlyChart"), {
    type: "bar",
    data: {
      labels,
      datasets
    }
  });
}

// 🚀 Profile Modal Logic
document.addEventListener("DOMContentLoaded", function () {
  const profileModalTrigger = document.getElementById("profileModalTrigger");
  if (profileModalTrigger) {
    profileModalTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      const profileModal = new bootstrap.Modal(document.getElementById("profileModal"));
      profileModal.show();
    });
  }
});