import { useState, useEffect, useRef } from "react";
import Navbar from "./layout/Navbar";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepositoryCard from "./components/RepositoryCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("");
  const [totalUserFound, setTotalUserFound] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userRepo, setUserRepo] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef(null);

  function handleInputChange(value) {
    setSearchTerm(value);
    setPage(1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDebounceTerm(value);
    }, 600);
  }

  useEffect(() => {
    if (!debounceTerm.trim()) {
      setUserProfile(null);
      setUserRepo([]);
      setTotalUserFound(null);
      return;
    }
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchGithubData() {
      setLoading(true);
      setError(null);
      try {
        const searchRes = await fetch(
          `https://api.github.com/search/users?q=${debounceTerm}`,
          { signal },
        );
        if (!searchRes.ok) {
          throw new Error(`HTTP Error: ${searchRes.status}`);
        }
        const searchData = await searchRes.json();
        setTotalUserFound(searchData.total_count);

        if (searchData.items && searchData.items.length > 0) {
          const topUser = searchData.items[0].login;

          const [profileRes, repoRes] = await Promise.all([
            fetch(`https://api.github.com/users/${topUser}`, { signal }),
            fetch(
              `https://api.github.com/users/${topUser}/repos?sort=created&per_page=3&page=${page}`,
              { signal },
            ),
          ]);
          if(!profileRes.ok || !repoRes.ok) {
            throw new Error('Failed to fetch profile and repo')
          }
          const profile = await profileRes.json();
          const repo = await repoRes.json();

          setUserProfile(profile);
          setUserRepo(repo);
        } else {
          setUserProfile(null);
          setUserRepo([]);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch failed");
          return;
        }
        setError(`User not found / API limit: ${error.message}`);
        setUserProfile(null);
        setUserRepo([]);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }
    fetchGithubData();
    return () => {
      controller.abort();
    };
  }, [debounceTerm, page]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar value={searchTerm} onChange={handleInputChange} />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {!loading && totalUserFound !== null && (
          <div className="bg-gray-800 p-3 rounded border border-gray-700 text-sm text-gray-300">
            found{" "}
            <span className="text-blue-400 font-bold">
              {totalUserFound.toLocaleString()}
            </span>{" "}
            user with the name <span className="italic">{debounceTerm}</span>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <p className="text-red-500 text-xs italic mt-2">Error: {error}</p>
        )}
        {!loading && !userProfile && debounceTerm && !error && (
          <p className="text-center text-gray-400">User not found</p>
        )}
        {!loading && userProfile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <UserCard profile={userProfile} />
            </div>
            <div className="md:col-span-2">
              <RepositoryCard
                repos={userRepo}
                currentPage={page}
                onPageChange={setPage}
                totalRepos={userProfile.public_repos}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
