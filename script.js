(function () {
  var r = document.documentElement,
    t = "dark";
  try {
    t = localStorage.getItem("theme") || "dark";
  } catch (e) {}
  r.setAttribute("data-theme", t);
  document.getElementById("theme").onclick = function () {
    t = r.getAttribute("data-theme") === "dark" ? "light" : "dark";
    r.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
  };
  document.getElementById("yr").textContent = new Date().getFullYear();
  function v(i) {
    return document.getElementById(i).value;
  }
  var KEY = "cce0da98-715e-4167-91a8-653243d2e683",
    TO = "b190305010@cse.jnu.ac.bd";
  function send(form, btn, stat, data, fb) {
    stat.className = "fstat";
    stat.textContent = "Sending\u2026";
    btn.disabled = true;
    data.access_key = KEY;
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        if (j && j.success) {
          stat.className = "fstat ok";
          stat.textContent =
            "Thank you! Your message was sent. I\u2019ll reply by email soon.";
          form.reset();
        } else {
          throw new Error("fail");
        }
      })
      .catch(function () {
        stat.className = "fstat err";
        stat.innerHTML =
          'Sorry, it couldn\u2019t be sent. <a href="mailto:' +
          TO +
          "?subject=" +
          encodeURIComponent(fb.s) +
          "&body=" +
          encodeURIComponent(fb.b) +
          '">Open in your email app instead</a>.';
      })
      .then(function () {
        btn.disabled = false;
      });
  }
  document.getElementById("fmsg").onsubmit = function (e) {
    e.preventDefault();
    var f = e.target;
    if (document.getElementById("hp1").checked) return;
    var s = v("ms") || "Message from your portfolio",
      m = v("mm");
    send(
      f,
      f.querySelector("button"),
      document.getElementById("s1"),
      {
        name: v("mn"),
        email: v("me"),
        subject: s,
        message: m,
        from_name: "Portfolio contact form",
      },
      { s: s, b: m + "\n\n\u2014 " + v("mn") + " (" + v("me") + ")" }
    );
  };
  document.getElementById("fmeet").onsubmit = function (e) {
    e.preventDefault();
    var f = e.target;
    if (document.getElementById("hp2").checked) return;
    var m =
        "Meeting request\n\nDuration: " +
        v("tl") +
        "\nPreferred date: " +
        v("td") +
        "\nPreferred time: " +
        v("tt") +
        " (" +
        tzl() +
        ")\nPlatform: " +
        v("tp") +
        "\n\nTopic: " +
        (v("tm") || "-"),
      s = "Meeting request: " + v("tn");
    send(
      f,
      f.querySelector("button"),
      document.getElementById("s2"),
      {
        name: v("tn"),
        email: v("te"),
        subject: s,
        message: m,
        from_name: "Portfolio meeting request",
      },
      {
        s: s,
        b:
          "Hello Shehad,\n\n" +
          m +
          "\n\n\u2014 " +
          v("tn") +
          " (" +
          v("te") +
          ")",
      }
    );
  };
  document.getElementById("td").min = new Date().toISOString().slice(0, 10);
})();

document.querySelectorAll(".shot img").forEach(function (i) {
  function ok() {
    if (i.naturalWidth) i.parentNode.classList.add("has");
  }
  if (i.complete) ok();
  else i.addEventListener("load", ok);
});

(function () {
  var el = document.getElementById("tw");
  if (!el) return;
  var L = [
    "Hi, I\u2019m Md. Shehad Uj Jahan",
    "Skills: Linux \u00b7 HPC \u00b7 PyTorch \u00b7 Forecasting",
    "Skills: React \u00b7 Node.js \u00b7 MongoDB \u00b7 Docker",
    "Interested in work? Let\u2019s talk.",
  ];
  if (
    window.matchMedia &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    el.textContent = L[0];
    return;
  }
  var i = 0,
    j = 0,
    del = false;
  function tick() {
    var s = L[i];
    el.textContent = s.slice(0, j);
    var d = del ? 28 : 60;
    if (!del && j === s.length) {
      del = true;
      d = 1700;
    } else if (del && j === 0) {
      del = false;
      i = (i + 1) % L.length;
      d = 350;
    } else {
      j += del ? -1 : 1;
    }
    setTimeout(tick, d);
  }
  tick();
})();

