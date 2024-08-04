document.addEventListener('DOMContentLoaded', function() {
    const createVideoBtn = document.getElementById('create-video-btn');
    const createVideoModal = document.getElementById('create-video-modal');
    const closeBtn = document.querySelector('.close-btn');
    const publishVideoBtn = document.getElementById('publish-video-btn');

    // Show modal
    createVideoBtn.addEventListener('click', function() {
        createVideoModal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        createVideoModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == createVideoModal) {
            createVideoModal.style.display = 'none';
        }
    });

    // Publish video
    publishVideoBtn.addEventListener('click', function() {
        const thumbnailInput = document.getElementById('thumbnail-input');
        const videoInput = document.getElementById('video-input');
        const videoTitleInput = document.getElementById('video-title-input');
        const videoDescriptionInput = document.getElementById('video-description-input');

        const thumbnailFile = thumbnailInput.files[0];
        const videoFile = videoInput.files[0];
        const videoTitle = videoTitleInput.value;
        const videoDescription = videoDescriptionInput.value;

        if (thumbnailFile && videoFile && videoTitle && videoDescription) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const videoList = document.getElementById('video-list');
                
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';

                const thumbnail = document.createElement('img');
                thumbnail.src = e.target.result;
                videoCard.appendChild(thumbnail);

                const durationOverlay = document.createElement('div');
                durationOverlay.className = 'video-duration';
                videoCard.appendChild(durationOverlay);

                const videoInfo = document.createElement('div');
                videoInfo.className = 'video-info';

                const videoTitleElement = document.createElement('h3');
                videoTitleElement.textContent = videoTitle;
                videoInfo.appendChild(videoTitleElement);

                const videoDescriptionElement = document.createElement('p');
                videoDescriptionElement.textContent = videoDescription;
                videoInfo.appendChild(videoDescriptionElement);

                videoCard.appendChild(videoInfo);
                videoList.appendChild(videoCard);

                const videoUrl = URL.createObjectURL(videoFile);
                const videoElement = document.createElement('video');
                videoElement.src = videoUrl;
                videoElement.preload = 'metadata';
                videoElement.onloadedmetadata = function() {
                    const duration = formatTime(videoElement.duration);
                    durationOverlay.textContent = duration;
                };

                videoCard.addEventListener('click', function() {
                    window.location.href = videoUrl;
                });
            };
            reader.readAsDataURL(thumbnailFile);

            // Close modal
            createVideoModal.style.display = 'none';
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
});
