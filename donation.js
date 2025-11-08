let requests = [];
let donors = [];
let selectedRequestId = null;

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    if (tabName === 'view-requests') displayRequests();
    if (tabName === 'view-donors') displayDonors();
}

function postRequest(e) {
    e.preventDefault();
    
    const request = {
        id: Date.now(),
        patientName: document.getElementById('patientName').value,
        type: document.getElementById('requestType').value,
        specific: document.getElementById('specific').value,
        urgency: document.getElementById('requestUrgency').value,
        requiredDate: document.getElementById('requiredDate').value,
        details: document.getElementById('requestDetails').value,
        contactPerson: document.getElementById('contactPerson').value,
        contactPhone: document.getElementById('contactPhone').value,
        location: document.getElementById('requestLocation').value,
        postedDate: new Date().toLocaleDateString()
    };

    requests.push(request);
    showSuccess('requestSuccess');
    document.getElementById('requestForm').reset();
}

function registerDonor(e) {
    e.preventDefault();
    
    const donor = {
        id: Date.now(),
        name: document.getElementById('donorName').value,
        email: document.getElementById('donorEmail').value,
        phone: document.getElementById('donorPhone').value,
        dob: document.getElementById('donorDOB').value,
        bloodGroup: document.getElementById('donorBloodGroup').value,
        donationType: document.getElementById('donationType').value,
        organType: document.getElementById('organType').value,
        location: document.getElementById('donorLocation').value,
        availability: document.getElementById('donorAvailability').value,
        medicalInfo: document.getElementById('medicalInfo').value,
        registeredDate: new Date().toLocaleDateString()
    };

    donors.push(donor);
    showSuccess('donorSuccess');
    document.getElementById('donorForm').reset();
}

function displayRequests() {
    const container = document.getElementById('requestsContainer');
    
    if (requests.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div>No requests posted yet</div>';
        return;
    }

    container.innerHTML = requests.map(req => `
        <div class="request-card">
            <div class="card-header">
                <div class="card-title">${req.patientName}</div>
                <span class="badge badge-urgent">${req.urgency.toUpperCase()}</span>
            </div>
            <div class="card-info">
                <div class="info-row">
                    <span class="info-label">Type:</span>
                    <span>${req.specific} (${req.type})</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Required By:</span>
                    <span>${req.requiredDate}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span>${req.location}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Contact:</span>
                    <span>${req.contactPerson} - ${req.contactPhone}</span>
                </div>
                <p style="margin-top: 10px; color: #666; font-size: 0.9em;">${req.details}</p>
            </div>
            <button class="btn btn-assign" onclick="openAssignModal(${req.id}, '${req.specific}')">I Can Help</button>
        </div>
    `).join('');
}

function displayDonors() {
    const container = document.getElementById('donorsContainer');
    
    if (donors.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">💔</div>No donors registered yet</div>';
        return;
    }

    container.innerHTML = donors.map(donor => `
        <div class="donor-card">
            <div class="card-header">
                <div class="card-title">${donor.name}</div>
                <span class="badge badge-type">${donor.bloodGroup}</span>
            </div>
            <div class="card-info">
                <div class="info-row">
                    <span class="info-label">Type:</span>
                    <span>${donor.donationType}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span>${donor.location}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Availability:</span>
                    <span>${donor.availability}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Contact:</span>
                    <span>${donor.email}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterRequests() {
    const typeFilter = document.getElementById('filterRequestType').value;
    const urgencyFilter = document.getElementById('filterUrgency').value;
    
    const filtered = requests.filter(req => {
        return (!typeFilter || req.type === typeFilter) &&
               (!urgencyFilter || req.urgency === urgencyFilter);
    });

    const container = document.getElementById('requestsContainer');
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div>No matching requests found</div>';
        return;
    }

    container.innerHTML = filtered.map(req => `
        <div class="request-card">
            <div class="card-header">
                <div class="card-title">${req.patientName}</div>
                <span class="badge badge-urgent">${req.urgency.toUpperCase()}</span>
            </div>
            <div class="card-info">
                <div class="info-row">
                    <span class="info-label">Type:</span>
                    <span>${req.specific} (${req.type})</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Required By:</span>
                    <span>${req.requiredDate}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span>${req.location}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Contact:</span>
                    <span>${req.contactPerson} - ${req.contactPhone}</span>
                </div>
                <p style="margin-top: 10px; color: #666; font-size: 0.9em;">${req.details}</p>
            </div>
            <button class="btn btn-assign" onclick="openAssignModal(${req.id}, '${req.specific}')">I Can Help</button>
        </div>
    `).join('');
}

function filterDonors() {
    const typeFilter = document.getElementById('filterDonorType').value;
    const bloodFilter = document.getElementById('filterBloodGroup').value;
    
    const filtered = donors.filter(donor => {
        return (!typeFilter || donor.donationType === typeFilter) &&
               (!bloodFilter || donor.bloodGroup === bloodFilter);
    });

    const container = document.getElementById('donorsContainer');
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div>No matching donors found</div>';
        return;
    }

    container.innerHTML = filtered.map(donor => `
        <div class="donor-card">
            <div class="card-header">
                <div class="card-title">${donor.name}</div>
                <span class="badge badge-type">${donor.bloodGroup}</span>
            </div>
            <div class="card-info">
                <div class="info-row">
                    <span class="info-label">Type:</span>
                    <span>${donor.donationType}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span>${donor.location}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Availability:</span>
                    <span>${donor.availability}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Contact:</span>
                    <span>${donor.email}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function openAssignModal(requestId, specific) {
    selectedRequestId = requestId;
    const request = requests.find(r => r.id === requestId);
    document.getElementById('modalBody').innerHTML = `
        <p><strong>Request:</strong> ${request.patientName} needs ${specific}</p>
        <p><strong>Urgency:</strong> ${request.urgency.toUpperCase()}</p>
        <p><strong>Location:</strong> ${request.location}</p>
        <p style="margin-top: 15px; color: #666;">Are you willing to donate?</p>
    `;
    document.getElementById('assignModal').classList.add('active');
}

function closeModal() {
    document.getElementById('assignModal').classList.remove('active');
    selectedRequestId = null;
}

function confirmAssignment() {
    if (selectedRequestId) {
        const request = requests.find(r => r.id === selectedRequestId);
        alert(`Thank you! You've been matched with ${request.patientName}'s request. The hospital will contact you shortly.`);
        closeModal();
    }
}

function showSuccess(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, 3000);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('assignModal');
    if (event.target == modal) {
        closeModal();
    }
}