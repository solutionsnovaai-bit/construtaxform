/* ═══════════════════════════════════════════════
   CONSTRUTAX — FORMULÁRIO · main.js
   ═══════════════════════════════════════════════ */

/* ═══════════  CONFIG  ═══════════ */
// Cole aqui a URL do Webhook do Make (Webhooks > Custom Webhook).
const WEBHOOK_URL = "https://hook.us2.make.com/x08suc5pv8212ds97ph9wmlesa8evero";
/* ═══════════  LOGOS  ═══════════ */
const LOGO_LIGHT = "assets/logo-light.png"; // grafite — fundo claro
const LOGO_DARK  = "assets/logo-dark.png";  // branco  — fundo escuro

/* ═══════════  THEME  ═══════════ */
(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("ctx-theme"); } catch (e) {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function getTheme() {
  return document.documentElement.getAttribute("data-theme");
}

function applyLogoForTheme(theme) {
  const src = theme === "dark" ? LOGO_DARK : LOGO_LIGHT;
  // Atualiza todos os logos visíveis na página
  ["siteLogo", "loaderLogo"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyLogoForTheme(getTheme());

  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("ctx-theme", next); } catch (e) {}
    applyLogoForTheme(next);
  });
});

/* ═══════════  LOADER  ═══════════ */
window.addEventListener("load", () => {
  // Garante que a barra termina antes de esconder
  setTimeout(() => {
    const loader = document.getElementById("loader");
    const app    = document.getElementById("app");
    loader.classList.add("hidden");
    app.classList.add("visible");
  }, 900);
});

