import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const Movie = props => {
  console.log("Movies props", props);
  const [movie, setMovie] = useState([]);
  const id = props.match.params.id;

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("Movie res", res);
        setMovie(res.data);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
    props.history.push("/");
  };

  return (
    <>
      {!movie && <div>Loading movie information...</div>}

      <div className="save-wrapper">
        <MovieCard movie={movie} />
        <div className="save-button" onClick={saveMovie}>
          Save
        </div>
      </div>
    </>
  );
};

export default Movie;

// export default class Movie extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movie: null
//     };
//   }

//   componentDidMount() {
//     this.fetchMovie(this.props.match.params.id);
//   }

//   componentWillReceiveProps(newProps) {
//     if (this.props.match.params.id !== newProps.match.params.id) {
//       this.fetchMovie(newProps.match.params.id);
//     }
//   }

//   fetchMovie = id => {
//     axios
//       .get(`http://localhost:5000/api/movies/${id}`)
//       .then(res => this.setState({ movie: res.data }))
//       .catch(err => console.log(err.response));
//   };

//   saveMovie = () => {
//     const addToSavedList = this.props.addToSavedList;
//     addToSavedList(this.state.movie);
//   };

//   render() {
//     if (!this.state.movie) {
//       return <div>Loading movie information...</div>;
//     }

//     return (
//       <div className="save-wrapper">
//         <MovieCard movie={this.state.movie} />
//         <div className="save-button" onClick={this.saveMovie}>
//           Save
//         </div>
//       </div>
//     );
//   }
// }
