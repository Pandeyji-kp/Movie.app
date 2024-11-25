import { useEffect, useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';


function App() {

  const [movieData, SetMoviedata] = useState([])
  const [inputvalue, setinputvalue] = useState(null)

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;




  let displayData = () => {

    let Api;

    if (inputvalue == null || inputvalue==""  ) {
      Api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`
    }

    else {
      Api = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${inputvalue}`
    }


    axios.get(Api)


      .then((ress) => {
        SetMoviedata(ress.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  useEffect(() => {
    displayData()
  }, [inputvalue, currentPage])

  //////////////////////////////////////////////////
 


  return (
    <>
      <Container>
        <h2 className='pt-2'>Movie app</h2>
        <div className='py-3'>
          <input type="text" placeholder='Search Here' value={inputvalue} onChange={(e) => setinputvalue(e.target.value)} className='w-100 p-2' />
        </div>
        <Row lg={4} md={3} xs={2}>

          {movieData.map((v) => {
            return (
              <>
                <Col className='my-2'>
                  <Card style={{ height: "600px" }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280${v.poster_path} `} className='myimg' />
                    <Card.Body>
                      <Card.Title>{v.title}</Card.Title>
                      <Card.Text>
                        {v.release_date}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </>

            )
          })}


        </Row>
        <div className='py-4'>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Container>
    </>

  )
}

export default App
