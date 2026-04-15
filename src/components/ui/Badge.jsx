import { BADGE_STYLES } from '../../constants/eventConfig';

/**
 * Badge
 * @param {'HOT' | 'NEW' | 'FEW' | string} type  - 뱃지 종류
 * @param {string} [label]                         - 직접 텍스트 지정 시 type 대신 사용
 */
export default function Badge({ type, label, style: extraStyle = {} }) {
    const preset = BADGE_STYLES[type] ?? { background: 'var(--surface2)', color: 'var(--muted)' };

    return (
        <span
        style={{
            display: 'inline-block',
            padding: '3px 9px',
            borderRadius: 'var(--r-full)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.03em',
            lineHeight: 1.4,
            ...preset,
            ...extraStyle,
        }}
        >
        {label ?? type}
        </span>
    );
}