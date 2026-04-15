import Chip from '../../../components/ui/Chip';
import { GENRE_OPTIONS } from '../../../constants/eventConfig';

/**
 * FilterChips  — 홈 페이지용 장르 칩 목록
 *
 * @param {string}   active    - 현재 선택된 장르
 * @param {function} onChange  - (genre: string) => void
 */
export default function FilterChips({ active, onChange }) {
    return (
        <div
        style={{
            display: 'flex',
            gap: 8,
            padding: '0 48px',
            marginBottom: 32,
            flexWrap: 'wrap',
        }}
        >
        {GENRE_OPTIONS.map((genre) => (
            <Chip
            key={genre}
            label={genre}
            active={active === genre}
            onClick={() => onChange?.(genre)}
            />
        ))}
        </div>
    );
}