/* ═══════════  DADOS DO FORMULÁRIO  ═══════════ */
const STEPS = [
  {
    title: "Identificação do respondente",
    sub: "Pra começar, conta um pouco sobre você.",
    questions: [
      { id:"p1", label:"Qual é o seu nome?", type:"text", required:true },
      { id:"p2", label:"Qual é o nome da sua empresa?", type:"text", required:true },
      { id:"p3", label:"Qual é o seu melhor e-mail para receber o ebook?", type:"email", required:true },
      { id:"p4", label:"Qual é o seu WhatsApp profissional?", type:"tel", required:false,
        help:"Recomendável, mas não obrigatório." },
      { id:"p5", label:"Qual é o seu cargo ou função principal?", type:"radio", required:true, other:true,
        options:["Sócio(a) / proprietário(a)","Diretor(a)","Gestor(a) / gerente","Engenheiro(a)","Arquiteto(a)",
          "Contador(a)","Jurídico","Financeiro / controller","Corretor(a) / imobiliária","Investidor(a)",
          "Consultor(a)","Funcionário(a) de empresa do setor"] }
    ]
  },
  {
    title: "Perfil da empresa",
    sub: "Agora, sobre o negócio que você representa.",
    questions: [
      { id:"p6", label:"Qual tipo de empresa ou atividade você representa?", type:"checkbox", required:true, other:true,
        options:["Construtora","Incorporadora","Loteadora","Empreiteira","Empresa de engenharia","Fornecedor da construção civil",
          "Prestador de serviços para obras","Escritório de contabilidade","Escritório de advocacia","Corretora / imobiliária",
          "Investidor imobiliário","Profissional autônomo","Startup / construtech / proptech","Instituição financeira / crédito / investimento"] },
      { id:"p7", label:"Qual é o porte aproximado da empresa?", type:"radio", required:true,
        options:["Profissional autônomo ou empresa individual","Pequena empresa","Média empresa","Grande empresa","Grupo empresarial","Não sei informar"] }
    ]
  },
  {
    title: "Contratos utilizados",
    sub: "Vamos entender como os contratos da empresa funcionam hoje.",
    questions: [
      { id:"p8", label:"Quais contratos sua empresa utiliza com frequência?", type:"checkbox", required:true, other:true,
        options:["Empreitada global","Empreitada parcial","Contratos com fornecedores","Contratos de prestação de serviços",
          "Compra e venda de unidades imobiliárias","Contratos de permuta","Contratos com investidores","Contratos de SPE",
          "Acordos de sócios","Contratos de administração ou gerenciamento de obra","Contratos de locação de equipamentos",
          "Contratos com corretores ou imobiliárias","Contratos de financiamento ou captação de investimentos","Não sei informar"] },
      { id:"p9", label:"Como os contratos da empresa são normalmente elaborados ou revisados?", type:"checkbox", required:true,
        options:["Usamos os mesmos modelos há muito tempo.","Usamos modelos de internet ou adaptados internamente",
          "Quando necessário o contador ou administrativo costuma auxiliar","Temos jurídico interno",
          "Contratamos apoio jurídico quando surge a necessidade.","Não sei informar"] },
      { id:"p10", label:"Com que frequência os contratos da empresa são revisados?", type:"radio", required:true,
        options:["A cada novo empreendimento ou operação relevante","Uma vez por ano","Apenas quando há mudança de lei",
          "Apenas quando há conflito ou problema","Não existe uma rotina definida","Não sei informar"] },
      { id:"p11", label:"Os contratos atualmente utilizados pela empresa já foram revisados considerando a Reforma Tributária?", type:"radio", required:true,
        options:["Sim, todos ou quase todos","Sim, mas apenas alguns que consideramos prioridade","Ainda não, mas pretendemos revisar",
          "Não, não sabíamos que era relevante","Não sei informar"] }
    ]
  },
  {
    title: "Maturidade na Reforma Tributária",
    sub: "O quanto a empresa já está preparada.",
    questions: [
      { id:"p12", label:"Qual é o nível de preparação da sua empresa em relação aos impactos da Reforma Tributária?",
        type:"scale", required:true,
        scaleLabels:["Ainda não avaliamos o tema","Temos informações superficiais","Já começamos a discutir internamente",
          "Já fizemos algum estudo ou planejamento","Já estamos revisando e adaptando contratos, preço, margem e operação"] },
      { id:"p13", label:"Quais temas da Reforma Tributária você acredita que podem impactar sua empresa?",
        type:"checkbox", required:true, other:true,
        options:["IBS e CBS","Mudança na carga tributária","Crédito amplo","Split payment","Período de transição","Mudanças no RET",
          "Formação de preço","Margem dos empreendimentos","Fluxo de caixa","Repasses em contratos","Documentação fiscal",
          "Relação com fornecedores","Relação com compradores ou clientes",
          "Não conheço o assunto profundamente, e por isso ainda não sei quais temas impactam diretamente a empresa."] }
    ]
  },
  {
    title: "Riscos percebidos",
    sub: "O que mais preocupa neste momento.",
    questions: [
      { id:"p14", label:"Quais riscos mais preocupam sua empresa neste momento de decisão?", type:"checkbox", required:true, other:true,
        options:["Aumento de carga tributária","Perda de margem","Dificuldade de repassar custos","Contratos antigos ou desatualizados",
          "Ausência de cláusulas essenciais que protejam a empresa","Dúvidas sobre créditos tributários","Impactos do split payment no caixa",
          "Dúvidas sobre RET","Insegurança na precificação","Conflito com fornecedores","Conflito com clientes ou compradores",
          "Conflito entre sócios ou parceiros","Desinformação sobre créditos amplos","Não temos clareza sobre os riscos"] },
      { id:"p15", label:"Na sua percepção, quais áreas da empresa serão fortemente impactadas pela Reforma Tributária?",
        type:"checkbox", required:true, other:true,
        options:["Tributário / fiscal","Contratos","Financeiro / fluxo de caixa","Precificação","Compras e fornecedores","Vendas",
          "Incorporação / novos empreendimentos","Societário / SPEs / investidores","Gestão de obras","Todas as áreas acima","Ainda não sei avaliar"] },
      { id:"p16", label:"O quanto você concorda com esta afirmação: \u201cOs contratos da construção civil podem afetar diretamente a margem dos empreendimentos durante a Reforma Tributária.\u201d",
        type:"scale", required:true,
        scaleLabels:["Discordo totalmente","Discordo parcialmente","Não tenho opinião formada","Concordo parcialmente","Concordo totalmente"] }
    ]
  },
  {
    title: "Governança contratual e suporte técnico",
    sub: "Quase lá — só mais este bloco.",
    questions: [
      { id:"p17", label:"A empresa conta hoje com apoio especializado para avaliar impactos tributários e contratuais da Reforma Tributária?",
        type:"checkbox", required:true,
        options:["Jurídico interno","Jurídico externo","Escritório de contabilidade","Consultoria tributária","Consultoria financeira",
          "Ainda não temos apoio especializado","Não sei informar"] },
      { id:"p18", label:"Hoje, qual é a maior dificuldade da empresa em relação à Reforma Tributária? Qual a sua opinião sobre esse assunto?",
        type:"textarea", required:false, help:"Opcional — queremos muito ouvir você." },
      { id:"p19", label:"Qual solução seria útil para sua empresa neste momento?", type:"checkbox", required:true,
        options:["Ebook explicativo sobre a Reforma Tributária e seus impactos diretos",
          "Checklist dos riscos contratuais diante da Reforma Tributária",
          "Aplicação na prática de uma matriz de riscos contratuais","Relatório personalizado","Reunião estratégica",
          "Revisão e readequações contratuais com foco na Reforma Tributária","Curso ou treinamento para equipe interna",
          "Consultoria especializada tributário-contratual","Ainda não sei"] }
    ]
  },
  {
    title: "Consentimento e envio do ebook",
    sub: "Último passo!",
    questions: [
      { id:"p20", label:"Autorização de contato e envio de conteúdo", type:"consent", required:true,
        consentText:"Autorizo o envio do ebook \u201cO Tributo Mudou. Seu Contrato Também Precisa Mudar\u201d e aceito receber comunicações da CONSTRUTAX / Rachel Bork sobre Reforma Tributária, contratos, construção civil, incorporações imobiliárias e soluções relacionadas. Estou ciente de que poderei solicitar o descadastramento a qualquer momento.",
        options:["Li e autorizo o envio do ebook e o contato posterior nos termos acima."] }
    ]
  }
];

