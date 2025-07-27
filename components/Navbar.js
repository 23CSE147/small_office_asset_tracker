'use client';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import './Navbar.css';

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => router.push('/')}>
          <img src="/favicon.ico" alt="AssetTracker Logo" className="navbar-logo-icon" />
          <span>AssetTracker Pro</span>
        </div>
        <ul className="navbar-links">
          {status === 'loading' ? null : !session ? (
            // BEFORE LOGIN
            <>
              <li>
                <button onClick={() => router.push('/')}>Home</button>
              </li>
              <li>
                <button onClick={() => router.push('/assets')}>Assets</button>
              </li>
              <li>
                <button onClick={() => router.push('/login')}>Login</button>
              </li>
            </>
          ) : (
            // AFTER LOGIN
            <>
              <li>
                <span>
                    <p className='Special'>
                        {session.user?.email}
                    </p>
                </span>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
