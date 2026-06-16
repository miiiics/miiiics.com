window.POSTS = [
  {
    cats: ['projects'],
    date: 'June 15, 2026',
    title: 'Introducing Miiiics.com!',
    body: [
      { type: 'p', text: 'I do a *lot* of different things in life, and it can be very messy and confusing trying to keep up with them all. To remedy this, I decided to build *[Miiiics.com](https://miiiics.com/)*! I\'m designing this website as a portfolio of sorts, with the intention of documenting and organizing my personal endeavors.' },
      { type: 'p', text: 'This site will primarily serve as a checkpoint for myself. There are times when life gets hectic, and I feel like I\'ve lived so much life with nothing to show for it. The idea is that 10-15 years from now, when these projects are long forgotten, *[Miiiics.com](https://miiiics.com/)* will remain.' },
      { type: 'p', text: 'With that being said, I\'ve put effort into the presentation for a reason. I hope that people can come to this site for their own enjoyment. Whether it\'s to learn from my mistakes, to laugh at what I spend my money on, or maybe even to inspire their own fun ideas, I hope that any and all visitors can take something from here and leave with a smile!' }
    ]
  },
  {
    cats: ['misc', 'youtube'],
    date: 'December 29, 2024',
    title: 'I Flew Across the Country to Rank Every Gas Station',
    url: 'https://www.youtube.com/watch?v=CQqm2YP1iAw',
    embedSrc: 'https://www.youtube.com/embed/CQqm2YP1iAw?si=hXm82havGv0_7-KT'
  },
  {
    cats: ['youtube'],
    date: 'May 20, 2023',
    title: 'The BEST START Possible in Minecraft Hardcore',
    url: 'https://www.youtube.com/watch?v=aIcIiBeMugs',
    embedSrc: 'https://www.youtube.com/embed/aIcIiBeMugs?si=zAitZHglaswqekbA'
  },
  {
    cats: ['youtube'],
    date: 'April 22, 2023',
    title: 'Building a MASSIVE Starter Base in Hardcore Minecraft...',
    url: 'https://www.youtube.com/watch?v=toa8-WzqKqE',
    embedSrc: 'https://www.youtube.com/embed/toa8-WzqKqE?si=P6pM1BCrXc1EGPf7'
  },
  {
    cats: ['youtube'],
    date: 'April 18, 2023',
    title: "Minecraft Hardcore but it's really annoying…",
    url: 'https://www.youtube.com/watch?v=9eWe2lcFV8A',
    embedSrc: 'https://www.youtube.com/embed/9eWe2lcFV8A?si=8k6EJbv0PDaPkBWB'
  },
  {
    cats: ['youtube'],
    date: 'April 15, 2023',
    title: 'Minecraft Veteran plays Hardcore in 2023...',
    url: 'https://www.youtube.com/watch?v=A6p3Z17grpU',
    embedSrc: 'https://www.youtube.com/embed/A6p3Z17grpU?si=Saf4rgfgaUWop4FW'
  },
  {
    cats: ['youtube'],
    date: 'April 6, 2023',
    title: 'Can I Break a World Record in 1 Hour?',
    url: 'https://www.youtube.com/watch?v=TaOt5zFYqMA',
    embedSrc: 'https://www.youtube.com/embed/TaOt5zFYqMA?si=JdBktjPc9SvBxvh4'
  },
  {
    cats: ['music', 'youtube'],
    date: 'January 23, 2023',
    title: 'I Have TOO MANY Guitars...',
    url: 'https://www.youtube.com/watch?v=iNFWx0JQusA',
    embedSrc: 'https://www.youtube.com/embed/iNFWx0JQusA?si=DPP_OZjdCcKtAuRq'
  },
  {
    cats: ['music', 'youtube'],
    date: 'December 27, 2022',
    title: 'PRS SE 277 Baritone POV Unboxing!',
    url: 'https://www.youtube.com/watch?v=bDgJx_-omrE',
    embedSrc: 'https://www.youtube.com/embed/bDgJx_-omrE?si=TCNxkrCVW-zTQtME'
  }
];

window.BADGE_DEFS = {
  art:      { cls: 'badge-art',      label: '✏ Art',      href: '/art' },
  misc:     { cls: 'badge-misc',     label: '⁂ Misc.',    href: '/miscellaneous' },
  music:    { cls: 'badge-music',    label: '♪ Music',    href: '/music' },
  pokemon:  { cls: 'badge-pokemon',  label: 'Pokémon',   href: '/pokemon' },
  projects: { cls: 'badge-projects', label: '⚒ Projects', href: '/projects' },
  youtube:  { cls: 'badge-youtube',  label: '▶ YouTube',  href: '/youtube' }
};

// Convert *text* pairs to <strong>text</strong>. Only single-asterisk pairs; no nesting.
function renderInline(text) {
  return text
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

window.renderPosts = function (containerId, pageCat) {
  var posts = pageCat
    ? window.POSTS.filter(function (p) { return p.cats.indexOf(pageCat) !== -1; })
    : window.POSTS;
  var container = document.getElementById(containerId);
  if (!container) return;
  if (!posts.length) {
    container.innerHTML = '<p class="empty-state">Nothing here yet — check back soon.</p>';
    return;
  }
  var html = '';
  posts.forEach(function (p) {
    var badges = p.cats.slice().sort().map(function (c) {
      var d = window.BADGE_DEFS[c];
      return '<a href="' + d.href + '" class="badge ' + d.cls + '">' + d.label + '</a>';
    }).join('');
    var hasBody = p.body && p.body.length;
    html += '<article class="post' + (hasBody ? ' post-has-body' : '') + '"><div class="post-meta">' + badges + '<span>' + p.date + '</span></div>';

    // Title: plain text when no url, linked when url is present
    if (p.url) {
      html += '<h2 class="post-title"><a href="' + p.url + '" target="_blank" rel="noopener">' + p.title + '</a></h2>';
    } else {
      html += '<h2 class="post-title">' + p.title + '</h2>';
    }

    // YouTube embed
    if (p.embedSrc) {
      html += '<div class="video-wrapper"><iframe width="560" height="315" src="' + p.embedSrc + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>';
    }

    // Body blocks: paragraphs and inline images
    if (p.body && p.body.length) {
      html += '<div class="post-body">';
      p.body.forEach(function (block) {
        if (block.type === 'p') {
          html += '<p>' + renderInline(block.text) + '</p>';
        } else if (block.type === 'img') {
          html += '<div class="image-wrapper"><img src="' + block.src + '" alt="' + (block.caption || '') + '"></div>';
          if (block.caption) {
            html += '<p class="image-caption">' + block.caption + '</p>';
          }
        }
      });
      html += '</div>';
    }

    html += '</article>';
  });
  container.innerHTML = html;
};