/* ═══════════  ESTADO  ═══════════ */
let current = 0;
const answers = {};

/* ═══════════  ESCAPE HELPERS  ═══════════ */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

/* ═══════════  RULER  ═══════════ */
function buildRuler() {
  const ruler = document.getElementById("ruler");
  STEPS.forEach(() => {
    const t = document.createElement("div");
    t.className = "tick";
    ruler.appendChild(t);
  });
}

function renderRuler() {
  const ticks = document.querySelectorAll(".tick");
  ticks.forEach((el, i) => {
    el.classList.remove("active", "done");
    if (i < current) el.classList.add("done");
    if (i === current) el.classList.add("active");
  });
  document.getElementById("stepCaption").textContent =
    `Bloco ${current + 1} de ${STEPS.length} — ${STEPS[current].title}`;
}

/* ═══════════  RENDER OPTION PILL  ═══════════ */
function optionRow(q, opt, type) {
  const checked =
    type === "checkbox"
      ? (answers[q.id] || []).includes(opt)
      : answers[q.id] === opt;
  return `<div class="opt${checked ? " checked" : ""}" data-qid="${escapeAttr(q.id)}" data-val="${escapeAttr(opt)}" data-type="${type}">
    <span class="dot"></span>
    ${escapeHtml(opt)}
  </div>`;
}

