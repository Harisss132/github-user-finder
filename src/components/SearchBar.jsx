function SearchBar({ value, onChange }) {
    return (
        <input type="text" 
        placeholder="Type Here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
        />
    )
}

export default SearchBar;