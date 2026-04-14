(function () {
  "use strict";

  var projects = Array.isArray(window.PROJECTS_DATA) ? window.PROJECTS_DATA : [];
  var activeLanguage = "en";
  var activeProjectId = null;

  var COPY = {
    en: {
      navPortfolio: "Projects",
      navAbout: "About",
      navContact: "Contact",
      heroTitle: "Let us build your app!",
      heroDetail: "We build fast, secure, and reliable products for iOS, Android, and Web.",
      heroSub: "From MVP to enterprise scale, you get transparent delivery, strong architecture, and measurable outcomes.",
      heroCta: "See Latest Projects",
      projectsTitle: "Projects",
      projectsIntro: "A quick view of recent work and selected archive projects.",
      latestTitle: "Latest Projects",
      archiveTitle: "Archive",
      aboutTitle: "About",
      about1: "<strong>Who we are</strong> - Senior mobile and web engineers with 15+ years of product delivery experience.",
      about2: "<strong>How we work</strong> - Clear scope, fast feedback loops, and maintainable architecture from day one.",
      about3: "<strong>What you get</strong> - A dependable product partner that ships high quality features under real deadlines.",
      contactTitle: "Contact",
      locationTitle: "Location",
      emailTitle: "Email",
      profilesTitle: "Profiles",
      viewDetails: "View Details",
      detailsTitle: "Project Details",
      closeDetails: "Close details",
      description: "Description",
      stack: "Technologies",
      categories: "Categories"
    },
    de: {
      navPortfolio: "Projekte",
      navAbout: "Über uns",
      navContact: "Kontakt",
      heroTitle: "Lassen Sie uns Ihre App bauen!",
      heroDetail: "Wir entwickeln schnelle, sichere und zuverlässige Produkte für iOS, Android und Web.",
      heroSub: "Vom MVP bis zur Enterprise-Lösung erhalten Sie transparente Lieferung, starke Architektur und messbare Ergebnisse.",
      heroCta: "Neueste Projekte ansehen",
      projectsTitle: "Projekte",
      projectsIntro: "Ein schneller Überblick über aktuelle Arbeiten und ausgewählte Archivprojekte.",
      latestTitle: "Neueste Projekte",
      archiveTitle: "Archiv",
      aboutTitle: "Über uns",
      about1: "<strong>Wer wir sind</strong> - Senior-Entwickler für Mobile und Web mit mehr als 15 Jahren Produkterfahrung.",
      about2: "<strong>Wie wir arbeiten</strong> - Klare Anforderungen, schnelle Feedback-Zyklen und wartbare Architektur ab dem ersten Tag.",
      about3: "<strong>Was Sie bekommen</strong> - Einen verlässlichen Partner, der unter realen Deadlines hochwertige Features liefert.",
      contactTitle: "Kontakt",
      locationTitle: "Standort",
      emailTitle: "E-Mail",
      profilesTitle: "Profile",
      viewDetails: "Details ansehen",
      detailsTitle: "Projektdetails",
      closeDetails: "Details schließen",
      description: "Beschreibung",
      stack: "Technologien",
      categories: "Kategorien"
    },
    es: {
      navPortfolio: "Proyectos",
      navAbout: "Sobre nosotros",
      navContact: "Contacto",
      heroTitle: "Construyamos tu app juntos",
      heroDetail: "Creamos productos rápidos, seguros y confiables para iOS, Android y Web.",
      heroSub: "Desde MVP hasta escala empresarial, entregamos arquitectura sólida y resultados medibles.",
      heroCta: "Ver proyectos recientes",
      projectsTitle: "Proyectos",
      projectsIntro: "Una vista rápida de trabajo reciente y proyectos de archivo seleccionados.",
      latestTitle: "Proyectos recientes",
      archiveTitle: "Archivo",
      aboutTitle: "Sobre nosotros",
      about1: "<strong>Quiénes somos</strong> - Ingenieros senior de mobile y web con más de 15 años de experiencia.",
      about2: "<strong>Cómo trabajamos</strong> - Alcance claro, ciclos de feedback rápidos y arquitectura mantenible desde el día uno.",
      about3: "<strong>Qué recibes</strong> - Un partner confiable que entrega funcionalidades de alta calidad con plazos reales.",
      contactTitle: "Contacto",
      locationTitle: "Ubicación",
      emailTitle: "Correo",
      profilesTitle: "Perfiles",
      viewDetails: "Ver detalles",
      detailsTitle: "Detalles del proyecto",
      closeDetails: "Cerrar detalles",
      description: "Descripción",
      stack: "Tecnologías",
      categories: "Categorías"
    }
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function getCopy() {
    return COPY[activeLanguage] || COPY.en;
  }

  function getEmailTemplate(lang) {
    if (lang === "de") {
      return "mailto:magicaldevs@gmail.com?subject=App-Anfrage!&body=- Haben Sie ein Budget? Ja/Nein. Falls ja: wie hoch?%0D- Benötigen Sie iOS und Android? Ja/Nein.%0D- Benötigen Sie Login/Registrierung? Ja/Nein.%0D- Benötigen Sie Social-Login? Ja/Nein.%0D- Geschätzte Anzahl Screens? S/M/L/XL.%0D- Benötigen Sie Karten/Standortfunktionen? Ja/Nein.%0D- Benötigen Sie Analytics? Ja/Nein.%0D- Benötigen Sie Offline-Datenspeicherung? Ja/Nein.%0D- Benötigen Sie Mehrsprachigkeit? Ja/Nein.";
    }
    if (lang === "es") {
      return "mailto:magicaldevs@gmail.com?subject=Solicitud de App!&body=- Tienes presupuesto? Sí/No. Si sí, cuánto?%0D- Necesitas iOS y Android? Sí/No.%0D- Necesitas login/registro? Sí/No.%0D- Necesitas login social? Sí/No.%0D- Tamaño estimado de la app (pantallas): S/M/L/XL.%0D- Necesitas mapas/ubicación? Sí/No.%0D- Necesitas analíticas? Sí/No.%0D- Necesitas datos offline? Sí/No.%0D- Necesitas más de un idioma? Sí/No.";
    }
    return "mailto:magicaldevs@gmail.com?subject=App Request!&body=- Do you have a budget? Yes/No. If yes, how much?%0D- Do you need both iOS and Android? Yes/No.%0D- Do you need user authentication? Yes/No.%0D- Do you need social login? Yes/No.%0D- Estimated app size in screens: S/M/L/XL.%0D- Do you need maps/location features? Yes/No.%0D- Do you need analytics? Yes/No.%0D- Do you need offline data persistence? Yes/No.%0D- Do you need multi-language support? Yes/No.";
  }

  function renderProjectCard(project, showSummary) {
    var copy = getCopy();
    var stack = project.stack.map(function (item) {
      return '<span class="project-tag">' + item + "</span>";
    }).join("");

    var links = project.links.map(function (link) {
      return '<a class="btn btn-outline-light btn-sm mr-2 mb-2" href="' + link.url + '" target="_blank" rel="noopener noreferrer">' + link.label + "</a>";
    }).join("");

    var summaryHtml = showSummary ? '<p class="project-summary">' + project.summary + "</p>" : "";
    var imageLoading = showSummary ? "eager" : "lazy";

    return (
      '<article class="project-card">' +
      '<img src="' + project.image + '" alt="' + project.imageAlt + '" loading="' + imageLoading + '" width="560" height="320">' +
      '<div class="project-card-body">' +
      '<div class="project-meta"><span>' + project.category + "</span><span>" + project.year + "</span></div>" +
      "<h4>" + project.title + "</h4>" +
      summaryHtml +
      '<div class="project-tags">' + stack + "</div>" +
      '<div class="project-actions">' +
      '<button type="button" class="btn btn-primary btn-sm mr-2 project-details-btn" aria-label="' + copy.viewDetails + " " + project.title + '" data-project-id="' + project.id + '">' + copy.viewDetails + "</button>" +
      links +
      "</div></div></article>"
    );
  }

  function renderProjects() {
    var latestContainer = byId("latestProjectsGrid");
    var archiveContainer = byId("archiveProjectsGrid");
    if (!latestContainer || !archiveContainer) {
      return;
    }

    var latest = projects.filter(function (p) { return p.featured; }).slice(0, 6);
    var archive = projects.filter(function (p) { return !p.featured; });

    latestContainer.innerHTML = latest.map(function (project) {
      return '<div class="col-lg-4 col-md-6 mb-4">' + renderProjectCard(project, true) + "</div>";
    }).join("");

    archiveContainer.innerHTML = archive.map(function (project) {
      return '<div class="col-lg-3 col-md-4 col-sm-6 mb-4">' + renderProjectCard(project, false) + "</div>";
    }).join("");

    bindProjectDetailButtons();
  }

  function renderProjectDetails(projectId) {
    var copy = getCopy();
    var project = projects.find(function (item) { return item.id === projectId; });
    var details = byId("projectDetails");
    if (!project || !details) {
      return;
    }

    activeProjectId = projectId;
    var links = project.links.map(function (link) {
      return '<a class="btn btn-outline-light btn-sm mr-2 mb-2" href="' + link.url + '" target="_blank" rel="noopener noreferrer">' + link.label + "</a>";
    }).join("");
    var tags = project.stack.map(function (item) {
      return '<span class="project-tag">' + item + "</span>";
    }).join("");
    var categories = (project.categories && project.categories.length ? project.categories : [project.category]).map(function (item) {
      return '<span class="project-tag">' + item + "</span>";
    }).join("");

    details.innerHTML = (
      '<div class="project-details-inner">' +
      '<button type="button" id="closeProjectDetails" class="project-close-btn" aria-label="' + copy.closeDetails + '">&times;</button>' +
      "<h4>" + copy.detailsTitle + "</h4>" +
      "<h3>" + project.title + "</h3>" +
      '<p><strong>' + copy.description + ":</strong></p>" +
      '<p class="project-summary">' + project.summary + "</p>" +
      '<p><strong>' + copy.stack + ":</strong></p>" +
      '<div class="project-tags mb-3">' + tags + "</div>" +
      '<p><strong>' + copy.categories + ":</strong></p>" +
      '<div class="project-tags mb-3">' + categories + "</div>" +
      '<div class="project-actions">' + links + "</div>" +
      "</div>"
    );
    details.classList.add("is-visible");
    details.scrollIntoView({ behavior: "smooth", block: "nearest" });

    var closeBtn = byId("closeProjectDetails");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        details.classList.remove("is-visible");
        details.innerHTML = "";
      });
    }
  }

  function bindProjectDetailButtons() {
    var buttons = document.querySelectorAll(".project-details-btn");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        renderProjectDetails(button.getAttribute("data-project-id"));
      });
    });
  }

  function setLanguage(lang) {
    var selected = COPY[lang] ? lang : "en";
    activeLanguage = selected;
    var copy = getCopy();
    document.documentElement.lang = selected;

    byId("bLang").textContent = selected;
    byId("navItemPortfolio").textContent = copy.navPortfolio;
    byId("navItemAbout").textContent = copy.navAbout;
    byId("navItemContact").textContent = copy.navContact;
    byId("mTitle").textContent = copy.heroTitle;
    byId("mDetail").textContent = copy.heroDetail;
    byId("mSubDetail").textContent = copy.heroSub;
    byId("heroCtaButton").textContent = copy.heroCta;
    byId("itemPortfolio").textContent = copy.projectsTitle;
    byId("portfolioIntro").textContent = copy.projectsIntro;
    byId("latestProjectsTitle").textContent = copy.latestTitle;
    byId("archiveProjectsTitle").textContent = copy.archiveTitle;
    byId("itemAbout").textContent = copy.aboutTitle;
    byId("aboutDetail1").innerHTML = copy.about1;
    byId("aboutDetail2").innerHTML = copy.about2;
    byId("aboutDetail3").innerHTML = copy.about3;
    byId("itemContact").textContent = copy.contactTitle;
    byId("addressTitle").textContent = copy.locationTitle;
    byId("contactTitle").textContent = copy.emailTitle;
    byId("profilesTitle").textContent = copy.profilesTitle;
    byId("emailMailTo").setAttribute("href", getEmailTemplate(selected));

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === selected);
    });

    renderProjects();
    if (activeProjectId) {
      renderProjectDetails(activeProjectId);
    }
  }

  function setupLanguageButtons() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });
  }

  function setupNavigation() {
    var menuButton = byId("mobileMenuButton");
    var navContainer = byId("navbarResponsive");
    var navLinks = document.querySelectorAll("a.js-scroll-trigger[href^='#']");
    var sections = ["portfolio", "about", "contact"].map(function (id) { return byId(id); }).filter(Boolean);

    if (menuButton && navContainer) {
      menuButton.addEventListener("click", function () {
        var expanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", (!expanded).toString());
        navContainer.classList.toggle("show");
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId.charAt(0) !== "#") {
          return;
        }
        var target = document.querySelector(targetId);
        if (!target) {
          return;
        }
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (navContainer && navContainer.classList.contains("show")) {
          navContainer.classList.remove("show");
          menuButton.setAttribute("aria-expanded", "false");
        }
      });
    });

    window.addEventListener("scroll", function () {
      var nav = byId("mainNav");
      if (nav) {
        nav.classList.toggle("navbar-shrink", window.scrollY > 100);
      }
      var scrollTopButton = document.querySelector(".scroll-to-top");
      if (scrollTopButton) {
        scrollTopButton.style.display = window.scrollY > 240 ? "block" : "none";
      }
      sections.forEach(function (section) {
        var top = section.offsetTop - 120;
        var bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          var activeLink = document.querySelector('a[href="#' + section.id + '"]');
          document.querySelectorAll("#mainNav .nav-link").forEach(function (n) { n.classList.remove("active"); });
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    }, { passive: true });
  }

  function init() {
    setupLanguageButtons();
    setupNavigation();
    setLanguage((navigator.language || "en").slice(0, 2));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
