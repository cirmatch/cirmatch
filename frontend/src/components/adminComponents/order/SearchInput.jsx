export default function SearchInput({ search, setSearch }) {
  return (
    <div className="px-4 py-3">
      <label className="flex h-12 w-full">
        <div className="flex w-full items-center bg-gray-100 rounded-lg overflow-hidden">
          <div className="px-4 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search orders by ID, User, or Status"
            className="w-full bg-gray-100 px-4 text-base focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </label>
    </div>
  );
}
