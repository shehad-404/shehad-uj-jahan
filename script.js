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
        v("tz") +
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
      .querySelectorAll("section h2,.item,.proj,.stat,.forms form")
      .forEach(function (t) {
        var k = Array.prototype.indexOf.call(t.parentNode.children, t);
        t.style.transitionDelay = Math.min(k, 5) * 70 + "ms";
        t.classList.add("rv");
        io.observe(t);
      });
  }
})();
