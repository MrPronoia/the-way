/* The Reading Room — static client. No server, no AI.
   Loads data.json (built by site/build.py), matches a typed question to one of
   the cards with Fuse.js, renders the card and its case board, and opens the
   source text in a reader pane. */

(function () {
  'use strict';

  var DATA = null;
  var fuse = null;
  var current = null;
  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  function tierClass(tier) {
    tier = (tier || '').toLowerCase();
    if (tier.indexOf('red text') === 0) return 'red';
    if (tier.indexOf('early church') === 0 || tier.indexOf('jerusalem') === 0 || tier.indexOf('thomas') === 0) return 'green';
    if (tier.indexOf('paul') === 0 || tier.indexOf('what paul') === 0 || tier.indexOf('acts') === 0) return 'blue';
    return '';
  }

  function stampFor(src) {
    var s = el('span', 'stamp ' + (src.status === 'held' ? 'held' : 'not-held'), src.statusText || (src.status === 'held' ? 'HELD' : 'NOT YET HELD'));
    s.style.setProperty('--stamp-tilt', ((Math.random() * 8) - 4).toFixed(1) + 'deg');
    return s;
  }

  function renderPins(listId, sources, cls) {
    var ul = $(listId);
    ul.innerHTML = '';
    sources.forEach(function (src, i) {
      var li = el('li');
      var b = el('button', 'pincard' + (cls ? ' ' + cls : ''));
      b.type = 'button';
      b.style.setProperty('--tilt', (((i % 2) ? -1 : 1) * (1 + (i % 3) * 0.5)).toFixed(1) + 'deg');
      var pin = el('span', 'pin' + (cls === 'against' ? ' red' : ''));
      b.appendChild(pin);
      b.appendChild(el('div', 'tier ' + tierClass(src.tier), (src.tier || '').toUpperCase()));
      b.appendChild(el('div', 'ptitle', src.title || src.ref));
      var quote = src.phrase ? '“' + src.phrase + '”' : (src.note || '').split('. ')[0];
      b.appendChild(el('div', 'pquote', quote));
      var foot = el('div', 'pfoot');
      foot.appendChild(el('span', 'open', 'open →'));
      foot.appendChild(stampFor(src));
      b.appendChild(foot);
      b.addEventListener('click', function () {
        var idx = current.sources.indexOf(src);
        history.replaceState(null, '', '#/' + current.slug + '/' + idx);
        openReader(src);
      });
      li.appendChild(b);
      ul.appendChild(li);
    });
  }

  function copyText(text, btn) {
    var done = function () { var t = btn.textContent; btn.textContent = 'copied'; setTimeout(function () { btn.textContent = t; }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* no clipboard; the text is still selected */ }
    document.body.removeChild(ta);
  }
  function permalink(slug, idx) {
    var base = location.origin + location.pathname;
    return base + '#/' + slug + (idx != null ? '/' + idx : '');
  }
  function citationLine(src) {
    var ref = src.title || src.ref;
    var where = src.passages && src.passages.length ? ref + ', KJV' : (src.edition ? ref + ' (' + src.edition + ')' : ref);
    var quote = src.phrase ? '“' + src.phrase + '” — ' : '';
    return quote + where + ' · ' + permalink(current.slug, current.sources.indexOf(src));
  }

  function drawStrings() {
    var svg = $('strings');
    var board = $('board');
    var q = $('qcard');
    if (!svg || !board || !q || !current) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var br = board.getBoundingClientRect();
    var qr = q.getBoundingClientRect();
    var qx = qr.left + qr.width / 2 - br.left;
    var qy = qr.top - br.top + 2;
    var pins = board.querySelectorAll('.pins .pin');
    for (var i = 0; i < pins.length; i++) {
      var pr = pins[i].getBoundingClientRect();
      var px = pr.left + pr.width / 2 - br.left;
      var py = pr.top + pr.height / 2 - br.top;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', qx); line.setAttribute('y1', qy);
      line.setAttribute('x2', px); line.setAttribute('y2', py);
      var isOther = pins[i].closest('#pinsOther');
      line.setAttribute('stroke', isOther ? '#55555c' : '#d0352a');
      line.setAttribute('stroke-width', '2');
      if (isOther) line.setAttribute('stroke-dasharray', '6 5');
      svg.appendChild(line);
    }
  }

  function renderCard(card) {
    current = card;
    document.title = card.question + ' · The Way';
    $('call').textContent = card.call + ' · ' + card.drawer;
    $('checked').textContent = 'CHECKED';
    $('question').textContent = card.question;
    $('subtitle').textContent = card.subtitle || '';
    $('finding').textContent = card.finding;
    var see = $('see');
    see.innerHTML = '';
    see.appendChild(document.createTextNode('SEE: the case file on the desk. The full card, with every objection and the responses, is in the repo: '));
    var a = el('a', null, card.card);
    a.href = card.cardUrl; a.target = '_blank'; a.rel = 'noopener';
    see.appendChild(a);

    $('folderTab').textContent = 'CASE ' + card.call.replace('Q ', '') + ' · ' + card.drawer;
    $('qtext').textContent = card.question;
    var labels = card.boardLabels || {};
    $('labelFor').textContent = labels.for || 'FOR';
    $('labelAgainst').textContent = labels.against || 'AGAINST';
    $('labelOther').textContent = labels.other || 'THE OTHER STACK';

    var fors = card.sources.filter(function (s) { return s.side === 'for'; });
    var against = card.sources.filter(function (s) { return s.side === 'against'; });
    var other = card.sources.filter(function (s) { return s.side === 'other'; });
    renderPins('pinsFor', fors, '');
    renderPins('pinsAgainst', against, 'against');
    renderPins('pinsOther', other, '');
    $('labelOther').hidden = other.length === 0;

    var ol = $('oneLiners');
    ol.innerHTML = '';
    (card.oneLiners || []).slice(0, 3).forEach(function (t) {
      var li = el('li', null, t + ' ');
      var cb = el('button', 'copy-mini', 'copy');
      cb.type = 'button';
      cb.setAttribute('aria-label', 'Copy this line with a link to the card');
      cb.addEventListener('click', function () { copyText(t + ' · ' + permalink(card.slug), cb); });
      li.appendChild(cb);
      ol.appendChild(li);
    });
    var held = card.sources.filter(function (s) { return s.status === 'held'; }).length;
    $('count').textContent = fors.length + ' for · ' + against.length + ' against · ' + other.length + ' other stack · ' + held + ' of ' + card.sources.length + ' held in the repo';

    var dn = $('doNotSay');
    dn.innerHTML = '';
    (card.doNotSay || []).forEach(function (t) { dn.appendChild(el('li', null, t)); });
    $('donotWrap').hidden = !(card.doNotSay && card.doNotSay.length);

    var gd = $('goDeeper');
    gd.innerHTML = '';
    (card.goDeeper || []).forEach(function (g) {
      var li = el('li');
      var a2 = el('a', null, g.title);
      a2.href = g.url; a2.target = '_blank'; a2.rel = 'noopener';
      li.appendChild(a2);
      li.appendChild(document.createTextNode(' · ' + g.path));
      gd.appendChild(li);
    });

    var nx = $('next');
    nx.innerHTML = '';
    (card.next || []).forEach(function (slug) {
      var c = DATA.cards.filter(function (x) { return x.slug === slug; })[0];
      if (!c) return;
      var a3 = el('a', null, c.question);
      a3.href = '#/' + c.slug;
      nx.appendChild(a3);
    });

    var drawer = $('drawer');
    drawer.innerHTML = '';
    var groups = [];
    DATA.cards.forEach(function (c) {
      var g = groups.filter(function (x) { return x.label === c.drawer; })[0];
      if (!g) { g = { label: c.drawer, cards: [] }; groups.push(g); }
      g.cards.push(c);
    });
    groups.forEach(function (g) {
      var gl = el('li', 'drawer-group');
      gl.appendChild(el('span', 'drawer-group-label', g.label));
      drawer.appendChild(gl);
      g.cards.forEach(function (c) {
        var li = el('li');
        var a4 = el('a', c.slug === card.slug ? 'current' : '');
        a4.href = '#/' + c.slug;
        a4.appendChild(el('small', null, c.call));
        a4.appendChild(el('span', null, c.question));
        li.appendChild(a4);
        drawer.appendChild(li);
      });
    });

    $('nocard').hidden = true;
    requestAnimationFrame(function () { drawStrings(); setTimeout(drawStrings, 300); });
  }

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function highlight(text, phrase) {
    if (!phrase) return document.createTextNode(text);
    var frag = document.createDocumentFragment();
    var re = new RegExp(escapeRe(phrase).replace(/'/g, "['’]"), 'i');
    var m = re.exec(text);
    if (!m) { frag.appendChild(document.createTextNode(text)); return frag; }
    frag.appendChild(document.createTextNode(text.slice(0, m.index)));
    frag.appendChild(el('mark', null, m[0]));
    frag.appendChild(document.createTextNode(text.slice(m.index + m[0].length)));
    return frag;
  }

  function openReader(src) {
    $('readerTier').textContent = (src.tier || '').toUpperCase();
    $('readerTitle').textContent = src.title || src.ref;
    var st = $('readerStatus');
    st.innerHTML = '';
    st.appendChild(stampFor(src));
    if (src.edition) st.appendChild(el('span', null, src.edition));
    if (src.status === 'held' && src.passages && src.passages.length) st.appendChild(el('span', null, 'King James Version, public domain'));

    var body = $('readerBody');
    body.innerHTML = '';
    if (src.passages && src.passages.length) {
      src.passages.forEach(function (p) {
        var d = el('div', 'passage');
        d.appendChild(el('div', 'plabel', p.label + ' (KJV) · in context'));
        var addVerse = function (v, dim, hl) {
          var s = el('span', dim ? 'v dim' : 'v');
          s.appendChild(el('span', 'vn', v.n));
          s.appendChild(hl ? highlight(v.text, src.phrase) : document.createTextNode(v.text));
          d.appendChild(s);
        };
        (p.before || []).forEach(function (v) { addVerse(v, true, false); });
        p.verses.forEach(function (v) { addVerse(v, false, true); });
        (p.after || []).forEach(function (v) { addVerse(v, true, false); });
        body.appendChild(d);
      });
    } else if (src.snippet) {
      var sn = el('div', 'snippet');
      sn.appendChild(highlight(src.snippet, src.phrase));
      body.appendChild(sn);
      body.appendChild(el('div', 'plabel', 'From the held file; the phrase above is what to grep for.'));
    } else {
      body.appendChild(el('div', 'plabel', 'Not in the collection yet. The words stay out of quotation marks until the text is held; the link below goes to a public-domain edition.'));
    }
    $('readerNote').textContent = src.note || '';
    var foot = $('readerFoot');
    foot.innerHTML = '';
    if (src.open || src.link) {
      var a = el('a', null, src.open ? 'Open the file in the repo →' : 'Open a public-domain edition →');
      a.href = src.open || src.link; a.target = '_blank'; a.rel = 'noopener';
      foot.appendChild(a);
    }
    if (src.phrase) {
      var g = el('div');
      g.appendChild(document.createTextNode('Cite the distinctive phrase, not the line number: '));
      g.appendChild(el('code', null, src.phrase));
      foot.appendChild(g);
    }
    var row = el('div', 'copy-row');
    var c1 = el('button', 'copy', 'copy citation');
    c1.type = 'button';
    c1.addEventListener('click', function () { copyText(citationLine(src), c1); });
    row.appendChild(c1);
    var c2 = el('button', 'copy', 'copy link to this source');
    c2.type = 'button';
    c2.addEventListener('click', function () { copyText(permalink(current.slug, current.sources.indexOf(src)), c2); });
    row.appendChild(c2);
    foot.appendChild(row);
    $('readerBackdrop').hidden = false;
    $('reader').hidden = false;
    $('readerClose').focus();
  }

  function closeReader() {
    $('reader').hidden = true; $('readerBackdrop').hidden = true;
    if (current && /^#\/[a-z0-9-]+\/\d+/.test(location.hash)) history.replaceState(null, '', '#/' + current.slug);
  }

  function search(q) {
    if (!q.trim()) return [];
    return fuse.search(q, { limit: 5 }).map(function (r) { return { card: r.item, score: r.score }; });
  }

  function showSuggest(q) {
    var ul = $('suggest');
    var input = $('q');
    var res = search(q);
    ul.innerHTML = '';
    if (!res.length) { ul.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
    res.forEach(function (r, i) {
      var li = el('li');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      li.appendChild(document.createTextNode(r.card.question));
      li.appendChild(el('small', null, r.card.call + ' · ' + r.card.drawer));
      li.addEventListener('mousedown', function (e) { e.preventDefault(); go(r.card); });
      ul.appendChild(li);
    });
    ul.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function go(card) {
    $('suggest').hidden = true;
    $('q').value = card.question;
    $('hint').textContent = '';
    if (location.hash !== '#/' + card.slug) location.hash = '#/' + card.slug; else renderCard(card);
    $('card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function noCard(q) {
    var res = search(q);
    $('nocard').hidden = false;
    $('cardCount').textContent = DATA.cards.length;
    var ul = $('nearest');
    ul.innerHTML = '';
    res.forEach(function (r) {
      var li = el('li');
      var a = el('a', null, r.card.question);
      a.href = '#/' + r.card.slug;
      li.appendChild(a);
      ul.appendChild(li);
    });
    $('requestLink').href = 'https://github.com/the-nazarene/way/issues/new?title=' + encodeURIComponent('Card request: ' + q) +
      '&body=' + encodeURIComponent('Someone asked the Reading Room:\n\n> ' + q + '\n\nNo card matched. If this deserves one, it goes on OPEN-RESEARCH.md.');
    $('hint').textContent = 'No card matched closely enough. Nearest cards are below.';
    $('nocard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function submit(e) {
    e.preventDefault();
    var q = $('q').value;
    var res = search(q);
    if (res.length && res[0].score <= 0.55) go(res[0].card); else noCard(q);
  }

  function route() {
    var m = /^#\/([a-z0-9-]+)(?:\/(\d+))?/.exec(location.hash);
    var card = m ? DATA.cards.filter(function (c) { return c.slug === m[1]; })[0] : null;
    if (!current || !card || current.slug !== card.slug) renderCard(card || DATA.cards[0]);
    if (m && m[2] && card && card.sources[+m[2]]) openReader(card.sources[+m[2]]); else closeReader();
  }

  fetch('data.json').then(function (r) { return r.json(); }).then(function (d) {
    DATA = d;
    fuse = new Fuse(d.cards, {
      keys: [
        { name: 'question', weight: 0.5 },
        { name: 'aliases', weight: 0.3 },
        { name: 'oneLiners', weight: 0.1 },
        { name: 'sources.title', weight: 0.05 },
        { name: 'sources.ref', weight: 0.05 }
      ],
      threshold: 0.5, ignoreLocation: true, includeScore: true, minMatchCharLength: 3
    });
    $('drawerLabel').textContent = 'THE HARD QUESTIONS · ' + d.cards.length + ' CARDS';
    var input = $('q');
    input.addEventListener('input', function () { showSuggest(input.value); });
    input.addEventListener('blur', function () { setTimeout(function () { $('suggest').hidden = true; }, 150); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape') $('suggest').hidden = true; });
    $('search').addEventListener('submit', submit);
    $('readerClose').addEventListener('click', closeReader);
    $('readerBackdrop').addEventListener('click', closeReader);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('reader').hidden) closeReader(); });
    window.addEventListener('hashchange', route);
    window.addEventListener('resize', drawStrings);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawStrings);
    route();
  }).catch(function (err) {
    $('finding').textContent = 'The card data failed to load. ' + err;
  });
})();
