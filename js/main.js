/**
 * Geometry Dash Meltdown - Main JavaScript
 * Handles game interactions, fullscreen, sharing, and UI
 */

(function() {
    'use strict';

    // Game source URL
    const GAME_URL = 'https://lolygames.github.io/gd-melt/';

    /**
     * Obfuscate email to reduce spam harvesting
     * Returns: cumicumi196 [at] gmail.com (as HTML)
     */
    function initEmailObfuscation() {
        var emailElements = document.querySelectorAll('#contact-email');
        if (emailElements.length === 0) return;

        var user = 'cumicumi196';
        var domain = 'gmail.com';
        var email = user + '@' + domain;

        emailElements.forEach(function(el) {
            // Only show if not already set
            if (el.innerHTML.trim() === '') {
                el.innerHTML = email;
                // Make it a mailto link if within an anchor
                if (el.parentElement && el.parentElement.tagName === 'A') {
                    el.parentElement.href = 'mailto:' + email;
                }
            }
        });
    }

    /**
     * Initialize the game by loading it into the iframe
     */
    window.customStartGame = function customStartGame() {
        const gameArea = document.getElementById('game-area');
        const overlay = document.getElementById('custom-play-overlay');
        
        if (gameArea) {
            gameArea.src = GAME_URL;
        }
        if (overlay) {
            overlay.style.display = 'none';
        }
    };

    /**
     * Toggle fullscreen mode for the game iframe
     */
    window.open_fullscreen = function open_fullscreen() {
        const game = document.getElementById('game-area');
        
        if (!game) {
            return;
        }

        const doc = document;
        const isFullscreen = doc.fullscreenElement || 
                             doc.mozFullScreenElement || 
                             doc.webkitFullscreenElement || 
                             doc.msFullscreenElement;

        if (!isFullscreen) {
            // Enter fullscreen
            if (game.requestFullscreen) {
                game.requestFullscreen().catch(function(err) {
                    console.warn('Fullscreen request failed:', err);
                });
            } else if (game.msRequestFullscreen) {
                game.msRequestFullscreen();
            } else if (game.mozRequestFullScreen) {
                game.mozRequestFullScreen();
            } else if (game.webkitRequestFullscreen) {
                game.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            // Exit fullscreen
            if (doc.exitFullscreen) {
                doc.exitFullscreen().catch(function(err) {
                    console.warn('Exit fullscreen failed:', err);
                });
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        }
    };

    /**
     * Share the game URL using Web Share API or fallback to clipboard
     */
    window.shareGame = function shareGame() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href
            }).catch(function(err) {
                // User cancelled or share failed
                console.log('Share cancelled or failed:', err);
            });
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href)
                .then(function() {
                    alert('Link copied to clipboard!');
                })
                .catch(function(err) {
                    console.error('Failed to copy to clipboard:', err);
                    // Fallback for older browsers
                    window.prompt('Copy this link:', window.location.href);
                });
        } else {
            // Last resort fallback
            window.prompt('Copy this link:', window.location.href);
        }
    };

    /**
     * Refresh the game by reloading the iframe
     */
    window.refreshGame = function refreshGame() {
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        if (gameArea.src && gameArea.src !== '' && gameArea.src !== window.location.href) {
            gameArea.src = gameArea.src;
        } else {
            const overlay = document.getElementById('custom-play-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
            gameArea.src = '';
        }
    };

    /**
     * Toggle favorite/star icon state
     */
    window.toggleFavorite = function toggleFavorite() {
        const btn = document.querySelector('button[title="Favorite"]');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
            }
        }
    };

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initSmoothScroll();
            initEmailObfuscation();
        });
    } else {
        initSmoothScroll();
        initEmailObfuscation();
    }

})();
