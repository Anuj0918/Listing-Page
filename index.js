let perPage = 10; // Initial number of repositories per page
let page = 1; 

async function getRepositories() {
    const username = document.getElementById('username').value;
    const repositoriesPerPage = document.getElementById('repositoriesPerPage').value;
    const repositoriesDiv = document.getElementById('repository');

    repositoriesDiv.innerHTML = '<p>Loading...</p>';


    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${repositoriesPerPage}&page=${page}`);
        const repositories = await response.json();

        repositoriesDiv.innerHTML = ''; // Clear previous results

        if (repositories.length === 0) {
            repositoriesDiv.innerHTML = '<p>No repositories found.</p>';
            return;
        }

        repositories.forEach(repo => {
            const repoBox = document.createElement('div');
            repoBox.className = 'repository';

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.target = '_blank';
            repoLink.textContent = repo.name;

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repo.description || 'No description available';

            repoBox.appendChild(repoLink);
            repoBox.appendChild(repoDescription);
            repositoriesDiv.appendChild(repoBox);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
        repositoriesDiv.innerHTML = '<p>An error occurred while fetching repositories.</p>';
    }
}

// Function to load more repositories (pagination)
function loadMore() {
    page++;
    getRepositories();
}

function updatePerPage() {
    perPage = parseInt(document.getElementById('reposPerPage').value, 10);
    page = 1; 
    getRepositories();
}
