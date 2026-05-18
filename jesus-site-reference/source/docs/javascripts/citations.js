/**
 * Scripture Citation Linker
 * Auto-links Bible references to BibleGateway (ESV) at render time.
 * Non-canonical texts (Gospel of Thomas, Didache, etc.) link to
 * Early Christian Writings or other appropriate sources.
 */

(function () {
  'use strict';

  // Canonical Bible books — maps display names to BibleGateway search keys
  var BIBLE_BOOKS = [
    // Order matters: longer names first to prevent partial matches
    '1 Thessalonians', '2 Thessalonians',
    '1 Corinthians', '2 Corinthians',
    '1 Chronicles', '2 Chronicles',
    '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings',
    '1 Timothy', '2 Timothy',
    '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John',
    '1 Maccabees', '2 Maccabees',
    'Deuteronomy', 'Ecclesiastes',
    'Lamentations', 'Philippians',
    'Colossians', 'Revelation',
    'Zechariah', 'Zephaniah',
    'Nehemiah', 'Habakkuk',
    'Proverbs', 'Jeremiah',
    'Ephesians', 'Galatians',
    'Leviticus', 'Philemon',
    'Hebrews', 'Numbers', 'Matthew',
    'Genesis', 'Ezekiel', 'Malachi',
    'Obadiah',
    'Exodus', 'Joshua', 'Judges',
    'Psalms', 'Psalm', 'Isaiah',
    'Daniel', 'Romans',
    'Mark', 'Luke', 'John', 'Acts',
    'Ruth', 'Ezra', 'Joel', 'Amos',
    'Jonah', 'Micah', 'Nahum',
    'Hosea', 'Tobit', 'James',
    'Jude', 'Titus', 'Job',
    'Haggai'
  ];

  // Non-canonical texts with their link targets
  var NON_CANONICAL = {
    'Gospel of Thomas': {
      base: 'http://www.earlychristianwritings.com/thomas/',
      format: function (ref) {
        // Try to extract saying number
        var m = ref.match(/(?:Saying|Logion)?\s*(\d+)/i);
        if (m) return 'http://www.earlychristianwritings.com/thomas/gospelthomas' + m[1] + '.html';
        return 'http://www.earlychristianwritings.com/thomas.html';
      }
    },
    'Didache': {
      base: 'http://www.earlychristianwritings.com/didache.html',
      format: function () { return 'http://www.earlychristianwritings.com/didache.html'; }
    },
    '1 Enoch': {
      base: 'http://www.earlychristianwritings.com/1enoch.html',
      format: function () { return 'http://www.earlychristianwritings.com/1enoch.html'; }
    },
    'Shepherd of Hermas': {
      base: 'http://www.earlychristianwritings.com/shepherd.html',
      format: function () { return 'http://www.earlychristianwritings.com/shepherd.html'; }
    }
  };

  // Build regex pattern for canonical books
  // Match: BookName Chapter:Verse(-Verse)?(, Verse(-Verse))*(; BookName Chapter:Verse...)?
  // Examples: Matthew 5:39, Genesis 1:29-30, 1 Corinthians 15:51-52, Psalm 139:7-8
  var booksPattern = BIBLE_BOOKS.map(function (b) {
    return b.replace(/\s/g, '\\s+');
  }).join('|');

  var CANONICAL_RE = new RegExp(
    '\\b(' + booksPattern + ')' +       // Book name
    '\\s+' +                              // Space
    '(\\d+)' +                            // Chapter
    '(?::(\\d+(?:\\s*[-–—]\\s*\\d+)?))?'+ // :Verse or :Verse-Verse (optional)
    '(?:\\s*[-–—]\\s*\\d+)?',             // -Chapter (for cross-chapter ranges, optional)
    'g'
  );

  // Non-canonical pattern
  var nonCanonicalNames = Object.keys(NON_CANONICAL).map(function (n) {
    return n.replace(/\s/g, '\\s+');
  }).join('|');

  var NON_CANONICAL_RE = nonCanonicalNames
    ? new RegExp(
        '\\b(' + nonCanonicalNames + ')' +
        '(?:[,\\s]+(?:Saying|Logion|Chapter)?\\s*' +
        '(\\d+(?:\\s*[-–—]\\s*\\d+)?)' +
        '(?::(\\d+(?:\\s*[-–—]\\s*\\d+)?))?)?',
        'gi'
      )
    : null;

  function bibleGatewayUrl(book, chapter, verse) {
    var search = book + '+' + chapter;
    if (verse) search += ':' + verse.replace(/\s+/g, '').replace(/[–—]/g, '-');
    return 'https://www.biblegateway.com/passage/?search=' +
      encodeURIComponent(search.replace(/\+/g, ' ')) + '&version=ESV';
  }

  function processTextNode(node) {
    var text = node.nodeValue;
    if (!text || text.trim().length < 3) return;

    var hasCanonical = CANONICAL_RE.test(text);
    CANONICAL_RE.lastIndex = 0;
    var hasNonCanonical = NON_CANONICAL_RE && NON_CANONICAL_RE.test(text);
    if (NON_CANONICAL_RE) NON_CANONICAL_RE.lastIndex = 0;

    if (!hasCanonical && !hasNonCanonical) return;

    var frag = document.createDocumentFragment();
    var lastIndex = 0;
    var matches = [];

    // Collect canonical matches
    var m;
    CANONICAL_RE.lastIndex = 0;
    while ((m = CANONICAL_RE.exec(text)) !== null) {
      matches.push({
        index: m.index,
        length: m[0].length,
        full: m[0],
        type: 'canonical',
        book: m[1],
        chapter: m[2],
        verse: m[3] || null
      });
    }

    // Collect non-canonical matches
    if (NON_CANONICAL_RE) {
      NON_CANONICAL_RE.lastIndex = 0;
      while ((m = NON_CANONICAL_RE.exec(text)) !== null) {
        // Skip if this overlaps with a canonical match
        var overlaps = matches.some(function (cm) {
          return m.index < cm.index + cm.length && m.index + m[0].length > cm.index;
        });
        if (!overlaps) {
          var bookKey = Object.keys(NON_CANONICAL).find(function (k) {
            return m[1].replace(/\s+/g, ' ').toLowerCase() === k.toLowerCase();
          });
          if (bookKey) {
            matches.push({
              index: m.index,
              length: m[0].length,
              full: m[0],
              type: 'noncanonical',
              key: bookKey,
              ref: m[0]
            });
          }
        }
      }
    }

    // Sort by position
    matches.sort(function (a, b) { return a.index - b.index; });

    if (matches.length === 0) return;

    matches.forEach(function (match) {
      // Add text before this match
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
      }

      var a = document.createElement('a');
      a.textContent = match.full;
      a.classList.add('scripture-ref');
      a.target = '_blank';
      a.rel = 'noopener';

      if (match.type === 'canonical') {
        a.href = bibleGatewayUrl(match.book, match.chapter, match.verse);
        a.title = 'View ' + match.full + ' on BibleGateway (ESV)';
      } else {
        var handler = NON_CANONICAL[match.key];
        a.href = handler.format(match.ref);
        a.title = 'View on Early Christian Writings';
      }

      frag.appendChild(a);
      lastIndex = match.index + match.length;
    });

    // Remaining text
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    node.parentNode.replaceChild(frag, node);
  }

  function linkCitations(root) {
    if (!root) return;

    // Walk all text nodes in the content area
    var walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var parent = node.parentNode;
          if (!parent) return NodeFilter.FILTER_REJECT;
          var tag = parent.tagName;
          // Skip nodes already inside links, code, pre, script, style, input
          if (tag === 'A' || tag === 'CODE' || tag === 'PRE' ||
              tag === 'SCRIPT' || tag === 'STYLE' || tag === 'INPUT' ||
              tag === 'TEXTAREA' || tag === 'KBD') {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip the Sources/header metadata lines (front-matter style)
          if (parent.closest && parent.closest('.md-header, .md-nav, .md-footer')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var textNodes = [];
    var current;
    while ((current = walker.nextNode())) {
      textNodes.push(current);
    }

    // Process in reverse so DOM mutations don't affect walker
    for (var i = textNodes.length - 1; i >= 0; i--) {
      processTextNode(textNodes[i]);
    }
  }

  function init() {
    var content = document.querySelector('.md-content');
    if (content) linkCitations(content);
  }

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run after MkDocs instant navigation
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function () {
      setTimeout(init, 100);
    });
  } else {
    // Fallback: listen for location changes
    var lastPath = location.pathname;
    setInterval(function () {
      if (location.pathname !== lastPath) {
        lastPath = location.pathname;
        setTimeout(init, 200);
      }
    }, 500);
  }
})();
