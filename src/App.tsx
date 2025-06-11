import "./App.css";
import achievements from "../src/resources/combatAchievements.json";
import Achievement from "./components/achievement";

function App() {
  return (
    <div>
      {achievements.map((achievement) => (
        <Achievement achievement={achievement}/>
      ))}
    </div>
  );
}

export default App;
