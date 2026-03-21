const MediQueue = {
    // Current State
    state: {
        view: 'landing',
        theme: 'light',
        queuePosition: 4, // Mock position 
        appointments: [
            { id: 101, doctor: "Dr. Kelvin Junior", time: "10:30 AM", status: "Confirmed" }
        ]
    },

    // Initialize App
    init() {
        this.render();
    },

    // View Router
    render() {
        const app = document.getElementById('app');
        if (this.state.view === 'landing') {
            app.innerHTML = this.templateLanding();
        } else if (this.state.view === 'dashboard') {
            app.innerHTML = this.templateDashboard();
        } else if (this.state.view === 'booking') {
            app.innerHTML = this.templateBooking();
        }
    },

    // Templates based on Core Application Screens 
    templateLanding() {
        return `
            <section class="container" style="text-align:center">
                <h1>Smart Clinic Bookings, Simplified</h1>
                <p>Modernizing healthcare access through smart digital queuing[cite: 49].</p>
                <div style="margin-top:30px">
                    <button class="btn-primary" onclick="MediQueue.setView('booking')">Book an Appointment Now</button>
                </div>
                <div class="card" style="margin-top:40px">
                    <h3>Simple Process [cite: 36]</h3>
                    <p>Find Clinic → Pick Slot → Get Queue ID → Visit & Heal [cite: 40-46]</p>
                </div>
            </section>
        `;
    },

    templateDashboard() {
        return `
            <div class="container">
                <h2>Patient Dashboard </h2>
                <div class="card">
                    <h3>Current Queue Status</h3>
                    <p style="font-size: 24px; color: var(--primary)">Your Position: #${this.state.queuePosition}</p>
                </div>
                <div class="card">
                    <h3>Upcoming Appointments</h3>
                    ${this.state.appointments.map(app => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee">
                            <span><strong>${app.doctor}</strong> - ${app.time}</span>
                            <button class="btn-danger" onclick="MediQueue.cancelAppointment(${app.id})">Cancel [cite: 13]</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    templateBooking() {
        return `
            <div class="container">
                <h2>Book Appointment </h2>
                <div class="card">
                    <p>Select Doctor and Date [cite: 83-84]</p>
                    <select style="width:100%; padding:10px; margin:15px 0">
                        <option>Dr. Kelvin Junior (General)</option>
                        <option>Dr. Deborah (Specialist)</option>
                    </select>
                    <button class="btn-primary" style="width:100%" onclick="MediQueue.confirmBooking()">Confirm Booking</button>
                </div>
            </div>
        `;
    },

    // Interactions
    setView(view) {
        this.state.view = view;
        this.render();
    },

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    },

    confirmBooking() {
        alert("Appointment Confirmed! Check your dashboard for queue status[cite: 86].");
        this.setView('dashboard');
    },

    cancelAppointment(id) {
        if(confirm("Confirm cancellation? [cite: 88]")) {
            this.state.appointments = this.state.appointments.filter(a => a.id !== id);
            this.render();
        }
    }
};

// Start application
document.addEventListener('DOMContentLoaded', () => MediQueue.init());