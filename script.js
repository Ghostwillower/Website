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
    const activityLogElement = document.getElementById('activityLog');
    const clearActivityLogBtn = document.getElementById('clearActivityLog');
    
    // =====================
    // Activity Log Functions
    // =====================
    
    // Get activity log from localStorage
    function getActivityLog() {
        const stored = localStorage.getItem('activityLog');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('Failed to parse activity log');
            }
        }
        return [];
    }
    
    // Save activity log to localStorage
    function saveActivityLog(activities) {
        // Keep only last 100 activities to prevent localStorage overflow
        const limitedActivities = activities.slice(-100);
        localStorage.setItem('activityLog', JSON.stringify(limitedActivities));
    }
    
    // Add an activity to the log
    function logActivity(type, message, user) {
        const activities = getActivityLog();
        activities.push({
            type: type,
            message: message,
            user: user || getCurrentUser() || 'Unknown',
            timestamp: Date.now()
        });
        saveActivityLog(activities);
        renderActivityLog();
    }
    
    // Get icon for activity type
    function getActivityIcon(type) {
        const icons = {
            'login': '🔓',
            'logout': '🔒',
            'user-add': '👤',
            'user-remove': '🚫',
            'file-upload': '📁',
            'file-remove': '🗑️',
            'message': '💬'
        };
        return icons[type] || '📋';
    }
    
    // Render activity log
    function renderActivityLog() {
        const activities = getActivityLog();
        
        if (activities.length === 0 || !activityLogElement) {
            if (activityLogElement) {
                activityLogElement.innerHTML = '<p class="text-muted">No activity recorded yet.</p>';
            }
            return;
        }
        
        // Show newest first
        const reversed = [...activities].reverse();
        activityLogElement.innerHTML = reversed.map(activity => `
            <div class="activity-item activity-${activity.type}">
                <span class="activity-icon">${getActivityIcon(activity.type)}</span>
                <div class="activity-content">
                    <div class="activity-text">${escapeHtml(activity.message)}</div>
                    <div class="activity-time">${escapeHtml(activity.user)} • ${formatTime(activity.timestamp)}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Clear activity log handler
    if (clearActivityLogBtn) {
        clearActivityLogBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear the activity log?')) {
                localStorage.removeItem('activityLog');
                renderActivityLog();
            }
        });
    }
    
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
                    const removedUser = users[index].username;
                    users.splice(index, 1);
                    saveUsers(users);
                    logActivity('user-remove', `Removed user "${removedUser}"`);
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
                logActivity('login', `User "${username}" logged in`);
                updateUI();
            } else {
                loginError.textContent = 'Invalid username or password';
            }
        });
    }
    
    // Logout handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            const username = getCurrentUser();
            logActivity('logout', `User "${username}" logged out`);
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
                logActivity('user-add', `Added new user "${newUsername}"`);
                
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
    
    // =====================
    // Chatroom Message Board
    // =====================
    
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    // Get chat messages from localStorage
    function getChatMessages() {
        const stored = localStorage.getItem('chatMessages');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('Failed to parse chat messages');
            }
        }
        return [];
    }
    
    // Save chat messages to localStorage
    function saveChatMessages(messages) {
        // Keep only last 100 messages to prevent localStorage overflow
        const limitedMessages = messages.slice(-100);
        localStorage.setItem('chatMessages', JSON.stringify(limitedMessages));
    }
    
    // Render chat messages
    function renderChatMessages() {
        const messages = getChatMessages();
        
        if (messages.length === 0) {
            chatMessages.innerHTML = '<p class="chat-empty">No messages yet. Start the conversation!</p>';
            return;
        }
        
        chatMessages.innerHTML = messages.map(msg => `
            <div class="chat-message">
                <div class="chat-message-header">
                    <span class="chat-message-user">${escapeHtml(msg.user)}</span>
                    <span class="chat-message-time">${formatTime(msg.timestamp)}</span>
                </div>
                <div class="chat-message-text">${escapeHtml(msg.text)}</div>
            </div>
        `).join('');
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Format timestamp
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
    
    // Chat form handler
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const text = chatInput.value.trim();
            
            if (text && isLoggedIn()) {
                const messages = getChatMessages();
                messages.push({
                    user: getCurrentUser(),
                    text: text,
                    timestamp: Date.now()
                });
                saveChatMessages(messages);
                logActivity('message', `Posted a message: "${text.length > 50 ? text.substring(0, 50) + '...' : text}"`);
                chatInput.value = '';
                renderChatMessages();
            }
        });
    }
    
    // =====================
    // File Upload and Sharing
    // =====================
    
    const fileUploadForm = document.getElementById('fileUploadForm');
    const fileInput = document.getElementById('fileInput');
    const fileListElement = document.getElementById('fileList');
    
    // Store file data (base64) in localStorage
    function getSharedFiles() {
        const stored = localStorage.getItem('sharedFiles');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('Failed to parse shared files');
            }
        }
        return [];
    }
    
    // Save shared files to localStorage
    function saveSharedFiles(files) {
        // Limit total storage (keep last 20 files to prevent overflow)
        const limitedFiles = files.slice(-20);
        try {
            localStorage.setItem('sharedFiles', JSON.stringify(limitedFiles));
        } catch (e) {
            console.warn('Storage quota exceeded, removing old files');
            // If quota exceeded, remove oldest files
            const reducedFiles = limitedFiles.slice(-10);
            localStorage.setItem('sharedFiles', JSON.stringify(reducedFiles));
        }
    }
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Render file list
    function renderFileList() {
        const files = getSharedFiles();
        
        if (files.length === 0) {
            fileListElement.innerHTML = '<p class="text-muted">No files uploaded yet.</p>';
            return;
        }
        
        fileListElement.innerHTML = files.map((file, index) => {
            // Validate data URL to prevent XSS
            const isValidDataUrl = file.data && typeof file.data === 'string' && file.data.startsWith('data:');
            const downloadHref = isValidDataUrl ? file.data : '#';
            const downloadDisabled = !isValidDataUrl ? ' style="pointer-events: none; opacity: 0.5;"' : '';
            
            return `
            <div class="file-item">
                <div class="file-info">
                    <div class="file-name">${escapeHtml(file.name)}</div>
                    <div class="file-meta">${formatFileSize(file.size)} • Uploaded by ${escapeHtml(file.uploadedBy)} • ${formatTime(file.timestamp)}</div>
                </div>
                <div class="file-actions">
                    <a href="${downloadHref}" download="${escapeHtml(file.name)}" class="btn-download"${downloadDisabled}>Download</a>
                    <button class="btn-remove" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        }).join('');
        
        // Add remove handlers
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const indexAttr = this.getAttribute('data-index');
                const index = parseInt(indexAttr, 10);
                const files = getSharedFiles();
                
                // Validate index is a valid number within bounds
                if (isNaN(index) || index < 0 || index >= files.length) {
                    console.warn('Invalid file index:', indexAttr);
                    return;
                }
                
                const removedFileName = files[index].name;
                files.splice(index, 1);
                saveSharedFiles(files);
                logActivity('file-remove', `Removed file "${removedFileName}"`);
                renderFileList();
            });
        });
    }
    
    // File upload handler
    if (fileUploadForm) {
        fileUploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!isLoggedIn()) return;
            
            const files = fileInput.files;
            if (files.length === 0) return;
            
            const sharedFiles = getSharedFiles();
            let uploadCount = 0;
            
            // Count valid files (under size limit)
            const validFiles = Array.from(files).filter(f => f.size <= 1024 * 1024);
            const totalValidFiles = validFiles.length;
            
            if (totalValidFiles === 0) {
                // All files were too large
                return;
            }
            
            Array.from(files).forEach(file => {
                // Limit file size to 1MB for localStorage constraints
                if (file.size > 1024 * 1024) {
                    alert(`File "${file.name}" is too large. Maximum size is 1MB.`);
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    sharedFiles.push({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        data: e.target.result,
                        uploadedBy: getCurrentUser(),
                        timestamp: Date.now()
                    });
                    
                    uploadCount++;
                    // Save when all valid files have been processed
                    if (uploadCount === totalValidFiles) {
                        saveSharedFiles(sharedFiles);
                        logActivity('file-upload', `Uploaded ${totalValidFiles} file(s)`);
                        renderFileList();
                        fileInput.value = '';
                    }
                };
                reader.readAsDataURL(file);
            });
        });
    }
    
    // Update UI to also render chat and files when logged in
    const originalUpdateUI = updateUI;
    updateUI = function() {
        originalUpdateUI();
        if (isLoggedIn()) {
            renderChatMessages();
            renderFileList();
            renderActivityLog();
        }
    };
    
    // Initialize UI
    updateUI();
})();
