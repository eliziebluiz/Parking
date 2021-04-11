import "./global.css";

import Route from "./Services/route";

import { ChallengesProvider } from "./Services/Context/ChallengesContext";

function App() {
  return (
    <ChallengesProvider>
      <Route />
    </ChallengesProvider>
  );
}

export default App;
