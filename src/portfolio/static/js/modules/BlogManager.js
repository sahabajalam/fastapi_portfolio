class BlogManager {
    constructor() {
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.totalPosts = 0;
        this.allPosts = [];
        this.currentCategory = 'all';
        this.currentTag = '';
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadBlogPosts();
        this.setupSearch();
        this.setupFilters();
        this.setupPagination();
    }

    setupEventListeners() {
        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.category-filter');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(button.dataset.category);
            });
        });

        // Search input
        const searchInput = document.querySelector('#blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.searchPosts(e.target.value);
            }, 300));
        }

        // Load more button
        const loadMoreBtn = document.querySelector('#load-more-posts');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }

        // Post like buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-btn')) {
                this.handleLike(e.target);
            }
        });
    }

    async loadBlogPosts() {
        try {
            const response = await fetch('/api/blog/posts');
            if (!response.ok) throw new Error('Failed to fetch posts');

            const data = await response.json();
            this.allPosts = data.posts || [];
            this.totalPosts = this.allPosts.length;

            this.renderPosts();
            this.updatePostCount();
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.showError('Failed to load blog posts');
        }
    }

    renderPosts(posts = null) {
        const postsToRender = posts || this.getCurrentPagePosts();
        const blogGrid = document.querySelector('#blog-posts-grid');

        if (!blogGrid) return;

        if (postsToRender.length === 0) {
            blogGrid.innerHTML = `
                <div class="no-posts">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        const postsHTML = postsToRender.map(post => this.createPostCard(post)).join('');

        if (this.currentPage === 1) {
            blogGrid.innerHTML = postsHTML;
        } else {
            blogGrid.insertAdjacentHTML('beforeend', postsHTML);
        }

        // Animate new posts
        const newCards = blogGrid.querySelectorAll('.blog-card:not(.animated)');
        if (window.animationEngine) {
            window.animationEngine.staggerAnimate(newCards, { stagger: 0.1 });
        }
        newCards.forEach(card => card.classList.add('animated'));
    }

    createPostCard(post) {
        const publishDate = new Date(post.published_at).toLocaleDateString();
        const readTime = this.calculateReadTime(post.content);

        return `
            <article class="blog-card animate-on-scroll" data-animation="fadeInUp">
                <div class="blog-card-image">
                    <img src="${post.image_url}" alt="${post.title}" loading="lazy">
                    <div class="blog-card-category">${post.category}</div>
                </div>
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span class="blog-date">${publishDate}</span>
                        <span class="blog-read-time">${readTime} min read</span>
                    </div>
                    <h3 class="blog-card-title">
                        <a href="/blog/${post.slug}">${post.title}</a>
                    </h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-tags">
                        ${post.tags.map(tag => `
                            <span class="tag" data-tag="${tag}">${tag}</span>
                        `).join('')}
                    </div>
                    <div class="blog-card-footer">
                        <a href="/blog/${post.slug}" class="read-more-btn">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                        <div class="blog-card-actions">
                            <button class="like-btn" data-post-id="${post.id}">
                                <i class="far fa-heart"></i>
                                <span class="like-count">${post.likes || 0}</span>
                            </button>
                            <button class="share-btn" data-post-id="${post.id}">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    getCurrentPagePosts() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return this.getFilteredPosts().slice(startIndex, endIndex);
    }

    getFilteredPosts() {
        let filtered = this.allPosts;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(post =>
                post.category.toLowerCase() === this.currentCategory.toLowerCase()
            );
        }

        // Filter by tag
        if (this.currentTag) {
            filtered = filtered.filter(post =>
                post.tags.some(tag =>
                    tag.toLowerCase().includes(this.currentTag.toLowerCase())
                )
            );
        }

        return filtered;
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        this.renderPosts();
        this.updateActiveFilter(category);
        this.updatePostCount();
    }

    updateActiveFilter(activeCategory) {
        const filterButtons = document.querySelectorAll('.category-filter');
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.category === activeCategory) {
                button.classList.add('active');
            }
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('#blog-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', debounce((e) => {
            this.searchPosts(e.target.value);
        }, 300));
    }

    searchPosts(query) {
        if (!query.trim()) {
            this.currentPage = 1;
            this.renderPosts();
            return;
        }

        const searchResults = this.allPosts.filter(post => {
            const searchText = query.toLowerCase();
            return (
                post.title.toLowerCase().includes(searchText) ||
                post.excerpt.toLowerCase().includes(searchText) ||
                post.content.toLowerCase().includes(searchText) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchText))
            );
        });

        this.renderPosts(searchResults);
        this.updatePostCount(searchResults.length);
    }

    setupFilters() {
        // Tag filter
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                e.preventDefault();
                this.filterByTag(e.target.dataset.tag);
            }
        });

        // Sort options
        const sortSelect = document.querySelector('#post-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortPosts(e.target.value);
            });
        }
    }

    filterByTag(tag) {
        this.currentTag = tag;
        this.currentPage = 1;
        this.renderPosts();
        this.updatePostCount();
    }

    sortPosts(sortBy) {
        switch (sortBy) {
            case 'date-desc':
                this.allPosts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
                break;
            case 'date-asc':
                this.allPosts.sort((a, b) => new Date(a.published_at) - new Date(b.published_at));
                break;
            case 'title':
                this.allPosts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'popularity':
                this.allPosts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
        }
        this.currentPage = 1;
        this.renderPosts();
    }

    setupPagination() {
        const loadMoreBtn = document.querySelector('#load-more-posts');
        if (loadMoreBtn) {
            this.updateLoadMoreButton();
        }
    }

    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
        this.updateLoadMoreButton();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.querySelector('#load-more-posts');
        if (!loadMoreBtn) return;

        const filteredPosts = this.getFilteredPosts();
        const hasMorePosts = this.currentPage * this.postsPerPage < filteredPosts.length;

        loadMoreBtn.style.display = hasMorePosts ? 'block' : 'none';
    }

    updatePostCount(count = null) {
        const countElement = document.querySelector('#post-count');
        if (!countElement) return;

        const displayCount = count !== null ? count : this.getFilteredPosts().length;
        countElement.textContent = `${displayCount} post${displayCount !== 1 ? 's' : ''} found`;
    }

    async handleLike(button) {
        const postId = button.dataset.postId;
        const likeCount = button.querySelector('.like-count');
        const icon = button.querySelector('i');

        try {
            const response = await fetch(`/api/blog/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to like post');

            const data = await response.json();
            likeCount.textContent = data.likes;

            // Toggle heart icon
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.classList.add('liked');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                button.classList.remove('liked');
            }
        } catch (error) {
            console.error('Error liking post:', error);
            this.showError('Failed to like post');
        }
    }

    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    showError(message) {
        const errorElement = document.querySelector('#blog-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }

    // Method to refresh blog posts
    async refresh() {
        await this.loadBlogPosts();
    }

    // Method to get post by slug
    async getPostBySlug(slug) {
        try {
            const response = await fetch(`/api/blog/posts/${slug}`);
            if (!response.ok) throw new Error('Post not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    }
}
