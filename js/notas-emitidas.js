$(document).ready(function () {
  const currentPagePathname = window.location.pathname;
  const target = `.${currentPagePathname}`;

  $(".sidebar-menu a").each(function () {
    if ($(this).attr("href") === target) {
      $(this).closest(".menu-item").addClass("selected");
    }
  });

  function formatToBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  // Objeto de notas
  const invoices = [
    {
      payerName: "João Silva",
      invoiceNumber: "NFS-001",
      issuanceDate: "01/02/2024",
      billingDate: "15/02/2024",
      paymentDate: "01/03/2024",
      invoiceAmount: formatToBRL(1500),
      fiscalDocument: "ABC123",
      bankSlip: "123456789",
      status: "Emitida",
    },
    {
      payerName: "Maria Santos",
      invoiceNumber: "NFS-002",
      issuanceDate: "05/03/2024",
      billingDate: "20/03/2024",
      paymentDate: "10/04/2024",
      invoiceAmount: formatToBRL(2200),
      fiscalDocument: "DEF456",
      bankSlip: "987654321",
      status: "Pagamento em atraso",
    },
    {
      payerName: "Pedro Oliveira",
      invoiceNumber: "NFS-003",
      issuanceDate: "10/04/2024",
      billingDate: "25/04/2024",
      paymentDate: "28/05/2024",
      invoiceAmount: formatToBRL(1800),
      fiscalDocument: "GHI789",
      bankSlip: "456123789",
      status: "Pagamento realizado",
    },
    {
      payerName: "Ana Luiza",
      invoiceNumber: "NFS-004",
      issuanceDate: "15/05/2024",
      billingDate: "01/05/2024",
      paymentDate: "15/06/2024",
      invoiceAmount: formatToBRL(2500),
      fiscalDocument: "JKL012",
      bankSlip: "789456123",
      status: "Emitida",
    },
    {
      payerName: "Carlos Oliveira",
      invoiceNumber: "NFS-005",
      issuanceDate: "20/06/2024",
      billingDate: "05/06/2024",
      paymentDate: "20/07/2024",
      invoiceAmount: formatToBRL(1900),
      fiscalDocument: "MNO345",
      bankSlip: "321654987",
      status: "Pagamento realizado",
    },
    {
      payerName: "Aline Barbosa",
      invoiceNumber: "NFS-006",
      issuanceDate: "25/07/2024",
      billingDate: "10/07/2024",
      paymentDate: "25/08/2024",
      invoiceAmount: formatToBRL(2800),
      fiscalDocument: "PQR678",
      bankSlip: "654321987",
      status: "Cobrança realizada",
    },
  ];

  // Criando tabela e populando
  const tableBody = document.getElementById("table-body");

  invoices.forEach((invoice) => {
    const row = document.createElement("tr");

    for (const key in invoice) {
      const cell = document.createElement("td");
      cell.textContent = invoice[key];

      if (key === "status") {
        cell.classList.add("status");
      }

      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  });

  // Lógica para cores do status
  $("tbody tr").each(function () {
    var status = $(this).find("td.status").text().trim();
    switch (status) {
      case "Emitida":
        $(this)
          .find("td.status")
          .css("color", "#a1a1aa")
          .css("font-weight", "bold");

        break;
      case "Pagamento em atraso":
        $(this)
          .find("td.status")
          .css("color", "red")
          .css("font-weight", "bold");
        break;
      case "Pagamento realizado":
        $(this)
          .find("td.status")
          .css("color", "#22c55e")
          .css("font-weight", "bold");
        break;
      case "Cobrança realizada":
        $(this)
          .find("td.status")
          .css("color", "#fb923c")
          .css("font-weight", "bold");
        break;
      default:
        break;
    }
  });

  // Alert no clique do Logout
  $(".logout").click(() => {
    alert(
      "Feature a ser implementada juntamente com o Login! Volte mais tarde."
    );
  });

  function filterTableRows() {
    const selectedStatus = $("#status").val();

    if (selectedStatus === "Todas") {
      $("tbody tr").show();
      return;
    }

    $("tbody tr").hide();

    $(`tbody tr`).each(function () {
      const status = $(this).find("td:last-child").text().trim();
      console.log(status, "status");
      console.log(selectedStatus, "selcionado");
      if (status === selectedStatus) {
        $(this).show();
      }
    });
  }
  $("#status").change(filterTableRows);
});