/* ═══════════  RENDER QUESTION  ═══════════ */
function renderQuestion(q) {
  const optional = q.required
    ? ""
    : ` <span class="q-optional">(opcional)</span>`;
  let inner = `<label class="q-label">${escapeHtml(q.label)}${optional}</label>`;
  if (q.help) inner += `<span class="q-help">${escapeHtml(q.help)}</span>`;

  switch (q.type) {
    case "text":
    case "email":
    case "tel": {
      const val = answers[q.id] || "";
      inner += `<input type="${q.type}" data-qid="${escapeAttr(q.id)}" value="${escapeAttr(val)}" placeholder="Digite aqui...">`;
      break;
    }
    case "textarea": {
      const val = answers[q.id] || "";
      inner += `<textarea data-qid="${escapeAttr(q.id)}" placeholder="Escreva livremente...">${escapeHtml(val)}</textarea>`;
      break;
    }
    case "radio":
    case "checkbox": {
      inner += `<div class="opt-grid">`;
      q.options.forEach(opt => { inner += optionRow(q, opt, q.type); });
      if (q.other) {
        const otherChecked =
          q.type === "checkbox"
            ? (answers[q.id] || []).includes("Outro")
            : answers[q.id] === "Outro";
        inner += optionRow(q, "Outro", q.type);
        inner += `<div class="other-input${otherChecked ? " show" : ""}" data-other-for="${escapeAttr(q.id)}">
          <input type="text" data-qid="${escapeAttr(q.id)}_outro_texto" placeholder="Especifique..." value="${escapeAttr(answers[q.id + "_outro_texto"] || "")}">
        </div>`;
      }
      inner += `</div>`;
      break;
    }
    case "scale": {
      inner += `<div class="scale-row" data-qid="${escapeAttr(q.id)}">`;
      for (let i = 1; i <= 5; i++) {
        const checked = answers[q.id] === String(i);
        inner += `<div class="scale-btn${checked ? " checked" : ""}" data-qid="${escapeAttr(q.id)}" data-val="${i}">${i}</div>`;
      }
      inner += `</div>`;
      const captionVal = answers[q.id]
        ? escapeHtml(q.scaleLabels[parseInt(answers[q.id]) - 1])
        : "";
      inner += `<div class="scale-caption${answers[q.id] ? "" : " scale-caption--hint"}" data-caption-for="${escapeAttr(q.id)}">${captionVal}</div>`;
      break;
    }
    case "consent": {
      inner += `<div class="consent-box">${escapeHtml(q.consentText)}</div>`;
      inner += `<div class="opt-grid">`;
      q.options.forEach(opt => { inner += optionRow(q, opt, "checkbox"); });
      inner += `</div>`;
      break;
    }
  }

  inner += `<div class="error-msg" data-error-for="${escapeAttr(q.id)}">Esse campo é obrigatório.</div>`;
  return `<div class="question" data-question="${escapeAttr(q.id)}">${inner}</div>`;
}

/* ═══════════  RENDER STEP  ═══════════ */
function renderStep() {
  const step = STEPS[current];
  let html = `<h2 class="block-title">${escapeHtml(step.title)}</h2>
               <p class="block-sub">${escapeHtml(step.sub)}</p>`;
  step.questions.forEach(q => { html += renderQuestion(q); });
  document.getElementById("cardContent").innerHTML = html;
  renderRuler();

  document.getElementById("btnBack").classList.toggle("invisible", current === 0);
  document.getElementById("btnNext").textContent =
    current === STEPS.length - 1 ? "Enviar diagnóstico ✓" : "Avançar →";

  attachHandlers();
}

