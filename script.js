document.addEventListener('DOMContentLoaded', function () {
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });

    // Add Repository modal
    const newRepoForm = document.getElementById('newRepoForm');
    const newRepoModalElement = document.getElementById('newRepoModal');
    const newRepoModal = new bootstrap.Modal(newRepoModalElement);

    // Success modal
    const successModalElement = document.getElementById('successModal');
    const successModal = new bootstrap.Modal(successModalElement);

    let projects = [
        { name: "E-Commerce", description: "Creating a dynamic e-commerce platform with HTML, CSS, and JavaScript for seamless online shopping experiences.", skills: ["JavaScript", "HTML", "CSS"] },
        { name: "E-commerce website 2", description: "Creating a dynamic e-commerce platform with HTML, CSS, JavaScript and php for seamless online shopping experiences", skills: ["HTML", "CSS", "JS", "php"] },
        { name: "Online job Portal", description: "Building an interactive online job portal with HTML, CSS, and JavaScript for seamless job searching and application processes.", skills: ["HTML", "CSS", "JS", "php"] },
        { name: "Rain Prediction Using AI/ML", description: "Developing an AI/ML-based rain prediction system using historical weather data to enhance accuracy and provide timely forecasts.", skills: ["ai/ml", "Python"] },
        { name: "Snake Game", description: "Creating a classic Snake game using Python for a fun and nostalgic gaming experience", skills: ["Python"] },
        { name: "Portfolio", description: "Description of our Achievement.", skills: ["HTML", "CSS", "JS"] }
    ];

    let currentPage = 1;

    function addProject(name, description, skills) {
        projects.push({ name, description, skills: skills.split(',').map(skill => skill.trim()) });
    }

    function updateProjects() {
        const projectSection = document.querySelector('.project-section');
        projectSection.innerHTML = '';

        const projectsPerPage = 3;
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;

        const visibleProjects = projects.slice(startIndex, endIndex);

        visibleProjects.forEach(project => {
            const projectBox = document.createElement('div');
            projectBox.classList.add('project-box');

            const projectName = document.createElement('h2');
            projectName.innerHTML = `<a href="#">${project.name}</a>`;
            projectBox.appendChild(projectName);

            const projectDescription = document.createElement('p');
            projectDescription.textContent = project.description;
            projectBox.appendChild(projectDescription);

            const skillsContainer = document.createElement('div');
            skillsContainer.classList.add('skills');

            project.skills.forEach(skill => {
                const skillBadge = document.createElement('span');
                skillBadge.classList.add('badge', 'badge-primary');
                skillBadge.textContent = skill;
                skillsContainer.appendChild(skillBadge);
            });

            projectBox.appendChild(skillsContainer);
            projectSection.appendChild(projectBox);
        });
    }

    newRepoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const repoName = document.getElementById('repoName').value;
        const projectDescription = document.getElementById('projectDescription').value;
        const skills = document.getElementById('skills').value;

        if (repoName && projectDescription && skills) {
            addProject(repoName, projectDescription, skills);
            updateProjects();

            // Show success modal
            successModal.show();
            newRepoModal.hide();
            this.reset();
        } else {
            // Handle case where any field is not filled
            alert('Please fill out all fields.');
        }
    });
    

    document.getElementById('nextPage').addEventListener('click', function () {
        if (currentPage < Math.ceil(projects.length / 3)) {
            currentPage++;
            updateProjects();
        }
    });

    document.getElementById('prevPage').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            updateProjects();
        }
    });

    // Event listener to open the modal
    document.getElementById('addRepositoriesLink').addEventListener('click', function (e) {
        e.preventDefault();
        newRepoModal.show();
    });

    updateProjects();
});
