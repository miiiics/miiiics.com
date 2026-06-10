window.POSTS = [
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
  art:      { cls: 'badge-art',      label: 'Art',       href: '/art' },
  misc:     { cls: 'badge-misc',     label: '~ Misc.',   href: '/miscellaneous' },
  music:    { cls: 'badge-music',    label: '♪ Music',   href: '/music' },
  pokemon:  { cls: 'badge-pokemon',  label: 'Pokémon',  href: '/pokemon' },
  projects: { cls: 'badge-projects', label: 'Projects',  href: '/projects' },
  youtube:  { cls: 'badge-youtube',  label: '▶ YouTube', href: '/youtube' }
};

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
    html += '<article class="post"><div class="post-meta">' + badges + '<span>' + p.date + '</span></div>';
    html += '<h2 class="post-title"><a href="' + p.url + '" target="_blank" rel="noopener">' + p.title + '</a></h2>';
    if (p.embedSrc) {
      html += '<div class="video-wrapper"><iframe width="560" height="315" src="' + p.embedSrc + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>';
    }
    html += '</article>';
  });
  container.innerHTML = html;
};
