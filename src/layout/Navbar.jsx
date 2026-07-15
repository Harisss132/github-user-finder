import SearchBar from "../components/SearchBar";

function Navbar({ value, onChange }) {
  return (
    <div className="w-full">
      <nav className="mx-5">
        <ul className="flex gap-5 justify-between items-center">
          <li className="flex gap-4 items-center">
            <div className="w-16 h-16 shrink-0">
              <img
                src="/images/GitHub_Invertocat_White_Clearspace.svg"
                alt="Logo Github"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-3xl tracking-tight">
                User Github Finder
              </h1>
              <p className="text-gray-200 text-sm">
                Search your username for looking your github.
              </p>
            </div>
          </li>
          <li>
            <p className="font-medium text-gray-700 hover:text-black cursor-pointer">
              <SearchBar value={value} onChange={onChange}/>
            </p>
          </li>
        </ul>
      </nav>
      <div></div>
    </div>
  );
}

export default Navbar;
