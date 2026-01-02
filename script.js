/* salesforceinsight.in - Main Logic Script */

/* =========================================
   1. GLOBAL DATA (Videos)
   ========================================= */
const videoData = [
    {
        id: "SOQXmdxMi78",
        title: "How to Create Agentforce Agents (Step-by-Step)" 
        // ^ NOW FIRST as requested
    },
    {
        id: "0y8MwlfJQtY",
        title: "Record Triggered Flow Challenges: Resolving Errors" 
        // ^ ADDED: Fixes the missing preview
    },
    {
        id: "MAbWS4iX9d4",
        title: "Integrate Agentforce in External Website"
    },
    {
        id: "Jla7uCAC8qw",
        title: "Invoke an Agent Using Apex Code"
    },
    {
        id: "5fwdeZAbPxU",
        title: "Invoke Agentforce using Flows (Real World Use Case)"
    },
    {
        id: "3Cmtd8Qllpo",
        title: "What is Agentforce? Quick Overview"
    }
];

/* =========================================
   2. INTERACTIVE GALLERY LOGIC (Home Page)
   ========================================= */
let currentIndex = 0;
const playerContainer = document.getElementById("video-player");
const titleContainer = document.getElementById("video-title");
const thumbStrip = document.getElementById("thumb-strip");

function initGallery() {
    // Safety check: Stop if we are not on the Home Page
    if (!playerContainer) return; 

    // Clear existing thumbnails
    thumbStrip.innerHTML = "";

    // Generate Thumbnails dynamically
    videoData.forEach((video, index) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-item ${index === 0 ? 'active-thumb' : ''}`;
        
        // Use YouTube's medium quality thumbnail
        thumb.style.backgroundImage = `url('https://img.youtube.com/vi/${video.id}/mqdefault.jpg')`;
        thumb.onclick = () => loadGalleryItem(index);
        
        thumbStrip.appendChild(thumb);
    });

    // Load the first video (Now "Create Agents")
    loadGalleryItem(0);
}

function loadGalleryItem(index) {
    currentIndex = index;
    const video = videoData[index];

    // 1. Update Title
    if (titleContainer) titleContainer.innerText = video.title;

    // 2. Update Active Thumbnail Styling
    const allThumbs = document.querySelectorAll(".thumb-item");
    allThumbs.forEach((t, i) => {
        if (i === index) t.classList.add("active-thumb");
        else t.classList.remove("active-thumb");
    });

    // 3. Load Facade (High-Res Image + Play Button)
    playerContainer.innerHTML = `<div class="play-btn-overlay"></div>`;
    playerContainer.style.backgroundImage = `url('https://img.youtube.com/vi/${video.id}/maxresdefault.jpg')`;
    
    // 4. On Click -> Inject YouTube Iframe
    playerContainer.onclick = function() {
        playerContainer.innerHTML = `
            <iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
        `;
        playerContainer.onclick = null;
    };
}

// Handle Previous/Next Arrows
function moveGallery(direction) {
    currentIndex += direction;
    
    // Loop around logic
    if (currentIndex >= videoData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = videoData.length - 1;
    
    loadGalleryItem(currentIndex);
}

/* =========================================
   3. FILTERING LOGIC (Videos Page)
   ========================================= */
function filterSelection(category) {
    const cards = document.getElementsByClassName("video-card");
    const buttons = document.getElementsByClassName("filter-btn");

    if (cards.length === 0) return;

    // Update Button Styling
    for (let btn of buttons) {
        btn.classList.remove("active");
        const btnText = btn.innerText.toLowerCase();
        if (btnText.includes(category) || (category === 'all' && btnText === 'all')) {
            btn.classList.add("active");
        }
    }

    if (category === "all") category = "";

    // Show/Hide Cards
    for (let i = 0; i < cards.length; i++) {
        let cardCat = cards[i].getAttribute("data-category");
        if (cardCat.indexOf(category) > -1) {
            cards[i].style.display = "block";
            cards[i].style.animation = "fade 0.5s";
        } else {
            cards[i].style.display = "none";
        }
    }
}

/* =========================================
   4. UTILITY LOGIC (Resources Page)
   ========================================= */
function copyCode() {
    const snippetElement = document.getElementById("snippet");
    if (!snippetElement) return;

    const codeText = snippetElement.innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.querySelector(".copy-btn");
        btn.innerText = "Copied!";
        btn.style.background = "#4BBF73";
        
        setTimeout(() => { 
            btn.innerText = "Copy"; 
            btn.style.background = ""; 
        }, 2000);
    });
}

/* =========================================
   5. INITIALIZATION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("video-player")) {
        initGallery();
    }
    if(document.querySelector(".filter-bar")) {
        filterSelection('all'); 
    }
});