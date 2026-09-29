(function () {
  "use strict";

  var words = [
    { keys:["casa de vida","house of life","дом жизни"], lemma:"pr-ꜥnḫ", pronunciation:"per anj", glyphs:"𓉐𓋹", es:"Casa de la Vida; institución de conocimiento y escritura", en:"House of Life; institution of knowledge and writing", ru:"Дом Жизни; учреждение знания и письма" },
    { keys:["vida eterna","eternal life","вечная жизнь"], lemma:"ꜥnḫ ḏt", pronunciation:"anj djet", glyphs:"𓋹𓆓𓏏𓇾", es:"vida eterna", en:"eternal life", ru:"вечная жизнь" },
    { keys:["vida","life","жизнь"], lemma:"ꜥnḫ", pronunciation:"anj", glyphs:"𓋹", es:"vida", en:"life", ru:"жизнь" },
    { keys:["sol","sun","солнце"], lemma:"rꜥ", pronunciation:"ra", glyphs:"𓇳", es:"sol / dios Ra", en:"sun / god Ra", ru:"солнце / бог Ра" },
    { keys:["nilo","rio nilo","río nilo","nile","нил"], lemma:"jtrw", pronunciation:"Íteru", glyphs:"𓇋𓏏𓂋𓅱𓈗", es:"el río; nombre egipcio del Nilo", en:"the river; Egyptian name for the Nile", ru:"река; египетское название Нила" },
    { keys:["inundacion","inundación","crecida del nilo","hapi","hapy","inundation","разлив нила"], lemma:"ḥꜥpy", pronunciation:"Hapi", glyphs:"𓎛𓂝𓊪𓇌", es:"la crecida anual del Nilo y su personificación divina", en:"the annual Nile inundation and its divine personification", ru:"ежегодный разлив Нила и его божественное олицетворение" },
    { keys:["agua","water","вода"], lemma:"mw", pronunciation:"mu", glyphs:"𓈗", es:"agua", en:"water", ru:"вода" },
    { keys:["casa","house","дом"], lemma:"pr", pronunciation:"per", glyphs:"𓉐", es:"casa", en:"house", ru:"дом" },
    { keys:["rey","king","царь","король"], lemma:"nsw", pronunciation:"nesu", glyphs:"𓇓𓏏𓈖", es:"rey", en:"king", ru:"царь" },
    { keys:["faraon","faraón","pharaoh","фараон"], lemma:"pr-ꜥꜣ", pronunciation:"per aa", glyphs:"𓉐𓉻", es:"gran casa; faraón", en:"great house; pharaoh", ru:"великий дом; фараон" },
    { keys:["dios","god","бог"], lemma:"nṯr", pronunciation:"necher", glyphs:"𓊹", es:"dios", en:"god", ru:"бог" },
    { keys:["diosa","goddess","богиня"], lemma:"nṯrt", pronunciation:"necheret", glyphs:"𓊹𓏏", es:"diosa", en:"goddess", ru:"богиня" },
    { keys:["paz","peace","мир"], lemma:"ḥtp", pronunciation:"hetep", glyphs:"𓊵", es:"paz, satisfacción u ofrenda", en:"peace, satisfaction or offering", ru:"мир, удовлетворение или подношение" },
    { keys:["bueno","buena","bello","bella","good","beautiful","хороший","красивый"], lemma:"nfr", pronunciation:"nefer", glyphs:"𓄤", es:"bueno, bello, perfecto", en:"good, beautiful, perfect", ru:"хороший, красивый, совершенный" },
    { keys:["oro","gold","золото"], lemma:"nbw", pronunciation:"nebu", glyphs:"𓋞", es:"oro", en:"gold", ru:"золото" },
    { keys:["tierra","land","земля"], lemma:"tꜣ", pronunciation:"ta", glyphs:"𓇾", es:"tierra", en:"land", ru:"земля" },
    { keys:["cielo","sky","небо"], lemma:"pt", pronunciation:"pet", glyphs:"𓇯", es:"cielo", en:"sky", ru:"небо" },
    { keys:["corazon","corazón","heart","сердце"], lemma:"jb", pronunciation:"ib", glyphs:"𓄣", es:"corazón", en:"heart", ru:"сердце" },
    { keys:["alma","soul","душа"], lemma:"bꜣ", pronunciation:"ba", glyphs:"𓅡", es:"ba; aspecto móvil del alma", en:"ba; mobile aspect of the soul", ru:"ба; подвижный аспект души" },
    { keys:["madre","mother","мать"], lemma:"mwt", pronunciation:"mut", glyphs:"𓅐𓏏", es:"madre", en:"mother", ru:"мать" },
    { keys:["padre","father","отец"], lemma:"jt", pronunciation:"it", glyphs:"𓇋𓏏", es:"padre", en:"father", ru:"отец" },
    { keys:["hombre","man","мужчина"], lemma:"z", pronunciation:"se", glyphs:"𓀀", es:"hombre", en:"man", ru:"мужчина" },
    { keys:["mujer","woman","женщина"], lemma:"st", pronunciation:"set", glyphs:"𓁐", es:"mujer", en:"woman", ru:"женщина" },
    { keys:["niño","nino","child","ребенок","ребёнок"], lemma:"ẖrd", pronunciation:"jerd", glyphs:"𓀔", es:"niño", en:"child", ru:"ребёнок" },
    { keys:["escriba","scribe","писец"], lemma:"sš", pronunciation:"sesh", glyphs:"𓏞", es:"escriba", en:"scribe", ru:"писец" },
    { keys:["templo","temple","храм"], lemma:"ḥwt-nṯr", pronunciation:"hut necher", glyphs:"𓉗𓊹", es:"morada del dios; templo", en:"god's enclosure; temple", ru:"обитель бога; храм" },
    { keys:["dia","día","day","день"], lemma:"hrw", pronunciation:"heru", glyphs:"𓇳𓏤", es:"día", en:"day", ru:"день" },
    { keys:["noche","night","ночь"], lemma:"grḥ", pronunciation:"gereh", glyphs:"𓎼𓂋𓎛", es:"noche", en:"night", ru:"ночь" },
    { keys:["eternidad","eternity","вечность"], lemma:"ḏt", pronunciation:"djet", glyphs:"𓆓𓏏", es:"eternidad inmutable", en:"unchanging eternity", ru:"неизменная вечность" }
  ];

  function normalize(value) {
    return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zа-яёñ\s-]/gi, "").replace(/\s+/g, " ");
  }

  var index = Object.create(null);
  words.forEach(function (entry) { entry.keys.forEach(function (key) { index[normalize(key)] = entry; }); });

  /* Adaptación íntegra para nombres y palabras modernas no documentadas.
     Nunca se combina con una traducción léxica dentro del mismo resultado. */
  var phoneticMap = {
    A:["ꜣ","𓄿"], B:["b","𓃀"], C:["k","𓎡"], D:["d","𓂧"], E:["j","𓇋"],
    F:["f","𓆑"], G:["g","𓎼"], H:["h","𓉔"], I:["j","𓇋"], J:["ḫ","𓐍"],
    K:["k","𓎡"], L:["r","𓂋"], M:["m","𓅓"], N:["n","𓈖"], Ñ:["nj","𓈖𓇋"],
    O:["w","𓅱"], P:["p","𓊪"], Q:["k","𓈎"], R:["r","𓂋"], S:["s","𓋴"],
    T:["t","𓏏"], U:["w","𓅱"], V:["f","𓆑"], W:["w","𓅱"], X:["ks","𓎡𓋴"],
    Y:["j","𓇋"], Z:["s","𓊃"]
  };

  function adaptPhonetically(source, lang) {
    var clean=String(source || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    var signs=[], transcription=[];
    Array.from(clean).forEach(function(ch){
      if(ch===" " || ch==="-"){if(signs.length&&signs[signs.length-1]!=="　")signs.push("　");if(transcription.length&&transcription[transcription.length-1]!=="/")transcription.push("/");return;}
      var item=phoneticMap[ch]; if(item){transcription.push(item[0]);signs.push(item[1]);}
    });
    var labels={es:"Adaptación fonética",en:"Phonetic adaptation",ru:"Фонетическая адаптация"};
    var meanings={
      es:"Palabra moderna «"+source+"» conservada íntegramente por su sonido; no es una traducción histórica documentada",
      en:"Modern word “"+source+"” preserved entirely by sound; it is not a documented historical translation",
      ru:"Современное слово «"+source+"» полностью сохранено по звучанию; это не документированный исторический перевод"
    };
    return {found:true,method:"phonetic",verified:false,source:source,lemma:labels[lang]+": "+transcription.join("-"),pronunciation:source,glyphs:signs.join(""),meaning:meanings[lang]};
  }

  window.__egyptTranslate = function (value, lang) {
    var source = String(value || "").trim();
    var entry = index[normalize(source)];
    lang = lang === "en" || lang === "ru" ? lang : "es";
    if (!source) return { found:false, source:source };
    if (!entry) {
      var parts = normalize(source).split(" ").filter(Boolean);
      var entries = parts.map(function (part) { return index[part]; });
      if (parts.length > 1 && entries.every(Boolean)) {
        return {
          found:true, method:"translation", verified:true, source:source,
          lemma:(lang==="es"?"Transcripción egiptológica: ":lang==="en"?"Egyptological transcription: ":"Египтологическая транскрипция: ")+entries.map(function (item) { return item.lemma; }).join(" · "),
          pronunciation:entries.map(function (item) { return item.pronunciation; }).join(" "),
          glyphs:entries.map(function (item) { return item.glyphs; }).join("　"),
          meaning:entries.map(function (item) { return item[lang]; }).join(" · ")
        };
      }
      return adaptPhonetically(source, lang);
    }
    return { found:true, method:"translation", verified:true, source:source, lemma:(lang==="es"?"Transcripción egiptológica: ":lang==="en"?"Egyptological transcription: ":"Египтологическая транскрипция: ")+entry.lemma, pronunciation:entry.pronunciation, glyphs:entry.glyphs, meaning:entry[lang] };
  };

  var defaults = { engine:"egyptological", voice:"", rate:"0.78", textScale:"1.12", glyphScale:"1.22" };
  var config;
  try { config = Object.assign({}, defaults, JSON.parse(localStorage.getItem("egyptVoiceConfig") || "{}")); }
  catch (_) { config = Object.assign({}, defaults); }

  function save() {
    try { localStorage.setItem("egyptVoiceConfig", JSON.stringify(config)); } catch (_) {}
    document.documentElement.style.setProperty("--egypt-text-scale", config.textScale);
    document.documentElement.style.setProperty("--egypt-glyph-scale", config.glyphScale);
  }
  save();

  function voices() { return "speechSynthesis" in window ? window.speechSynthesis.getVoices() : []; }
  function egyptianVoices(list) { return list.filter(function (v) { return /^ar-EG(?:$|-|_)/i.test(v.lang); }); }
  function voicePermission(value) {
    try { if (arguments.length) localStorage.setItem("egyptArEgVoicePermission",value); return localStorage.getItem("egyptArEgVoicePermission"); }
    catch (_) { return ""; }
  }
  var requestEgyptianVoiceInstall = null;

  function preferredVoice(list) {
    if (config.voice) {
      var selected = list.find(function (v) { return v.voiceURI === config.voice; });
      if (selected) return selected;
    }
    var order = config.engine === "coptic" ? [/^el(-|_)/i,/^ar-EG/i,/^he(-|_)/i] : [/^ar-EG/i,/^ar(-|_)/i,/^he(-|_)/i,/^el(-|_)/i,/^es(-|_)/i];
    for (var i=0;i<order.length;i++) { var found=list.find(function(v){ return order[i].test(v.lang); }); if(found)return found; }
    return list[0] || null;
  }

  window.__egyptSpeak = function (text) {
    if (!("speechSynthesis" in window) || !text) return;
    var available=egyptianVoices(voices());
    if (!available.length) {
      if (requestEgyptianVoiceInstall) requestEgyptianVoiceInstall(true);
      return false;
    }
    var utterance = new SpeechSynthesisUtterance(String(text).replace(/[ꜥꜣḥḫẖšḏṯ]/g, function(ch){ return ({"ꜥ":"a","ꜣ":"a","ḥ":"h","ḫ":"j","ẖ":"j","š":"sh","ḏ":"dj","ṯ":"ch"})[ch]; }));
    var voice = preferredVoice(available);
    if (voice) { utterance.voice=voice; utterance.lang=voice.lang; }
    utterance.rate = Number(config.rate) || .78;
    utterance.pitch = config.engine === "temple" ? .68 : config.engine === "coptic" ? .92 : .82;
    if (config.engine === "temple") utterance.rate *= .82;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance); return true;
  };

  function createSettings() {
    var open=document.createElement("button"); open.id="egypt-settings-open"; open.type="button"; open.innerHTML="⚙ Configuración";
    var modal=document.createElement("div"); modal.id="egypt-settings-modal"; modal.setAttribute("role","dialog"); modal.setAttribute("aria-modal","true"); modal.setAttribute("aria-labelledby","egypt-settings-title");
    modal.innerHTML='<div class="egypt-settings-card"><div class="egypt-settings-head"><h2 id="egypt-settings-title">Configuración</h2><button id="egypt-settings-close" aria-label="Cerrar">×</button></div><div class="egypt-settings-tabs" role="tablist"><button class="egypt-settings-tab active" data-tab="voice">Motor de voz</button><button class="egypt-settings-tab" data-tab="reading">Lectura</button></div><section class="egypt-settings-pane active" data-pane="voice"><div class="egypt-settings-note"><strong>Nota histórica:</strong> el egipcio antiguo es una lengua extinta y no se conserva su pronunciación exacta. Estos perfiles son reconstrucciones didácticas; no son voces auténticas.</div><div class="egypt-setting"><label>Motor egipcio recreado<small>Adapta la vocalización, el ritmo y el timbre de la voz elegida.</small></label><select id="egypt-engine"><option value="egyptological">Egiptológico — pronunciación académica</option><option value="coptic">Copto — vocalización histórica tardía</option><option value="temple">Templo — narrador ritual grave</option></select></div><div class="egypt-setting"><label>Voz base del sistema<small>La pronunciación requiere la voz Árabe (Egipto), código ar-EG.</small></label><select id="egypt-voice"></select></div><div id="egypt-voice-status" class="egypt-voice-status" role="status"></div><div class="egypt-voice-actions"><button id="egypt-install-voice" type="button">＋ Instalar Árabe (Egipto)</button><button id="egypt-refresh-voices" type="button">↻ Revisar instalación</button></div><div class="egypt-setting"><label>Velocidad</label><input id="egypt-rate" type="range" min="0.55" max="1.1" step="0.05"></div><button id="egypt-voice-test">🔊 Probar con “ꜥnḫ” (vida)</button></section><section class="egypt-settings-pane" data-pane="reading"><div class="egypt-setting"><label>Tamaño de las letras</label><select id="egypt-text-size"><option value="1">Normal</option><option value="1.12">Grande</option><option value="1.25">Muy grande</option></select></div><div class="egypt-setting"><label>Tamaño de jeroglíficos</label><select id="egypt-glyph-size"><option value="1">Normal</option><option value="1.22">Grande</option><option value="1.4">Muy grande</option></select></div></section></div>';
    var permission=document.createElement("div"); permission.id="egypt-voice-permission"; permission.setAttribute("role","dialog"); permission.setAttribute("aria-modal","true"); permission.setAttribute("aria-labelledby","egypt-voice-permission-title");
    permission.innerHTML='<div class="egypt-permission-card"><div class="egypt-permission-icon" aria-hidden="true">🔊</div><h2 id="egypt-voice-permission-title">Permiso para instalar el motor de voz</h2><p>La aplicación necesita la voz <strong>Árabe (Egipto) — ar-EG</strong> para reproducir las pronunciaciones reconstruidas.</p><p class="egypt-permission-warning"><strong>Sin este paso no podrás escuchar la pronunciación de las palabras del Antiguo Egipto.</strong></p><p>Al permitirlo se abrirá la configuración de voces de Windows. Allí elige <strong>Agregar voces → Árabe (Egipto)</strong>. Al terminar, vuelve a la aplicación y pulsa <strong>Revisar instalación</strong>.</p><div class="egypt-permission-actions"><button id="egypt-voice-deny" type="button">Ahora no</button><button id="egypt-voice-allow" type="button">Permitir y abrir instalación</button></div></div>';
    document.body.appendChild(open); document.body.appendChild(modal); document.body.appendChild(permission);
    var close=modal.querySelector("#egypt-settings-close");
    open.onclick=function(){modal.classList.add("open");populateVoices();}; close.onclick=function(){modal.classList.remove("open");open.focus();};
    modal.onclick=function(e){if(e.target===modal)close.click();}; document.addEventListener("keydown",function(e){if(e.key==="Escape"&&modal.classList.contains("open"))close.click();});
    modal.querySelectorAll(".egypt-settings-tab").forEach(function(tab){tab.onclick=function(){modal.querySelectorAll(".egypt-settings-tab,.egypt-settings-pane").forEach(function(x){x.classList.remove("active")});tab.classList.add("active");modal.querySelector('[data-pane="'+tab.dataset.tab+'"]').classList.add("active");};});
    var engine=modal.querySelector("#egypt-engine"), voice=modal.querySelector("#egypt-voice"), voiceStatus=modal.querySelector("#egypt-voice-status"), rate=modal.querySelector("#egypt-rate"), textSize=modal.querySelector("#egypt-text-size"), glyphSize=modal.querySelector("#egypt-glyph-size");
    engine.value=config.engine; rate.value=config.rate; textSize.value=config.textScale; glyphSize.value=config.glyphScale;
    engine.onchange=function(){config.engine=engine.value;config.voice="";save();populateVoices();}; voice.onchange=function(){config.voice=voice.value;save();}; rate.oninput=function(){config.rate=rate.value;save();}; textSize.onchange=function(){config.textScale=textSize.value;save();}; glyphSize.onchange=function(){config.glyphScale=glyphSize.value;save();};
    var installButton=modal.querySelector("#egypt-install-voice"), refreshButton=modal.querySelector("#egypt-refresh-voices");
    function closePermission(){permission.classList.remove("open");}
    function openWindowsVoiceSettings(){
      var link=document.createElement("a"); link.href="ms-settings:speech"; link.style.display="none"; document.body.appendChild(link); link.click(); link.remove();
    }
    requestEgyptianVoiceInstall=function(force){
      if(egyptianVoices(voices()).length)return false;
      if(!force&&voicePermission())return false;
      permission.classList.add("open"); permission.querySelector("#egypt-voice-allow").focus(); return true;
    };
    permission.querySelector("#egypt-voice-allow").onclick=function(){voicePermission("allowed");closePermission();openWindowsVoiceSettings();};
    permission.querySelector("#egypt-voice-deny").onclick=function(){voicePermission("later");closePermission();};
    installButton.onclick=function(){requestEgyptianVoiceInstall(true);};
    modal.querySelector("#egypt-voice-test").onclick=function(){window.__egyptSpeak("anj");};
    refreshButton.onclick=function(){populateVoices();if(!egyptianVoices(voices()).length)requestEgyptianVoiceInstall(true);};
    function populateVoices(){
      var list=voices(), egyptian=egyptianVoices(list), automatic;
      voice.innerHTML="";
      automatic=new Option("Automática — Árabe (Egipto)",""); voice.add(automatic);
      if(!egyptian.length){var missing=new Option("Árabe de Egipto (ar-EG) — NO INSTALADA","__missing_ar_eg");missing.disabled=true;voice.add(missing);}
      egyptian.sort(function(a,b){return a.name.localeCompare(b.name);});
      egyptian.forEach(function(v){voice.add(new Option("🇪🇬 "+v.name+" — "+v.lang,v.voiceURI));});
      if(egyptian.length&&!egyptian.some(function(v){return v.voiceURI===config.voice;})){config.voice=egyptian[0].voiceURI;save();}
      voice.value=egyptian.some(function(v){return v.voiceURI===config.voice;})?config.voice:"";
      if(egyptian.length){voiceStatus.className="egypt-voice-status available";voiceStatus.innerHTML="<strong>✓ Motor de voz listo.</strong> "+egyptian.map(function(v){return v.name;}).join(", ");installButton.hidden=true;voicePermission("installed");}
      else {voiceStatus.className="egypt-voice-status missing";voiceStatus.innerHTML="<strong>⚠ Falta la voz Árabe (Egipto).</strong> Sin instalarla no podrás escuchar la pronunciación de las palabras del Antiguo Egipto.";installButton.hidden=false;}
    }
    populateVoices();
    if("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged=populateVoices;
    window.setTimeout(populateVoices,1200);
  }

  function createMathProgressGuard() {
    var correct=new Set(), accepted=new Set(), held=new Set(), expected=[27,23,21,4], replaying=false;
    var labels={
      es:{free:"✕ ÷ Práctica libre",locked:"Completa correctamente las cuatro operaciones, incluida la división, para abrir la Cámara del Tesoro.",held:"✓ Resultado correcto. Queda completar el último ejemplo."},
      en:{free:"✕ ÷ Free practice",locked:"Complete all four operations correctly, including division, to open the Treasure Chamber.",held:"✓ Correct result. Complete the final example to continue."},
      ru:{free:"✕ ÷ Свободная практика",locked:"Реши правильно все четыре задания, включая деление, чтобы открыть Сокровищницу.",held:"✓ Верный результат. Реши последний пример, чтобы продолжить."}
    };
    function language(){
      var active=Array.from(document.querySelectorAll("#root button")).find(function(b){return /^(ES|EN|RU)$/.test((b.textContent||"").trim())&&b.className.indexOf("bg-[#d8b86a]")!==-1;});
      return active?(active.textContent||"es").trim().toLowerCase():"es";
    }
    var free=document.createElement("a"); free.id="egypt-free-math"; free.href="multiplicacion-division-egipcias.html"; free.target="_blank"; free.rel="noopener"; document.body.appendChild(free);
    var toast=document.createElement("div"); toast.id="egypt-math-lock-message"; toast.setAttribute("role","alert"); document.body.appendChild(toast);
    function showLocked(){var lang=language(),t=labels[lang]||labels.es;toast.textContent=t.locked;toast.classList.add("show");window.clearTimeout(showLocked.timer);showLocked.timer=window.setTimeout(function(){toast.classList.remove("show");},5000);}
    function operationInputs(){
      var root=document.getElementById("root"), inputs=root?Array.from(root.querySelectorAll("input")):[];
      return inputs.length===4&&root.textContent.indexOf("12 + 15")!==-1&&root.textContent.indexOf("30 - 7")!==-1?inputs:[];
    }
    function textReplace(root,from,to){
      var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),node;
      while((node=walker.nextNode()))if(node.nodeValue&&node.nodeValue.indexOf(from)!==-1)node.nodeValue=node.nodeValue.split(from).join(to);
    }
    function enhance(){
      var root=document.getElementById("root"); if(!root)return;
      var lang=language(),t=labels[lang]||labels.es; free.textContent=t.free;
      textReplace(root,"7 + 7 + 7  ( 7 × 3 )","7 × 3");
      textReplace(root,"20 - 5 - 5 - 5 - 5  ( 20 ÷ 5 )","20 ÷ 5");
      textReplace(root," / 3 mínimo"," / 4 obligatorios");
      textReplace(root," / 3 minimum"," / 4 required");
      textReplace(root," / 3 минимум"," / 4 обязательных");
      var sixth=Array.from(root.querySelectorAll("button")).find(function(b){var h=b.querySelector("h3");return h&&/^6\./.test((h.textContent||"").trim());});
      if(sixth){sixth.disabled=correct.size<4;sixth.classList.toggle("egypt-math-gated",correct.size<4);sixth.title=correct.size<4?t.locked:"";}
      var victories=["¡Has dominado la Sala de Cálculos! Has ganado oro y desbloqueado el Tesoro.","You have mastered the Hall of Calculations! You have earned gold and unlocked the Treasure.","Ты освоил Зал Вычислений! Ты заработал золото и открыл Сокровище."];
      Array.from(root.querySelectorAll("div")).forEach(function(el){if(victories.indexOf((el.textContent||"").trim())!==-1)el.hidden=correct.size<4;});
      operationInputs().forEach(function(input,index){var card=input.parentElement&&input.parentElement.parentElement;if(card){card.classList.toggle("egypt-answer-held",held.has(index));card.setAttribute("data-held-label",t.held);}});
    }
    function replayHeld(){
      var indexes=Array.from(held),position=0;
      function next(){
        if(position>=indexes.length){held.clear();window.setTimeout(enhance,0);return;}
        var index=indexes[position++],inputs=operationInputs(),input=inputs[index],button=input&&input.parentElement&&input.parentElement.querySelector("button");
        if(!button){window.setTimeout(next,80);return;}
        replaying=true;button.click();replaying=false;accepted.add(index);held.delete(index);window.setTimeout(next,180);
      }
      next();
    }
    document.addEventListener("click",function(e){
      var button=e.target&&e.target.closest&&e.target.closest("button"); if(!button)return;
      if(button.className&&button.className.indexOf("bg-[#a33]")!==-1){correct.clear();accepted.clear();held.clear();enhance();return;}
      var sixth=button.querySelector&&button.querySelector("h3");
      if(sixth&&/^6\./.test((sixth.textContent||"").trim())&&correct.size<4){e.preventDefault();e.stopPropagation();showLocked();return;}
      var inputs=operationInputs(), input=button.parentElement&&button.parentElement.querySelector("input"),index=inputs.indexOf(input);
      if(index<0||parseInt(input.value,10)!==expected[index])return;
      if(replaying){accepted.add(index);return;}
      correct.add(index);
      if(accepted.size<2){accepted.add(index);window.setTimeout(enhance,0);return;}
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();held.add(index);window.setTimeout(enhance,0);
      if(correct.size===4)window.setTimeout(replayHeld,80);
    },true);
    var observer=new MutationObserver(enhance); observer.observe(document.getElementById("root"),{childList:true,subtree:true}); enhance();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){createSettings();createMathProgressGuard();});else{createSettings();createMathProgressGuard();}
})();
