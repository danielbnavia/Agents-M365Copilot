const seedData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const sessions = 760 + Math.round(Math.sin(day / 4) * 180) + day * 9;
  const conversion = 2.8 + Math.cos(day / 5) * 0.7;
  const revenue = sessions * (22 + (day % 5));
  const channel = ["Organic", "Paid", "Referral", "Social"][day % 4];
  return {
    label: `Mar ${day}`,
    channel,
    sessions,
    conversion: Math.max(1.8, Number(conversion.toFixed(2))),
    revenue,
  };
});

const kpisEl = document.getElementById("kpis");
const rangeEl = document.getElementById("range");
const rowsEl = document.getElementById("activityRows");
const rowsInfoEl = document.getElementById("rowsInfo");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const navItems = Array.from(document.querySelectorAll(".nav-item"));
let currentView = "overview";

const viewMeta = {
  overview: {
    title: "Overview",
    subtitle: "Live view of your product health.",
  },
  performance: {
    title: "Performance",
    subtitle: "Channel and conversion trends by timeframe.",
  },
  customers: {
    title: "Customers",
    subtitle: "Acquisition and engagement metrics snapshot.",
  },
};

function sum(values) {
  return values.reduce((acc, value) => acc + value, 0);
}

function money(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function percent(value) {
  return `${value.toFixed(2)}%`;
}

function currentSlice() {
  const range = Number(rangeEl.value);
  const viewData = seedData.filter((row) => {
    if (currentView === "performance") {
      return row.channel === "Organic" || row.channel === "Paid";
    }
    if (currentView === "customers") {
      return row.channel === "Referral" || row.channel === "Social";
    }
    return true;
  });
  return viewData.slice(-range);
}

function renderKpis(data) {
  const totalSessions = sum(data.map((d) => d.sessions));
  const avgConversion = data.length ? sum(data.map((d) => d.conversion)) / data.length : 0;
  const totalRevenue = sum(data.map((d) => d.revenue));
  const avgOrderValue = totalSessions ? totalRevenue / totalSessions : 0;

  const cards = [
    { label: "Sessions", value: totalSessions.toLocaleString(), delta: "+8.4%" },
    { label: "Avg conversion", value: percent(avgConversion), delta: "+0.6%" },
    { label: "Revenue", value: money(totalRevenue), delta: "+11.9%" },
    { label: "Revenue / session", value: money(avgOrderValue), delta: "+2.8%" },
  ];

  kpisEl.innerHTML = cards
    .map(
      (card) => `
      <article class="kpi">
        <p class="kpi-label">${card.label}</p>
        <h3 class="kpi-value">${card.value}</h3>
        <span class="kpi-change">${card.delta} vs previous period</span>
      </article>
    `,
    )
    .join("");
}

function renderRows(data) {
  rowsEl.innerHTML = data
    .slice()
    .reverse()
    .map(
      (row) => `
      <tr>
        <td>${row.label}</td>
        <td>${row.channel}</td>
        <td>${row.sessions.toLocaleString()}</td>
        <td>${percent(row.conversion)}</td>
        <td>${money(row.revenue)}</td>
      </tr>
    `,
    )
    .join("");
  rowsInfoEl.textContent = `${data.length} rows`;
}

function renderChart(data) {
  const canvas = document.getElementById("trendChart");
  const ctx = canvas.getContext("2d");
  const { width: clientWidth } = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(320, Math.floor(clientWidth * ratio));
  canvas.height = Math.floor(260 * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const width = canvas.width / ratio;
  const height = canvas.height / ratio;
  const padding = { top: 18, right: 24, bottom: 30, left: 44 };
  const maxValue = Math.max(...data.map((d) => d.sessions));
  const minValue = Math.min(...data.map((d) => d.sessions));
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (graphHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  const points = data.map((entry, idx) => {
    const x = padding.left + (graphWidth / Math.max(1, data.length - 1)) * idx;
    const y =
      padding.top +
      graphHeight -
      ((entry.sessions - minValue) / Math.max(1, maxValue - minValue)) * graphHeight;
    return { x, y, label: entry.label, value: entry.sessions };
  });

  const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradient.addColorStop(0, "rgba(59, 130, 246, 0.25)");
  gradient.addColorStop(1, "rgba(59, 130, 246, 0.02)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, height - padding.bottom);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#2563eb";
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.font = "12px sans-serif";
  ctx.fillText(`${minValue.toLocaleString()}`, 6, height - padding.bottom + 2);
  ctx.fillText(`${maxValue.toLocaleString()}`, 6, padding.top + 4);
}

function render() {
  const data = currentSlice();
  renderKpis(data);
  renderRows(data);
  renderChart(data);
}

rangeEl.addEventListener("change", render);
window.addEventListener("resize", render);

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((n) => n.classList.remove("active"));
    item.classList.add("active");
    const key = item.dataset.view;
    currentView = key;
    titleEl.textContent = viewMeta[key].title;
    subtitleEl.textContent = viewMeta[key].subtitle;
    render();
  });
});

render();
