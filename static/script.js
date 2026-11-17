const API_URL = 'http://127.0.0.1:5000/api/referrals';

async function fetchReferrals() {
    try {
        const response = await fetch(API_URL);
        const referrals = await response.json();
        renderTable(referrals);
        updateAnalytics(referrals);
    } catch (err) {
        console.error('Error fetching referrals:', err);
    }
}

function renderTable(referrals) {
    const tbody = document.getElementById('referral-table-body');
    tbody.innerHTML = '';
    referrals.forEach(ref => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ref.referrer_name}</td>
            <td>${ref.referred_name}</td>
            <td>${ref.email}</td>
            <td>${ref.job_title}</td>
            <td>${ref.reason}</td>
            <td><button class="delete-btn" onclick="deleteReferral(${ref.id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function updateAnalytics(referrals) {
    document.getElementById('total-count').innerText = referrals.length;
    const uniqueJobs = new Set(referrals.map(r => r.job_title.toLowerCase().trim()));
    document.getElementById('unique-jobs-count').innerText = uniqueJobs.size;
}

document.getElementById('referral-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        referrer_name: document.getElementById('referrer_name').value,
        referred_name: document.getElementById('referred_name').value,
        email: document.getElementById('email').value,
        job_title: document.getElementById('job_title').value,
        reason: document.getElementById('reason').value
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        document.getElementById('referral-form').reset();
        fetchReferrals();
    } else {
        alert('Failed to submit referral');
    }
});

async function deleteReferral(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchReferrals();
}

// Initial load
fetchReferrals();
