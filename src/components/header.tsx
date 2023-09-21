import { MainMenu } from "./MainMenu";

const Header: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        height: 70,
        width: "100%",
        background: '#5bf'
      }}
    >
      <MainMenu/>
    </div>
  );
};

export default Header;