(function () {
  var up = document.getElementById("up"),
    dn = document.getElementById("dn"),
    bar = document.getElementById("bar");
  function sc() {
    var y = window.pageYOffset,
      h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    up.hidden = y < 300;
    dn.hidden = y > h - 250;
  }
  window.addEventListener("scroll", sc, { passive: true });
  window.addEventListener("resize", sc);
  sc();
  up.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  dn.onclick = function () {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  if (
    "IntersectionObserver" in window &&
    !(
      window.matchMedia &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  ) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            var t = e.target;
            t.classList.add("in");
            io.unobserve(t);
            setTimeout(function () {
              t.classList.remove("rv", "in");
              t.style.transitionDelay = "";
            }, 950);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll("section h2,.item,.proj,.stat,.forms form,.chips li")
      .forEach(function (t) {
        var k = Array.prototype.indexOf.call(t.parentNode.children, t);
        t.style.transitionDelay = Math.min(k, 5) * 70 + "ms";
        t.classList.add("rv");
        io.observe(t);
      });
  }
})();
function tzl() {
  var s = document.getElementById("tz");
  return s.options[s.selectedIndex].text;
}
(function () {
  var sel = document.getElementById("tz");
  if (!sel || sel.tagName !== "SELECT") return;
  var Z =
    "Asia|Bangladesh (Dhaka)=Asia/Dhaka,India=Asia/Kolkata,Pakistan=Asia/Karachi,Nepal=Asia/Kathmandu,Sri Lanka=Asia/Colombo,China=Asia/Shanghai,Japan=Asia/Tokyo,South Korea=Asia/Seoul,Singapore=Asia/Singapore,Malaysia=Asia/Kuala_Lumpur,Thailand=Asia/Bangkok,Indonesia (Jakarta)=Asia/Jakarta,Philippines=Asia/Manila,Vietnam=Asia/Ho_Chi_Minh~Middle East|Saudi Arabia=Asia/Riyadh,United Arab Emirates=Asia/Dubai,Qatar=Asia/Qatar,Turkey=Europe/Istanbul,Israel=Asia/Jerusalem~Europe|United Kingdom=Europe/London,Ireland=Europe/Dublin,Germany=Europe/Berlin,France=Europe/Paris,Italy=Europe/Rome,Spain=Europe/Madrid,Netherlands=Europe/Amsterdam,Belgium=Europe/Brussels,Switzerland=Europe/Zurich,Austria=Europe/Vienna,Sweden=Europe/Stockholm,Norway=Europe/Oslo,Denmark=Europe/Copenhagen,Finland=Europe/Helsinki,Poland=Europe/Warsaw,Portugal=Europe/Lisbon,Ukraine=Europe/Kyiv,Russia (Moscow)=Europe/Moscow~North America|USA (Eastern)=America/New_York,USA (Central)=America/Chicago,USA (Mountain)=America/Denver,USA (Pacific)=America/Los_Angeles,Canada (Toronto)=America/Toronto,Canada (Vancouver)=America/Vancouver,Mexico=America/Mexico_City~South America|Brazil (S\u00e3o Paulo)=America/Sao_Paulo,Argentina=America/Argentina/Buenos_Aires,Chile=America/Santiago,Colombia=America/Bogota~Africa|Egypt=Africa/Cairo,Nigeria=Africa/Lagos,Ghana=Africa/Accra,Kenya=Africa/Nairobi,Ethiopia=Africa/Addis_Ababa,Morocco=Africa/Casablanca,South Africa=Africa/Johannesburg~Oceania|Australia (Sydney)=Australia/Sydney,Australia (Perth)=Australia/Perth,New Zealand=Pacific/Auckland".split(
      "~"
    );
  function off(id) {
    try {
      var p = new Intl.DateTimeFormat("en", {
        timeZone: id,
        timeZoneName: "shortOffset",
      }).formatToParts(new Date());
      for (var i = 0; i < p.length; i++)
        if (p[i].type === "timeZoneName") return p[i].value;
    } catch (e) {}
    return "";
  }
  var guess = "";
  try {
    guess = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {}
  sel.innerHTML = '<option value="">Select your country / time zone</option>';
  Z.forEach(function (row) {
    var a = row.split("|"),
      og = document.createElement("optgroup");
    og.label = a[0];
    a[1].split(",").forEach(function (x) {
      var c = x.split("="),
        o = document.createElement("option"),
        f = off(c[1]);
      o.value = c[1];
      o.textContent = c[0] + (f ? " \u2014 " + f : "");
      if (c[1] === guess) o.selected = true;
      og.appendChild(o);
    });
    sel.appendChild(og);
  });
})();

(function () {
  var rm =
    window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var links = {};
  document.querySelectorAll("header nav a").forEach(function (a) {
    links[a.getAttribute("href")] = a;
  });
  function act(id) {
    for (var k in links) links[k].classList.toggle("active", k === "#" + id);
  }
  if (!("IntersectionObserver" in window)) return;
  var so = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) act(e.target.getAttribute("data-spy"));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  var hero = document.querySelector(".hero");
  if (hero) {
    hero.setAttribute("data-spy", "home");
    so.observe(hero);
  }
  [
    "research",
    "publications",
    "projects",
    "skills",
    "background",
    "contact",
  ].forEach(function (id) {
    var s = document.getElementById(id);
    if (s) {
      s.setAttribute("data-spy", id);
      so.observe(s);
    }
  });
  if (rm) return;
  var co = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        var el = e.target,
          m = el.textContent.match(/^(\d+)(\+?)$/);
        if (!m) return;
        var n = +m[1],
          t0 = null;
        function st(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1200, 1);
          el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + m[2];
          if (p < 1) requestAnimationFrame(st);
        }
        requestAnimationFrame(st);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".stat b").forEach(function (b) {
    if (/^\d+\+?$/.test(b.textContent)) co.observe(b);
  });
})();
