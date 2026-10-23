import { NavLink } from 'react-router-dom';
export default function Sidebar() {
  const links = [{ to: '/', icon: '⌂', text: 'Home', end: true }, { to: '/books', icon: '▤', text: 'My Books' }, { to: '/stats', icon: '▥', text: 'Stats' }];
  return <aside className="sidebar">
    <div className="logo"><span className="logo-icon">✿</span> booknest<span className="dot">.</span></div>
    <div className="sidebar-label">YOUR LITTLE CORNER</div>
    <nav className="nav-links" aria-label="Navigasi utama">{links.map(({ to, icon, text, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span className="nav-icon">{icon}</span>{text}</NavLink>)}</nav>
    <div className="sidebar-note"><span className="note-star">✳</span><strong>Little reminder!</strong><p>Every book is a new little adventure ♡</p><span className="note-sparkle">✦ ✧</span></div>
    <div className="sidebar-footer">made with ♡ for book lovers</div>
  </aside>;
}
