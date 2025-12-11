// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            window.scrollTo({
                top: target.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Admin functionality
(function() {
    // Default admin credentials
    const DEFAULT_ADMIN = { username: 'admin', password: 'admin123' };
    
    // Get users from localStorage or initialize with default admin
    function getUsers() {
        const stored = localStorage.getItem('adminUsers');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                // If parsing fails, reset to default
                console.warn('Failed to parse admin users, resetting to default');
            }
        }
        // Initialize with default admin
        const defaultUsers = [DEFAULT_ADMIN];
        localStorage.setItem('adminUsers', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    
    // Save users to localStorage
    function saveUsers(users) {
        localStorage.setItem('adminUsers', JSON.stringify(users));
    }
    
    // Check if logged in
    function isLoggedIn() {
        return sessionStorage.getItem('adminLoggedIn') === 'true';
    }
    
    // Get current user
    function getCurrentUser() {
        return sessionStorage.getItem('adminUsername');
    }
    
    // DOM elements
    const loginForm = document.getElementById('loginForm');
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const currentUserSpan = document.getElementById('currentUser');
    const addUserForm = document.getElementById('addUserForm');
    const addUserMessage = document.getElementById('addUserMessage');
    const userListItems = document.getElementById('userListItems');
    
    // Update UI based on login state
    function updateUI() {
        if (isLoggedIn()) {
            adminLogin.style.display = 'none';
            adminPanel.style.display = 'block';
            currentUserSpan.textContent = getCurrentUser();
            renderUserList();
        } else {
            adminLogin.style.display = 'block';
            adminPanel.style.display = 'none';
            loginError.textContent = '';
        }
    }
    
    // Render user list
    function renderUserList() {
        const users = getUsers();
        userListItems.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${user.username}</span>
                ${users.length > 1 ? `<button class="btn-delete" data-index="${index}">Remove</button>` : '<span class="text-muted">(cannot remove last user)</span>'}
            `;
            userListItems.appendChild(li);
        });
        
        // Add delete handlers
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const users = getUsers();
                if (users.length > 1) {
                    users.splice(index, 1);
                    saveUsers(users);
                    renderUserList();
                }
            });
        });
    }
    
    // Login handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const users = getUsers();
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminUsername', username);
                updateUI();
            } else {
                loginError.textContent = 'Invalid username or password';
            }
        });
    }
    
    // Logout handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminUsername');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            updateUI();
        });
    }
    
    // Add user handler
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newUsername = document.getElementById('newUsername').value.trim();
            const newPassword = document.getElementById('newPassword').value;
            
            // Validate username (alphanumeric, 3-20 chars)
            if (!/^[a-zA-Z0-9_]{3,20}$/.test(newUsername)) {
                addUserMessage.textContent = 'Username must be 3-20 alphanumeric characters';
                addUserMessage.style.color = '#ff6b6b';
                return;
            }
            
            // Validate password (min 6 chars)
            if (newPassword.length < 6) {
                addUserMessage.textContent = 'Password must be at least 6 characters';
                addUserMessage.style.color = '#ff6b6b';
                return;
            }
            
            if (newUsername && newPassword) {
                const users = getUsers();
                
                // Check if username already exists
                if (users.find(u => u.username === newUsername)) {
                    addUserMessage.textContent = 'Username already exists';
                    addUserMessage.style.color = '#ff6b6b';
                    return;
                }
                
                users.push({ username: newUsername, password: newPassword });
                saveUsers(users);
                
                document.getElementById('newUsername').value = '';
                document.getElementById('newPassword').value = '';
                addUserMessage.textContent = 'User added successfully!';
                addUserMessage.style.color = '#6bff6b';
                renderUserList();
                
                setTimeout(() => {
                    addUserMessage.textContent = '';
                }, 3000);
            }
        });
    }
    
    // Initialize UI
    updateUI();
})();
