import NavBar from '../../components/Navbar/navbar';
import style from "./home.module.css"
import construccion from "../../Assets/construccion.jpg"

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className={style.divH2}>
        <h2>Catalogo en construccion</h2>           {' '}
        <img src={construccion} alt="" />
      </div>
    </div>
  );
};

export default Home;
