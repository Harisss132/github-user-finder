function UserCard({ profile }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow border border-gray-700 text-center">
      <img src={profile.avatar_url} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4"/>
      <h2 className="text-xl font-bold" >{profile.name}</h2>
      <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm mt-2" >@{profile.login}</a>
      <p className="text-gray-400 text-sm mt-2" >{profile.bio || 'nothing in bio'}</p>
      <p className="text-gray-400 text-sm mt-2">
        <strong>{profile.followers}</strong> Followers {" "}
        <strong>{profile.following}</strong> Following
      </p>
    </div>
  );
}

export default UserCard;
