import React from 'react';

const Dashboard = () => {
    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Tracker App</h2>
                <button style={styles.logoutBtn}>Logout</button>
            </nav>
            <main style={styles.main}>
                <div style={styles.card}>
                    <h3>Selamat Datang!</h3>
                    <p>Anda berhasil login. Dasbor dan tabel data Anda akan ditampilkan di sini.</p>
                </div>
            </main>
        </div>
    );
};

const styles = {
    container: { fontFamily: '"Segoe UI", sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' },
    navbar: { display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    logo: { margin: 0, color: '#1f2937' },
    logoutBtn: { padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    main: { padding: '40px' },
    card: { backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }
};

export default Dashboard;