import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.get('http://localhost:8000/sanctum/csrf-cookie');
            await api.post('/login', { email, password });
            navigate('/dashboard');
        } catch (err) {
            setError('Login gagal! Pastikan email dan password Anda benar.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Daily Tracker</h2>
                <p style={styles.subtitle}>Silakan masuk ke akun Anda</p>

                {error && <div style={styles.errorBox}>{error}</div>}

                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Objek CSS untuk mempercantik UI tanpa perlu file CSS terpisah
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: '24px',
        color: '#1f2937',
        textAlign: 'center'
    },
    subtitle: {
        margin: '0 0 24px 0',
        fontSize: '14px',
        color: '#6b7280',
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151'
    },
    input: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '15px',
        outline: 'none',
    },
    button: {
        marginTop: '10px',
        padding: '12px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    errorBox: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '14px',
        marginBottom: '20px',
        textAlign: 'center'
    }
};

export default Login;