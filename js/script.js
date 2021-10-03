var btnCount = 1;

function addButton() {
  if (document.querySelectorAll(".group").length < 100) {
    btnCount++;
    const t = document.createElement("div");
    (t.className = "group"),
    (t.innerHTML = `\n            <div class="button-info">\n                <div class="button-input">\n                    <label for="button-name-${btnCount}">Button Name</label>\n                    <input type="text" name="button-name-${btnCount}" id="button-name-${btnCount}">\n                </div>\n                <div class="button-input">\n                    <label for="text-${btnCount}">Button Link</label>\n                    <input type="text" name="text-${btnCount}" id="text-${btnCount}">\n                </div>\n            </div>\n            <div class="options">\n                <div class="button-sameline">\n                    <input type="checkbox" class="sameline-switch" name="sameline-toggle-${btnCount}" id="sameline-toggle-${btnCount}">\n                    <label class="sameline-label" for="sameline-toggle-${btnCount}">Same Line<span class="sameline-checkbox"></span></label>\n                </div>\n                <div class="button-type">\n                    <input type="checkbox" name="type-toggle-${btnCount}" id="type-toggle-${btnCount}">\n                    <label for="type-toggle-${btnCount}">\n                        <div class="button-type-switch" data-checked="Note" data-unchecked="Link"></div>\n                    </label>\n                </div>\n                <div class="delete">\n                    <button onclick="removeButton(this)" id="delete-${btnCount}" class="delete-rose-button"><i class="far fa-trash-alt"></i></button>\n                </div>\n            </div>\n        `),
    document.querySelector(".delete-rose-button").style.removeProperty("color"),
      document.querySelector("#rose-wrapper").appendChild(t),
      t.scrollIntoView();
  } else alert("As per Telegram limits, a message may only contain a maximum of 100 buttons.");
}

function removeButton(t) {
  if (2 == document.querySelectorAll(".group").length)
    return document.querySelector("#rose-wrapper").removeChild(t.parentNode.parentNode.parentNode), void(document.querySelector(".delete-rose-button").style.color = "grey");
  document.querySelectorAll(".group").length > 1 && document.querySelector("#rose-wrapper").removeChild(t.parentNode.parentNode.parentNode);
}

function generateButtonCode() {
  var t = [];
  document.querySelector("#button-output").innerHTML = "";
  let e = document.querySelectorAll(".group");
  for (i = 0; i < e.length; i++) {
    var n = {};
    let l = e[i].querySelectorAll("input");
    var o = !1;
    for (x = 0; x < 2; x++) "" == l[x].value ? (l[x].classList.add("buttoncode-input-empty"), (o = !0)) : l[x].classList.remove("buttoncode-input-empty");
    (n.label = l[0].value), (n.link = l[1].value), l[2].checked && 0 != i ? (n.sameline = ":same") : (n.sameline = ""), l[3].checked ? (n.type = "#") : (n.type = ""), t.push(n);
  }
  if (1 == o) return (document.querySelector("#button-output").innerHTML = "<p>Please fill all blank fields (text, link, link type)</p>"), void document.querySelector("#button-output").classList.add("buttoncode-error");
  let l = 0;
  for (i = 0; i < t.length; i++) {
    let e = document.createElement("p");
    if (((e.innerHTML = "[" + t[i].label.trim() + "](buttonurl://" + t[i].type + t[i].link.trim() + t[i].sameline + ")"), l + e.innerHTML.length > 4096))
      return (document.querySelector("#button-output").innerHTML = "Too many characters!"), void document.querySelector("#button-output").classList.add("buttoncode-error");
    (l += e.innerHTML.length),
    document.querySelector("#button-output").appendChild(e),
      document.querySelector("#button-output").classList.remove("buttoncode-error"),
      document.querySelector("#button-output").classList.add("buttoncode-success");
  }
}

function copyCode() {
  var t = document.querySelector("#button-output").innerText;
  if ("" != t && "Please fill all blank fields (text, link, link type)" != t) {
    var e = document.createElement("textarea");
    document.body.appendChild(e), (e.value = t), e.select(), document.execCommand("copy"), document.body.removeChild(e);
    const n = document.createElement("div");
    (n.className = "button-copy-success"), (n.innerHTML = "<p>Button code successfully copied to clipboard!</p>"), document.querySelector("body").appendChild(n);
    let o = 0;
    setInterval(function() {
        (n.style.opacity = o), (o += 0.1);
      }, 10),
      setTimeout(function() {
        document.querySelector("body").removeChild(n);
      }, 1500);
  }
}
