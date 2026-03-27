import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

const navItems = [
	{ to: "/", label: "Overview", icon: "grid" },
	{ to: "/packages", label: "Packages", icon: "package" },
	{ to: "/api-explorer", label: "API Explorer", icon: "code" },
	{ to: "/getting-started", label: "Getting Started", icon: "rocket" },
] as const;

const iconMap: Record<string, React.ReactNode> = {
	grid: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect x="3" y="3" width="7" height="7" />
			<rect x="14" y="3" width="7" height="7" />
			<rect x="14" y="14" width="7" height="7" />
			<rect x="3" y="14" width="7" height="7" />
		</svg>
	),
	package: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
			<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
			<line x1="12" y1="22.08" x2="12" y2="12" />
		</svg>
	),
	code: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	),
	rocket: (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
			<path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
			<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
			<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
		</svg>
	),
};

function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logo}>
				<div className={styles.logoIcon}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<rect width="24" height="24" rx="6" fill="var(--color-accent)" />
						<path d="M7 8h10M7 12h6M7 16h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
					</svg>
				</div>
				<div className={styles.logoText}>
					<span className={styles.logoTitle}>M365 Copilot</span>
					<span className={styles.logoSubtitle}>SDK Dashboard</span>
				</div>
			</div>

			<nav className={styles.nav}>
				{navItems.map(({ to, label, icon }) => (
					<NavLink
						key={to}
						to={to}
						end={to === "/"}
						className={({ isActive }) =>
							`${styles.navItem} ${isActive ? styles.navItemActive : ""}`
						}
					>
						<span className={styles.navIcon}>{iconMap[icon]}</span>
						<span>{label}</span>
					</NavLink>
				))}
			</nav>

			<div className={styles.footer}>
				<div className={styles.version}>
					<span className={styles.versionDot} />
					v1.0.0-preview.0
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
