// Basic water footprint data for demonstration
const waterFootprintData = {
    'apple': 70,
    'banana': 160,
    'beef': 15400,
    'chicken': 4325
};

// Function to calculate the water footprint
function calculateFootprint() {
    const item = document.getElementById('item-input').value.toLowerCase();
    const resultElement = document.getElementById('footprint-result');

    fetch('http://localhost:3000/calculate', { // Ensure this matches your server port
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item: item })
    })
    .then(response => response.json())
    .then(data => {
        resultElement.innerHTML = data.message;
        document.getElementById('avatar-message').innerHTML = `You searched for ${item}.`;
    })
    .catch(error => {
        resultElement.innerHTML = 'Error calculating water footprint. Please try again.';
    });
}

// Function to simulate object scanning (placeholder)

function scanObject() {
    const fileInput = document.getElementById('image-upload');
    const scanResult = document.getElementById('scan-result');
    const resultElement = document.getElementById('footprint-result');

    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('http://localhost:3000/scan', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultElement.innerHTML = data.message;
        })
        .catch(error => {
            resultElement.innerHTML = 'Error scanning the image. Please try again.';
        });
    }

}
function scanImageUrl() {
    const imageUrl = document.getElementById('image-url').value;
    const resultElement = document.getElementById('result');

    fetch('http://localhost:3000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: imageUrl })
    })
    .then(response => response.json())
    .then(data => { resultElement.innerHTML = data.message; })
    .catch(error => { resultElement.innerHTML = 'Error scanning the image URL. Please try again.'; });
}

// Initialize the Three.js scene for the avatar
function initAvatar() {
    const avatarElement = document.getElementById('avatar');
    const width = avatarElement.offsetWidth;
    const height = avatarElement.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    avatarElement.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
}

// Call initAvatar to initialize the Three.js avatar
initAvatar();
