/**
 * PageLayout  — 공통 페이지 래퍼
 * Navbar 높이(56px)만큼 paddingTop 을 보정하고
 * fade-up 애니메이션을 적용
 *
 * @param {React.ReactNode} children
 * @param {string} [className]
 * @param {object} [style]
 */
export default function PageLayout({ children, className = '', style: extraStyle = {} }) {
    return (
        <div
        className={`fade-up ${className}`}
        style={{
            paddingTop: 56,
            minHeight: '100vh',
            ...extraStyle,
        }}
        >
        {children}
        </div>
    );
}