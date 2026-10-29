
/**
 * ADEVWEB - LOGIC AND INTERACTIVITY ENGINE
 * Versão corrigida
 */

const ADEVWEB_CONFIG = {
  whatsappNumber: "5583986306588",

  // 3 PROJETOS PRINCIPAIS
  featuredProjects: [
    {
      id: "PJ1",
      name: "Advocacia Jurídica Premium",
      category: "Advocacia",
      niche: "advocacia",
      description:
        "Landing page e site de alta conversão para escritórios de advocacia, focados em autoridade e agendamento de consultas.",
      imageUrl:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      targetUrl:
        "https://andersondevjava.github.io/Leadpage-advogado/",
      buttonText: "Ver projeto ao vivo",
      altText: "Demonstração de site para advocacia"
    },
    {
      id: "PJ2",
      name: "Clínica Odontológica Moderna",
      category: "Odontologia",
      niche: "odontologia",
      description:
        "Site institucional para apresentar tratamentos odontológicos e facilitar agendamentos.",
      imageUrl:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      targetUrl: "https://atelie-odontologico.vercel.app/",
      buttonText: "Ver projeto ao vivo",
      altText: "Demonstração de site para odontologia"
    },
    {
      id: "PJ3",
      name: "Espaço de Beleza & Estética",
      category: "Beleza",
      niche: "beleza",
      description:
        "Design elegante para salões, profissionais da beleza e clínicas de estética.",
      imageUrl:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      targetUrl: "https://mamma-pink-beleza.vercel.app/",
      buttonText: "Ver projeto ao vivo",
      altText: "Demonstração de site para beleza e estética"
    }
  ],

  // COLOQUE AQUI OS DADOS ORIGINAIS DO SEU PORTFÓLIO
  portfolioByNiche: [],

  // COLOQUE AQUI OS DEPOIMENTOS ORIGINAIS
  testimonials: []
};

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização dos ícones
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Elementos do DOM
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const hasSiteSelect = document.getElementById("has-site");
  const siteUrlContainer = document.getElementById("site-url-container");
  const leadForm = document.getElementById("lead-form");

  // Renderização inicial
  renderFeaturedProjects();
  renderPortfolio("all");
  renderTestimonials();
  setupServiceCTALinks();

  // 1. MENU MOBILE
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");

      mobileMenu.classList.toggle("hidden");

      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.toggle("hidden", !isHidden);
        menuIconClose.classList.toggle("hidden", isHidden);
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");

        if (menuIconOpen) {
          menuIconOpen.classList.remove("hidden");
        }

        if (menuIconClose) {
          menuIconClose.classList.add("hidden");
        }
      });
    });
  }

  // 2. CAMPO CONDICIONAL DO SITE ATUAL
  function updateSiteUrlField() {
    if (!hasSiteSelect || !siteUrlContainer) return;

    const possuiSite = hasSiteSelect.value === "Sim";

    siteUrlContainer.classList.toggle("hidden", !possuiSite);

    const siteUrlInput = document.getElementById("site-url");

    if (siteUrlInput) {
      siteUrlInput.required = possuiSite;
    }
  }

  if (hasSiteSelect && siteUrlContainer) {
    hasSiteSelect.addEventListener("change", updateSiteUrlField);
    updateSiteUrlField();
  }

  // 3. ABAS DO PORTFÓLIO
  const portfolioTabs = document.querySelectorAll(".portfolio-tab");

  portfolioTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      portfolioTabs.forEach((item) => {
        item.classList.remove(
          "bg-brand-military",
          "text-white"
        );

        item.classList.add("text-brand-textmuted");
      });

      tab.classList.add(
        "bg-brand-military",
        "text-white"
      );

      tab.classList.remove("text-brand-textmuted");

      const selectedNiche = tab.getAttribute("data-niche");

      renderPortfolio(selectedNiche || "all");
    });
  });

  // 4. ENVIO DO FORMULÁRIO PARA WHATSAPP
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
      };

      const name = getValue("name");
      const company = getValue("company");
      const phone = getValue("phone");
      const email = getValue("email");
      const segment = getValue("segment");
      const service = getValue("service");
      const hasSite = getValue("has-site");
      const siteUrl = getValue("site-url");
      const message = getValue("message");

      // Validação dos campos obrigatórios
      if (!name || !phone || !segment || !service) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      // Se possui site, exige uma URL
      if (hasSite === "Sim" && !siteUrl) {
        alert("Informe o endereço do seu site atual.");
        document.getElementById("site-url")?.focus();
        return;
      }

      // Monta a mensagem
      let text = "*NOVO ORÇAMENTO VIA SITE ADEVWEB*\n\n";

      text += `👤 *Nome:* ${name}\n`;

      if (company) {
        text += `🏢 *Empresa/Consultório:* ${company}\n`;
      }

      text += `📞 *WhatsApp:* ${phone}\n`;

      if (email) {
        text += `✉️ *E-mail:* ${email}\n`;
      }

      text += `🎯 *Segmento:* ${segment}\n`;
      text += `🛠️ *Serviço:* ${service}\n`;
      text += `🌐 *Possui site:* ${hasSite}\n`;

      if (hasSite === "Sim" && siteUrl) {
        text += `🔗 *Site atual:* ${siteUrl}\n`;
      }

      if (message) {
        text += `📝 *Detalhes:* ${message}\n`;
      }

      const targetPhone = ADEVWEB_CONFIG.whatsappNumber;

      if (!targetPhone) {
        alert("O número de WhatsApp não está configurado.");
        return;
      }

      const whatsappUrl =
        `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;

      // Abre o WhatsApp em outra aba
      const whatsappWindow = window.open(
        whatsappUrl,
        "_blank"
      );

      // Informa caso o navegador bloqueie a nova aba
      if (!whatsappWindow) {
        alert(
          "O navegador bloqueou a abertura do WhatsApp. " +
          "Permita pop-ups para este site e tente novamente."
        );
      }
    });
  } else {
    console.error(
      'ADEVWEB: formulário com id="lead-form" não encontrado.'
    );
  }
});

/**
 * 5. RENDERIZA OS PROJETOS EM DESTAQUE
 */
function renderFeaturedProjects() {
  const container = document.getElementById(
    "featured-projects-container"
  );

  if (!container) return;

  container.innerHTML = "";

  ADEVWEB_CONFIG.featuredProjects.forEach((proj) => {
    const card = document.createElement("div");

    card.className =
      "bg-brand-darkgray/60 border border-brand-darkmilitary/60 " +
      "rounded-xl overflow-hidden hover:border-brand-military/80 " +
      "transition-all flex flex-col justify-between group";

    const image = document.createElement("img");
    image.src = proj.imageUrl;
    image.alt = proj.altText || proj.name;
    image.loading = "lazy";
    image.className =
      "w-full h-full object-cover group-hover:scale-105 " +
      "transition-transform duration-500 opacity-90";

    const imageContainer = document.createElement("div");
    imageContainer.className =
      "relative overflow-hidden aspect-video bg-brand-black";

    imageContainer.appendChild(image);

    const category = document.createElement("span");
    category.className =
      "absolute top-3 left-3 px-2.5 py-1 rounded " +
      "bg-brand-black/80 border border-brand-military/40 " +
      "text-[10px] font-bold text-brand-softwhite uppercase";
    category.textContent = proj.category;

    imageContainer.appendChild(category);

    const title = document.createElement("h3");
    title.className =
      "text-lg font-bold text-white group-hover:text-brand-softwhite";
    title.textContent = proj.name;

    const description = document.createElement("p");
    description.className =
      "text-xs text-brand-textmuted leading-relaxed";
    description.textContent = proj.description;

    const content = document.createElement("div");
    content.className = "p-6 space-y-3";
    content.append(imageContainer, title, description);

    const button = document.createElement("a");
    button.className =
      "inline-flex items-center justify-center w-full py-2.5 px-4 " +
      "rounded-lg bg-brand-military text-white text-xs font-semibold " +
      "transition-colors gap-2";

    button.textContent = proj.buttonText || "Ver projeto";

    if (proj.targetUrl) {
      button.href = proj.targetUrl;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
    } else {
      button.href = "#";
      button.classList.add("opacity-50", "cursor-not-allowed");
      button.setAttribute("aria-disabled", "true");

      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("O link deste projeto ainda não foi configurado.");
      });
    }

    const footer = document.createElement("div");
    footer.className = "p-6 pt-0";
    footer.appendChild(button);

    card.append(content, footer);
    container.appendChild(card);
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/**
 * 6. RENDERIZA O PORTFÓLIO POR NICHO
 */
function renderPortfolio(filterNiche = "all") {
  const grid = document.getElementById("portfolio-grid");

  if (!grid) return;

  grid.innerHTML = "";

  const projects = ADEVWEB_CONFIG.portfolioByNiche || [];

  const filtered =
    filterNiche === "all"
      ? projects
      : projects.filter(
          (item) => item.niche === filterNiche
        );

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center
                  text-brand-textmuted bg-brand-darkgray/30
                  rounded-xl border border-brand-darkmilitary">
        <p class="text-sm">
          Estamos preparando novos projetos para este segmento.
        </p>
      </div>
    `;

    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "bg-brand-darkgray/40 border border-brand-darkmilitary/40 " +
      "rounded-xl p-5 hover:border-brand-military/50 " +
      "transition-all space-y-4";

    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.name;
    image.loading = "lazy";
    image.className = "w-full h-full object-cover";

    const imageContainer = document.createElement("div");
    imageContainer.className =
      "aspect-video rounded-lg overflow-hidden bg-brand-black";
    imageContainer.appendChild(image);

    const category = document.createElement("span");
    category.className =
      "text-[10px] font-bold text-brand-military uppercase";
    category.textContent = item.category;

    const title = document.createElement("h3");
    title.className = "text-base font-bold text-white mt-1";
    title.textContent = item.name;

    const description = document.createElement("p");
    description.className =
      "text-xs text-brand-textmuted mt-2";
    description.textContent = item.description;

    const content = document.createElement("div");
    content.append(category, title, description);

    const link = document.createElement("a");
    link.className =
      "text-xs text-brand-softwhite font-semibold " +
      "inline-flex items-center gap-1";
    link.textContent = "Acessar demonstração";

    if (item.targetUrl) {
      link.href = item.targetUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        alert("O link deste projeto ainda não foi configurado.");
      });
    }

    const footer = document.createElement("div");
    footer.appendChild(link);

    card.append(imageContainer, content, footer);
    grid.appendChild(card);
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/**
 * 7. RENDERIZA DEPOIMENTOS
 */