/* ═══════════  HANDLERS  ═══════════ */
function attachHandlers() {
  // Inputs de texto
  document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea')
    .forEach(el => {
      el.addEventListener("input", e => {
        const qid = e.target.dataset.qid;
        answers[qid] = e.target.value;
        clearError(qid.replace(/_outro_texto$/, ""));
      });
    });

  // Opções (radio / checkbox / consent)
  document.querySelectorAll(".opt").forEach(el => {
    el.addEventListener("click", () => {
      const qid  = el.dataset.qid;
      const val  = el.dataset.val;
      const type = el.dataset.type;

      if (type === "radio") {
        answers[qid] = val;
        document.querySelectorAll(`.opt[data-qid="${CSS.escape(qid)}"]`)
          .forEach(o => o.classList.remove("checked"));
        el.classList.add("checked");
      } else {
        // checkbox / consent
        const arr = answers[qid] ? [...answers[qid]] : [];
        const idx = arr.indexOf(val);
        if (idx > -1) { arr.splice(idx, 1); el.classList.remove("checked"); }
        else           { arr.push(val);      el.classList.add("checked"); }
        answers[qid] = arr;
      }

      // Campo "Outro"
      const otherBox = document.querySelector(`[data-other-for="${CSS.escape(qid)}"]`);
      if (otherBox) {
        const isOther =
          type === "radio"
            ? val === "Outro"
            : (answers[qid] || []).includes("Outro");
        otherBox.classList.toggle("show", isOther);
      }

      clearError(qid);
    });
  });

  // Scale
  document.querySelectorAll(".scale-btn").forEach(el => {
    el.addEventListener("click", () => {
      const qid = el.dataset.qid;
      const val = el.dataset.val;
      answers[qid] = val;
      document.querySelectorAll(`.scale-btn[data-qid="${CSS.escape(qid)}"]`)
        .forEach(b => b.classList.remove("checked"));
      el.classList.add("checked");
      const q = findQuestion(qid);
      if (q) {
        const caption = document.querySelector(`[data-caption-for="${CSS.escape(qid)}"]`);
        caption.textContent = q.scaleLabels[parseInt(val) - 1];
        caption.classList.remove("scale-caption--hint");
      }
      clearError(qid);
    });
  });
}

/* ═══════════  HELPERS  ═══════════ */
function findQuestion(qid) {
  for (const s of STEPS) {
    for (const q of s.questions) {
      if (q.id === qid) return q;
    }
  }
  return null;
}

function clearError(qid) {
  const err = document.querySelector(`[data-error-for="${CSS.escape(qid)}"]`);
  if (err) err.classList.remove("show");
}

/* ═══════════  VALIDAÇÃO  ═══════════ */
function validateStep() {
  let ok = true;
  STEPS[current].questions.forEach(q => {
    if (!q.required) return;
    const val = answers[q.id];
    let invalid = false;

    if (q.type === "checkbox" || q.type === "consent") {
      invalid = !val || val.length === 0;
    } else if (q.type === "scale") {
      invalid = !val;
    } else {
      invalid = !val || String(val).trim() === "";
    }

    if (invalid) {
      ok = false;
      const err = document.querySelector(`[data-error-for="${CSS.escape(q.id)}"]`);
      if (err) err.classList.add("show");
    }
  });
  return ok;
}

/* ═══════════  NAVEGAÇÃO  ═══════════ */
document.getElementById("btnNext").addEventListener("click", () => {
  if (!validateStep()) return;
  if (current < STEPS.length - 1) {
    current++;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    submitForm();
  }
});

document.getElementById("btnBack").addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

/* ═══════════  SUBMIT  ═══════════ */
function flattenAnswers() {
  const out = {};
  STEPS.forEach(s =>
    s.questions.forEach(q => {
      let v = answers[q.id];
      if (Array.isArray(v)) v = v.join(", ");
      out[q.id] = v || "";
      if (q.other) out[q.id + "_outro_texto"] = answers[q.id + "_outro_texto"] || "";
    })
  );
  out.evento    = "CONSTRUSUMMIT 2026";
  out.data_envio = new Date().toISOString();
  return out;
}

async function submitForm() {
  const btn = document.getElementById("btnNext");
  btn.disabled    = true;
  btn.textContent = "Enviando...";
  const payload = flattenAnswers();
  try {
    await fetch(WEBHOOK_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload)
    });
  } catch (e) {
    console.error("Erro ao enviar para o Make:", e);
  }
  document.getElementById("diagForm").style.display  = "none";
  document.getElementById("doneCard").style.display  = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ═══════════  INIT  ═══════════ */
buildRuler();
renderStep();

// Swap logo se o tema já estiver dark ao carregar
applyLogoForTheme(getTheme());
