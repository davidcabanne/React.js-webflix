import Form from "../components/Form";
import Header from "../components/Header";

const Home = ({ cartMovies, onAddMovie, onRemoveMovie }) => {
  return (
    <div>
      <Header />
      <Form
        cartMovies={cartMovies}
        onAddMovie={onAddMovie}
        onRemoveMovie={onRemoveMovie}
        />
    </div>
  );
};

export default Home;