function renderTestimonials() {
  const container = document.getElementById(
    "testimonials-container"
  );

  if (!container) return;

  container.innerHTML = "";

  const testimonials = ADEVWEB_CONFIG.testimonials || [];

  testimonials.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "bg-brand-darkgray/50 border border-brand-darkmilitary/50 " +
      "rounded-xl p-6 flex flex-col justify-between space-y-4 " +
      "hover:border-brand-military/40 transition-all";

    const stars = document.createElement("div");
    stars.className = "text-yellow-500 text-sm tracking-wider";
    stars.textContent = "★".repeat(
      Math.max(0, Math.min(5, Number(item.rating) || 0))
    );

    const comment = document.createElement("p");
    comment.className =
      "text-xs text-brand-softwhite italic leading-relaxed";
    comment.textContent = `"${item.comment}"`;

    const testimonialContent = document.createElement("div");
    testimonialContent.className = "space-y-3";
    testimonialContent.append(stars, comment);

    const avatar = document.createElement("img");
    avatar.src = item.avatar || "";
    avatar.alt = item.clientName || "Cliente";
    avatar.loading = "lazy";
    avatar.className =
      "w-10 h-10 rounded-full object-cover " +
      "border border-brand-military/40";

    const clientName = document.createElement("h4");
    clientName.className = "text-xs font-bold text-white";
    clientName.textContent = item.clientName || "";

    const profession = document.createElement("p");
    profession.className = "text-[11px] text-brand-textmuted";
    profession.textContent =
      `${item.profession || ""} — ${item.company || ""}`;

    const clientInfo = document.createElement("div");
    clientInfo.append(clientName, profession);

    const clientFooter = document.createElement("div");
    clientFooter.className =
      "flex items-center gap-3 pt-4 border-t border-brand-darkmilitary/40";
    clientFooter.append(avatar, clientInfo);

    card.append(testimonialContent, clientFooter);
    container.appendChild(card);
  });
}

/**
 * 8. CONFIGURA OS BOTÕES DE SERVIÇOS
 */
function setupServiceCTALinks() {
  const serviceButtons = document.querySelectorAll(".service-cta");
  const serviceSelect = document.getElementById("service");

  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceName = btn.getAttribute("data-service");

      if (!serviceSelect || !serviceName) return;

      const matchingOption = Array.from(
        serviceSelect.options
      ).find((option) =>
        option.value.includes(serviceName)
      );

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      }
    });
  });
}