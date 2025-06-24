
import { useAuth } from "../context/AuthContext";

const difficulties = [
  { id: 0, difficulty: "All" },
  { id: 1, difficulty: "Easy" },
  { id: 2, difficulty: "Medium" },
  { id: 3, difficulty: "Hard" },
  { id: 4, difficulty: "Elite" },
  { id: 5, difficulty: "Master" },
  { id: 6, difficulty: "Grandmaster" },
];

interface NavbarProps {
  currentDifficulty: string,
  handleChange: (difficulty: string) => void;
}


export const Navbar = ({currentDifficulty, handleChange}: NavbarProps) => {
  const { signInWithDiscord, signOut, user } = useAuth();




  const displayName =
    user?.user_metadata.full_name

  return (
    <div className="navbar">
      <div className="navbar-title">Combat Achievements</div>

      <div className="navbar-links">
     
          <div className="difficulty-wrapper" id="difficulty-filter">
            {difficulties.map((diff) => (
              <span
                key={diff.id}
                className={`difficulty-btn ${currentDifficulty === diff.difficulty.toLowerCase() ? "active" : ""}`}
                data-difficulty={diff.difficulty.toLowerCase()}
                onClick={() => handleChange(diff.difficulty)}
              >
                {diff.difficulty}
              </span>
            ))}
          </div>

         
         
            
       

        <div className="right-buttons">
          <button id="share-btn" >
            <img src="/images/link.png" className="icon-img link-icon" />
            <img
              src="/images/tick.png"
              className="icon-img check-icon"
            />
          </button>

          <button id="reset-btn" >
            Reset
          </button>

          <div className="auth-block">
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <span>{displayName}</span>
                <button onClick={signOut}>Sign Out</button>
              </div>
            ) : (
              <button onClick={signInWithDiscord}>Sign in</button>
            )}
          </div>
        </div>
      </div>
      </div>
  );
};

export default Navbar;