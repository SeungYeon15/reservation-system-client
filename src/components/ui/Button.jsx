/**
 * Button
 * @param {'primary' | 'outline' | 'ghost'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} fullWidth
 * @param {boolean} disabled
 */

const styles = {
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        border: 'none',
        borderRadius: 'var(--r-md)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'opacity var(--transition-base), transform var(--transition-fast), background var(--transition-base), border-color var(--transition-base)',
        whiteSpace: 'nowrap',
    },

    variant: {
        primary: {
        background: 'var(--accent)',
        color: '#0e0e12',
        border: '1px solid transparent',
        },
        outline: {
        background: 'transparent',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        },
        ghost: {
        background: 'transparent',
        color: 'var(--muted)',
        border: '1px solid transparent',
        },
    },

    size: {
        sm: { padding: '7px 16px', fontSize: 'var(--text-sm)' },
        md: { padding: '11px 22px', fontSize: 'var(--text-base)' },
        lg: { padding: '13px 28px', fontSize: 'var(--text-md)' },
    },

    disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        pointerEvents: 'none',
    },
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    onClick,
    type = 'button',
    style: extraStyle = {},
    ...props
    }) {
    const composed = {
        ...styles.base,
        ...styles.variant[variant],
        ...styles.size[size],
        ...(fullWidth ? { width: '100%' } : {}),
        ...(disabled ? styles.disabled : {}),
        ...extraStyle,
    };

    const handleMouseEnter = (e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.opacity = '0.85';
        if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--accent)';
        if (variant === 'ghost')   e.currentTarget.style.color = 'var(--text)';
        e.currentTarget.style.transform = 'translateY(-1px)';
    };

    const handleMouseLeave = (e) => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.opacity = '1';
        if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--border)';
        if (variant === 'ghost')   e.currentTarget.style.color = 'var(--muted)';
        e.currentTarget.style.transform = 'translateY(0)';
    };

    return (
        <button
        type={type}
        onClick={disabled ? undefined : onClick}
        style={composed}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
        >
        {children}
        </button>
    );
}