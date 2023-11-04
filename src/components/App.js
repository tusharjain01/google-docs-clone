import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";

function App() {
  return (
    <Container style={{"fontFamily" : "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
      <NavBar/>
      <Outlet/>
    </Container>
  );
}

export default App;
