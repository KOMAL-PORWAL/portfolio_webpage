(async function() {
  const username = 'KOMAL-PORWAL';  // change this
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`;
  const res = await fetch(url);
  const repos = await res.json();

  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  repos
    .filter(r => !r.fork)  // ignore forked repos
    .forEach(r => {
      const card = document.createElement('div');
      card.className = 'card';

      const name = document.createElement('h3');
      name.textContent = r.name;

      const desc = document.createElement('p');
      desc.textContent = r.description || 'No description';

      const link = document.createElement('a');
      link.href = r.html_url;
      link.target = '_blank';
      link.textContent = 'View code';

      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(link);

      grid.appendChild(card);
    });

  if (repos.length === 0) {
    grid.innerHTML = `<div class="card"><p>No public projects found.</p></div>`;
  }
})();
