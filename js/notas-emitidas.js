$(document).ready(function () {
  const currentPagePathname = window.location.pathname;
  const target = `.${currentPagePathname}`;

  $(".sidebar-menu a").each(function () {
    if ($(this).attr("href") === target) {
      $(this).closest(".menu-item").addClass("selected");
    }
  });
});
