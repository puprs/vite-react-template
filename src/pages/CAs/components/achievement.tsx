export interface combatAchievement {
  id: number;
  name: string;
  description: string;
  members: boolean;
  subcategory: string;
  subcategory2: string;
  tier: string;
  points: number;
  runescore: number;
}


interface achievementProps {
  achievement: combatAchievement;
  handleClick: (ach: combatAchievement) => void;
  completed: boolean
}

const achievementStyles = {
  display: "flex",
  alignItems: "center",
  border: "2px solid #333",
  width: "576px",
  height: "48px",
  borderRadius: "15px",
  padding: "10px",
  backgroundColor: "#333",
  color: "white",
  gap: "12px",
  cursor: "pointer"
};

const checkedAchievementStyles = {
  display: "flex",
  alignItems: "center",
  border: "2px solid #0f0",
  width: "576px",
  height: "48px",
  borderRadius: "15px",
  padding: "10px",
  backgroundColor: "#333",
  color: "white",
  gap: "12px",
  cursor: "pointer"
};



const Achievement = ({ achievement , handleClick, completed}: achievementProps) => {

  return (
    <div style={!completed ? achievementStyles: checkedAchievementStyles} onClick={()=> handleClick(achievement)}>
      <img
        style={{ height: "48px", width: "48px" }}
        src={`/images/Combat_Mastery_-_${achievement.tier}_achievement_icon.png`}
      ></img>

      <div style={{ display: "flex", flexDirection: "column", margin: "0px" }}>
        <span>{achievement.name}</span>
        <span>{achievement.description}</span>
      </div>
    </div>
  );
};

export default Achievement;
