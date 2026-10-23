import './BookFilter.css';
import PropTypes from 'prop-types';
const filters = [{ id: 'all', label: 'All Books' }, { id: 'milik', label: '✓ Milik' }, { id: 'baca', label: '◉ Baca' }, { id: 'beli', label: '♡ Beli' }];
export default function BookFilter({ search, onSearch, status, onStatus }) {
  return <div className="filter-section"><label className="search-wrap"><span>⌕</span><input type="search" aria-label="Cari buku" placeholder="Cari judul atau penulis..." value={search} onChange={(event) => onSearch(event.target.value)} /></label><div className="filter-pills" aria-label="Filter status">{filters.map((filter) => <button key={filter.id} type="button" className={`filter-pill ${status === filter.id ? 'selected' : ''}`} onClick={() => onStatus(filter.id)} aria-pressed={status === filter.id}>{filter.label}</button>)}</div></div>;
}
BookFilter.propTypes = { search: PropTypes.string.isRequired, onSearch: PropTypes.func.isRequired, status: PropTypes.oneOf(['all', 'milik', 'baca', 'beli']).isRequired, onStatus: PropTypes.func.isRequired };

