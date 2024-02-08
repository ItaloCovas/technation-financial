$(document).ready(function () {
  const currentPagePathname = window.location.pathname;
  const target = `.${currentPagePathname}`;

  $(".sidebar-menu a").each(function () {
    if ($(this).attr("href") === target) {
      $(this).closest(".menu-item").addClass("selected");
    }
  });

  // Objeto usado para montar cards e gráficos
  const dashboardData = {
    dashboardIndicators: {
      evolutionOfOverdue: {
        label: "Evolução da inadimplência recebida",
        data: [
          { month: "Janeiro", value: 150 },
          { month: "Fevereiro", value: 450 },
          { month: "Março", value: 600 },
          { month: "Abril", value: 1000 },
          { month: "Maio", value: 1500 },
          { month: "Junho", value: 2100 },
          { month: "Julho", value: 2700 },
          { month: "Agosto", value: 3100 },
          { month: "Setembro", value: 3800 },
          { month: "Outubro", value: 4100 },
          { month: "Novembro", value: 4700 },
          { month: "Dezembro", value: 5000 },
        ],
      },
      evolutionOfRevenue: {
        label: "Evolução da receita recebida",
        data: [
          { month: "Janeiro", value: 3000 },
          { month: "Fevereiro", value: 6000 },
          { month: "Março", value: 10000 },
          { month: "Abril", value: 13000 },
          { month: "Maio", value: 18000 },
          { month: "Junho", value: 21000 },
          { month: "Julho", value: 22000 },
          { month: "Agosto", value: 26000 },
          { month: "Setembro", value: 30000 },
          { month: "Outubro", value: 32000 },
          { month: "Novembro", value: 38000 },
          { month: "Dezembro", value: 40000 },
        ],
      },
    },
    invoiceData: {
      totalIssuedNotes: 50000,
      totalUnchargedNotes: 10000,
      totalOverdueNotes: 5000,
      totalDueNotes: 2000,
      totalPaidNotes: 40000,
    },
  };

  function formatToBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  // Colocando valores nos cards
  $("#totalInvoiceAmount").text(
    formatToBRL(dashboardData.invoiceData.totalIssuedNotes)
  );
  $("#totalUnchargedAmount").text(
    formatToBRL(dashboardData.invoiceData.totalUnchargedNotes)
  );
  $("#totalOverdueAmount").text(
    formatToBRL(dashboardData.invoiceData.totalOverdueNotes)
  );
  $("#totalDueAmount").text(
    formatToBRL(dashboardData.invoiceData.totalDueNotes)
  );
  $("#totalPaidAmount").text(
    formatToBRL(dashboardData.invoiceData.totalPaidNotes)
  );

  // Alert no clique do Logout
  $(".logout").click(() => {
    alert(
      "Feature a ser implementada juntamente com o Login! Volte mais tarde."
    );
  });

  // Transformando os dados do objeto para que fiquem no modelo do gráfico
  function extractData(jsonData) {
    const labels = [];
    const data = [];

    jsonData.forEach(function (item) {
      labels.push(item.month);
      data.push(item.value);
    });

    return { labels: labels, data: data };
  }

  // Nas linhas abaixo crio cada objeto de cada gráfico e também o próprio gráfico (inadimplência e receita)
  const overdueData = extractData(
    dashboardData.dashboardIndicators.evolutionOfOverdue.data
  );

  const overdueChart = new Chart(document.getElementById("overdueChart"), {
    type: "line",
    data: {
      labels: overdueData.labels,
      datasets: [
        {
          label: "Evolução da inadimplência recebida (meses)",
          data: overdueData.data,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    },
  });

  const revenueData = extractData(
    dashboardData.dashboardIndicators.evolutionOfRevenue.data
  );

  const revenueChart = new Chart(document.querySelector("#revenueChart"), {
    type: "line",
    data: {
      labels: revenueData.labels,
      datasets: [
        {
          label: "Evolução da receita recebida (meses)",
          data: revenueData.data,
          borderColor: "rgba(34, 197, 94, 1)",
          backgroundColor: "rgba(34, 197, 94, 0.2)",
        },
      ],
    },
  });

  $("#filterMonth").change(function () {
    const selectedMonth = $("#filterMonth").val();

    // Filtrar a data pelo mês selecionado
    const filteredOverdueData =
      dashboardData.dashboardIndicators.evolutionOfOverdue.data.find(
        (item) => item.month === selectedMonth
      );
    const filteredRevenueData =
      dashboardData.dashboardIndicators.evolutionOfRevenue.data.find(
        (item) => item.month === selectedMonth
      );

    $("#totalOverdueAmount").text(formatToBRL(filteredOverdueData.value));
    $("#totalPaidAmount").text(formatToBRL(filteredRevenueData.value));
  });
});
