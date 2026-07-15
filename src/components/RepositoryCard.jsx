function RepositoryCard({ repos, currentPage, onPageChange, totalRepos }) {
  const totalPages = Math.ceil(totalRepos / 3);
  return (
    <div className="bg-gray-800 p-4 rounded shadow border border-gray-700 space-y-3">
      <div>
        <h3 className="text-lg font-bold mb-2">Repositories ({totalRepos})</h3>
        <div className="space-y-3">
          {repos.length === 0 ? (
            <p className="text-gray-400 text-sm">Repositori not found</p>
          ) : (
            repos.map((repo) => (
              <div
                key={repo.id}
                className="p-3 bg-gray-700 rounded border border-gray-600"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-blue-400 hover:underline font-semibold block"
                >
                  {repo.name}
                </a>
                <p className="text-sm text-gray-300 mt-1">
                  {repo.description || "nothing"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-4">
            <button onClick={() => onPageChange((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 text-sm disabled:cursor-not-allowed"
            >
                Kembali
            </button>
            <span className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
            </span>

            <button
            onClick={() => onPageChange((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 text-sm disabled:cursor-not-allowed"
            >
                Selanjutnya
            </button>
        </div>
      )}
    </div>
  );
}

export default RepositoryCard;
