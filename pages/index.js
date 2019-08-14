import { useState, Fragment, useEffect } from 'react'
import Head from 'next/head'
import movies from '../movies.json'
import List from '../tools/list'
import { getValues, orderArrays, filterInArrays } from '../tools/functions'

const Genres = getValues(movies, 'genres')
const Actors = getValues(movies, 'actors')
const ImdbRating = orderArrays(getValues(movies, 'imdbRating', false), false)


function Home() {
  const [movie, setMovie] = useState(null)
  const [genre, setGenre] = useState(null)
  const [actor, setActor] = useState(null)
  const [imdbRating, setImdbRating] = useState(null)
  const [movieList, setMovieList] = useState(List(movies))

  const handleChangeFilter = async (setFilter, value) => {
    await setFilter(value)

  }
  useEffect(() => {
    setMovie(movieList.head)
  }, [movieList])

  useEffect(() => {
    const list = filterInArrays(imdbRating, 'imdbRating', filterInArrays(actor, 'actors', filterInArrays(genre, 'genres', movies)), false)
    setMovieList(List(list))
  }, [genre, actor, imdbRating])

  return (
    <Fragment>
      <Head>
        <title>Test Rocka Labs</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <button className="btn btn-outline-primary">Movies</button>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="genreDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Genres
                  </a>
                    <div className="dropdown-menu" aria-labelledby="genreDropdown">
                      {Genres.map(g => (
                        <button key={g} className={`dropdown-item ${genre === g && 'active'}`} onClick={() => handleChangeFilter(setGenre, g)} href="#">{g}</button>
                      ))}
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="genreDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Actors
                  </a>
                    <div className="dropdown-menu" aria-labelledby="genreDropdown">
                      {Actors.map(a => (
                        <button key={a} className={`dropdown-item ${actor === a && 'active'}`} onClick={() => handleChangeFilter(setActor, a)} href="#">{a}</button>
                      ))}
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="genreDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      ImdbRating
                  </a>
                    <div className="dropdown-menu" aria-labelledby="genreDropdown">
                      {ImdbRating.map(i => (
                        <button key={i} className={`dropdown-item ${imdbRating === i && 'active'}`} onClick={() => handleChangeFilter(setImdbRating, i)} href="#">{i}</button>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        {!movie && (
          <div className="row">
            <div className="col-12 text-center"></div>
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {movie && (
          <div className="row">
            <div className="col-3">
              <img src={movie.data.posterurl} alt="Poster" className="img-fluid" />
            </div>
            <div className="col-6">
              <h2 className="text-primary">{movie.data.title}</h2>
              <p className="text-dark">{movie.data.storyline}</p>
              <p className="text-dark"><strong>Actors:</strong> {movie.data.actors.join(', ')}</p>
              <p className="text-dark"><strong>Imdb:</strong> {movie.data.imdbRating}</p>
            </div>
            <div className="col-12 text-center mt-4">
              <div className="btn-group" role="group" >
                <button className="btn btn-info" onClick={() => setMovie(movie.prev || movieList.tail)}>&lt; Anterior</button>
                <button className="btn btn-info" onClick={() => setMovie(movie.next || movieList.head)}>Siguiente &gt;</button>
              </div>
            </div>
          </div>
        )}
      </div>

    </Fragment>
  )
}

export default Home